import lastNameValidator from './lastNameValidator';

describe('func checking last name string valid', () => {
  test('true should be returned', () => {
    const input = 'Nikitsin';

    const actual = lastNameValidator(input).isValid;

    const expected = true;

    expect(actual).toBe(expected);
  });

  test('false should be returned', () => {
    const input = 'Nikitsin1';

    const actual = lastNameValidator(input).isValid;

    const expected = false;

    expect(actual).toBe(expected);
  });
});
