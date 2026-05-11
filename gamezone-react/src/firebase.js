// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLEITXhtdMQ_c4JP77oFMIm36PE4Z7C58",
  authDomain: "webb-daa3b.firebaseapp.com",
  projectId: "webb-daa3b",
  storageBucket: "webb-daa3b.firebasestorage.app",
  messagingSenderId: "463884443990",
  appId: "1:463884443990:web:38a31989a13445aa1036f7",
  measurementId: "G-LWF4E003J7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;