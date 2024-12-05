import React from 'react';
import { useNavigate } from 'react-router-dom';

const Start: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login'); // Redirige a la ruta "/login"
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        cursor: 'pointer',
        backgroundColor: '#f5f5f5'
      }}
    >
      <h1>READ VAMOS A LEER</h1>
    </div>
  );
};

export default Start;
