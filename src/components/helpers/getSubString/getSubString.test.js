import React from "react";
import getSubString from "./getSubString";

describe("func returns substring of string with entered numbers of characters ", () => {
  test("Lorem ipsum...  should be returnded", () => {

    const input = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed";

    const actual = getSubString(input, 11);

    const expected = "Lorem ipsum...";
    
    expect(actual).toBe(expected);
  });
});