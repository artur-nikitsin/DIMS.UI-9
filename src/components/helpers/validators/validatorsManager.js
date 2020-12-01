import nameValidator from './nameValidator';
import lastNameValidator from './lastNameValidator';
import emailValidator from './emailValidator';
import lengthValidator from './lengthValidator';
import mobilePhoneValidator from './mobilePhoneValidator';
import ageValidator from './ageValidator';

function validatorsManager(type, data) {
  switch (type) {
    case 'email':
      return emailValidator(data);
    case 'firstName':
      return nameValidator(data);
    case 'lastName':
      return lastNameValidator(data);
    case 'mobilePhone':
      return mobilePhoneValidator(data);
    case 'birthDate':
      return ageValidator(data);
    default:
      return lengthValidator(data);
  }
}

export default validatorsManager;
