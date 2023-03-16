 import { initializeApp } from 'firebase/app';
 import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
} from 'firebase/auth';
import{
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

 const firebaseConfig = {
  apiKey: "AIzaSyCvx8Ov4iK8iS6CWSyNaxShDCvXSsEbvNs",
  authDomain: "crwn-clothing-74103.firebaseapp.com",
  projectId: "crwn-clothing-74103",
  storageBucket: "crwn-clothing-74103.appspot.com",
  messagingSenderId: "1054996565382",
  appId: "1:1054996565382:web:c6e63261073e258ee53007"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email, 
        createdAt
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}
