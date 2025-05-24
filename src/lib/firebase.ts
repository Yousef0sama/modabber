// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbIvORDJBIDYcAhV9xpZzD_GwbOIA89CM",
  authDomain: "moddaber1885.firebaseapp.com",
  projectId: "moddaber1885",
  storageBucket: "moddaber1885.firebasestorage.app",
  messagingSenderId: "578322751582",
  appId: "1:578322751582:web:6b56344db4c9fa8bc854cf",
  measurementId: "G-P66QH0F7XF"
};

// Initialize Firebase app
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);