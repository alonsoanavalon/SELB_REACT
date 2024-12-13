import { useEffect, useState } from "react";
import WisconsinInstructions from "../../components/wisconsin/WisconsinInstructions";
import WisconsinCards from "../../components/wisconsin/WisconsinCards";
import { Button } from "react-bootstrap";

const RANDOM_LENGTH = 10;
const FORM_VALUES = [
  { cardThreeSrc: "/images/wisconsin_tren_azul.png", correctAnswer: "a" },
  {
    cardThreeSrc: "/images/wisconsin_estrella_roja.png",
    correctAnswer: "l",
  },
];
const COLOR_VALUES = [
  { cardThreeSrc: "/images/wisconsin_tren_azul.png", correctAnswer: "l" },
  {
    cardThreeSrc: "/images/wisconsin_estrella_roja.png",
    correctAnswer: "a",
  },
];

function Wisconsin() {
  const [section, setSection] = useState(1);
  const [formaSections, setFormaSections] = useState([]);
  const [colorSections, setColorSections] = useState([]);

  const generateRandomArray = (values) => {
    const randomArray = [];

    for (let i = 0; i < RANDOM_LENGTH; i++) {
      const randomIndex = Math.floor(Math.random() * values.length);
      randomArray.push(values[randomIndex]);
    }

    return randomArray;
  };

  const generateRandomSections = (values, baseIndex, rule) => {
    const randomSections = generateRandomArray(values);
    const parserRandomSections = randomSections.map((randomSection, index) => {
      return {
        id: index + baseIndex,
        type: "cards",
        cardOneSrc: "/images/wisconsin_tren_rojo.png",
        cardTwoSrc: "/images/wisconsin_estrella_azul.png",
        cardThreeSrc: randomSection.cardThreeSrc,
        top: -286.52,
        right: -248,
        left: -252.9,
        messages: [],
        errorMessages: [],
        successMessages: [],
        correctAnswer: randomSection.correctAnswer,
        tutorial: false,
        item_id: null,
        rule: rule,
        answer: null,
        time: null,
      };
    });

    return parserRandomSections;
  };

  useEffect(() => {
    // Generamos 10 casos aleatorios para forma
    const randomFormaSections = generateRandomSections(FORM_VALUES, 1, "forma");
    // Generamos 10 casos aleatorios para color
    const randomColorSections = generateRandomSections(
      COLOR_VALUES,
      11,
      "color"
    );

    setFormaSections(randomFormaSections);
    setColorSections(randomColorSections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveTest = () => {
    console.log(formaSections);
    console.log(colorSections);
  };

  const completedSections = [...formaSections, ...colorSections].filter(
    (section) => section.answer != null
  ).length;
  const progressPercentage =
    (completedSections / [...formaSections, ...colorSections].length) * 100;

  return (
    <div
      style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem 1rem" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "0.25rem",
        }}
      >
        <span
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            fontWeight: "600",
          }}
        >
          Nivel 1
        </span>
        <span
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            fontWeight: "600",
          }}
        >
          Nivel 2
        </span>
        <span
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            fontWeight: "600",
          }}
        >
          Fin!
        </span>
      </div>

      <div
        style={{
          marginBottom: "1rem",
          width: "100%",
          backgroundColor: "#e5e7eb",
          borderRadius: "9999px",
          height: "0.625rem",
        }}
      >
        <div
          style={{
            height: "0.625rem",
            backgroundColor: "#3AAFB9",
            width: `${progressPercentage}%`,
            borderRadius: "9999px",
          }}
        ></div>
      </div>

      {section === 1 && (
        <WisconsinInstructions
          instructions={[
            "Vamos a completar tres tareas de correspondencias. Usted deberá ordenar las cartas por su color, forma o según el número de imágenes que aparecen.",
            "Para unir las cartas, se utilizan las teclas 'A', y la tecla 'L'. Si aprietas la tecla 'A' la carta irá a la izquierda, y si aprietas la 'L' irá a la derecha.",
            "Puedes tener sus dedos encima de las teclas para poder responder lo más rápido posible. Se requiere menos de 5 minutos para completar ambas tareas.",
          ]}
          specialMessage="Cuándo el participante esté listo, toca la 'N' para continuar."
          section={section}
          setSection={setSection}
        />
      )}
      {section === 2 && (
        <WisconsinCards
          cardOneSrc="/images/wisconsin_tren_rojo.png"
          cardTwoSrc="/images/wisconsin_estrella_azul.png"
          cardThreeSrc="/images/wisconsin_tren_azul.png"
          top={-286.52}
          right={-248}
          left={-252.9}
          messages={[
            "Ahora vamos a explicar el juego de formas. Selecciona la carta que coincida según su forma.",
          ]}
          errorMessages={[
            "Lo siento, esa no es la correcta. Recurda, debes ordenar la carta según su forma.",
          ]}
          successMessages={["Muy bien, seleccionaste la carta correcta."]}
          correctAnswer="a"
          tutorial={true}
          section={section}
          setSection={setSection}
          formaSections={null}
          setFormaSections={null}
          colorSections={null}
          setColorSections={null}
        />
      )}
      {section === 3 && (
        <WisconsinCards
          cardOneSrc="/images/wisconsin_tren_rojo.png"
          cardTwoSrc="/images/wisconsin_estrella_azul.png"
          cardThreeSrc="/images/wisconsin_estrella_roja.png"
          top={-286.52}
          right={-248}
          left={-252.9}
          messages={["Selecciona la carta que coincida según su forma."]}
          errorMessages={[
            "Lo siento, esa no es la correcta. Recurda, debes ordenar la carta según su forma.",
          ]}
          successMessages={["Muy bien, seleccionaste la carta correcta."]}
          correctAnswer="l"
          tutorial={true}
          section={section}
          setSection={setSection}
          formaSections={null}
          setFormaSections={null}
          colorSections={null}
          setColorSections={null}
        />
      )}
      {section === 14 && (
        <WisconsinCards
          cardOneSrc="/images/wisconsin_tren_rojo.png"
          cardTwoSrc="/images/wisconsin_estrella_azul.png"
          cardThreeSrc="/images/wisconsin_estrella_roja.png"
          top={-286.52}
          right={-248}
          left={-252.9}
          messages={[
            "Ahora vamos a explicar el juego de colores. Selecciona la carta que coincida según su color.",
          ]}
          errorMessages={[
            "Lo siento, esa no es la correcta. Recurda, debes ordenar la carta según su color.",
          ]}
          successMessages={["Muy bien, seleccionaste la carta correcta."]}
          correctAnswer="a"
          tutorial={true}
          section={section}
          setSection={setSection}
          formaSections={null}
          setFormaSections={null}
          colorSections={null}
          setColorSections={null}
        />
      )}
      {section === 15 && (
        <WisconsinCards
          cardOneSrc="/images/wisconsin_tren_rojo.png"
          cardTwoSrc="/images/wisconsin_estrella_azul.png"
          cardThreeSrc="/images/wisconsin_tren_azul.png"
          top={-286.52}
          right={-248}
          left={-252.9}
          messages={["Selecciona la carta que coincida según su color."]}
          errorMessages={[
            "Lo siento, esa no es la correcta. Recurda, debes ordenar la carta según su color.",
          ]}
          successMessages={["Muy bien, seleccionaste la carta correcta."]}
          correctAnswer="l"
          tutorial={true}
          section={section}
          setSection={setSection}
          formaSections={null}
          setFormaSections={null}
          colorSections={null}
          setColorSections={null}
        />
      )}
      {formaSections.map(
        (wisconsinSection, index) =>
          index + 4 === section && (
            <WisconsinCards
              key={`forma-${index}`}
              id={wisconsinSection.id}
              cardOneSrc={wisconsinSection.cardOneSrc}
              cardTwoSrc={wisconsinSection.cardTwoSrc}
              cardThreeSrc={wisconsinSection.cardThreeSrc}
              top={wisconsinSection.top}
              left={wisconsinSection.left}
              right={wisconsinSection.right}
              messages={wisconsinSection.messages}
              errorMessages={wisconsinSection.errorMessages}
              successMessages={wisconsinSection.successMessages}
              correctAnswer={wisconsinSection.correctAnswer}
              tutorial={wisconsinSection.tutorial}
              section={section}
              setSection={setSection}
              formaSections={formaSections}
              setFormaSections={setFormaSections}
              colorSections={colorSections}
              setColorSections={setColorSections}
            />
          )
      )}
      {colorSections.map(
        (wisconsinSection, index) =>
          index + 16 === section && (
            <WisconsinCards
              key={`color-${index}`}
              id={wisconsinSection.id}
              cardOneSrc={wisconsinSection.cardOneSrc}
              cardTwoSrc={wisconsinSection.cardTwoSrc}
              cardThreeSrc={wisconsinSection.cardThreeSrc}
              top={wisconsinSection.top}
              left={wisconsinSection.left}
              right={wisconsinSection.right}
              messages={wisconsinSection.messages}
              errorMessages={wisconsinSection.errorMessages}
              successMessages={wisconsinSection.successMessages}
              correctAnswer={wisconsinSection.correctAnswer}
              tutorial={wisconsinSection.tutorial}
              section={section}
              setSection={setSection}
              formaSections={formaSections}
              setFormaSections={setFormaSections}
              colorSections={colorSections}
              setColorSections={setColorSections}
            />
          )
      )}
      {section === 26 && (
        <div className="instruction">
          <p style={{ fontSize: "1.5rem", lineHeight: "1.75rem" }}>
            Súper, muchas gracias, lo hiciste muy bien!
          </p>

          <Button size="lg" onClick={saveTest}>
            Guardar Test
          </Button>
        </div>
      )}
    </div>
  );
}

export default Wisconsin;
