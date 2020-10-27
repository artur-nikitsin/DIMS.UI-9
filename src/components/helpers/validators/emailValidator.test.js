import emailValidator from './emailValidator';

describe('func checking e-mail valid', () => {
  test('true should be returned', () => {
    const input = 'abcde@gmail.com';

    const actual = emailValidator(input).isValid;

    const expected = true;

    expect(actual).toBe(expected);
  });

  test('false should be returned', () => {
    const input = 'abcde.gmail.com';

    const actual = emailValidator(input).isValid;

    const expected = false;

    expect(actual).toBe(expected);
  });
});
