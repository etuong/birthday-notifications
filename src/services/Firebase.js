import firebase from "firebase/compat/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import "firebase/compat/auth";
import { firebaseConfig } from "./Credentials";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
export default firebase;

export const getCities = async () => {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
};

export const registerUser = async (name, email, password) => {
  const { user } = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  ).catch((error) => {
    alert(error.message);
    return false;
  });

  await updateProfile(user, {
    displayName: name,
  });

  return true;
};

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    alert(error.message);
  });
};

export const logout = () => {
  signOut(auth).catch((error) => {
    alert(error.message);
  });
};

export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email).catch((error) => {
    alert(error.message);
  });
};
