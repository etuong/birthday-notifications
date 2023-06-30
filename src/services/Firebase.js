import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const messageCollection =
  process.env.NODE_ENV === "production" ? "messages" : "test";
const redirectOnSuccessAuth =
  process.env.NODE_ENV === "production" ? "/firebase-chat/" : "/";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export default firebase;
