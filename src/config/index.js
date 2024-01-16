// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhA7o-Jec-7rMpWNEXdrZlnNs42xzVK9U",
  authDomain: "nexuslogistics-90949.firebaseapp.com",
  projectId: "nexuslogistics-90949",
  storageBucket: "nexuslogistics-90949.appspot.com",
  messagingSenderId: "713227885416",
  appId: "1:713227885416:web:e015d6bfa7c5f2fc6654dd",
  measurementId: "G-Z8PCQZQ7MR",
};

// Initialize Firebase
const auth = initializeApp(firebaseConfig);
const firestore = getFirestore(auth);

export { firestore, doc, setDoc, addDoc, collection, getDoc, updateDoc };
