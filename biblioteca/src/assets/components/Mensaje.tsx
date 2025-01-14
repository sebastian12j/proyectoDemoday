/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";

const Mensaje: React.FC = () => {
  const [mensaje, setMensaje] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const enviarCorreo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert("Por favor, ingresa un correo electrónico para enviar el mensaje.");
      return;
    }

    if (!mensaje) {
      alert("Por favor, ingresa un mensaje antes de enviar el correo.");
      return;
    }

    if (formRef.current) {
      try {
        await emailjs.sendForm(
          "service_8fzhazk", 
          "template_sp9u4ir",
          formRef.current, 
          "lC8ihoaUej2s_x2Js" 
        );
        alert("Correo enviado correctamente.");
        setMensaje("");
        setEmail("");
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        alert("No se pudo enviar el correo.");
      }
    }
  };

  // Función para enviar WhatsApp
  const enviarWhatsApp = () => {
    if (!telefono) {
      alert("Por favor, ingresa un número de teléfono para enviar el mensaje.");
      return;
    }

    if (!mensaje) {
      alert("Por favor, ingresa un mensaje antes de enviar por WhatsApp.");
      return;
    }

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg rounded-4 border-0"
          style={{
            width: "140%",
            border: "0",
          }}>
            <Card.Body>
              <h2
                className="text-center mb-4"
                style={{
                  fontFamily: "Arial, sans-serif",
                  color: "#343a40",
                }}
              >
                <b>Enviar Mensajes</b>
              </h2>
              <Form ref={formRef} onSubmit={enviarCorreo}>
                {/* Campo de Teléfono */}
                <Form.Group className="mb-4" controlId="telefono">
                  <Form.Label>
                    <b>Teléfono (WhatsApp)</b>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Ejemplo: 573001234567"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="input-telefono"
                    name="telefono"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ced4da",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      padding: "12px",
                      fontSize: "16px",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>
                    <b>Correo Electrónico</b>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ejemplo: correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-email"
                    name="email"
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ced4da",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      padding: "12px",
                      fontSize: "16px",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="mensaje">
                  <Form.Label>
                    <b>Mensaje</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Escribe tu mensaje aquí..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    rows={5}
                    name="mensaje"
                    required
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ced4da",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      padding: "12px",
                      fontSize: "16px",
                    }}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="success"
                    onClick={enviarWhatsApp}
                    style={{
                      borderRadius: "8px",
                      padding: "10px 20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      border: "none",
                      gap: "10px",
                    }}
                  >
                    Enviar por WhatsApp
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      borderRadius: "8px",
                      padding: "10px 20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      border: "none",
                      gap: "10px",
                      backgroundColor: "red",
                    }}
                  >
                    Enviar por Correo
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Mensaje;
