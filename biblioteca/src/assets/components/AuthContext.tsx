/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, db } from "../components/Credenciales";
import { doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

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
  loading: boolean;
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
  const [loading, setLoading] = useState<boolean>(true);

  // Función para sincronizar datos del usuario en Firestore
  const syncUserData = async (currentUser: User) => {
    const userRef = doc(db, "datausers", currentUser.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      const newUser: FirestoreUser = {
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        createdAt: new Date(),
        librosSubidos: [],
      };
      await setDoc(userRef, newUser);
      console.log("Nuevo usuario creado en Firestore:", newUser);
    } else {
      await updateDoc(userRef, {
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      });
      console.log("Datos del usuario actualizados en Firestore.");
    }
  };

  // Función para manejar Google Sign-In
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
      setUser(loggedUser);

      // Sincronizar datos del usuario en Firestore
      await syncUserData(loggedUser);
    } catch (error) {
      console.error("Error en Google Sign-In:", (error as Error).message);
    }
  };

  // Función para cerrar sesión
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("Sesión cerrada.");
    } catch (error) {
      console.error("Error al cerrar sesión:", (error as Error).message);
    }
  };

  // Función para agregar un libro a Firestore
  const addLibro = async (libro: FirestoreUser["librosSubidos"][0]) => {
    if (!user) return; // Asegurar que haya un usuario autenticado
    try {
      const userRef = doc(db, "datausers", user.uid);
      await updateDoc(userRef, {
        librosSubidos: arrayUnion(libro), // Agregar libro a la colección del usuario
      });
      console.log("Libro agregado:", libro);
    } catch (error) {
      console.error("Error al agregar libro:", (error as Error).message);
    }
  };

  // Efecto para manejar cambios de autenticación y sincronización con Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await syncUserData(currentUser);
      }
      setUser(currentUser);
      setLoading(false); // Detener estado de carga
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, googleSignIn, logOut, addLibro }}>
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