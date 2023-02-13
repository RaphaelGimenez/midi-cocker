import {
  NOTE_ON,
  NOTE_OFF,
  CONTROL_CHANGE,
  START,
  CONTINUE,
  STOP,
  TIMING_CLOCK,
} from './MESSAGE_TYPES';

// Given a midi message, return if it is a note, a CC or a clock
export const getMessageType = (message: number[]) => {
  const [status] = message;

  let type: number;

  if ((status & 0xf0) === 0xf0) {
    // System message
    type = status;
  } else {
    // Channel message
    type = status & 0xf0;
  }

  switch (type) {
    case NOTE_OFF:
      return 'noteoff';
    case NOTE_ON:
      return 'noteon';
    case CONTROL_CHANGE:
      return 'cc';
    case TIMING_CLOCK:
      return 'clock';
    case START:
      return 'clock-start';
    case CONTINUE:
      return 'clock-continue';
    case STOP:
      return 'clock-stop';
    default:
      return 'unknown';
  }
};
