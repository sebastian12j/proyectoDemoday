import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, db } from "../components/Credenciales";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

interface FirestoreUser {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  librosSubidos: {
    id: number;
    nombre: string;
    resumen: string;
    imgUrl: string;
    preguntas: string[];
    respuestas: string[];
    link: string;
  }[];
}

interface AuthContextType {
  user: User | null;
  googleSignIn: () => Promise<void>;
  logOut: () => Promise<void>;
  addLibro: (libro: FirestoreUser["librosSubidos"][0]) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
      setUser(loggedUser);

      
      const userDoc: FirestoreUser = {
        email: loggedUser.email,
        displayName: loggedUser.displayName,
        photoURL: loggedUser.photoURL,
        createdAt: new Date(),
        librosSubidos: [],
      };

      await setDoc(doc(db, "users", loggedUser.uid), userDoc, { merge: true });
      console.log("Usuario guardado en Firestore:", userDoc);
    } catch (error) {
      console.error("Error en Google Sign-In:", (error as Error).message);
    }
  };

  
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("Sesión cerrada.");
    } catch (error) {
      console.error("Error al cerrar sesión:", (error as Error).message);
    }
  };

  
  const addLibro = async (libro: FirestoreUser["librosSubidos"][0]) => {
    if (!user) return; 
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        librosSubidos: arrayUnion(libro), 
      });
      console.log("Libro agregado:", libro);
    } catch (error) {
      console.error("Error al agregar libro:", (error as Error).message);
    }
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, addLibro }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};