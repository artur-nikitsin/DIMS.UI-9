import React from "react";
import regExpTester from "./regExpTester";
import { emailRegexp } from "./regExp";


function emailValidator(props) {

  if (props) {
    if (regExpTester(emailRegexp, props)) {
      return (
        {
          isValid: true,
          status: 'valid',
          message: 'Valid e-mail!'
        }
      );
    }
    return (
      {
        isValid: false,
        status: 'invalid',
        message: 'Invalid e-mail!'
      }
    );
  }

}


export default emailValidator;