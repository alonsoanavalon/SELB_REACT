import React, { useState } from "react";
import { Form } from "react-bootstrap";

const options = [
  { value: 1, label: "1 año" },
  { value: 2, label: "2 años" },
  { value: 3, label: "3 años" },
  { value: 4, label: "4 años" },
  { value: 5, label: "5 años" },
  { value: 0, label: "Aún no lo hacemos" },
];

function Question5({ question, answers, setAnswers }) {
  const [value, setValue] = useState(answers[question - 1]);

  return (
    <div>
      <div
        className="instruction"
        style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
      >
        5. ¿A qué edad le leyó por primera vez un libro a su hijo(a)?
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

export default Question5;
