import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { NavBar } from "../components/NavBar";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { db } from "../components/Credenciales";
import { collection, getDocs } from "firebase/firestore";
import Examen from "../components/Examen";

interface LibroData {
  id: string;
  nombre: string;
  resumen: string;
  imgUrl: string;
  link: string;
  preguntas: string[];
}

export function Inicio() {
  const [selectedCuento, setSelectedCuento] = useState<LibroData | null>(null);
  const [libroData, setLibroData] = useState<LibroData[]>([]);
  const [showExamenModal, setShowExamenModal] = useState(false);
  const [selectedLibroId, setSelectedLibroId] = useState<string | null>(null);

  const handleShowModal = (cuento: LibroData) => {
    setSelectedCuento(cuento);
  };

  const handleCloseModal = () => {
    setSelectedCuento(null);
  };

  const handleShowExamenModal = (libroId: string) => {
    setSelectedLibroId(libroId);
    setShowExamenModal(true);
  };

  const handleCloseExamenModal = () => {
    setSelectedLibroId(null);
    setShowExamenModal(false);
  };

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const librosCollectionRef = collection(db, "libros");
        const librosSnapshot = await getDocs(librosCollectionRef);

        const librosData = librosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as LibroData[];

        setLibroData(librosData);
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    };

    fetchLibros();
  }, []);

  return (
    <Container>
      <NavBar />

      <br />

      <Row>
        {libroData.map((cuento) => (
          <Card
            key={cuento.id}
            title={cuento.nombre}
            description={cuento.resumen}
            imgUrl={cuento.imgUrl}
            onClick={() => handleShowModal(cuento)}
          />
        ))}
      </Row>

      {selectedCuento && (
        <Modal
          className="conteiner-modal"
          show={true}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="conteiner-modal-header">
            <Modal.Title>{selectedCuento.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="conteiner-modal-body">
            <img
              src={selectedCuento.imgUrl}
              alt={selectedCuento.nombre}
              className="conteiner-modal-image"
            />
            <p className="conteiner-modal-text">{selectedCuento.resumen}</p>
          </Modal.Body>
          <Modal.Footer className="custom-modal-footer">
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              className="modal-close-button"
            >
              Cerrar
            </Button>
            <Button variant="primary" className="modal-link-button">
              <a
                href={selectedCuento.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Leer más
              </a>
            </Button>
            <Button
              variant="primary"
              className="modal-preguntas-button"
              onClick={() => handleShowExamenModal(selectedCuento.id)}
            >
              Preguntas
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal
        show={showExamenModal}
        onHide={handleCloseExamenModal}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cuestionario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLibroId && <Examen libroId={selectedLibroId} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExamenModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}