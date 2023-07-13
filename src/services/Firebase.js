import firebase from "firebase/compat/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
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
    await deleteDoc(doc(db, userId, cardId)).then(() => {
      return {
        status: "success",
        message: "Card has been deleted successfully",
      };
    });

    return {
      status: "success",
      message: "Card is successfully deleted!",
    };
  }
};

export const getCards = (userId, callback) => {
  return onSnapshot(query(collection(db, userId)), (querySnapshot) => {
    const cards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(cards);
  });
};
