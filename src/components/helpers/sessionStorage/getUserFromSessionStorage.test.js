import getUserFromSessionStorage from './getUserFromSessionStorage';
import setUserToSessionStorage from './setUserToSessionStorage';

describe('func gets userData from sessionStorage', () => {
  test('get userData from sessionStorage', () => {
    const user = { firstName: 'Artur', lastName: 'Nikitsin', id: 1, role: "admin" };
    const actual = user;
    setUserToSessionStorage(user);
    const expected = getUserFromSessionStorage();
    expect(actual).toMatchObject(expected);
  });
});
