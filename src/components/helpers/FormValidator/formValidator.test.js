import formValidator from "./formValidator";

describe("func returns local date format", () => {

  test("false", () => {

    const input = {
      adress: { isValid: true, data: "asdASD" },
      birthDate: { isValid: false, data: "" },
      directionId: { isValid: true, data: "asdASD" },
      education: { isValid: true, data: "AdsADSasf" },
      email: { isValid: true, data: "nikitsin.artur@gmail.com" },
      firstName: { isValid: true, data: "DasdASD" },
      lastName: { isValid: true, data: "asdAS" },
      mathScore: { isValid: true, data: "ASDAS" },
      mobilePhone: { isValid: true, data: "23423423" },
      sex: { isValid: true, data: "male" },
      skype: { isValid: true, data: "asdADS" },
      startDate: { isValid: true, data: "01.02.2020" },
      university: { isValid: true, data: "ADSASD" }
    };

    const actual = formValidator(input);

    const expected = false;

    expect(actual).toStrictEqual(expected);
  });
});