import emailValidator from "./emailValidator";

describe("func checking e-mail valid", () => {
  test("true", () => {

    const input = "abcde@gmail.com";

    const actual = emailValidator(input).isValid;

    const expected = true;

    expect(actual).toBe(expected);
  });

  test("func checking e-mail valid", () => {

    const input = "abcde.gmail.com";

    const actual = emailValidator(input).isValid;

    const expected = false;

    expect(actual).toBe(expected);
  });
});