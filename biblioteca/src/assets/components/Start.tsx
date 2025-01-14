import React from 'react';
import { useNavigate } from 'react-router-dom';



const Start: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Login'); // Redirige a la ruta "/login"
  };

  return (
    <div
    
      onClick={handleClick}
      style={{
        display: 'flex',
        cursor: 'pointer',
        width: '1147px',
      }}
    >       
            <img src={('https://res.cloudinary.com/anye/image/upload/v1734130135/EMPEZAR_odvdmd.png')} width={1140} height={750}/>
            
            
    </div>
  );
};

export default Start;