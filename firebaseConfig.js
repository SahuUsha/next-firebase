// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFheWwnplJs1rkrjeL5sqlCd-5yX27Ic4",
  authDomain: "next-auth-crud-85b8d.firebaseapp.com",
  projectId: "next-auth-crud-85b8d",
  storageBucket: "next-auth-crud-85b8d.firebasestorage.app",
  messagingSenderId: "854200058194",
  appId: "1:854200058194:web:824b82331cb107fa537a8b",
  measurementId: "G-MT9H30J45B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
