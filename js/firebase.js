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
  apiKey: "AIzaSyAaF2Jql0rGrvV2rTJ0GTrqdXMNFycyo6w",
  authDomain: "fitlog-76a3d.firebaseapp.com",
  projectId: "fitlog-76a3d",
  storageBucket: "fitlog-76a3d.appspot.com",
  messagingSenderId: "81071060356",
  appId: "1:81071060356:web:522bdd643b491548b419d1",
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
