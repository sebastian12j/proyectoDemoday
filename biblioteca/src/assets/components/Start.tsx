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
        cursor: 'pointer'
      }}
   >
            <img src={('https://res.cloudinary.com/anye/image/upload/v1733525436/Vamos_bhrt3o.png')} width={150} border-radius={1000} />
    </div>
  );
};

export default Start;
