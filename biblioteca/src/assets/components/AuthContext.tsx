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

// Definición de la interfaz para el contexto
interface AuthContextType {
  user: User | null;
  googleSignIn: () => Promise<void>;
  logOut: () => Promise<void>;
  addExercise: (exercise: string) => Promise<void>;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definición de los props del proveedor
interface AuthProviderProps {
  children: ReactNode;
}

// Componente AuthProvider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = result.user;
      setUser(loggedUser);

      // Guardar usuario en Firestore
      const userDoc = {
        email: loggedUser.email,
        displayName: loggedUser.displayName,
        photoURL: loggedUser.photoURL,
        createdAt: new Date(),
        exercises: [] as string[], // Especificamos que es un array de strings
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

  const addExercise = async (exercise: string) => {
    if (!user) return; // Verificamos si hay un usuario autenticado
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        exercises: arrayUnion(exercise), // Agregamos el ejercicio al array
      });
      console.log("Ejercicio agregado:", exercise);
    } catch (error) {
      console.error("Error al agregar ejercicio:", (error as Error).message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, addExercise }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
