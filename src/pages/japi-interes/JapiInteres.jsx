import React from "react";

import JapiFace from "../../components/japi-interes/JapiFace";
import JapiCircles from "../../components/japi-interes/JapiCircles";

function JapiInteres() {
  return (
    <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <JapiFace
            type="red"
            backgroundColor="#ef4444"
            borderColor="#991b1b"
          />
          <JapiFace
            type="orange"
            backgroundColor="#f97316"
            borderColor="#9a3412"
          />
          <JapiFace
            type="yellow"
            backgroundColor="#facc15"
            borderColor="#a16207"
          />
          <JapiFace
            type="green"
            backgroundColor="#22c55e"
            borderColor="#166534"
          />
          <JapiFace
            type="blue"
            backgroundColor="#3b82f6"
            borderColor="#1e40af"
          />
        </div>

        <JapiCircles />
      </div>
    </div>
  );
}

export default JapiInteres;
