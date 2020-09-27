import nameValidator from "./nameValidator";

describe("func checking name string valid", () => {

  test("func checking name string valid", () => {

    const input = "Artur";

    const actual = nameValidator(input).isValid;

    const expected = true;

    expect(actual).toBe(expected);
  });

  test("func checking name string valid", () => {

    const input = "Artur1";

    const actual = nameValidator(input).isValid;

    const expected = false;

    expect(actual).toBe(expected);
  });
});