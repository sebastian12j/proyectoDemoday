import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { NavBar } from "../components/NavBar";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import cuento1 from "../img/4ffe1843c747237394cbb8ad9b0940f5.jpg";
import cuento2 from "../img/4a6a2dc0d4dab9552551d4ad80b747ed.jpg";
import cuento3 from "../img/75e60b92c1424cdb758b9d527d649cb0.jpg";
import cuento4 from "../img/6fcc5111528114f49346df8e8a2a2a83.jpg";
import cuento5 from "../img/6f189f94a57aa2a6b8f1b63e496afd29.jpg";
import cuento6 from "../img/5e68d6a621886ba8bc7d9f40c6734d6d.jpg";
import cuento7 from "../img/9169bb0307a7508d54e6356f266eb8fe.jpg";
import cuento8 from "../img/b8559d8607745ef533226eb7059c935e.jpg"

interface Cuento {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
}

export function Inicio() {
  const cuentos: Cuento[] = [
    {
      "id": 1,
      "title": "A Margarita Debayle",
      "description": "Un poema de Rubén Darío dedicado a una niña llamada Margarita Debayle. En el poema, Darío describe la inocencia y la belleza de Margarita, comparándola con una estrella que ella desea alcanzar. La obra resalta la pureza y los sueños de la infancia, y cómo estos pueden inspirar a los adultos.",
      imgUrl: cuento1,
    },
    {
      id: 2,
      "title": "Alicia en el País de las Maravillas",
      "description": "Una novela de Lewis Carroll que narra las aventuras de una niña llamada Alicia en un mundo fantástico. Tras caer por una madriguera de conejo, Alicia se encuentra en un lugar lleno de personajes extraños y situaciones absurdas. La historia explora temas como la lógica, la identidad y la curiosidad infantil.",
      imgUrl: cuento2,
    },
    {
      id: 3,
      "title": "A Través del Espejo",
      "description": "La secuela de 'Alicia en el País de las Maravillas', donde Alicia atraviesa un espejo y encuentra un mundo al revés. En este nuevo mundo, las reglas son diferentes y Alicia se encuentra con personajes como Tweedledum y Tweedledee, y las reinas Roja y Blanca. La historia utiliza el ajedrez como una metáfora para explorar temas de identidad y cambio.",
      imgUrl: cuento3,
    },
    {
      id: 4,
      "title": "Las aventuras de Pinocho",
      "description": "La historia de un muñeco de madera que cobra vida y sueña con convertirse en un niño de verdad. Pinocho, creado por Gepetto, pasa por diversas aventuras y aprende lecciones importantes sobre la honestidad y la responsabilidad. Cada vez que miente, su nariz crece, lo que simboliza las consecuencias de no decir la verdad.",
      imgUrl: cuento4,
    },
    {
      id: 5,
      "title": "La Bella y la Bestia",
      "description": "Un cuento de hadas sobre una joven llamada Bella que se enamora de una bestia que en realidad es un príncipe encantado. A través de su amor y aceptación, Bella rompe el hechizo que mantiene al príncipe en su forma bestial. La historia destaca temas como la belleza interior y el poder transformador del amor verdadero.",
      imgUrl: cuento5,
    },
    {
      id: 6,
      "title": "Blancanieves",
      "description": "Un cuento de hadas sobre una princesa que es envenenada por su madrastra celosa y salvada por un príncipe. Blancanieves, conocida por su belleza y bondad, se refugia con siete enanitos en el bosque. La historia aborda temas de envidia, belleza y redención.",
      imgUrl: cuento6,
    },
    {
      id: 7,
      "title": "La Bella Durmiente del Bosque",
      "description": "Un cuento de hadas sobre una princesa que cae en un sueño profundo debido a una maldición de una hada malvada. La princesa es despertada por el beso de un príncipe, rompiendo así la maldición. La historia simboliza la espera del amor verdadero y la lucha entre el bien y el mal.",
      imgUrl: cuento7,
    },
    {
      id: 8,
      "title": "El Gato con Botas",
      "description": "Un cuento de hadas sobre un gato astuto que usa su ingenio para traer fortuna a su amo. A través de sus engaños y estrategias, el gato logra que su amo obtenga riqueza y un título nobiliario. La historia destaca la inteligencia y la astucia como herramientas para superar las adversidades.",
      imgUrl: cuento8,
    }
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

      <Row style={{display: "flex", flexWrap: "wrap"}}>
        {cuentos.map((cuento) => (
          <Card
            key={cuento.id}
            title={cuento.title}
            description={cuento.description}
            imgUrl={cuento.imgUrl}
            onClick={() => handleShowModal(cuento)} 
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
          <Modal.Header >
            <Modal.Title>{selectedCuento.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedCuento.imgUrl}
              alt={selectedCuento.title}
              style={{ width: "50%", height: "auto", marginBottom: "1rem" }}
            />
            <p>{selectedCuento.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal} className="cerrar">
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}
