import regExpTester from "./regExpTester";
import { emailRegexp } from "./regExp";
import PropTypes from "prop-types";
import Header from "../../Header/Header";


function emailValidator(email) {

  if (email) {
    if (regExpTester(emailRegexp, email)) {
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
emailValidator.propTypes = {
  email: PropTypes.string.isRequired,
};

export default emailValidator;