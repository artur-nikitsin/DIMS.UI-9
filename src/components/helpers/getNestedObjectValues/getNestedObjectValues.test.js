import getNestedObjectValues from './getNestedObjectValues';
import { userModalConfiguration } from '../../Modals/Common/ModalInputsTemplate';

describe('func returns new object, which contain nested keys of first ', () => {
  test('new object with nested keys isValidated should be returned', () => {
    const actual = getNestedObjectValues(userModalConfiguration, 'isValidated', null);

    const expected = {
      address: false,
      birthDate: true,
      directionId: false,
      education: true,
      email: true,
      firstName: true,
      lastName: true,
      mathScore: false,
      mobilePhone: true,
      sex: false,
      skype: false,
      startDate: true,
      university: true,
    };

    expect(actual).toBe(expected);
  });

  test('new object with empty string values should be returned', () => {
    const actual = getNestedObjectValues(userModalConfiguration, null, '');

    const expected = {
      address: '',
      birthDate: '',
      directionId: '',
      education: '',
      email: '',
      firstName: '',
      lastName: '',
      mathScore: '',
      mobilePhone: '',
      sex: '',
      skype: '',
      startDate: '',
      university: '',
    };

    expect(actual).toBe(expected);
  });
});
