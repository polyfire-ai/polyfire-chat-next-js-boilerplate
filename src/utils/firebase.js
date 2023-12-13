// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvwgdE_pEzlCT2PSoJU_kYzQl6T_dL77Y",
  authDomain: "opensob.firebaseapp.com",
  projectId: "opensob",
  storageBucket: "opensob.appspot.com",
  messagingSenderId: "518899168584",
  appId: "1:518899168584:web:2cc0be0dd5898950a32f7d",
  measurementId: "G-6Z7D9L8MH9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export function firebaseLogin(userID) {
  try {
    createUserWithEmailAndPassword(
      auth,
      userID + "@polyfire.com",
      userID
    ).catch((err) => {
      if (err.code === "auth/email-already-in-use") {
        signInWithEmailAndPassword(auth, userID + "@polyfire.com", userID);
      }
    });
  } catch (e) {}
}

export function postMessage(message) {
  const user = auth.currentUser.uid;

  if (user) {
    addDoc(collection(db, "messages"), {
      message: message,
      timestamp: new Date(),
      user: user,
    });
  }
}

export function getMessages(setMessages) {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser.uid;

  if (user) {
    db.collection("messages")
      .doc(user)
      .onSnapshot((doc) => {
        if (doc.exists()) {
          setMessages(doc.data().messages);
        }
      });
  }
}

export function authStateUpdate(callback) {
  const auth = getAuth(app);
  onAuthStateChanged(auth, callback);
}

export { app, auth, db };
