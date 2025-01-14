import React, { useRef, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import emailjs from "emailjs-com";

const Correo: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);

  const enviarEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsSending(true); // Mostrar indicador de envío

    try {
      const res = await emailjs.sendForm(
        "service_8fzhazk",
        "template_sp9u4ir",
        formRef.current,
        "lC8ihoaUej2s_x2Js"
      );
      console.log("Correo enviado exitosamente:", res);
      alert("Correo enviado exitosamente.");
      formRef.current.reset(); // Limpiar formulario
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Hubo un error al enviar el correo.");
    } finally {
      setIsSending(false); // Ocultar indicador de envío
    }
  };

  const inputStyle = {
    borderRadius: "8px",
    border: "1px solid #ced4da",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "12px",
    fontSize: "16px",
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg rounded-4 border-0">
            <Card.Body>
              <h1
                className="text-center mb-4"
                style={{ fontFamily: "Arial, sans-serif", color: "#343a40" }}
              >
                <b>Formulario de Contacto</b>
              </h1>
              <Form ref={formRef} onSubmit={enviarEmail}>
                {/* Campo de Nombre */}
                <Form.Group className="mb-4" controlId="nombre">
                  <Form.Label>
                    <b>Nombre</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Escribe tu nombre"
                    required
                    style={inputStyle}
                  />
                </Form.Group>

                {/* Campo de Email */}
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>
                    <b>Email</b>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Escribe tu correo"
                    required
                    style={inputStyle}
                  />
                </Form.Group>

                {/* Campo de Mensaje */}
                <Form.Group className="mb-4" controlId="mensaje">
                  <Form.Label>
                    <b>Mensaje</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="mensaje"
                    rows={5}
                    placeholder="Escribe tu mensaje"
                    required
                    style={inputStyle}
                  />
                </Form.Group>

                {/* Botón Enviar */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  style={{
                    backgroundColor: "#007bff",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "none",
                    transition: "background-color 0.3s ease",
                  }}
                  disabled={isSending}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0056b3")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#007bff")
                  }
                >
                  {isSending ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Correo"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Correo;