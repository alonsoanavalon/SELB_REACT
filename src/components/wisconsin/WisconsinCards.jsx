import { useState, useEffect, useRef } from "react";

function WisconsinCards({
  id,
  cardOneSrc,
  cardTwoSrc,
  cardThreeSrc,
  top,
  left,
  right,
  messages,
  errorMessages,
  successMessages,
  correctAnswer,
  tutorial,
  section,
  setSection,
  formaSections,
  setFormaSections,
  colorSections,
  setColorSections,
}) {
  const [isOverlapping, setIsOverlapping] = useState(null);
  const [errorTutorial, setErrorTutorial] = useState(false);
  const [errorAnswer, setErrorAnswer] = useState(false);
  const [successAnswer, setSuccessAnswer] = useState(false);

  const cardThreeRef = useRef(null);

  useEffect(() => {
    const startTime = Date.now();

    const handleKeyDown = (e) => {
      const elapsedTime = Date.now() - startTime;

      const answer = e.key.toLowerCase();

      if (tutorial) {
        if (answer === correctAnswer) {
          if (answer === "a") {
            setIsOverlapping("left");
          } else if (answer === "l") {
            setIsOverlapping("right");
          }

          setSuccessAnswer(true);

          setTimeout(() => {
            setSection(section + 1);
          }, 3000);
        } else {
          setErrorTutorial(true);
          setErrorAnswer(true);
          setIsOverlapping(null);
        }
      } else {
        if (answer === "a") {
          setIsOverlapping("left");
        } else if (answer === "l") {
          setIsOverlapping("right");
        }

        let audioURL = "";
        if (answer === correctAnswer) {
          audioURL = "/sounds/wisconsin-correct.wav";
        } else {
          audioURL = "/sounds/wisconsin-incorrect.wav";
        }

        const audio = new Audio(audioURL);
        audio.play();

        if (section >= 4 && section <= 13) {
          const newFormaSections = formaSections.map((card) =>
            card.id === id
              ? {
                  ...card,
                  answer: answer === correctAnswer ? 1 : 0,
                  time: elapsedTime,
                }
              : card
          );

          setFormaSections(newFormaSections);
        }

        if (section >= 16 && section <= 25) {
          const newColorSections = colorSections.map((card) =>
            card.id === id
              ? {
                  ...card,
                  answer: answer === correctAnswer ? 1 : 0,
                  time: elapsedTime,
                }
              : card
          );

          setColorSections(newColorSections);
        }

        setTimeout(() => {
          setSection(section + 1);
        }, 2000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cardElement = cardThreeRef.current;

    if (cardElement) {
      const handleAnimationEnd = () => {
        setErrorTutorial(false); // Restablece el estado cuando termine la animación
      };

      cardElement.addEventListener("animationend", handleAnimationEnd);

      return () => {
        cardElement.removeEventListener("animationend", handleAnimationEnd);
      };
    }
  }, [cardThreeRef]);

  useEffect(() => {
    setTimeout(() => {
      setErrorAnswer(false);
    }, 7000);
  }, [errorAnswer]);

  return (
    <div>
      {messages.length > 0 && (
        <div className="instruction">
          <p style={{ fontSize: "1.5rem", lineHeight: "1.75rem" }}>
            {successMessages && successAnswer
              ? successMessages.map((message) => <p>{message}</p>)
              : errorMessages && errorAnswer
              ? errorMessages.map((message) => <p>{message}</p>)
              : messages.map((message) => <p>{message}</p>)}
          </p>
        </div>
      )}

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "1rem",
          position: "relative",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            border: "5px solid #030712",
            borderRadius: "1.5rem",
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            width: "100%",
            zIndex: isOverlapping === "left" ? 0 : 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={cardOneSrc} alt="Card One" />
        </div>
        <div
          style={{
            padding: "1.5rem",
            border: "5px solid #030712",
            borderRadius: "1.5rem",
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            width: "100%",
            zIndex: isOverlapping === "right" ? 0 : 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={cardTwoSrc} alt="Card Two" />
        </div>
      </div>

      <div
        style={{
          marginTop: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          top: isOverlapping === "right" || isOverlapping === "left" ? top : 0,
          left: isOverlapping === "left" ? left : null,
          right: isOverlapping === "right" ? right : null,
          transition: "top 1s ease",
          zIndex: isOverlapping ? 1 : 0,
        }}
      >
        <div
          ref={cardThreeRef}
          style={{
            padding: "1.5rem",
            border: "5px solid #030712",
            borderRadius: "1.5rem",
            boxShadow:
              "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            width: "49%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={errorTutorial ? "shake" : ""}
        >
          <img src={cardThreeSrc} alt={cardThreeSrc} />
        </div>
      </div>
    </div>
  );
}

export default WisconsinCards;
