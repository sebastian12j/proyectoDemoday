import React, { useState } from 'react';

const Perfil: React.FC = () => {
  // Obtener la información almacenada en localStorage
  const storedEmail = localStorage.getItem('email');
  const storedDocumentType = localStorage.getItem('documentType');
  const storedDocumentNumber = localStorage.getItem('documentNumber');
  const storedPhotoURL = localStorage.getItem('photoURL');

  // Estados para la información del perfil
  const [email] = useState(storedEmail || '');
  const [documentType] = useState(storedDocumentType || '');
  const [documentNumber] = useState(storedDocumentNumber || '');
  const [photoURL, setPhotoURL] = useState(storedPhotoURL || '');
  const [newPhotoURL, setNewPhotoURL] = useState<string>('');

  // Manejar la carga de la imagen
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'lectura'); // Usa tu upload preset

      // Reemplaza "dzubhlegp" con tu Cloud Name de Cloudinary
      const response = await fetch('https://api.cloudinary.com/v1_1/dzubhlegp/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setNewPhotoURL(data.secure_url);
      } else {
        alert('Hubo un problema al cargar la imagen');
      }
    }
  };

  // Guardar los cambios
  const handleSaveChanges = () => {
    if (newPhotoURL) {
      setPhotoURL(newPhotoURL);
      localStorage.setItem('photoURL', newPhotoURL);
      alert('Cambios guardados exitosamente');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Cambiado para evitar que se amontonen los elementos
        height: '100vh',
        backgroundColor: '#d6dff2',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ color: '#3366ff', fontSize: '2.5rem', marginBottom: '20px' }}>
        Perfil
      </h1>
      {photoURL && (
        <img
          src={photoURL}
          alt="Foto de perfil"
          style={{ borderRadius: '50%', marginBottom: '20px', width: '150px', height: '150px' }}
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        style={{ marginBottom: '20px' }}
      />
      <div
        style={{
          position: 'absolute',  // Esto asegura que el botón quede fijo en la parte inferior
          bottom: '20px',  // Distancia desde el fondo de la página
        }}
      >
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
          }}
          onClick={handleSaveChanges}
        >
          Guardar cambios
        </button>
      </div>
      <div style={{ width: '600px', marginTop: '100px' }}>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Tipo de documento:</strong> {documentType}</p>
        <p><strong>Número de documento:</strong> {documentNumber}</p>
      </div>
    </div>
  );
};

export default Perfil;











