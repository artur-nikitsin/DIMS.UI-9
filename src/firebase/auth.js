import firebase from 'firebase/firebase';
import db from './db';

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

export async function login(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      return getRole(email);
    })
    .catch((error) => {
      const { code } = error;
      const message = returnLoginMessage(code);
      return { message, messageType: 'warning' };
    });
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

//////////////////////////////////
export const loginWithGoogle = async () => {
  try {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(googleProvider);
  } catch (e) {
    this.showError('Something wrong! Cannot log in DIMS!');
  }
};

export const loginWithFacebook = async () => {
  try {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(facebookProvider);
  } catch (e) {
    this.showError('Something wrong! Cannot log in DIMS!');
  }
};

export const loginWithGitHub = async () => {
  try {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    await firebase.auth().signInWithPopup(githubProvider);
  } catch (e) {
    this.showError('Something wrong! Cannot log in DIMS!');
  }
};
