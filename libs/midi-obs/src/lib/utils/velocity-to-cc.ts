// A function that takes a midi message
// And transform the velocity in an other message for the CC given in args
export const velocityToCC = (message: number[], cc: number) => {
  const [status, , velocity] = message;

  const newMessage = [status, cc, velocity];

  return newMessage;
};
