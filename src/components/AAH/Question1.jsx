import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const options = [
  { value: 1, label: "Mamá" },
  { value: 2, label: "Papá" },
  { value: 3, label: "Otro" },
];

function Question1({ question, answers, setAnswers }) {
  const [value, setValue] = useState(null);
  const [other, setOther] = useState("");

  useEffect(() => {
    const answer = answers[question - 1];

    if (answer == null) {
      return;
    }
    setValue(answer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  return (
    <div>
      <div
        className="instruction"
        style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
      >
        1. Marque la relación de parentesco con el(la) niño(a):
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

          {value === 3 && (
            <Form.Group>
              <Form.Label>Si su respuesta es otro, especifique:</Form.Label>
              <Form.Control
                type="text"
                value={other}
                onChange={(e) => {
                  setOther(e.target.value);
                }}
              />
            </Form.Group>
          )}
        </Form>
      </div>
    </div>
  );
}

export default Question1;
