import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
  apiKey: "AIzaSyCGc1Y3edWLt6RxLJ7rBc5s2xEDcEd7rl8",
  authDomain: "react-project-8381b.firebaseapp.com",
  databaseURL: "https://react-project-8381b.firebaseio.com",
  projectId: "react-project-8381b",
  storageBucket: "react-project-8381b.appspot.com",
  messagingSenderId: "445393977312",
  appId: "1:445393977312:web:c2656b29f25e161ba6b585",
  measurementId: "G-CS0X0LW4QL"
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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
