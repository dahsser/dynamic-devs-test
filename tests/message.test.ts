import { getMessage, deleteDelay } from "../src/utils/calcMessage";

describe("Message finding", () => {
  it("should delete delays", async () => {
    const messages = [
      ["", "this", "is", "", "message"],
      ["", "", "", "this", "", "a", "message"],
      ["", "", "is", "", "message"],
    ];
    const withouDelay = deleteDelay(messages);
    expect(withouDelay[0].length).toBe(4);
    expect(withouDelay[1].length).toBe(4);
    expect(withouDelay[2].length).toBe(4);
  });
  it("should delete delays", async () => {
    const messages = [
      ["", "this", "is", "", "message"],
      ["", "", "", "this", "", "a", "message"],
      ["", "", "", "", "message"],
    ];
    const withouDelay = deleteDelay(messages);
    expect(withouDelay[0].length).toBe(4);
    expect(withouDelay[1].length).toBe(4);
    expect(withouDelay[2].length).toBe(4);
  });
  it("should find a message - lvl 1", async () => {
    const messages = [
      ["this", "is", "a", "message"],
      ["this", "", "a", "message"],
      ["", "", "is", "", "message"],
    ];
    const finalMessage = getMessage(messages);
    expect(finalMessage).toBe("this is a message");
  });
  it("should find a message - lvl 2", async () => {
    const messages = [
      ["", "", "", "this", "is", "a", "message"],
      ["this", "", "a", "message"],
      ["", "", "is", "", "message"],
    ];
    const finalMessage = getMessage(messages);
    expect(finalMessage).toBe("this is a message");
  });

  it("should find a message - lvl 3", async () => {
    const messages = [
      ["", "", "", "this", "is", "a", ""],
      ["", "is", "", "message"],
      ["this", "", "", ""],
    ];
    const finalMessage = getMessage(messages);
    expect(finalMessage).toBe("this is a message");
  });
  it("it should find a message - lvl 3", async () => {
    const messages = [
      ["", "", "", "", "", "a", ""],
      ["", "is", "", "message"],
      ["this", "", "", ""],
    ];
    const finalMessage = getMessage(messages);
    expect(finalMessage).toBe("this is a message");
  });
  it("it shouldn't find a message", async () => {
    const messages = [
      ["", "no", "a", ""],
      ["", "is", "", "message"],
      ["this", "", "", ""],
    ];
    const finalMessage = getMessage(messages);
    expect(finalMessage).toBe("");
  });
});
