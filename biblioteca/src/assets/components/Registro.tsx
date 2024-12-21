import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './Credenciales'; // Asegúrate de que esta sea la ruta correcta a tu archivo de credenciales

const Registro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [userType, setUserType] = useState('estudiante'); // Por defecto "estudiante"
  const auth = getAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Registrar al usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar los datos adicionales en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        documentType: documentType,
        documentNumber: documentNumber,
        userType: userType,
        photoURL: user.photoURL || '',
      });

      alert('Registro exitoso');

      // Redirigir según el tipo de usuario
      if (userType === 'docente') {
        localStorage.setItem('tipoUsuario', "docente");
        navigate('/docentes'); // Redirige a la página de docentes
      } else {
        localStorage.setItem('tipoUsuario', "estudiante");
        navigate('/inicio'); // Redirige a la página de inicio para estudiantes
      }
    } catch (error: any) {
      alert('Error al registrarse: ' + error.message);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // Si el usuario no existe en la base de datos, crear un nuevo documento
        await setDoc(userDocRef, {
          email: user.email,
          userType: userType, // Asumimos que los usuarios registrados con Google son estudiantes por defecto
          photoURL: user.photoURL || '',
        });
      }
      
      localStorage.setItem('email', user.email || '');
      localStorage.setItem('uid', user.uid);
      localStorage.setItem('photoURL', user.photoURL || '');
      localStorage.setItem('tipoUsuario', userType);

      alert('Registro con Google exitoso');
      if (userType === 'docente') {
        navigate('/docentes'); // Redirige a la página de docentes
      } else {
        navigate('/inicio'); // Redirige a la página de inicio para estudiantes
      }
    } catch (error) {
      alert('Error al registrarse con Google: ' + (error as any).message);
    }
  };

  const handleFacebookRegister = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // Si el usuario no existe en la base de datos, crear un nuevo documento
        await setDoc(userDocRef, {
          email: user.email,
          userType: userType, // Asumimos que los usuarios registrados con Facebook son estudiantes por defecto
          photoURL: user.photoURL || '',
        });
      }
      
      localStorage.setItem('email', user.email || '');
      localStorage.setItem('uid', user.uid);
      localStorage.setItem('photoURL', user.photoURL || '');
      localStorage.setItem('tipoUsuario', userType);

      alert('Registro con Facebook exitoso');
      if (userType === 'docente') {
        navigate('/docentes'); // Redirige a la página de docentes
      } else {
        navigate('/inicio'); // Redirige a la página de inicio para estudiantes
      }
    } catch (error) {
      alert('Error al registrarse con Facebook: ' + (error as any).message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px',
        backgroundColor: '#d6dff28f',
        fontFamily: 'Arial',
      }}
    >
      <h1 style={{ color: '#3366ff', fontSize: '2.5rem', marginBottom: '70px', fontFamily: 'cursive' }}>
        Registro
      </h1>
      <div style={{ width: '250px' }}>
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
        <label>Tipo de documento</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Ingrese su tipo de documento"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        />
        <label>Número de documento</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Ingrese su número de documento"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
        />
        <label>Tipo de usuario</label>
        <select
          style={inputStyle}
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
        </select>
      </div>
      <button
        style={{
          width: '200px',
          padding: '10px',
          backgroundColor: '#008037',
          color: 'white',
          border: 'none',
          borderRadius: '17px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={handleRegister}
      >
        REGISTRARSE
      </button>

      {/* Botones de redes sociales */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <div style={{ ...iconStyle, backgroundColor: '#3b5998' }} onClick={handleFacebookRegister}>F</div>
        <div style={{ ...iconStyle, backgroundColor: '#db4437' }} onClick={handleGoogleRegister}>✉</div>
      </div>
    </div>
  );
};

// Estilos reutilizables
const inputStyle: React.CSSProperties = {
  width: '98%',
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

export default Registro;





