import regExpTester from "./regExpTester";
import { phoneNumberRegexp } from "./regExp";
import PropTypes from "prop-types";


function mobilePhoneValidator(number) {

  if (number) {
    if (regExpTester(phoneNumberRegexp, number)) {
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

mobilePhoneValidator.propTypes = {
  number: PropTypes.string.isRequired,
};

export default mobilePhoneValidator;