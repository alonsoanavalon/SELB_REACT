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
  const [cantidadSections, setCantidadSections] = useState([]);
  const [percentage, setPercentage] = useState(0);

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

  const cantidadesRandomSections = (baseIndex) => {
    const sections = [
      {
        cardOneSrc: "circle_blue_1.png",
        cardTwoSrc: "triangle_red_3.png",
        cardThreeSrc: "diamond_green_1.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "diamond_yellow_4.png",
        cardTwoSrc: "circle_red_1.png",
        cardThreeSrc: "star_blue_4.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "star_green_3.png",
        cardTwoSrc: "diamond_red_2.png",
        cardThreeSrc: "triangle_yellow_3.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "triangle_red_2.png",
        cardTwoSrc: "circle_blue_3.png",
        cardThreeSrc: "diamond_green_2.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "circle_blue_2.png",
        cardTwoSrc: "star_yellow_4.png",
        cardThreeSrc: "triangle_red_2.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "diamond_red_1.png",
        cardTwoSrc: "triangle_blue_2.png",
        cardThreeSrc: "circle_green_4.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "triangle_green_4.png",
        cardTwoSrc: "circle_yellow_2.png",
        cardThreeSrc: "star_blue_4.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "circle_yellow_3.png",
        cardTwoSrc: "triangle_blue_1.png",
        cardThreeSrc: "star_red_3.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "triangle_red_3.png",
        cardTwoSrc: "diamond_yellow_2.png",
        cardThreeSrc: "circle_green_3.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "star_blue_1.png",
        cardTwoSrc: "triangle_red_4.png",
        cardThreeSrc: "diamond_green_1.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "circle_yellow_4.png",
        cardTwoSrc: "triangle_blue_3.png",
        cardThreeSrc: "star_green_4.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "diamond_green_4.png",
        cardTwoSrc: "star_yellow_1.png",
        cardThreeSrc: "triangle_red_4.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "triangle_red_2.png",
        cardTwoSrc: "circle_green_3.png",
        cardThreeSrc: "diamond_yellow_2.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "star_yellow_3.png",
        cardTwoSrc: "circle_red_1.png",
        cardThreeSrc: "triangle_blue_3.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "diamond_yellow_1.png",
        cardTwoSrc: "triangle_green_3.png",
        cardThreeSrc: "circle_blue_1.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "circle_green_1.png",
        cardTwoSrc: "star_red_3.png",
        cardThreeSrc: "diamond_blue_3.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "diamond_blue_2.png",
        cardTwoSrc: "triangle_green_1.png",
        cardThreeSrc: "circle_red_1.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "star_yellow_2.png",
        cardTwoSrc: "circle_blue_4.png",
        cardThreeSrc: "triangle_red_4.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "triangle_yellow_2.png",
        cardTwoSrc: "diamond_red_4.png",
        cardThreeSrc: "circle_green_4.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "circle_red_2.png",
        cardTwoSrc: "star_blue_4.png",
        cardThreeSrc: "diamond_yellow_4.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "diamond_red_3.png",
        cardTwoSrc: "triangle_blue_4.png",
        cardThreeSrc: "circle_green_4.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "triangle_green_2.png",
        cardTwoSrc: "circle_yellow_4.png",
        cardThreeSrc: "star_blue_4.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "circle_blue_3.png",
        cardTwoSrc: "triangle_yellow_2.png",
        cardThreeSrc: "star_red_2.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "triangle_red_1.png",
        cardTwoSrc: "diamond_green_3.png",
        cardThreeSrc: "circle_yellow_3.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "star_blue_1.png",
        cardTwoSrc: "circle_red_3.png",
        cardThreeSrc: "triangle_yellow_3.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "circle_yellow_2.png",
        cardTwoSrc: "star_green_4.png",
        cardThreeSrc: "diamond_blue_4.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "diamond_green_4.png",
        cardTwoSrc: "triangle_blue_2.png",
        cardThreeSrc: "circle_red_2.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "star_green_1.png",
        cardTwoSrc: "circle_yellow_3.png",
        cardThreeSrc: "triangle_red_3.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "circle_green_2.png",
        cardTwoSrc: "diamond_red_1.png",
        cardThreeSrc: "star_blue_1.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "triangle_red_4.png",
        cardTwoSrc: "circle_blue_1.png",
        cardThreeSrc: "diamond_green_1.png",
        correctAnswer: "l",
      },
    ];

    const cantidadesSections = sections.map((cantidadSection, index) => {
      return {
        id: index + baseIndex,
        type: "cards",
        cardOneSrc: cantidadSection.cardOneSrc,
        cardTwoSrc: cantidadSection.cardTwoSrc,
        cardThreeSrc: cantidadSection.cardThreeSrc,
        top: -363,
        right: -252,
        left: -252.9,
        messages: [],
        errorMessages: [],
        successMessages: [],
        correctAnswer: cantidadSection.correctAnswer,
        tutorial: false,
        item_id: null,
        rule: "cantidades",
        answer: null,
        time: null,
      };
    });

    const randomCantidesSections = cantidadesSections
      .sort(() => 0.5 - Math.random()) // Desordenar aleatoriamente
      .slice(0, 10); // Tomar los primeros 10 elementos

    return randomCantidesSections;
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
    const randomCantidadSections = cantidadesRandomSections(21);

    setFormaSections(randomFormaSections);
    setColorSections(randomColorSections);
    setCantidadSections(randomCantidadSections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (section === 26) {
      const handleKeyDown = (event) => {
        if (event.key.toLowerCase() === "p") {
          setSection(section + 1);
        } else if (event.key.toLowerCase() === "m") {
          setPercentage(100)
          setSection(39);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [section]);

  const saveTest = () => {
    console.log(formaSections);
    console.log(colorSections);
    console.log(cantidadSections)
  };

  useEffect(() => {
    const completedSections = [
      ...formaSections,
      ...colorSections,
      ...cantidadSections,
    ].filter((section) => section.answer != null).length;

    const progressPercentage =
      (completedSections /
        [...formaSections, ...colorSections, ...cantidadSections].length) *
      100;

    setPercentage(progressPercentage);
  }, [formaSections, colorSections, cantidadSections]);

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
          Nivel 3
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
            width: `${percentage}%`,
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
        <WisconsinInstructions
          instructions={[
            "Para continuar al nivel 3 presiona la tecla P.",
            "Si desea finalizar el test presiona la tecla M.",
          ]}
          specialMessage=""
          section={section}
          setSection={setSection}
        />
      )}
      {section === 27 && (
        <WisconsinCards
          cardOneSrc={`/images/wisconsin/diamond_yellow_1.png`}
          cardTwoSrc={`/images/wisconsin/triangle_green_3.png`}
          cardThreeSrc={`/images/wisconsin/circle_blue_1.png`}
          top={-363}
          left={-252}
          right={-252.9}
          messages={[
            "Ahora vamos a jugar el juego por cantidades. Selecciona la carta según el número de figuras.",
          ]}
          errorMessages={[
            "Lo siento, esa no es la respuesta correcta. Recuerda seleccionar según el número de figuras.",
          ]}
          successMessages={["Muy bien. Seleccionaste la carta correcta."]}
          correctAnswer="a"
          tutorial={true}
          section={section}
          setSection={setSection}
          formaSections={formaSections}
          setFormaSections={setFormaSections}
          colorSections={colorSections}
          setColorSections={setColorSections}
        />
      )}
      {section === 28 && (
        <WisconsinCards
          cardOneSrc={`/images/wisconsin/triangle_yellow_2.png`}
          cardTwoSrc={`/images/wisconsin/diamond_red_4.png`}
          cardThreeSrc={`/images/wisconsin/circle_green_4.png`}
          top={-363}
          left={-252}
          right={-252.9}
          messages={["Selecciona la carta según el número de figuras."]}
          errorMessages={[
            "Lo siento, esa no es la respuesta correcta. Recuerda seleccionar según el número de figuras.",
          ]}
          successMessages={["Muy bien. Seleccionaste la carta correcta."]}
          correctAnswer="l"
          tutorial={true}
          section={section}
          setSection={setSection}
          formaSections={formaSections}
          setFormaSections={setFormaSections}
          colorSections={colorSections}
          setColorSections={setColorSections}
        />
      )}
      {cantidadSections.map(
        (wisconsinSection, index) =>
          index + 29 === section && (
            <WisconsinCards
              key={`color-${index}`}
              id={wisconsinSection.id}
              cardOneSrc={`/images/wisconsin/${wisconsinSection.cardOneSrc}`}
              cardTwoSrc={`/images/wisconsin/${wisconsinSection.cardTwoSrc}`}
              cardThreeSrc={`/images/wisconsin/${wisconsinSection.cardThreeSrc}`}
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
              cantidadSections={cantidadSections}
              setCantidadSections={setCantidadSections}
            />
          )
      )}
      {section === 39 && (
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
