import firebase from 'firebase/firebase';
import db from './db';

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

export function register(email, password, firstName, userId) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      sentWelcomeEmail(user.user, user.user.email, firstName, userId);
    })
    .catch((error) => {
      console.error(`${error.message} ${error.code}`);
    });
}

export function sentWelcomeEmail(user, email, userName, userId) {
  user
    .updateProfile({
      displayName: userName,
      uid: userId,
    })
    .then((user) => {
      const currentUser = firebase.auth();
      currentUser.sendPasswordResetEmail(email).then(function() {});
    })
    .then(() => {
      console.log('Welcome email successfully sent');
    })
    .catch((error) => {
      console.error(`${error.message} ${error.code}`);
    });
}

export async function login(email, password, connectAnotherProvider) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      if (connectAnotherProvider) {
        linkAnotherProvider(user.user);
      }

      return getRole(email);
    })
    .catch((error) => {
      const { code } = error;
      const message = returnLoginMessage(code);
      return { message, messageType: 'warning' };
    });
}

export async function linkAnotherProvider(currentUser) {
  currentUser
    .linkWithPopup(githubProvider)
    .then(function(result) {
      console.log(result);
    })
    .catch(function(error) {});
}

function returnLoginMessage(code) {
  if (code === 'auth/user-not-found') {
    return 'This login not exists';
  }
  if (code === 'auth/wrong-password') {
    return 'Wrong password';
  }
}

export function logout() {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      return { message: 'logged out successfully' };
    })
    .catch(({ message }) => ({ message, messageType: 'warning' }));
}

export function getRole(email) {
  const userData = {};
  return db
    .collection('Roles')
    .where('email', '==', email)
    .get()
    .then((users) => {
      users.forEach((user) => {
        const { role, userId, firstName, lastName } = user.data();
        userData.role = role;
        userData.userId = userId;
        userData.firstName = firstName;
        userData.lastName = lastName;
        userData.email = email;
      });
      return userData;
    });
}

export function setUserRole({ firstName, lastName, userId, email, role }) {
  role = role || 'user';
  db.collection('Roles')
    .doc(userId)
    .set({ userId, email, role, firstName, lastName })
    .then(() => ({ message: 'User created successfully' }))
    .catch(({ message }) => ({ message, messageType: 'warning' }));
}

export const loginWithGitHub = () => {
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((result) => {
      const { email } = result.user;
      return getRole(email);
    })
    .catch((result) => {
      if (result.code === 'auth/account-exists-with-different-credential') {
        console.log('еще не связанные аккаунты');
        return { dimsLoginFirst: true, email: result.email };
      }
      if (result.code === 'auth/user-cancelled' || result.code === 'auth/popup-closed-by-user') {
        console.log('вы закрыли окно авторизации');
      }
    });
};
