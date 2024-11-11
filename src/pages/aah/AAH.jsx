import React, { useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Button } from "react-bootstrap";

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

function AAH() {
  const [question, setQuestion] = useState(30);
  const [answers, setAnswers] = useState(
    Array.from({ length: 36 }, () => null)
  );

  return (
    <div
      style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem 1rem" }}
    >
      {JSON.stringify(answers)}

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
              <Button>Guardar Test</Button>
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
