// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);