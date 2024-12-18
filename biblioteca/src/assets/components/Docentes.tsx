import React from 'react';

const Docentes: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ color: '#3366ff', fontSize: '2.5rem', marginBottom: '20px' }}>
        Bienvenido, Docente
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#333' }}>
        Esta es la página de inicio para docentes.
      </p>
    </div>
  );
};

export default Docentes;
