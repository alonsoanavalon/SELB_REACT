import React, {  useState } from "react";
import { Form } from "react-bootstrap";

const options = [
  { value: "Sin escolarización", label: "Sin escolarización" },
  {
    value: "Educación básica incompleta",
    label: "Educación básica incompleta",
  },
  { value: "Educación básica completa", label: "Educación básica completa" },
  { value: "Educación media incompleta", label: "Educación media incompleta" },
  { value: "Educación media completa", label: "Educación media completa" },
  {
    value: "Educación Superior incompleta",
    label: "Educación Superior incompleta",
  },
  {
    value: "Educación Superior completa",
    label: "Educación Superior completa",
  },
  {
    value: "Educación Técnica de nivel superior",
    label: "Educación Técnica de nivel superior",
  },
  { value: "Estudios de postgrado", label: "Estudios de postgrado" },
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
                  index + 1 === question ? option.value : value
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
