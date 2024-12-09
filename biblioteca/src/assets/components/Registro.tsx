import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const Registro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('documentType', documentType);
      localStorage.setItem('documentNumber', documentNumber);
      alert('Registro exitoso');
      navigate('/perfil');
    } catch (error: any) {
      alert('Error al registrarse: ' + error.message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#d6dff2',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ color: '#3366ff', fontSize: '2.5rem', marginBottom: '20px' }}>
        Registro
      </h1>
      <div style={{ width: '300px' }}>
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

        {/* <select name="select" id="tipoId" class="input1" style="height: 60px;" onclick="hideShowCtrl()">
    <option value="CC" selected="">Cedula de cuidadania</option>
    <option value="TI" selected="">Tarjeta de identidad</option>
    <option value="P" selected="">Pasaporte</option>
    </select> */}

        <label>Número de documento</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="Ingrese su número de documento"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
        />
      </div>
      <button
        style={{
          width: '200px',
          padding: '10px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={handleRegister}
      >
        REGISTRARSE
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

export default Registro;

