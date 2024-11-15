import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const options = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3 o más" },
];

function Question4({ question, answers, setAnswers }) {
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
      setValue("3 o más");
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
        4. ¿Cuántos idiomas se hablan en su casa?
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
                    ? option.value === "3 o más"
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

          {value === "3 o más" && (
            <Form.Group>
              <Form.Label>Si son 2 o más, indique cuáles son:</Form.Label>
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

export default Question4;
