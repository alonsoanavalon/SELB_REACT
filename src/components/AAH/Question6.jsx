import React, { useState } from "react";
import { Form } from "react-bootstrap";

const options = [
  { value: 1, label: "Sí" },
  { value: 0, label: "No" },
];

function Question6({ question, answers, setAnswers }) {
  const [value, setValue] = useState(answers[question - 1]);
  const [value_1, setValue_1] = useState(
    answers[question] == null ? "" : answers[question]
  );

  return (
    <div>
      <div
        className="instruction"
        style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
      >
        6. Usted, ¿ha presentado dificultades relacionadas con la lectura?
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

                if (option.value === "No") {
                  newAnswers[question] = null;
                }

                setAnswers(newAnswers);
              }}
            />
          ))}

          {value === 1 && (
            <Form.Group>
              <Form.Label>Si son 2 o más, indique cuáles son:</Form.Label>
              <Form.Control
                type="text"
                value={value_1}
                onChange={(e) => {
                  setValue_1(e.target.value);

                  const newAnswers = answers.map((value, index) =>
                    index === question
                      ? e.target.value === ""
                        ? null
                        : e.target.value
                      : value
                  );
                  setAnswers(newAnswers);
                }}
              />
            </Form.Group>
          )}
        </Form>
      </div>
    </div>
  );
}

export default Question6;
