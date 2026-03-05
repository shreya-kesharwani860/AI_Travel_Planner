// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC67jEq6AoTF72vJyippvSM-_NGmPixnk",
  authDomain: "ai-trip-975f2.firebaseapp.com",
  projectId: "ai-trip-975f2",
  storageBucket: "ai-trip-975f2.firebasestorage.app",
  messagingSenderId: "509621193616",
  appId: "1:509621193616:web:282df6f18f1c6bfd844115",
  measurementId: "G-SZCD2KHCR2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);