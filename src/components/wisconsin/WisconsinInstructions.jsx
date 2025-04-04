import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";

function WisconsinInstructions({
  section,
  setSection,
  instructions,
  specialMessage,
  checkboxs,
  setCheckboxs,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "n") {
        setSection(section + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {(section === 1 || section === 4 || section === 19 || section === 36) && (
        <div style={{ marginBottom: "0.5rem" }}>
          <Button variant="primary" onClick={() => setSection(section + 1)}>
            Continuar
          </Button>
        </div>
      )}

      {section === 32 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          <Button color="primary" onClick={() => setSection(section + 1)}>
            Continuar al nivel 3
          </Button>

          <Button variant="success" onClick={() => setSection(55)}>
            Finalizar test
          </Button>
        </div>
      )}

      <div
        className="instruction"
        style={{ fontSize: "1.5rem", lineHeight: "1.75rem" }}
      >
        {instructions.map((instruction) => (
          <p key={instruction}>{instruction}</p>
        ))}

        {specialMessage && (
          <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
            {specialMessage}
          </span>
        )}

        {section === 32 && (
          <Form>
            <div className="mb-3">
              <Form.Check
                type="checkbox"
                inline
                label="Cantidad"
                className="custom-checkbox"
                checked={checkboxs.cantidad}
                onChange={(e) =>
                  setCheckboxs({
                    ...checkboxs,
                    cantidad: e.target.checked,
                  })
                }
              />
              <Form.Check
                type="checkbox"
                inline
                label="Color"
                className="custom-checkbox"
                checked={checkboxs.color}
                onChange={(e) => {
                  setCheckboxs({
                    ...checkboxs,
                    color: e.target.checked,
                  });
                }}
              />
              <Form.Check
                type="checkbox"
                inline
                label="Forma"
                className="custom-checkbox"
                checked={checkboxs.forma}
                onChange={(e) => {
                  setCheckboxs({
                    ...checkboxs,
                    forma: e.target.checked,
                  });
                }}
              />
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

export default WisconsinInstructions;
