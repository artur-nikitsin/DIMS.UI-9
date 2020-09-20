import React from "react";
import getLocalDate from "./getLocalDate";

describe("func returns local date format", () => {

  test("25.05.2020 should be returned", () => {
    //Arrange - just test state, constants
    const input = 'Mon May 25 2020 19:23:18 GMT+0300 (Москва, стандартное время)';

    //Act - any side logic, data hadngling and etc.
    const actual = getLocalDate(input);

    // in this easy example it can be in arrange section,
    // but I prefer to write it right before assertion
    const expected = '25.05.2020';

    //Assert - checking
    expect(actual).toBe(expected);
  });
});