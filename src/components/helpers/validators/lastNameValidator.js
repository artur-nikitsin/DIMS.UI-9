import React from "react";
import regExpTester from "./regExpTester";
import { nameRegexp } from "./regExp";


function lastNameValidator(props) {

  if (props) {
    if (regExpTester(nameRegexp, props)) {
      return (
        {
          isValid: true,
          status: "valid",
          message: "Valid last name"
        }
      );
    }
    return (
      {
        isValid: false,
        status: "invalid",
        message: "Invalid last name!"
      }
    );
  }

}


export default lastNameValidator;