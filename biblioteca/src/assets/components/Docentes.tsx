import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/Credenciales";
import { getAuth } from "firebase/auth";
import { Container, Row, Col, Card, Form } from "react-bootstrap";

const librosRef = collection(db, "libros");

interface Respuesta {
  uid: string;
  displayName: string;
  email: string;
  resultadosExamenes: {
    libroId: string;
    nombreLibro: string;
    totalPreguntas: number;
    puntuacion: number;
    tiempoRestante: number;
    fecha: string;
  }[];
  [key: string]: any;
}

const estilos = {
  container: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
  },
  card: {
    border: "1px solid #e3e3e3",
    borderRadius: "10px",
    transition: "transform 0.2s ease-in-out",
    height: "100%",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  loadingText: {
    textAlign: "center" as "center",
    fontSize: "1.2rem" as "1.2rem",
  },
  errorText: {
    textAlign: "center" as "center",
    fontSize: "1.2rem" as "1.2rem",
  },
  selectUser: {
    width: "50%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
  },
  summary: {
    backgroundColor: "#e9ecef",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
};

const Docentes: React.FC = () => {
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("displayName");
  const [libros, setLibros] = useState<any[]>([]);

  useEffect(() => {
    const fetchDatos = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        setError("Debes iniciar sesión para ver esta información.");
        setLoading(false);
        return;
      }

      try {
        const querySnapshotLibros = await getDocs(librosRef);
        const librosData = querySnapshotLibros.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLibros(librosData);

        const respuestasRef = collection(db, "datausers");
        const querySnapshotRespuestas = await getDocs(respuestasRef);
        const respuestasData = querySnapshotRespuestas.docs.map((doc) => ({
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        }));

        setRespuestas(respuestasData as unknown as Respuesta[]);

        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("Hubo un error al obtener los datos.");
        setLoading(false);
      }
    };

    fetchDatos();
  }, []);

  const obtenerNombreLibro = (libroId: string) => {
    const libro = libros.find((libro) => libro.id === libroId);
    return libro ? libro.nombre : "Libro no encontrado";
  };

  const filteredRespuestas = respuestas.filter((respuesta) => {
    const term = searchTerm.toLowerCase();
    if (filterBy === "displayName") {
      return respuesta.displayName?.toLowerCase().includes(term);
    }
    if (filterBy === "email") {
      return respuesta.email?.toLowerCase().includes(term);
    }
    if (filterBy === "nombreLibro") {
      return respuesta.resultadosExamenes?.some((examen) =>
        obtenerNombreLibro(examen.libroId).toLowerCase().includes(term)
      );
    }
    return false;
  });

  if (loading) return <p style={estilos.loadingText}>Cargando respuestas...</p>;
  if (error) return <p style={estilos.errorText}>{error}</p>;

  return (
    <Container style={estilos.container}>
      <h1 className="my-4 text-center">Respuestas de los Estudiantes</h1>
      <Form.Group controlId="searchInput" style={estilos.selectUser}>
        <Form.Label>Buscar por:</Form.Label>
        <Form.Control
          as="select"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="displayName">Nombre</option>
          <option value="email">Correo</option>
          <option value="nombreLibro">Nombre del Libro</option>
        </Form.Control>
        <Form.Control
          type="text"
          placeholder="Escribe para buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Row className="mt-4">
        {filteredRespuestas.map((respuesta, index) => (
          <Col key={index} md={6} lg={3} className="mb-4 d-flex">
            <Card
              style={estilos.card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Card.Body>
                <Card.Title style={estilos.cardTitle}>
                  Usuario: {respuesta.displayName || "Desconocido"}
                </Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {respuesta.email || "No disponible"}
                </Card.Text>
                {respuesta.resultadosExamenes?.map((examen, idx) => (
                  <div key={idx} style={estilos.summary}>
                    <p>
                      <strong>Nombre del Libro:</strong>{" "}
                      {obtenerNombreLibro(examen.libroId)}
                    </p>
                    <p>
                      <strong>Total Preguntas:</strong> {examen.totalPreguntas}
                    </p>
                    <p>
                      <strong>Puntuación:</strong> {examen.puntuacion}
                    </p>
                    <p>
                      <strong>Fecha:</strong>{" "}
                      {new Date(examen.fecha).toLocaleString()}
                    </p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Docentes;
