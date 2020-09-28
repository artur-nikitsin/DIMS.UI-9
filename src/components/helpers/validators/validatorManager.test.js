import validatorsManager from "./validatorsManager";

describe("func checking name string valid", () => {

  test("true should be returned", () => {

    const type = "firstName"

    const input = "Artur";

    const actual = validatorsManager(type, input).isValid;

    const expected = true;

    expect(actual).toBe(expected);
  });

  test("true should be returned", () => {

    const type = "email"

    const input = "abcde@gmail.com";

    const actual = validatorsManager(type, input).isValid;

    const expected = true;

    expect(actual).toBe(expected);
  });
});