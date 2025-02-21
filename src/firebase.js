// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbBcuULnli6VJeJjL0M4CxqCn8OGd3O0c",
  authDomain: "lms-inc.firebaseapp.com",
  projectId: "lms-inc",
  storageBucket: "lms-inc.firebasestorage.app",
  messagingSenderId: "679017053630",
  appId: "1:679017053630:web:efde75c80d30e6ec580def",
  measurementId: "G-MV576E8RN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };