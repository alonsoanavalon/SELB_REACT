import React from "react";

function JapiFace({ type, backgroundColor, borderColor }) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        width: "8rem",
        height: "8rem",
        borderRadius: "9999px",
        border: `5px solid ${borderColor}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              backgroundColor: borderColor,
              width: "0.6rem",
              height: "0.6rem",
              borderRadius: "9999px",
            }}
          ></div>
          <div
            style={{
              backgroundColor: borderColor,
              width: "0.6rem",
              height: "0.6rem",
              borderRadius: "9999px",
            }}
          ></div>
        </div>

        {type === "red" && (
          <div
            style={{
              backgroundColor: `${borderColor}00`,
              width: "5rem",
              height: "1.9rem",
              border: `5px solid ${borderColor}`,
              borderBottom: 0,
              borderRadius: "120px 120px 0 0 / 90px 90px 0 0",
            }}
          ></div>
        )}

        {type === "orange" && (
          <div
            style={{
              backgroundColor: `${borderColor}00`,
              width: "5rem",
              height: "0.9rem",
              border: `5px solid ${borderColor}`,
              borderBottom: 0,
              marginTop: 10,
              borderRadius: "250px 250px 0 0 / 90px 90px 0 0",
            }}
          ></div>
        )}

        {type === "yellow" && (
          <div
            style={{
              backgroundColor: borderColor,
              width: "5rem",
              height: "0.3rem",
              marginTop: "0.7rem",
              borderRadius: "0.375rem",
            }}
          ></div>
        )}

        {type === "green" && (
          <div
            style={{
              backgroundColor: `${borderColor}00`,
              width: "5rem",
              height: "0.9rem",
              border: `5px solid ${borderColor}`,
              borderTop: 0,
              marginTop: 10,
              borderRadius: "0 0 250px 250px / 0 0 90px 90px",
            }}
          ></div>
        )}

        {type === "blue" && (
          <div
            style={{
              backgroundColor: `${borderColor}00`,
              width: "5rem",
              height: "1.9rem",
              border: `5px solid ${borderColor}`,
              borderTop: 0,
              borderRadius: "0 0 120px 120px / 0 0 90px 90px",
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default JapiFace;
