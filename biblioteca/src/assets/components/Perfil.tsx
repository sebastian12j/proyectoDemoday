import React, { useState } from "react";
import { FormStyle } from "./Styled";
import NavBar from "./NavBar";
import { Button } from "react-bootstrap";

const Perfil: React.FC = () => {
  // Obtener la información almacenada en localStorage
  const storedEmail = localStorage.getItem("email");
  const storedDocumentType = localStorage.getItem("documentType");
  const storedDocumentNumber = localStorage.getItem("documentNumber");
  const storedPhotoURL = localStorage.getItem("photoURL");

  // Estados para la información del perfil
  const [email] = useState(storedEmail || "");
  const [documentType] = useState(storedDocumentType || "");
  const [documentNumber] = useState(storedDocumentNumber || "");
  const [photoURL, setPhotoURL] = useState(storedPhotoURL || "");
  const [newPhotoURL, setNewPhotoURL] = useState<string>("");

  // Manejar la carga de la imagen
  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "lectura"); // Usa tu upload preset

      // Reemplaza "dzubhlegp" con tu Cloud Name de Cloudinary
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzubhlegp/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setNewPhotoURL(data.secure_url);
      } else {
        alert("Hubo un problema al cargar la imagen");
      }
    }
  };

  // Guardar los cambios
  const handleSaveChanges = () => {
    if (newPhotoURL) {
      setPhotoURL(newPhotoURL);
      localStorage.setItem("photoURL", newPhotoURL);
      alert("Cambios guardados exitosamente");
    }
  };

  return (
    <div>
      <NavBar /> 
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "94vh",
          background: "rgba(255, 255, 255, 0.5)",
          fontFamily: "Arial",
        }}
      >
        <h1
          style={{ color: "#5bc8ac", fontSize: "2.5rem", marginBottom: "20px" }}
        >
          Perfil
        </h1>
        {photoURL && (
          <img
            src={photoURL}
            alt="Foto de perfil"
            style={{
              borderRadius: "50%",
              marginBottom: "20px",
              width: "100px",
            }}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ marginBottom: "20px" }}
        />
        <div
          style={{
            position: "absolute", // Esto asegura que el botón quede fijo en la parte inferior
            bottom: "20px", // Distancia desde el fondo de la página
          }}
        >
          <Button
            style={{
              backgroundColor: "#5bc8ac",
            }}
            onClick={handleSaveChanges}
          >
            Guardar cambios
          </Button>
        </div>
        <div style={{ width: "600px", margin: "30px", marginTop: "80px" }}>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Tipo de documento:</strong> {documentType}
          </p>
          <p>
            <strong>Número de documento:</strong> {documentNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
