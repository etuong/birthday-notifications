import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import { firebaseConfig } from "./Credentials";
import { compareFn, getDateInfo } from "../utilities/DateHelper";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export default firebaseApp;

export const registerUser = async (name, email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
  } catch (error) {
    return {
      status: "error",
      message: error.message,
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
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    message: "You are successfully logged in!",
  };
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    message: "You are successfully logged out!",
  };
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    message: "Please check your email to reset password",
  };
};

export const addCard = async (userId, payload) => {
  try {
    await addDoc(collection(db, userId), payload);
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    message: "New card is successfully created!",
  };
};

export const deleteCard = async (userId, cardId) => {
  if (cardId) {
    try {
      await deleteDoc(doc(db, userId, cardId));
    } catch (error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    return {
      status: "success",
      message: "Card has been deleted successfully",
    };
  }
};

export const getCards = (userId, callback) => {
  return onSnapshot(query(collection(db, userId)), (querySnapshot) => {
    const cards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      ...getDateInfo(doc.data().birthDate.seconds),
    }));

    cards.sort(compareFn);
    callback(cards);
  });
};
