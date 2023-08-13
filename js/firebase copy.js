import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  Timestamp,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
// console.log(getAuth)
// import { GoogleAuthProvider } from "firebase/auth";
// const provider = new GoogleAuthProvider();
// console.log(provider)
const firebaseConfig = {
  apiKey: "AIzaSyDoUPP-xE4icck-iXkpzzQ0hISPA58B7qs",
  authDomain: "fitfit-24e25.firebaseapp.com",
  projectId: "fitfit-24e25",
  storageBucket: "fitfit-24e25.appspot.com",
  messagingSenderId: "288949895076",
  appId: "1:288949895076:web:c24511704bbfe52cbfcb31",
};
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);
const ref = collection(db, "fitlog");
const refHistory = collection(db, "login");
export const firestore = firebase.firestore();
export {
  ref,
  db,
  refHistory,
  Timestamp,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
};
