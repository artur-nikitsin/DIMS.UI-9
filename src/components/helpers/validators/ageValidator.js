import PropTypes from 'prop-types';
import getAge from '../getAge/getAge';

function ageValidator(age) {
  if (age) {
    if (getAge(age) >= 18) {
      return {
        isValid: true,
        status: 'valid',
        message: 'Valid age',
      };
    }
    return {
      isValid: false,
      status: 'invalid',
      message: 'User must be over 18 years old!',
    };
  }
}

ageValidator.propTypes = {
  age: PropTypes.string.isRequired,
};

export default ageValidator;
