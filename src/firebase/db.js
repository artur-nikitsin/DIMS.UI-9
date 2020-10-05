import firebase from "firebase";
import config from "./config";
import auth from "firebase";


firebase.initializeApp(config);
const db = firebase.firestore();

export default db;

