import getUserFromSessionStorage from './getUserFromSessionStorage';
import setUserToSessionStorage from './setUserToSessionStorage';

describe('func sets userData to sessionStorage', () => {
  test('set userData to sessionStorage', () => {
    const user = { firstName: 'Artur', lastName: 'Nikitsin', id: 1, role: 'admin' };
    const actual = user;
    setUserToSessionStorage(user);
    const expected = getUserFromSessionStorage();
    expect(actual).toMatchObject(expected);
  });
});
