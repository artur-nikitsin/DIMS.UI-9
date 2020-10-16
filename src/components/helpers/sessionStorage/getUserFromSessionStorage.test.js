import getUserFromSessionStorage from './getUserFromSessionStorage';
import setUserToSessionStorage from './setUserToSessionStorage';

describe('func gets userData from sessionStorage', () => {
  test('get userData from sessionStorage', () => {
    const actual = { firstName: 'Artur', lastName: 'Nikitsin', id: 1, role: "admin" };
    setUserToSessionStorage(actual);
    const expected = getUserFromSessionStorage();
    expect(actual).toMatchObject(expected);
  });
});
