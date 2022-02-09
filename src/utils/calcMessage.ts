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
  let finalMessage: string[] = [];
  let cleanedMessages = deleteDelay(messages);
  let error = false;
  for (let i = 0; i < cleanedMessages[0].length && !error; i += 1) {
    let tempWord = "";
    console.log("-----------");
    for (let j = 0; j < cleanedMessages.length; j += 1) {
      console.log("tempWord", tempWord, "vs", cleanedMessages[j][i]);
      if (tempWord === "") {
        tempWord = cleanedMessages[j][i];
      } else if (
        tempWord !== cleanedMessages[j][i] &&
        cleanedMessages[j][i] !== ""
      ) {
        error = true; // Collision of words, maybe "message" vs "Message" not allowed for this case
      }
    }
    console.log(error ? "Error!" : null);
    if (!error) {
      finalMessage.push(tempWord);
    }
  }
  if (error) return "";
  return finalMessage.join(" ");
};
