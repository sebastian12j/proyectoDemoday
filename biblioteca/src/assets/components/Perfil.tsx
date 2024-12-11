import React from 'react';

const Perfil: React.FC = () => {
  // Obtener la información almacenada en localStorage
  const email = localStorage.getItem('email');
  const documentType = localStorage.getItem('documentType');
  const documentNumber = localStorage.getItem('documentNumber');
  const photoURL = localStorage.getItem('photoURL');

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
        Perfil
      </h1>
      {photoURL && <img src={photoURL} alt="Foto de perfil" style={{ borderRadius: '50%', marginBottom: '20px' }} />}
      <div style={{ width: '300px' }}>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Tipo de documento:</strong> {documentType}</p>
        <p><strong>Número de documento:</strong> {documentNumber}</p>
      </div>
    </div>
  );
};

export default Perfil;