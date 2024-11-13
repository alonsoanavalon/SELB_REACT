import React, { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { get, getMany, set, update } from "idb-keyval";
import { useNavigate } from "react-router-dom";

import Question1 from "../../components/AAH/Question1";
import Question2 from "../../components/AAH/Question2";
import Question3 from "../../components/AAH/Question3";
import Question4 from "../../components/AAH/Question4";
import Question5 from "../../components/AAH/Question5";
import Question6 from "../../components/AAH/Question6";
import Question7 from "../../components/AAH/Question7";
import Question8 from "../../components/AAH/Question8";
import Question9 from "../../components/AAH/Question9";
import Question10 from "../../components/AAH/Question10";
import QuestionWithScore from "../../components/AAH/QuestionWithScore";

/** Queries
 * UPDATE instrument SET instrument_type_id = 1 WHERE id = 19;
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 1, null, '1. Marque la relación de parentesco con el(la) niño(a):');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 2, null, '2. ¿Cuál es el máximo nivel educativo alcanzado por la madre?');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 3, null, '3. ¿Cuál es el máximo nivel educativo alcanzado por el padre?');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 4, null, '4. ¿Cuántos idiomas se hablan en su casa?');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 5, null, '5. ¿A qué edad le leyó por primera vez un libro a su hijo(a)?');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 6, null, '6. Usted, ¿ha presentado dificultades relacionadas con la lectura?');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 6.1, null, '6.1. Si su respuesta es sí, indique qué tipo de dificultades (o diagnóstico).');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 7, null, '7. ¿Cuántos libros hay en su casa?');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 8, null, '8. ¿Cuántos libros infantiles tiene su hijo(a) en casa?:');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 9, null, '9. ¿Su hijo(a) dispone de material concreto de lectura y/o escritura? Por ejemplo: libros, revistas, cuadernos, lápices, etc.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 10, null, '10. ¿Su hijo(a) dispone de material digital para leer y/o escribir? (tablet, computador, teléfono)');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 11, null, '11. Enseñó letras a mi hijo(a) (por ej.: “esta es la P de Pedro”');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 12, null, '12. Enseño palabras a mi hijo(a) cuando leo (por ej.: “deslizar es cuando bajas por
 el tobogán”).');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 13, null, '13. Cuando leo una historia, me detengo cuando mi hijo(a) no entiende una palabra y se la explico.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 14, null, '14. Cuando leo con mi hijo(a), voy señalando con mi dedo las palabras en la historia.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 15, null, '15. Le enseño a mi hijo(a) a trazar letras y números.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 16, null, '16. Jugamos a escribir letras o números.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 17, null, '17. Me preocupo de corregirlo(a) cuando dice mal una palabra.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 18, null, '18. Leo con mi hijo(a)');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 19, null, '19. Jugamos a hacer como que leemos con mi hijo(a).');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 20, null, '20. Conversamos sobre la historia que estamos leyendo.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 21, null, '21. Jugamos a decir trabalenguas o cantar canciones.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 22, null, '22. Mi hijo(a) me ha visto leer.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 23, null, '23. Le lea a mi hijo(a) porque lo ayudará a hablar mejor.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 24, null, '24. Le lea a mi hijo(a) porque es bueno para su desarrollo escolar.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 25, null, '25. Mi hijo(a) conozca las letras (sus nombres y sonidos).');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 26, null, '26. Mi hijo(a) sepa escribir su nombre.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 27, null, '27. Le hable o cuente historias a mi hijo(a) para su desarrollo lector.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 28, null, '28. Le cante canciones a mi hijo(a) para su desarrollo lector.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 29, null, '29. Juegue con mi hijo(a) para su desarrollo lector.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 30, null, '30. Para mí, leer es un tiempo bien empleado.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 31, null, '31. Lo que aprendo a leer es valioso para mí y, por ende, para mi hijo(a).');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 32, null, '32. Leerle a mi hijo(a) es valioso para su desarrollo.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 33, null, '33. Regalarle libros o textos infantiles a mi hijo(a) es valioso para su desarrollo lector.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 34, null, '34. Buscar información en libros junto a mi hijo(a) es valioso para su desarrollo lector.');
 * INSERT INTO item (item_type_id, instrument_id, num, description, title) VALUES (1, 19, 35, null, '35. Para mi, leerle a mi hijo es un tiempo bien empleado.');
 */

const items = Array.from(
  { length: 1160 - 1125 + 1 },
  (_, index) => index + 1125
);

function AAH() {
  const [question, setQuestion] = useState(1);
  const [answers, setAnswers] = useState(
    Array.from({ length: 36 }, () => null)
  );

  const navigate = useNavigate();

  const checkAnswers = () => {
    if (answers[5] == null) {
      return false;
    }

    if (answers[5] === "Sí") {
      return answers.every((value) => value != null);
    }

    if (answers[5] === "No") {
      let check = true;

      for (let i = 0; i < answers.length; i++) {
        if (i === 6) {
          continue;
        }

        if (answers[i] == null) {
          check = false;
          break;
        }
      }

      return check;
    }
  };

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
    instrumentInfo["instrument"] = 19;

    choicesArray.push(instrumentInfo);

    answers.forEach((value, index) => {
      choices[items[index]] = value;
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
      {question === 1 && (
        <Question1
          question={question}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {question === 2 && (
        <Question2
          question={question}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {question === 3 && (
        <Question3
          question={question}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {question === 4 && (
        <Question4
          question={question}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {question === 5 && (
        <Question5
          question={question}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {question === 6 && (
        <Question6
          question={question}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {question === 7 && (
        <Question7
          question={question}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {question === 8 && (
        <Question8
          question={question}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {question === 9 && (
        <Question9
          question={question}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {question === 10 && (
        <Question10
          question={question}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {question === 11 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="11. Enseñó letras a mi hijo(a) (por ej.: “esta es la P de Pedro”)."
          subtitle="1 = Nada frecuente ----------------------------------------- 6= Muy frecuente"
        />
      )}
      {question === 12 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="12. Enseño palabras a mi hijo(a) cuando leo (por ej.: “deslizar es cuando bajas por el tobogán”)."
          subtitle="1 = Nada frecuente ----------------------------------------- 6= Muy frecuente"
        />
      )}
      {question === 13 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="13. Cuando leo una historia, me detengo cuando mi hijo(a) no entiende una palabra y se la explico. "
          subtitle="1 = Nada frecuente ----------------------------------------- 6= Muy frecuente"
        />
      )}
      {question === 14 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="14. Cuando leo con mi hijo(a), voy señalando con mi dedo las palabras en la historia. "
          subtitle="1 = Nada frecuente ----------------------------------------- 6= Muy frecuente"
        />
      )}
      {question === 15 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="15. Le enseño a mi hijo(a) a trazar letras y números. "
          subtitle="1 = Nada frecuente ----------------------------------------- 6= Muy frecuente"
        />
      )}
      {question === 16 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="16. Jugamos a escribir letras o números."
          subtitle="1 = Nada frecuente ----------------------------------------- 6= Muy frecuente"
        />
      )}
      {question === 17 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="17. Me preocupo de corregirlo(a) cuando dice mal una palabra. "
          subtitle="1 = Nada frecuente ----------------------------------------- 6= Muy frecuente"
        />
      )}
      {question === 18 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="18. Leo con mi hijo(a)"
          subtitle="1 = Nada frecuente ----------------------------------------- 6= Muy frecuente"
        />
      )}
      {question === 19 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="19. Jugamos a hacer como que leemos con mi hijo(a)."
          subtitle="1 = Nada frecuente ----------------------------------------- 6= Muy frecuente"
        />
      )}
      {question === 20 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="20. Conversamos sobre la historia que estamos leyendo."
          subtitle="1 = Nada frecuente ----------------------------------------- 6= Muy frecuente"
        />
      )}
      {question === 21 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="21. Jugamos a decir trabalenguas o cantar canciones."
          subtitle="1 = Nada frecuente ----------------------------------------- 6= Muy frecuente"
        />
      )}
      {question === 22 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="22. Mi hijo(a) me ha visto leer."
          subtitle="1 = Nada importante y 6= Muy importante"
        />
      )}
      {question === 23 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="23. Le lea a mi hijo(a) porque lo ayudará a hablar mejor."
          subtitle="1 = Nada importante y 6= Muy importante"
        />
      )}
      {question === 24 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="24. Le lea a mi hijo(a) porque es bueno para su desarrollo escolar."
          subtitle="1 = Nada importante y 6= Muy importante"
        />
      )}
      {question === 25 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="25. Mi hijo(a) conozca las letras (sus nombres y sonidos)."
          subtitle="1 = Nada importante y 6= Muy importante"
        />
      )}
      {question === 26 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="26. Mi hijo(a) sepa escribir su nombre."
          subtitle="1 = Nada importante y 6= Muy importante"
        />
      )}
      {question === 27 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="27. Le hable o cuente historias a mi hijo(a) para su desarrollo lector."
          subtitle="1 = Nada importante y 6= Muy importante"
        />
      )}
      {question === 28 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="28. Le cante canciones a mi hijo(a) para su desarrollo lector."
          subtitle="1 = Nada importante y 6= Muy importante"
        />
      )}
      {question === 29 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="29. Juegue con mi hijo(a) para su desarrollo lector."
          subtitle="1 = Nada importante y 6= Muy importante"
        />
      )}
      {question === 30 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="30. Para mí, leer es un tiempo bien empleado."
          subtitle="1 = Totalmente en desacuerdo ----- 6= Totalmente de acuerdo"
        />
      )}
      {question === 31 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="31. Lo que aprendo a leer es valioso para mí y, por ende, para mi hijo(a)."
          subtitle="1 = Totalmente en desacuerdo ----- 6= Totalmente de acuerdo"
        />
      )}
      {question === 32 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="32. Leerle a mi hijo(a) es valioso para su desarrollo."
          subtitle="1 = Totalmente en desacuerdo ----- 6= Totalmente de acuerdo"
        />
      )}
      {question === 33 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="33. Regalarle libros o textos infantiles a mi hijo(a) es valioso para su desarrollo lector."
          subtitle="1 = Totalmente en desacuerdo ----- 6= Totalmente de acuerdo"
        />
      )}
      {question === 34 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="34. Buscar información en libros junto a mi hijo(a) es valioso para su desarrollo lector."
          subtitle="1 = Totalmente en desacuerdo ----- 6= Totalmente de acuerdo"
        />
      )}
      {question === 35 && (
        <QuestionWithScore
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          title="35. Para mi, leerle a mi hijo es un tiempo bien empleado."
          subtitle="1 = Totalmente en desacuerdo ----- 6= Totalmente de acuerdo"
        />
      )}
      {question === 36 && (
        <div>
          <div
            className="instruction"
            style={{
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            ¡Muchas gracias por su colaboración en este estudio!
            <div>
              <Button disabled={!checkAnswers()} onClick={saveTest}>
                Guardar Test
              </Button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginTop: "1rem",
          justifyContent: "center",
        }}
      >
        <Button
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          disabled={question === 1}
          onClick={() => {
            setQuestion(question - 1);
          }}
        >
          <FaAngleDoubleLeft style={{ width: "1.25rem", height: "1.25rem" }} />
          Volver atrás
        </Button>
        <Button
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          disabled={question === answers.length}
          onClick={() => {
            setQuestion(question + 1);
          }}
        >
          <FaAngleDoubleRight style={{ width: "1.25rem", height: "1.25rem" }} />
          Continuar
        </Button>
      </div>
    </div>
  );
}

export default AAH;
