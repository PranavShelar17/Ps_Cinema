// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMnnG6Sy6cyaV7Pr7h_BJjRV-rN6fZwro",
  authDomain: "skflix0707.firebaseapp.com",
  projectId: "skflix0707",
  storageBucket: "skflix0707.firebasestorage.app",
  messagingSenderId: "993516871456",
  appId: "1:993516871456:web:47650f2a3e199b77234145",
  measurementId: "G-YJ5R4HK22E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export { db };
