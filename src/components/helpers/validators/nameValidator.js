import regExpTester from './regExpTester';
import { nameRegexp } from './regExp';

function nameValidator(props) {
  if (props) {
    if (regExpTester(nameRegexp, props)) {
      return {
        isValid: true,
        status: 'valid',
        message: 'Valid name',
      };
    }
    return {
      isValid: false,
      status: 'invalid',
      message: 'Invalid name!',
    };
  }
}

export default nameValidator;
