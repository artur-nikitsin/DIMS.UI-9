import dataExtractor from "./dataExtractor";

describe("func returns object with data", () => {

  test("key-value object should be returned", () => {

    const input = {
      adress: { isValid: true, data: "asdASD" },
      birthDate: { isValid: true, data: "asdASD" },
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

    const actual = dataExtractor(input);

    const expected = {
      adress: "asdASD",
      birthDate: "asdASD",
      directionId: "asdASD",
      education: "AdsADSasf",
      email: "nikitsin.artur@gmail.com",
      firstName: "DasdASD",
      lastName: "asdAS",
      mathScore: "ASDAS",
      mobilePhone: "23423423",
      sex: "male",
      skype: "asdADS",
      startDate: "01.02.2020",
      university: "ADSASD"
    };

    expect(actual).toStrictEqual(expected);
  });
});