import { take } from 'rxjs';
import { MidiSrc, MidiDst, WebMidiTest } from './../../index.d';
import Midi, { Midi as IMidi } from './midi';
// import * as WMT from 'web-midi-test';

describe('Midi', () => {
  let midi: IMidi;

  let WMT: WebMidiTest;
  let inputs: MidiSrc[] = [];
  let outputs: MidiDst[] = [];

  beforeEach(async () => {
    WMT = await import('web-midi-test');
    inputs = [WMT.MidiSrc('Volca Sample In')];
    outputs = [WMT.MidiDst('Volca Sample Out')];
    inputs.forEach((input) => input.connect());
    outputs.forEach((output) => output.connect());

    navigator.requestMIDIAccess = jest.fn(WMT.requestMIDIAccess);
    midi = new Midi();
  });

  afterEach(() => {
    inputs.forEach((input) => input.disconnect());
    outputs.forEach((output) => output.disconnect());
    inputs = [];
    outputs = [];
    jest.clearAllMocks();
  });

  describe('inputs$', () => {
    it('should emit the MIDI inputs when subscribed', (done) => {
      midi.inputs$.pipe(take(1)).subscribe((inputs) => {
        expect(inputs).toHaveLength(1);
        done();
      });
    });

    it('should emit the updated MIDI inputs when state changes', (done) => {
      const newMidi = WMT.MidiSrc('New device In');

      midi.inputs$.pipe(take(2)).subscribe((inputs) => {
        if (inputs.length === 1) {
          newMidi.connect();
        } else {
          expect(inputs).toHaveLength(2);
          done();
        }
      });
    });
  });

  describe('outputs$', () => {
    it('should emit the MIDI outputs when subscribed', (done) => {
      midi.outputs$.pipe(take(1)).subscribe((outputs) => {
        expect(outputs).toHaveLength(1);
        done();
      });
    });

    it('should emit the updated MIDI outputs when state changes', (done) => {
      const newMidi = WMT.MidiDst('New device In');

      midi.outputs$.pipe(take(2)).subscribe((outputs) => {
        if (outputs.length === 1) {
          newMidi.connect();
        } else {
          expect(outputs).toHaveLength(2);
          done();
        }
      });
    });
  });
});
