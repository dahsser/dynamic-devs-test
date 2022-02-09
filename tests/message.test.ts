import { getMessage } from "../src/utils/calcMessage";

describe("Message finding", () => {
  it("should find a message", async () => {
    const messages = [
      ["", "this", "is", "a", "message"],
      ["this", "", "a", "message"],
      ["", "", "is", "", "message"],
    ];
    const finalMessage = getMessage(messages);
    expect(finalMessage).toBe("this is a message");
  });
  it("should find a message", async () => {
    const messages = [
      ["", "", "", "this", "is", "a", "message"],
      ["this", "", "a", "message"],
      ["", "", "is", "", "message"],
    ];
    const finalMessage = getMessage(messages);
    expect(finalMessage).toBe("this is a message");
  });

  it("should find a message", async () => {
    const messages = [
      ["", "", "", "this", "is", "a", ""],
      ["", "is", "", "message"],
      ["this", "", "", ""],
    ];
    const finalMessage = getMessage(messages);
    expect(finalMessage).toBe("this is a message");
  });
  it("it should find a message", async () => {
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
