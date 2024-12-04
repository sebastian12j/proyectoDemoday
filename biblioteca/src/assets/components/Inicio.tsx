import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { NavBar } from "../components/NavBar";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import cuento1 from "../cuento1.jpg";
import cuento2 from "../cuento2.avif";
import cuento3 from "../cuento3.png";
import cuento4 from "../cuento4.jpeg";
import cuento5 from "../cuento5.jpg";
import cuento6 from "../cuento6.avif";
import cuento7 from "../cuento7.jpg";

interface Cuento {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
}

export function Inicio() {
  const cuentos: Cuento[] = [
    {
      id: 1,
      title: "Cuento 1",
      description: "Descripción detallada del cuento 1",
      imgUrl: cuento1,
    },
    {
      id: 2,
      title: "Cuento 2",
      description: "Descripción detallada del cuento 2",
      imgUrl: cuento2,
    },
    {
      id: 3,
      title: "Cuento 3",
      description: "Descripción detallada del cuento 3",
      imgUrl: cuento3,
    },
    {
      id: 4,
      title: "Cuento 4",
      description: "Descripción detallada del cuento 4",
      imgUrl: cuento4,
    },
    {
      id: 5,
      title: "Cuento 5",
      description: "Descripción detallada del cuento 5",
      imgUrl: cuento5,
    },
    {
      id: 6,
      title: "Cuento 6",
      description: "Descripción detallada del cuento 6",
      imgUrl: cuento6,
    },
    {
      id: 7,
      title: "Cuento 7",
      description: "Descripción detallada del cuento 7",
      imgUrl: cuento7,
    },
  ];

  const [selectedCuento, setSelectedCuento] = useState<Cuento | null>(null);

  const handleShowModal = (cuento: Cuento) => {
    setSelectedCuento(cuento);
  };

  const handleCloseModal = () => {
    setSelectedCuento(null);
  };

  useEffect(() => {
    console.log("Cuentos:", cuentos);
  }, []);

  return (
    <Container>
      <NavBar />

      <br />

      <Row>
        {cuentos.map((cuento) => (
          <Card
            key={cuento.id}
            title={cuento.title}
            description={cuento.description}
            imgUrl={cuento.imgUrl}
            onClick={() => handleShowModal(cuento)} // Manejo del clic en la tarjeta
          />
        ))}
      </Row>

      {/* Modal para mostrar detalles */}
      {selectedCuento && (
        <Modal
          show={true}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedCuento.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedCuento.imgUrl}
              alt={selectedCuento.title}
              style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
            />
            <p>{selectedCuento.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}
