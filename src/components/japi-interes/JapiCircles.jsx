import React from "react";

const CIRCLE_SIZE = 32

function JapiCircles() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        justifyContent: "center",
        gap: "0.875rem",
      }}
    >
      {[...Array(6).keys()].map((index) => (
        <div
          key={`japi-circle-${index}`}
          style={{
            backgroundColor: "#0369a1",
            width: CIRCLE_SIZE * index + 1,
            height: CIRCLE_SIZE * index + 1,
            borderRadius: "9999px",
          }}
        ></div>
      ))}
    </div>
  );
}

export default JapiCircles;
