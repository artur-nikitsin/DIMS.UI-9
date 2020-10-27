import regExpTester from './regExpTester';

describe('func checking regExp', () => {
  test('true should be returned', () => {
    const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    const input = 'abc@gmail.com';

    const actual = regExpTester(emailRegExp, input);

    const expected = true;

    expect(actual).toBe(expected);
  });
});
