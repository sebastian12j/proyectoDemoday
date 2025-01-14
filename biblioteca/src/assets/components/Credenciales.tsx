import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Importa Firestore


const firebaseConfig = {
  apiKey: "AIzaSyBVsNPRNkkZCIM20h4oIP7ZZStN5g24yzQ",
  authDomain: "bibliotecalectura-f052e.firebaseapp.com",
  projectId: "bibliotecalectura-f052e",
  storageBucket: "bibliotecalectura-f052e.firebasestorage.app",
  messagingSenderId: "749652404747",
  appId: "1:749652404747:web:e579c9c354c48bdb6e350e"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 