import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCBQt1iXE6u2A51wW5EmfYbVAcnP1eNve4",
    authDomain: "react-18a1c.firebaseapp.com",
    databaseURL: "https://react-18a1c.firebaseio.com",
    projectId: "react-18a1c",
    storageBucket: "react-18a1c.appspot.com",
    messagingSenderId: "988196733314",
    appId: "1:988196733314:web:7144e6a927886ef7f3cf9b"
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;