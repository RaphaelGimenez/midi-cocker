import { CONTROL_CHANGE } from './MESSAGE_TYPES';
// A function that takes a CC midi message, a CC number and a midi channel
// And transform the message in a CC message for the CC given in args
export const ccToCC = (message: number[], cc: number, channel: number) => {
  const [, , data2] = message;

  const newStatus = CONTROL_CHANGE + channel;

  const newMessage = [newStatus, cc, data2];

  return newMessage;
};
