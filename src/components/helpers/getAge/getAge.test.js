import getAge from './getAge';

describe('func returns age from birth date', () => {
  test('27 should be returned', () => {
    const input = 'Mon May 25 1993 19:23:18 GMT+0300 (Москва, стандартное время)';

    const actual = getAge(input);

    const expected = 27;

    expect(actual).toBe(expected);
  });
});
