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

function AAH() {
  const [question, setQuestion] = useState(1);
  const [answers, setAnswers] = useState(Array.from({length: 11}, () => null));

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
