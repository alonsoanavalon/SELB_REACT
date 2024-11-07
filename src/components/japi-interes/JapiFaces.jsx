import React from "react";
import JapiFace from "./JapiFace";

function JapiFaces({ setAnswer }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <JapiFace
        type="red"
        backgroundColor="#ef4444"
        borderColor="#991b1b"
        handleClick={() => setAnswer("roja")}
      />
      <JapiFace
        type="orange"
        backgroundColor="#f97316"
        borderColor="#9a3412"
        handleClick={() => setAnswer("naranja")}
      />
      <JapiFace
        type="yellow"
        backgroundColor="#facc15"
        borderColor="#a16207"
        handleClick={() => setAnswer("amarrilla")}
      />
      <JapiFace
        type="green"
        backgroundColor="#22c55e"
        borderColor="#166534"
        handleClick={() => setAnswer("verde")}
      />
      <JapiFace
        type="blue"
        backgroundColor="#3b82f6"
        borderColor="#1e40af"
        handleClick={() => setAnswer("azul")}
      />
    </div>
  );
}

export default JapiFaces;
