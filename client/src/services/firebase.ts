// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUZ7FtSgVNN7rWLMbIXi5xTG4SpUmDwlY",
  authDomain: "auth-441e8.firebaseapp.com",
  projectId: "auth-441e8",
  storageBucket: "auth-441e8.appspot.com",
  messagingSenderId: "119417235252",
  appId: "1:119417235252:web:50d89dc49f7d1f74572761",
  measurementId: "G-V8KZSPJ23B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
