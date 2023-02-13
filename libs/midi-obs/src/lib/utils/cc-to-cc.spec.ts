import { ccToCC } from './cc-to-cc';

describe('ccToCC', () => {
  it('converts a MIDI control change message to another control change message', () => {
    const message = [176, 60, 127];
    const cc = 123;
    const channel = 2;

    const result = ccToCC(message, cc, channel);

    expect(result).toEqual([message[0] + channel, cc, message[2]]);
  });

  it('preserves the data2 value from the original message', () => {
    const message = [176, 60, 64];
    const cc = 123;
    const channel = 3;

    const result = ccToCC(message, cc, channel);

    expect(result[2]).toEqual(message[2]);
  });

  it('sets the status value based on the channel number', () => {
    const message = [176, 60, 127];
    const cc = 123;
    const channel = 0;

    const result = ccToCC(message, cc, channel);

    expect(result[0]).toEqual(message[0] + channel);

    const channel1 = 1;
    const result1 = ccToCC(message, cc, channel1);

    expect(result1[0]).toEqual(message[0] + channel1);
  });
});
