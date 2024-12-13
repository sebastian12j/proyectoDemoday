import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

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
        cursor: 'pointer',
        backgroundColor: '#D9DBF1',
        width: '1147px',
        padding: '176px',
        flexWrap: 'wrap'
      }}
    >       
           
            <h1 style={{ color: '#ff3381', fontSize: '4rem', marginBottom: '10px' , letterSpacing: '0.3em' }}>
        READ
      </h1>
      <h1 style={{ color: '#00cc66', fontSize: '4rem', margin: '0', letterSpacing: '0.3em' }}>
        VAMOS
      </h1>
      <h1 style={{ color: '#ff9900', fontSize: '4rem', margin: '0', letterSpacing: '0.3em' }}>
        A
      </h1>
      <h1 style={{ color: '#3366ff', fontSize: '4rem', marginBottom: '20px', letterSpacing: '0.3em' }}>
        LEER
      </h1>
<button>Empezar</button>
            
    </div>
  );
};

export default Start;
