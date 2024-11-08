import React from "react";

const CIRCLE_SIZE = 32;

const VALUES = {
  1: "te gusta jugar nada o casi nada de tiempo",
  2: "te gusta jugar un poco",
  3: "te gusta jugar más que un poco",
  4: "te gusta jugar un buen rato",
  5: "te gusta jugar mucho tiempo",
};

function JapiCircles({ setAnswer }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        justifyContent: "center",
        gap: "0.875rem",
      }}
    >
      {[...Array(6).keys()].map((_, index) => (
        <div
          key={`japi-circle-${index}`}
          style={{
            backgroundColor: "#0369a1",
            width: CIRCLE_SIZE * index + 1,
            height: CIRCLE_SIZE * index + 1,
            borderRadius: "9999px",
          }}
          onClick={() =>
            setAnswer({
              value: index,
              item: VALUES[index],
            })
          }
        ></div>
      ))}
    </div>
  );
}

export default JapiCircles;
