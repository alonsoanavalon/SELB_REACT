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
  const [sections, setSections] = useState([]);

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
    const formSections = generateRandomSections(FORM_VALUES, 1, "forma");
    // Generamos 10 casos aleatorios para color
    const colorSections = generateRandomSections(COLOR_VALUES, 11, "color");

    const randomSections = [...formSections, ...colorSections];

    setSections(randomSections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveTest = () => {
    console.log(sections);
  };

  return (
    <div
      style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem 1rem" }}
    >
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
      {sections.map(
        (wisconsinSection, index) =>
          index + 2 === section && (
            <WisconsinCards
              key={`section-${index}`}
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
              sections={sections}
              setSections={setSections}
            />
          )
      )}
      {section === sections.length + 2 && (
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
