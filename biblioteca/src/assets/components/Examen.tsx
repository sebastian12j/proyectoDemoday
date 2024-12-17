import { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Credenciales";


interface Opcion {
  texto: string;
  esCorrecta: boolean;
}

interface Pregunta {
  pregunta: string;
  opciones: Opcion[];
}

interface ExamenProps {
  libroId: string; // ID del libro recibido como prop
}

const Examen: React.FC<ExamenProps> = ({ libroId }) => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "libros"));
        const libroSeleccionado = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .find((libro) => libro.id === libroId) as { preguntas: Pregunta[] } | undefined;

        if (libroSeleccionado) setPreguntas(libroSeleccionado.preguntas);
        else console.error("Libro no encontrado.");
      } catch (error) {
        console.error("Error al obtener las preguntas:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerPreguntas();
  }, [libroId]);

  
  useEffect(() => {
    if (!isFinished && !answersShown) {
      intervalRef.current = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev <= 1) {
            setAreDisabled(true);
            clearInterval(intervalRef.current as NodeJS.Timeout);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [preguntaActual, isFinished, answersShown]);

  const handleAnswerSubmit = (esCorrecta: boolean) => {
    if (esCorrecta) setPuntuacion((prev) => prev + 1);
    setAreDisabled(true);
    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) setIsFinished(true);
      else nextQuestion();
    }, 1000);
  };

  const nextQuestion = () => {
    setPreguntaActual((prev) => prev + 1);
    setTiempoRestante(30);
    setAreDisabled(false);
  };

  const resetExam = () => {
    setPreguntaActual(0);
    setPuntuacion(0);
    setIsFinished(false);
    setTiempoRestante(10);
    setAreDisabled(false);
    setAnswersShown(false);
  };

  if (cargando) return <p className="loading">Cargando preguntas...</p>;

  if (isFinished || answersShown) {
    return (
      <div className="resultado">
        <h2>{isFinished ? "¡Examen Terminado!" : "Respuestas Correctas"}</h2>
        {answersShown ? (
          preguntas.map((pregunta, index) => (
            <div key={index} className="respuesta">
              <h3>{pregunta.pregunta}</h3>
              <p>
                Respuesta correcta:{" "}
                <strong>
                  {pregunta.opciones.find((op) => op.esCorrecta)?.texto}
                </strong>
              </p>
            </div>
          ))
        ) : (
          <p>
            Obtuviste <strong>{puntuacion}</strong> de {preguntas.length}
          </p>
        )}
        <div className="botones">
          <button onClick={resetExam}>Volver a Intentar</button>
          {!answersShown && <button onClick={() => setAnswersShown(true)}>Ver Respuestas</button>}
        </div>
      </div>
    );
  }

  return (
    <div className="examen">
      <div className="header">
        <h3>
          Pregunta {preguntaActual + 1} de {preguntas.length}
        </h3>
        <div className="timer">
          <p>Tiempo restante:</p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(tiempoRestante / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="pregunta">
        <h2>{preguntas[preguntaActual].pregunta}</h2>
        <div className="opciones">
          {preguntas[preguntaActual].opciones.map((opcion, index) => (
            <button
              key={index}
              disabled={areDisabled}
              className={`opcion ${areDisabled ? "disabled" : ""}`}
              onClick={() => handleAnswerSubmit(opcion.esCorrecta)}
            >
              {opcion.texto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Examen;