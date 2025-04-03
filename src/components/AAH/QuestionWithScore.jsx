import React, { useState } from "react";
import { Form } from "react-bootstrap";

const options = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
];

function QuestionWithScore({ question, answers, setAnswers, title, subtitle }) {
  const [value, setValue] = useState(answers[question]);

  return (
    <div>
      <div
        className="instruction"
        style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
      >
        {title}
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
          }}
        >
          {subtitle}
        </p>

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

export default QuestionWithScore;
