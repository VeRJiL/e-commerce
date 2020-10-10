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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = (collectionKey, collectionToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  collectionToAdd.forEach((obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  }))

  batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map(doc => {

    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;