import React, { useState } from "react";
import { Form } from "react-bootstrap";

const options = [
  { value: 1, label: "Sin escolarización" },
  {
    value: 2,
    label: "Educación básica incompleta",
  },
  { value: 3, label: "Educación básica completa" },
  { value: 4, label: "Educación media incompleta" },
  { value: 5, label: "Educación media completa" },
  {
    value: 6,
    label: "Educación Superior incompleta",
  },
  {
    value: 7,
    label: "Educación Superior completa",
  },
  {
    value: 8,
    label: "Educación Técnica de nivel superior",
  },
  { value: 9, label: "Estudios de postgrado" },
];

function Question2({ question, answers, setAnswers }) {
  const [value, setValue] = useState(answers[question - 1]);

  return (
    <div>
      <div
        className="instruction"
        style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
      >
        2. ¿Cuál es el máximo nivel educativo alcanzado por la madre?
        <Form style={{ marginTop: "1rem" }}>
          {options.map((option) => (
            <Form.Check
              key={`question-${question}-${option.value}`}
              type="radio"
              label={option.label}
              checked={option.value === value}
              onChange={() => {
                setValue(option.value);

                const newAnswers = answers.map((value, index) =>
                  index + 1 === question
                    ? option.value
                    : value
                );
                setAnswers(newAnswers);
              }}
            />
          ))}
        </Form>
      </div>
    </div>
  );
}

export default Question2;
