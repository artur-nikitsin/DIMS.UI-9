import firebase from "firebase";
import db from "./db";

export function registerNewUser(email, password) {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      console.error(`${error.message} ${error.code}`);
    });
}

export function login(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => getRole(email))
    .then((result) => {
      return result;
    })
    .catch(({ message }) => ({ message, messageType: "warning" }));
}

export function logout() {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      return { message: "logged out successfully" };
    })
    .catch(({ message }) => ({ message, messageType: "warning" }));
}

export function getRole(email) {
  const userData = {};
  return db
    .collection("Roles")
    .where("email", "==", email)
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
    })
    .then(() => userData);
}
