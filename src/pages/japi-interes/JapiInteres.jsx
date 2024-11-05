import React from "react";

import Face from "../../components/japi-interes/Face";

function JapiInteres() {
  return (
    <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <Face type="red" backgroundColor="#ef4444" borderColor="#991b1b" />
        <Face type="orange" backgroundColor="#f97316" borderColor="#9a3412" />
        <Face type="yellow" backgroundColor="#eab308" borderColor="#854d0e" />
        <Face type="green" backgroundColor="#22c55e" borderColor="#166534" />
        <Face type="blue" backgroundColor="#3b82f6" borderColor="#1e40af" />
      </div>
    </div>
  );
}

export default JapiInteres;
