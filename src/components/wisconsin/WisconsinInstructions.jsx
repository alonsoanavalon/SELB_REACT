import { useEffect } from "react";

function WisconsinInstructions({
  section,
  setSection,
  instructions,
  specialMessage,
}) {
  useEffect(() => {
    if (section !== 1) {
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "n") {
        setSection(2);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  return (
    <div
      className="instruction"
      style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
    >
      {instructions.map((instruction) => (
        <p key={instruction}>{instruction}</p>
      ))}

      {specialMessage && (
        <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
          {specialMessage}
        </span>
      )}
    </div>
  );
}

export default WisconsinInstructions;
