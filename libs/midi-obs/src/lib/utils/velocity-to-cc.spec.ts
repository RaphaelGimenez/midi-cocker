import { velocityToCC } from './velocity-to-cc';

describe('velocityToCC', () => {
  it('converts a MIDI velocity message to a control change message', () => {
    const message = [144, 60, 127];
    const cc = 123;

    const result = velocityToCC(message, cc);

    expect(result).toEqual([144, cc, 127]);
  });

  it('preserves the status and velocity values from the original message', () => {
    const message = [144, 60, 64];
    const cc = 123;

    const result = velocityToCC(message, cc);

    expect(result[0]).toEqual(message[0]);
    expect(result[2]).toEqual(message[2]);
  });
});
