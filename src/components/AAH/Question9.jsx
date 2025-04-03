import React, { useState } from "react";
import { Form } from "react-bootstrap";

const options = [
  { value: 1, label: "Sí" },
  { value: 0, label: "No" },
];

function Question9({ question, answers, setAnswers }) {
  const [value, setValue] = useState(answers[question]);

  return (
    <div>
      <div
        className="instruction"
        style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
      >
        9. ¿Su hijo(a) dispone de material concreto de lectura y/o escritura?
        Por ejemplo: libros, revistas, cuadernos, lápices, etc.
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
                  index === question ? option.value : value
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

export default Question9;
