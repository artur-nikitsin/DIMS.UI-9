import firebase from 'firebase/firebase';
import config from './config';

firebase.initializeApp(config);
const db = firebase.firestore();

export default db;
