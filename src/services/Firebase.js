import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();

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
    console.error(error);
  });
  console.log(user);
  await updateProfile(user, {
    displayName: name,
  });
};

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    console.error(error);
  });
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
