import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Importa Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCpB3hmyvMw51iEO9pATRiGLME1huI7OPA",
  authDomain: "gymmio-51e21.firebaseapp.com",
  projectId: "gymmio-51e21",
  storageBucket: "gymmio-51e21.firebasestorage.app",
  messagingSenderId: "233711884383",
  appId: "1:233711884383:web:2fb858be2c08cbaee6a3ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- Exporta Firestore
export default app;