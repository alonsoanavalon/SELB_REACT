import { useEffect } from "react";
import { Form } from "react-bootstrap";

function WisconsinInstructions({
  section,
  setSection,
  instructions,
  specialMessage,
  checkboxs,
  setCheckboxs
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
              onChange={(e) => setCheckboxs({
                ...checkboxs,
                cantidad: e.target.checked
              })}
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
                  color: e.target.checked
                })
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
                  forma: e.target.checked
                })
              }}
            />
          </div>
        </Form>
      )}
    </div>
  );
}

export default WisconsinInstructions;
