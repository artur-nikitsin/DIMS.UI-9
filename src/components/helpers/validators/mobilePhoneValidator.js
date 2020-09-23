import React from "react";
import regExpTester from "./regExpTester";
import { phoneNumberRegexp } from "./regExp";


function mobilePhoneValidator(props) {

  if (props) {
    if (regExpTester(phoneNumberRegexp, props)) {
      return (
        {
          isValid: true,
          status: "valid",
          message: "Valid phone number"
        }
      );
    }
    return (
      {
        isValid: false,
        status: "invalid",
        message: "Invalid phone number!"
      }
    );
  }

}


export default mobilePhoneValidator;