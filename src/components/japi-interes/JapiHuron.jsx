import React from "react";
import { Button } from "react-bootstrap";
import {
  MdOutlineNotStarted,
  MdOutlinePauseCircle,
  MdOutlineStopCircle,
} from "react-icons/md";
import { useSpeech } from "react-text-to-speech";

function JapiHuron({ text }) {
  const { start, pause, stop } = useSpeech({
    text: text,
    lang: "es-ES",
    voiceURI: "Microsoft Pablo - Spanish (Spain)",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      <Button
        onClick={start}
        size="lg"
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        <MdOutlineNotStarted style={{ width: "1.75rem", height: "1.75rem" }} />
        Iniciar
      </Button>
      <Button
        onClick={pause}
        size="lg"
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        <MdOutlinePauseCircle style={{ width: "1.75rem", height: "1.75rem" }} />
        Pausar
      </Button>
      <Button
        onClick={stop}
        size="lg"
        style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        <MdOutlineStopCircle style={{ width: "1.75rem", height: "1.75rem" }} />
        Parar
      </Button>
    </div>
  );
}

export default JapiHuron;
