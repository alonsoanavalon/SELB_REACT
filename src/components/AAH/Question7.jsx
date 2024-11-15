import React, { useState } from "react";
import { Form } from "react-bootstrap";

function Question7({ question, answers, setAnswers }) {
  const [value, setValue] = useState(
    answers[question] == null ? "" : answers[question]
  );

  return (
    <div>
      <div
        className="instruction"
        style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
      >
        <Form style={{ marginTop: "1rem" }}>
          <Form.Group>
            <Form.Label>7. ¿Cuántos libros hay en su casa?</Form.Label>
            <Form.Control
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);

                const newAnswers = answers.map((value, index) =>
                  index  === question
                    ? e.target.value === ""
                      ? null
                      : parseInt(e.target.value)
                    : value
                );
                setAnswers(newAnswers);
              }}
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default Question7;
