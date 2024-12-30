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
    return {
      status: "success",
      message: "You are successfully registered!",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return {
      status: "success",
      message: "You are successfully logged in!",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return {
      status: "success",
      message: "You are successfully logged out!",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      status: "success",
      message: "Please check your email to reset password",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const addCard = async (userId, payload) => {
  try {
    await addDoc(collection(db, userId), payload);
    return {
      status: "success",
      message: "New card is successfully created!",
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteCard = async (userId, cardId) => {
  if (cardId) {
    try {
      await deleteDoc(doc(db, userId, cardId));
      return {
        status: "success",
        message: "Card has been deleted successfully",
      };
    } catch (error) {
      return {
        status: "error",
        message: error.message,
      };
    }
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

