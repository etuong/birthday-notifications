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
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, {
      displayName: name,
    });
  } catch (e) {
    return {
      status: "error",
      message: e.message,
    };
  }

  return {
    status: "success",
    message: "You are successfully registered!",
  };
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    return {
      status: "error",
      message: e.message,
    };
  }

  return {
    status: "success",
    message: "You are successfully logged in!",
  };
};

export const logout = async () => {
  await signOut(auth).catch((error) => {
    return {
      status: "error",
      message: error.message,
    };
  });

  return {
    status: "success",
    message: "You are successfully logged out!",
  };
};

export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email).catch((error) => {
    return {
      status: "error",
      message: error.message,
    };
  });

  return {
    status: "success",
    message: "Please check your email to reset password",
  };
};
