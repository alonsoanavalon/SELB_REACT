import React from "react";
import JapiFace from "./JapiFace";

function JapiFaces({ setAnswer }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <JapiFace
        type="red"
        backgroundColor="#ef4444"
        borderColor="#991b1b"
        handleClick={() => setAnswer({ value: 1, item: "roja" })}
      />
      <JapiFace
        type="orange"
        backgroundColor="#f97316"
        borderColor="#9a3412"
        handleClick={() => setAnswer({ value: 2, item: "naranja" })}
      />
      <JapiFace
        type="yellow"
        backgroundColor="#facc15"
        borderColor="#a16207"
        handleClick={() => setAnswer({ value: 3, item: "amarilla" })}
      />
      <JapiFace
        type="green"
        backgroundColor="#22c55e"
        borderColor="#166534"
        handleClick={() => setAnswer({ value: 4, item: "verde" })}
      />
      <JapiFace
        type="blue"
        backgroundColor="#3b82f6"
        borderColor="#1e40af"
        handleClick={() => setAnswer({ value: 5, item: "azul" })}
      />
    </div>
  );
}

export default JapiFaces;
