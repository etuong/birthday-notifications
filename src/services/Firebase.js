import firebase from "firebase/compat/app";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   setDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
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

/*
export const createNote = async (note) => {
  await setDoc(doc(db, "notes", note.id), note);
};

export const getNotes = async () => {
  const notesSnapshot = await getDocs(collection(db, "notes"));
  const notesList = notesSnapshot.docs.map((doc) => doc.data());
  return notesList;
};

export const updateNote = async (note) => {
  const noteRef = doc(db, "notes", note.id);
  await updateDoc(noteRef, {
    description: "New description",
  });
};

export const deleteNote = async (note) => {
  const noteRef = doc(db, "notes", note.id);
  await deleteDoc(noteRef);
};*/

export const addCard = async (payload) => {
  try {
    await addDoc(collection(db, "jKDgFyaF5KfMoGZ03vzFBx0Kaeq1"), payload);
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteCard = async (id, cardId) => {
  if (cardId) {
    await deleteDoc(doc(db, id, cardId)).then(() => {
      return {
        status: "success",
        message: "Card has been deleted successfully",
      };
    });
  }
};

export const getCards = (id, callback) => {
  return onSnapshot(query(collection(db, id)), (querySnapshot) => {
    const cards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(cards);
  });
};
