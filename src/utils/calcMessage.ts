type satelliteMessage = string[];
export const deleteDelay = (
  messages: satelliteMessage[]
): satelliteMessage[] => {
  const longestPossibleSize = Math.max(
    ...messages.map((m: string[]) => {
      let firstNoEmptyIndex = 0;
      while (firstNoEmptyIndex < m.length && m[firstNoEmptyIndex] === "") {
        firstNoEmptyIndex += 1;
      }
      return m.length - firstNoEmptyIndex;
    })
  );
  console.log("longestPossibleSize", longestPossibleSize);
  return messages.map((m) => {
    return m.slice(m.length - longestPossibleSize);
  });
};
export const getMessage = (messages: satelliteMessage[]): string => {
  let finalMessage = "";
  let cleanMessages = deleteDelay(messages);
  return finalMessage;
};
