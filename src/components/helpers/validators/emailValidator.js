import regExpTester from "./regExpTester";
import { emailRegexp } from "./regExp";


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


export default emailValidator;