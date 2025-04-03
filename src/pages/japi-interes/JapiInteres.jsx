import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { getMany, get, update, set } from "idb-keyval";

import JapiFaces from "../../components/japi-interes/JapiFaces";
import JapiCircles from "../../components/japi-interes/JapiCircles";
import useDisableBack from "../../hooks/useDisableBack";
import { useNavigate } from "react-router-dom";

/**Queries
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 12, 1, null, '¿Cómo te sientes cuando juegas con JAPI?');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 12, 2, null, '¿Cuánto tiempo te gusta jugar con JAPI?');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 12, 3, null, '¿Cómo te sientes cuando haces otra actividad en la sala distinta a JAPI, por ejemplo, cuando la tía les pide que canten o que pinten?');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 12, 4, null, '¿Cuánto tiempo te gusta hacer otra actividad en sala distinta a JAPI?');
 */

const TEXTS = {
  1: {
    value: 1121,
    firstText: "Selecciona la cara que representa ",
    secondText: "¿cómo te sientes cuando juegas con JAPI?",
    thirdText:
      ". La cara roja significa que no te gusta, la cara naranja significa te gusta poco, la amarilla que te gusta un poco más, la verde que te gusta, y la azul que te gusta mucho. Presiona la cara que representa cómo te sientes cuando juegas con JAPI.",
  },
  2: {
    value: 1122,
    firstText: "Bien, ahora selecciona el círculo que representa",
    secondText: "¿cuánto tiempo te gusta jugar con JAPI?",
    thirdText:
      ". El círculo más pequeño significa que te gusta jugar nada o casi nada de tiempo, el siguiente circulo que te gusta jugar un poco, el siguiente que te gusta jugar más que un poco, el siguiente que te gusta jugar un buen rato, y por último, el círculo más grande, que te gusta jugar mucho tiempo.",
  },
  3: {
    value: 1123,
    firstText: "Ahora selecciona la cara que representa",
    secondText:
      "¿cómo te sientes cuando haces otra actividad en la sala distinta a JAPI, por ejemplo, cuando la tía les pide que canten o que pinten?",
    thirdText:
      ". La cara roja significa que te sientes mal, la cara naranja significa te sientes un poco incomodo, la amarilla que te sientes normal, la verde que te sientes bien, y la azul que te sientes muy bien. Presiona la cara que representa cómo te sientes cuando haces otro tipo de actividad en la sala distinta a JAPI.",
  },
  4: {
    value: 1124,
    firstText: "Por último, selecciona el círculo que representa",
    secondText:
      "¿cuánto tiempo te gusta hacer otra actividad en sala distinta a JAPI?",
    thirdText:
      ". El círculo más pequeño significa que te gusta jugar nada o casi nada de tiempo, el siguiente circulo que te gusta jugar un poco, el siguiente que te gusta jugar más que un poco, el siguiente que te gusta jugar un buen rato, y por último, el círculo más grande, que te gusta jugar mucho tiempo. Presiona el círculo que representa cuánto tiempo te gusta hacer otra actividad en sala distinta a JAPI.",
  },
};

function JapiInteres() {
  const [section, setSection] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [answers, setAnswers] = useState([null, null, null, null]);

  const checkAnswers = answers.some((answer) => answer == null);

  useDisableBack();
  const navigate = useNavigate();

  useEffect(() => {
    if (answer == null) {
      return;
    }

    const newAnswers = answers.map((value, index) =>
      index + 1 === section ? answer : value
    );
    setAnswers(newAnswers);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  const saveTest = async () => {
    const choicesArray = [];
    let instrumentInfo = {};
    let choices = {};

    const [selectedStudent, userData] = await getMany([
      "selectedStudent",
      "userData",
    ]);

    instrumentInfo["user_id"] = parseInt(userData["id"]);
    instrumentInfo["student_id"] = parseInt(selectedStudent);
    instrumentInfo["date"] = `${new Date().getFullYear()}/${
      new Date().getMonth() + 1
    }/${new Date().getDate()}`;
    instrumentInfo["instrument"] = 12;

    choicesArray.push(instrumentInfo);

    answers.forEach(({ value }, index) => {
      choices[TEXTS[index + 1].value] = value;
    });

    choicesArray.push(choices);

    const backupTest = await get("backupTest");
    if (Array.isArray(backupTest) && backupTest.length > 0) {
      const completedTests = await get("completedTests");

      if (!Array.isArray(completedTests)) {
        return;
      }

      if (backupTest.length >= completedTests.length) {
        await update("backupTest", () => [...backupTest, choicesArray]);
      }
    }

    const completedTests = await get("completedTests");

    if (Array.isArray(completedTests)) {
      await update("completedTests", () => [...completedTests, choicesArray]);
    } else {
      await set("completedTests", [choicesArray]);
    }

    navigate("/");
  };

  return (
    <div
      style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem 1rem" }}
    >
      {section !== 0 && section !== 5 && (
        <div
          className="instruction"
          style={{
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img src="/images/huron.png" width={120} height={120} alt="huron" />
          <div>
            <span>{TEXTS[section].firstText}</span>{" "}
            <span style={{ color: "#000" }}>{TEXTS[section].secondText}</span>{" "}
            <span>{TEXTS[section].thirdText}</span>
          </div>
        </div>
      )}

      {section !== 0 && section !== 5 && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span style={{ fontWeight: "bold" }}>Respuesta seleccionada: </span>
          {answers[section - 1] ? answers[section - 1].item : "Sin seleccionar"}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1.5rem",
        }}
      >
        {(section === 1 || section === 3) && (
          <JapiFaces setAnswer={setAnswer} />
        )}
        {(section === 2 || section === 4) && (
          <JapiCircles setAnswer={setAnswer} />
        )}

        {(section === 0 || section === 5) && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <div
              className="instruction"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                fontSize: "1.5rem",
                lineHeight: "2rem",
              }}
            >
              <img
                src="/images/huron.png"
                width={120}
                height={120}
                alt="huron"
              />
              {section === 0
                ? "Hola! A continuación, te haré algunas preguntas relacionadas con JAPI, el juego que estuviste realizando en tablet las últimas semanas. ¡Partamos!"
                : checkAnswers
                ? "Faltan preguntas por responder"
                : "Súper, muchas gracias, lo hiciste muy bien!"}
            </div>

            {section === 5 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button onClick={saveTest} disabled={checkAnswers}>
                  Guardar Test
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "2rem",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Button
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            disabled={section === 0}
            onClick={() => {
              setAnswer(null);
              setSection(section - 1);
            }}
          >
            <FaAngleDoubleLeft
              style={{ width: "1.25rem", height: "1.25rem" }}
            />
            Volver atrás
          </Button>
          <Button
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            disabled={section === 5}
            onClick={() => {
              setAnswer(null);
              setSection(section + 1);
            }}
          >
            <FaAngleDoubleRight
              style={{ width: "1.25rem", height: "1.25rem" }}
            />
            Continuar
          </Button>
        </div>

        {section !== 0 && section !== 5 && (
          <Button
            variant="light"
            onClick={() => {
              const newAnswers = answers.map((value, index) =>
                index === section - 1
                  ? { value: 0, item: "Sin responder" }
                  : value
              );
              setAnswers(newAnswers);
            }}
          >
            Continuar sin responder
          </Button>
        )}
      </div>
    </div>
  );
}

export default JapiInteres;
