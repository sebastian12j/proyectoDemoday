// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVsNPRNkkZCIM20h4oIP7ZZStN5g24yzQ",
  authDomain: "bibliotecalectura-f052e.firebaseapp.com",
  projectId: "bibliotecalectura-f052e",
  storageBucket: "bibliotecalectura-f052e.firebasestorage.app",
  messagingSenderId: "749652404747",
  appId: "1:749652404747:web:e579c9c354c48bdb6e350e"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;