import { getMessageType } from './get-message-type';
import {
  NOTE_OFF,
  NOTE_ON,
  CONTROL_CHANGE,
  TIMING_CLOCK,
  START,
  CONTINUE,
  STOP,
} from './MESSAGE_TYPES';

describe('getMessageType', () => {
  it('returns "noteoff" for a NOTE_OFF message', () => {
    const message = [NOTE_OFF, 60, 0];
    const result = getMessageType(message);
    expect(result).toBe('noteoff');
  });

  it('returns "noteon" for a NOTE_ON message', () => {
    const message = [NOTE_ON, 60, 100];
    const result = getMessageType(message);
    expect(result).toBe('noteon');
  });

  it('returns "cc" for a CONTROL_CHANGE message', () => {
    const message = [CONTROL_CHANGE, 1, 0];
    const result = getMessageType(message);
    expect(result).toBe('cc');
  });

  it('returns "clock" for a TIMING_CLOCK message', () => {
    const message = [TIMING_CLOCK];
    const result = getMessageType(message);
    expect(result).toBe('clock');
  });

  it('returns "clock-start" for a START message', () => {
    const message = [START];
    const result = getMessageType(message);
    expect(result).toBe('clock-start');
  });

  it('returns "clock-continue" for a CONTINUE message', () => {
    const message = [CONTINUE];
    const result = getMessageType(message);
    expect(result).toBe('clock-continue');
  });

  it('returns "clock-stop" for a STOP message', () => {
    const message = [STOP];
    const result = getMessageType(message);
    expect(result).toBe('clock-stop');
  });

  it('returns "unknown" for an unknown message', () => {
    const message = [0x00];
    const result = getMessageType(message);
    expect(result).toBe('unknown');
  });
});
