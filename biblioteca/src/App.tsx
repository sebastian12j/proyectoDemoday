import { Routes, Route, Navigate } from "react-router-dom";
import Correo from "./assets/components/Correo";
import Mensaje from "./assets/components/Mensaje";
import Start from "./assets/components/Start";
import Login from "./assets/components/Login";
import Registro from "./assets/components/Registro";
import Confirmar from "./assets/components/Confirmar";
import { Inicio } from "./assets/components/Inicio";
import { SubirData } from "./assets/components/SubirData";
import Perfil from "./assets/components/Perfil";
import { useAuth } from "./assets/components/AuthContext";
import Docentes from "./assets/components/Docentes";
import Navbar from "./assets/components/NavBar";

interface RequireAuthProps {
  children: JSX.Element;
}

function RequireAuth({ children }: RequireAuthProps): JSX.Element {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

const AppWithoutOutlet: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      {user && <Navbar />}

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas protegidas */}
        <Route
          path="/perfil"
          element={
            <RequireAuth>
              <Perfil />
            </RequireAuth>
          }
        />
        <Route
          path="/inicio"
          element={
            <RequireAuth>
              <Inicio />
            </RequireAuth>
          }
        />
        <Route
          path="/confirmar"
          element={
            <RequireAuth>
              <Confirmar />
            </RequireAuth>
          }
        />
        <Route
          path="/docentes"
          element={
            <RequireAuth>
              <Docentes />
            </RequireAuth>
          }
        />
        <Route
          path="/correo"
          element={
            <RequireAuth>
              <Correo />
            </RequireAuth>
          }
        />
        <Route
          path="/mensaje"
          element={
            <RequireAuth>
              <Mensaje />
            </RequireAuth>
          }
        />
        <Route
          path="/subirdata"
          element={
            <RequireAuth>
              <SubirData />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default AppWithoutOutlet;