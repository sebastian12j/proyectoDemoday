import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore"; // Importar funciones de Firestore
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Contexto de autenticación
import { db } from "../components/Credenciales"; // Conexión a Firestore

import imagenes from "../img/images.jpeg";

// interface User {
//   photoURL: string;
// }

export function NavBar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setPhotoURL(data.photoURL || null);
        } else {
          console.log("El documento del usuario no existe.");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <div className="nad">
      <div className="todoo">
        <button className="abrir-menu" onClick={openMenu}>
          <img
            className="imagenes-perfil"
            src={photoURL || imagenes}
            alt="Abrir menú"
          />
        </button>

        {/* Menú desplegable */}
        <div className={`menu ${menuVisible ? "visible" : ""}`}>
          <button className="cerrar-menu" onClick={closeMenu}>
            <img className="imagenes-perfil" src={imagenes} alt="Cerrar menú" />
          </button>

          <ul className="menu-list">
            <li>
              <Link to="/perfil">Perfil</Link>
            </li>

            <li>
              <Link to="/test">Test</Link>
            </li>

            <li>
              <Link to="/favoritos">Favoritos</Link>
            </li>

            <li>
              <Link to="/calificaciones">Calificaciones</Link>
            </li>

            <li>
              <Link to="/inicio">Inicio</Link>
            </li>
          </ul>
        </div>

        {/* Saludo y nombre */}
        <p>Hi</p>
        <p>{user?.displayName || "Usuario"}</p>
      </div>
    </div>
  );
}

export default NavBar;
