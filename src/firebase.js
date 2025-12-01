// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNllEW7_M0gIDuJcCQy_DgTUxiiYlWvBU",
  authDomain: "eigo-for-all.firebaseapp.com",
  projectId: "eigo-for-all",
  storageBucket: "eigo-for-all.firebasestorage.app",
  messagingSenderId: "422710233879",
  appId: "1:422710233879:web:4f56eaad8e02ec57354552",
  measurementId: "G-3P9FZX58X8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
