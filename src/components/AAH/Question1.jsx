import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const options = [
  { value: "Mamá", label: "Mamá" },
  { value: "Papá", label: "Papá" },
  { value: "Otro", label: "Otro" },
];

function Question1({ question, answers, setAnswers }) {
  const [value, setValue] = useState(null);
  const [other, setOther] = useState("");

  useEffect(() => {
    const answer = answers[question - 1];

    if (answer == null) {
      return;
    }

    const check = options.some((option) => option.value === answer);

    if (check) {
      setValue(answer);
    } else {
      setValue("Otro");
      setOther(answer);
    }

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
                    ? option.value === "Otro"
                      ? other === ""
                        ? null
                        : other
                      : option.value
                    : value
                );
                setAnswers(newAnswers);
              }}
            />
          ))}

          {value === "Otro" && (
            <Form.Group>
              <Form.Label>Si su respuesta es otro, especifique:</Form.Label>
              <Form.Control
                type="text"
                value={other}
                onChange={(e) => {
                  setOther(e.target.value);

                  const newAnswers = answers.map((value, index) =>
                    index + 1 === question
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

export default Question1;
