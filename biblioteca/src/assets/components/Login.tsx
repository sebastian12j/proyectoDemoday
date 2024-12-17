import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';

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
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('email', email); // Guardar el email en localStorage
      alert('Inicio de sesión exitoso');
      navigate('/inicio');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        alert('Debes registrarte para iniciar sesión');
      } else {
        alert('Error al iniciar sesión: ' + error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('email', user.email || '');
      localStorage.setItem('photoURL', user.photoURL || '');
      alert('Inicio de sesión con Google exitoso');
      navigate('/inicio');
    } catch (error) {
      alert('Error al iniciar sesión con Google: ' + error.message);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('email', user.email || '');
      localStorage.setItem('photoURL', user.photoURL || '');
      alert('Inicio de sesión con Facebook exitoso');
      navigate('/inicio');
    } catch (error) {
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
        // height: '100vh',
        backgroundColor: '#d6dff2',
        fontFamily: 'Arial',
      }}
    >
      {/* Título */}
      <h1 style={{ color: '#ff3381', fontSize: '2.5rem', marginBottom: '10px', fontFamily: 'cursive' }}>
        READ
      </h1>
      <h1 style={{ color: '#00cc66', fontSize: '2rem', margin: '0', fontFamily: 'cursive' }}>
        VAMOS
      </h1>
      <h1 style={{ color: '#ff9900', fontSize: '2rem', margin: '0', fontFamily: 'cursive' }}>
        A
      </h1>
      <h1 style={{ color: '#3366ff', fontSize: '2rem', marginBottom: '20px', fontFamily: 'cursive' }}>
        LEER
      </h1>

      {/* Formulario */}
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

      {/* Opciones */}
      <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
        Haz olvidado tu contraseña
      </p>
      <p style={{ fontSize: '0.9rem' }}>
        No tienes cuenta <a href="#" style={{ color: '#008037', fontSize: '0.9rem' }} onClick={handleRegisterRedirect}>Registrarse</a>
      </p>

      {/* Redes Sociales */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <div style={{ ...iconStyle, backgroundColor: '#3b5998' }} onClick={handleFacebookLogin}>F</div>
        <div style={{ ...iconStyle, backgroundColor: '#db4437' }} onClick={handleGoogleLogin}>✉</div>
      </div>

      {/* Botón */}
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

// Estilos reutilizables
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





