import getLocalDate from './getLocalDate';

describe('func returns local date format', () => {
  test('25.05.2020 should be returned', () => {
    const input = 'Mon May 25 2020 19:23:18 GMT+0300 (Москва, стандартное время)';

    const actual = getLocalDate(input);

    const expected = '25.05.2020';

    expect(actual).toBe(expected);
  });
});
