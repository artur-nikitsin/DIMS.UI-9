import formValidator from './formValidator';

describe('func returns false if array contains at least one false or null', () => {
  test('false should be returned after array checking', () => {
    const input = [null, null, null, null, null, null, true, null, null, null, null, null, true];

    const actual = formValidator(input);

    const expected = false;

    expect(actual).toEqual(expected);
  });
  test('true should be returned after array checking', () => {
    const input = [true, true, true, true, true, true, true, true, true, true, true, true, true];

    const actual = formValidator(input);

    const expected = true;

    expect(actual).toEqual(expected);
  });
});
