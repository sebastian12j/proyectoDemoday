import { useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "./Credenciales";
import {  FormStyle } from "./Styled";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";



interface Pregunta {
  pregunta: string;
  opciones: { texto: string; esCorrecta: boolean }[];
}

interface LibroData {
  id: number;
  nombre: string;
  resumen: string;
  imgUrl: string;
  preguntas: Pregunta[];
  link: string;
}

export function SubirData() {
  const { user } = useAuth();
  const [libroData, setLibroData] = useState<LibroData>({
    id: Date.now(),
    nombre: "",
    resumen: "",
    imgUrl: "",
    preguntas: [],
    link: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setLibroData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPregunta = (): void => {
    setLibroData((prevData) => ({
      ...prevData,
      preguntas: [
        ...prevData.preguntas,
        { pregunta: "", opciones: Array(3).fill({ texto: "", esCorrecta: false }) },
      ],
    }));
  };

  const handlePreguntaChange = (
    index: number,
    key: keyof Pregunta,
    value: string
  ): void => {
    const updatedPreguntas = libroData.preguntas.map((preg, i) =>
      i === index ? { ...preg, [key]: value } : preg
    );
    setLibroData((prevData) => ({
      ...prevData,
      preguntas: updatedPreguntas,
    }));
  };

  const handleOpcionChange = (
    preguntaIndex: number,
    opcionIndex: number,
    key: "texto" | "esCorrecta",
    value: string | boolean
  ): void => {
    const updatedPreguntas = libroData.preguntas.map((preg, i) => {
      if (i === preguntaIndex) {
        const updatedOpciones = preg.opciones.map((opcion, j) =>
          j === opcionIndex ? { ...opcion, [key]: value } : opcion
        );
        return { ...preg, opciones: updatedOpciones };
      }
      return preg;
    });

    setLibroData((prevData) => ({
      ...prevData,
      preguntas: updatedPreguntas,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!libroData.nombre || !libroData.resumen || !libroData.imgUrl || !libroData.link) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      return;
    }

    if (!user) {
      Swal.fire("Error", "Debes iniciar sesión para subir un libro.", "error");
      return;
    }

    try {
      const librosCollectionRef = collection(db, "libros");
      await addDoc(librosCollectionRef, {
        ...libroData,
        userId: user.uid,
      });

      Swal.fire("¡Éxito!", "El libro se agregó correctamente.", "success");
      setLibroData({
        id: Date.now(),
        nombre: "",
        resumen: "",
        imgUrl: "",
        preguntas: [],
        link: "",
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo agregar el libro. Intenta de nuevo.", "error");
      console.error("Error al subir libro:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "600px",
          height: "100vh",
          background: "rgba(255, 255, 255, 0.3)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 style={{ fontFamily: "arial", color: "#5bc8ac" }}>Subir Libro</h1>
        <FormStyle onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del libro"
            value={libroData.nombre || ""}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          />
          <textarea
            name="resumen"
            placeholder="Resumen"
            value={libroData.resumen || ""}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: "pointer",
              fontFamily: "arial",
            }}
          />
          <input
            type="text"
            name="imgUrl"
            placeholder="URL de la imagen"
            value={libroData.imgUrl || ""}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          />
          <input
            type="text"
            name="link"
            placeholder="Enlace al libro"
            value={libroData.link || ""}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          />
          <Button type="button" onClick={() => setShowModal(true)}>
            Agregar Preguntas
          </Button>

          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>Preguntas y Respuestas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {libroData.preguntas.map((preg, index) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder={`Pregunta ${index + 1}`}
                    value={preg.pregunta || ""}
                    onChange={(e) =>
                      handlePreguntaChange(index, "pregunta", e.target.value)
                    }
                    required
                    style={{
                      padding: "10px",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                      wordSpacing: "25px",
                    }}
                  />
                  {preg.opciones.map((opcion, opcionIndex) => (
                    <div key={opcionIndex}>
                      <input
                        type="text"
                        placeholder={`Opción ${opcionIndex + 1}`}
                        value={opcion.texto || ""}
                        onChange={(e) =>
                          handleOpcionChange(
                            index,
                            opcionIndex,
                            "texto",
                            e.target.value
                          )
                        }
                        required
                        style={{
                          padding: "10px",
                          border: "none",
                          borderRadius: "5px",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                      />
                      <label>
                        <input
                          type="radio"
                          name={`correcta-${index}`}
                          checked={opcion.esCorrecta}
                          onChange={() =>
                            handleOpcionChange(
                              index,
                              opcionIndex,
                              "esCorrecta",
                              true
                            )
                          }
                        />
                        Correcta
                      </label>
                    </div>
                  ))}
                </div>
              ))}
              <Button
                style={{ background: "#5bc8ac" }}
                onClick={handleAddPregunta}
              >
                Agregar pregunta
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>

          <Button style={{ background: "#5bc8ac" }} type="submit">
            Subir
          </Button>
        </FormStyle>
      </div>
    </>
  );
}