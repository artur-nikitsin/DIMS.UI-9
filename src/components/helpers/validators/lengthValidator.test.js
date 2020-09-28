import lengthValidator from "./lengthValidator";

describe("func checking length of string", () => {

  test("true should be returned", () => {

    const input = "abcde";

    const actual = lengthValidator(input).isValid;

    const expected = true;

    expect(actual).toBe(expected);
  });

  test("false should be returned", () => {

    const input = "ab";

    const actual = lengthValidator(input).isValid;

    const expected = false;

    expect(actual).toBe(expected);
  });
});