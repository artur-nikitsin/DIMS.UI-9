import PropTypes from 'prop-types';
import regExpTester from './regExpTester';
import { nameRegexp } from './regExp';

function lastNameValidator(lastName) {
  if (lastName) {
    if (regExpTester(nameRegexp, lastName)) {
      return {
        isValid: true,
        status: 'valid',
        message: 'Valid last name',
      };
    }
    return {
      isValid: false,
      status: 'invalid',
      message: 'Invalid last name!',
    };
  }
}

lastNameValidator.propTypes = {
  lastName: PropTypes.string.isRequired,
};

export default lastNameValidator;
