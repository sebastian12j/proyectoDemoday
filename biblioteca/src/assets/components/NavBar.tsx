import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore"; // Importar funciones de Firestore
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { db } from "../components/Credenciales";
import { NavBarContainer, PSaludo } from "../components/Styled";

import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Favorite, Home, Logout, Menu, Quiz, Sms } from "@mui/icons-material";

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

  const userType = localStorage.getItem( "tipoUsuario");

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  //*************Material UI**************** */
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, color: "#5bc8ac", textDecoration: "none" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Home style={{ color: "#5bc8ac", textDecoration: "none" }} />
            </ListItemIcon>
            <Link
              style={{ color: "#5bc8ac", textDecoration: "none" }}
              to="/inicio"
            >
              Inicio
            </Link>
          </ListItemButton>
        </ListItem>
        {userType === "docente" &&
          <>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Sms style={{ color: "#5bc8ac", textDecoration: "none" }} />
                </ListItemIcon>
                <Link
                  style={{ color: "#5bc8ac", textDecoration: "none" }}
                  to="/mensaje"
                >
                  Mensaje
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Quiz style={{ color: "#5bc8ac", textDecoration: "none" }} />
                </ListItemIcon>
                <Link
                  to="/subirdata"
                  style={{ color: "#5bc8ac", textDecoration: "none" }}
                >
                  Test
                </Link>
              </ListItemButton>
            </ListItem>
          </>}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Favorite style={{ color: "#5bc8ac", textDecoration: "none" }} />
            </ListItemIcon>

            <Link
              to="/perfil"
              style={{ color: "#5bc8ac", textDecoration: "none" }}
            >
              Perfil
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Logout style={{ color: "#5bc8ac", textDecoration: "none" }} />
            </ListItemIcon>
            <Link
              to="/login"
              style={{ color: "#5bc8ac", textDecoration: "none" }}
            >
              Salir
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
  return (
    <NavBarContainer>
      <div>
        <Button style={{ color: "#fff" }} onClick={toggleDrawer(true)}>
          <Menu />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
      <PSaludo>Hola, {user?.displayName || "Bienvenido"}</PSaludo>
    </NavBarContainer>
  );
}

export default NavBar;
// function setOpen(newOpen: boolean) {
//   throw new Error("Function not implemented.");
// }
