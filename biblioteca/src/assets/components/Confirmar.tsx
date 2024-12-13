import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updatePassword } from 'firebase/auth';

const Confirmar: React.FC = () => {
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updatePassword(user, password);
        localStorage.setItem('documentType', documentType);
        localStorage.setItem('documentNumber', documentNumber);
        alert('Confirmación exitosa');
        navigate('/inicio');
      } catch (error: any) {
        alert('Error al confirmar: ' + error.message);
      }
    } else {
      alert('No hay usuario autenticado');
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
        Confirmar Registro
      </h1>
      <div style={{ width: '1148px' }}>
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
        <label>Contraseña</label>
        <input
          type="password"
          style={inputStyle}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        style={{
          width: '200px',
          padding: '10px',
          backgroundColor: '#008037',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={handleConfirm}
      >
        CONFIRMAR
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

export default Confirmar;
