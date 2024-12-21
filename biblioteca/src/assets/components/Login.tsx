
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './Credenciales'; // Asegúrate de que esta sea la ruta correcta a tu archivo de credenciales
import Swal from "sweetalert2";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const isConfirmed = localStorage.getItem('isConfirmed');
    if (isConfirmed === 'true') {
      // No redirigir automáticamente a perfil, solo guardar el estado
    }
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem('email', email);
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('tipoUsuario', userData.userType);

        if (userData.userType === 'docente') {
          alert('Inicio de sesión exitoso como Docente');
          navigate('/docentes');
        } else {
          // Crear datos de estudiante si no existen
          await createDataUserIfNotExists(user);
          alert('Inicio de sesión exitoso como Estudiante');
          navigate('/inicio');
        }
      } else {
        alert('No se encontró el usuario en la base de datos');
      }
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        alert('Debes registrarte para iniciar sesión');
      } else {
        alert('Error al iniciar sesión: ' + error.message);
      }
    }
  };

  const createDataUserIfNotExists = async (user: any) => {
    try {
      const userDocRef = doc(db, "datausers", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Crear datos de estudiante
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email || "No especificado",
          displayName: user.displayName || "Usuario Anónimo",
          photoURL: user.photoURL || null,
          libroId: null,
          nombreLibro: null,
          resultadosExamenes: [],
          createdAt: new Date().toISOString(),
        });
        console.log("Documento creado en la colección 'datausers'.");
      }
    } catch (error: any) {
      console.error("Error al crear el documento en 'datausers':", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem('email', user.email || '');
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('photoURL', user.photoURL || '');
        localStorage.setItem('tipoUsuario', userData.userType);

        if (userData.userType === 'docente') {
          localStorage.setItem('tipoUsuario', "docente");
          alert('Inicio de sesión con Google exitoso como Docente');
          navigate('/docentes');
        } else {
          await createDataUserIfNotExists(user);
          localStorage.setItem('tipoUsuario', "estudiante");
          alert('Inicio de sesión con Google exitoso como Estudiante');
          navigate('/inicio');
        }
      } else {
        alert('No se encontró el usuario en la base de datos');
      }
    } catch (error: any) {
      alert('Error al iniciar sesión con Google: ' + error.message);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem('email', user.email || '');
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('photoURL', user.photoURL || '');
        localStorage.setItem('tipoUsuario', userData.userType);

        if (userData.userType === 'docente') {
          alert('Inicio de sesión con Facebook exitoso como Docente');
          navigate('/docentes');
        } else {
          await createDataUserIfNotExists(user);
          alert('Inicio de sesión con Facebook exitoso como Estudiante');
          navigate('/inicio');
        }
      } else {
        alert('No se encontró el usuario en la base de datos');
      }
    } catch (error: any) {
      alert('Error al iniciar sesión con Facebook: ' + error.message);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/registro');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d6dff299',
        fontFamily: 'Arial',
      }}
    >
      <h1 style={{ color: '#ff3381', fontSize: '2.5rem', marginBottom: '10px', fontFamily: 'cursive' }}>READ</h1>
      <h1 style={{ color: '#00cc66', fontSize: '2rem', margin: '0', fontFamily: 'cursive' }}>VAMOS</h1>
      <h1 style={{ color: '#ff9900', fontSize: '2rem', margin: '0', fontFamily: 'cursive' }}>A</h1>
      <h1 style={{ color: '#3366ff', fontSize: '2rem', marginBottom: '20px', fontFamily: 'cursive' }}>LEER</h1>

      <div style={{ width: '400px' }}>
        <label>Email</label>
        <input
          type="email"
          style={inputStyle}
          placeholder="Ingrese su email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Contraseña</label>
        <input
          type="password"
          style={inputStyle}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>Haz olvidado tu contraseña</p>
      <p style={{ fontSize: '0.9rem' }}>
        No tienes cuenta{' '}
        <a href="#" style={{ color: '#008037', fontSize: '0.9rem' }} onClick={handleRegisterRedirect}>
          Registrarse
        </a>
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <div style={{ ...iconStyle, backgroundColor: '#3b5998' }} onClick={handleFacebookLogin}>
          F
        </div>
        <div style={{ ...iconStyle, backgroundColor: '#db4437' }} onClick={handleGoogleLogin}>
          ✉
        </div>
      </div>

      <button
        style={{
          width: '200px',
          padding: '10px',
          backgroundColor: '#008037',
          color: 'white',
          border: 'none',
          borderRadius: '15px',
          fontSize: '1.2rem',
          cursor: 'pointer',
        }}
        onClick={handleLogin}
      >
        INGRESAR
      </button>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const iconStyle: React.CSSProperties = {
  width: '50px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  borderRadius: '50%',
  margin: '0 10px',
  fontSize: '1.5rem',
  cursor: 'pointer',
};

export default Login;