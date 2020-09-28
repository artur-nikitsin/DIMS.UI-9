import mobilePhoneValidator from "./mobilePhoneValidator";

describe("func checking last phone number string valid", () => {

  test("true should be returned", () => {

    const input = "300400500";

    const actual = mobilePhoneValidator(input).isValid;

    const expected = true;

    expect(actual).toBe(expected);
  });

  test("false should be returned", () => {

    const input = "234234234h";

    const actual = mobilePhoneValidator(input).isValid;

    const expected = false;

    expect(actual).toBe(expected);
  });
});