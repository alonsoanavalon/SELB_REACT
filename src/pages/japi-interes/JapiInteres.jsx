import React, { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { getMany, get, update, set } from "idb-keyval";

import JapiFaces from "../../components/japi-interes/JapiFaces";
import JapiCircles from "../../components/japi-interes/JapiCircles";
import useDisableBack from "../../hooks/useDisableBack";

const TEXTS = {
  1: {
    value: "¿Cómo te sientes cuando juegas con JAPI?",
    text: "Selecciona la cara que representa ¿cómo te sientes cuando juegas con JAPI?. La cara roja significa que no te gusta, la cara naranja significa te gusta poco, la amarilla que te gusta un poco más, la verde que te gusta, y la azul que te gusta mucho. Presiona la cara que representa cómo te sientes cuando juegas con JAPI.",
  },
  2: {
    value: "¿Cuánto tiempo te gusta jugar con JAPI?",
    text: "Bien, ahora selecciona el círculo que representa ¿cuánto tiempo te gusta jugar con JAPI?. El círculo más pequeño significa que te gusta jugar nada o casi nada de tiempo, el siguiente circulo que te gusta jugar un poco, el siguiente que te gusta jugar más que un poco, el siguiente que te gusta jugar un buen rato, y por último, el círculo más grande, que te gusta jugar mucho tiempo.",
  },
  3: {
    value:
      "¿Cómo te sientes cuando haces otra actividad en la sala distinta a JAPI, por ejemplo, cuando la tía les pide que canten o que pinten? ",
    text: "Ahora selecciona la cara que representa ¿cómo te sientes cuando haces otra actividad en la sala distinta a JAPI, por ejemplo, cuando la tía les pide que canten o que pinten?. La cara roja significa que te sientes mal, la cara naranja significa te sientes un poco incomodo, la amarilla que te sientes normal, la verde que te sientes bien, y la azul que te sientes muy bien. Presiona la cara que representa cómo te sientes cuando haces otro tipo de actividad en la sala distinta a JAPI.",
  },
  4: {
    value:
      "¿Cuánto tiempo te gusta hacer otra actividad en sala distinta a JAPI? ",
    text: "Por último, selecciona el círculo que representa ¿cuánto tiempo te gusta hacer otra actividad en sala distinta a JAPI?. El círculo más pequeño significa que te gusta jugar nada o casi nada de tiempo, el siguiente circulo que te gusta jugar un poco, el siguiente que te gusta jugar más que un poco, el siguiente que te gusta jugar un buen rato, y por último, el círculo más grande, que te gusta jugar mucho tiempo. Presiona el círculo que representa cuánto tiempo te gusta hacer otra actividad en sala distinta a JAPI.",
  },
};

function JapiInteres() {
  const [section, setSection] = useState(1);
  const [answer, setAnswer] = useState(null);
  const [answers, setAnswers] = useState([null, null, null, null]);

  useDisableBack();

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

    answers.forEach((value, index) => {
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
  };

  return (
    <div
      style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem 1rem" }}
    >
      <button onClick={saveTest}>Save Test</button>

      <div className="instruction">
        <span>{TEXTS[section].text}</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        {(section === 1 || section === 3) && (
          <JapiFaces setAnswer={setAnswer} />
        )}
        {(section === 2 || section === 4) && (
          <JapiCircles setAnswer={setAnswer} />
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
          gap: "1rem",
        }}
      >
        <Button
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          disabled={section === 1}
          onClick={() => {
            setAnswer(null);
            setSection(section - 1);
          }}
        >
          <FaAngleDoubleLeft style={{ width: "1.25rem", height: "1.25rem" }} />
          Volver atrás
        </Button>
        <Button
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          disabled={section === 4}
          onClick={() => {
            setAnswer(null);
            setSection(section + 1);
          }}
        >
          <FaAngleDoubleRight style={{ width: "1.25rem", height: "1.25rem" }} />
          Continuar
        </Button>
      </div>
    </div>
  );
}

export default JapiInteres;
