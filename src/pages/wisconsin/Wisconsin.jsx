import { useEffect, useState } from "react";
import WisconsinInstructions from "../../components/wisconsin/WisconsinInstructions";
import WisconsinCards from "../../components/wisconsin/WisconsinCards";
import { Button } from "react-bootstrap";
import { getMany, set, update, get } from "idb-keyval";
import useDisableBack from "../../hooks/useDisableBack";
import { useNavigate } from "react-router-dom";

/* QUERIES

  * INSERT INTO instrument (name, instrument_type_id) VALUES ('Tarea de cartas', 1); => 27

    1161 - 1232
  * INSERT INTO item (item_type_id, instrument_id, num, title, description) VALUES
(1, 27, 1, null, 'respuesta_pregunta_1'),
(1, 27, 1, null, 'tiempo_pregunta_1'),
(1, 27, 2, null, 'respuesta_pregunta_2'),
(1, 27, 2, null, 'tiempo_pregunta_2'),
(1, 27, 3, null, 'respuesta_pregunta_3'),
(1, 27, 3, null, 'tiempo_pregunta_3'),
(1, 27, 4, null, 'respuesta_pregunta_4'),
(1, 27, 4, null, 'tiempo_pregunta_4'),
(1, 27, 5, null, 'respuesta_pregunta_5'),
(1, 27, 5, null, 'tiempo_pregunta_5'),
(1, 27, 6, null, 'respuesta_pregunta_6'),
(1, 27, 6, null, 'tiempo_pregunta_6'),
(1, 27, 7, null, 'respuesta_pregunta_7'),
(1, 27, 7, null, 'tiempo_pregunta_7'),
(1, 27, 8, null, 'respuesta_pregunta_8'),
(1, 27, 8, null, 'tiempo_pregunta_8'),
(1, 27, 9, null, 'respuesta_pregunta_9'),
(1, 27, 9, null, 'tiempo_pregunta_9'),
(1, 27, 10, null, 'respuesta_pregunta_10'),
(1, 27, 10, null, 'tiempo_pregunta_10'),
(1, 27, 11, null, 'respuesta_pregunta_11'),
(1, 27, 11, null, 'tiempo_pregunta_11'),
(1, 27, 12, null, 'respuesta_pregunta_12'),
(1, 27, 12, null, 'tiempo_pregunta_12'),
(1, 27, 13, null, 'respuesta_pregunta_13'),
(1, 27, 13, null, 'tiempo_pregunta_13'),
(1, 27, 14, null, 'respuesta_pregunta_14'),
(1, 27, 14, null, 'tiempo_pregunta_14'),
(1, 27, 15, null, 'respuesta_pregunta_15'),
(1, 27, 15, null, 'tiempo_pregunta_15'),
(1, 27, 16, null, 'respuesta_pregunta_16'),
(1, 27, 16, null, 'tiempo_pregunta_16'),
(1, 27, 17, null, 'respuesta_pregunta_17'),
(1, 27, 17, null, 'tiempo_pregunta_17'),
(1, 27, 18, null, 'respuesta_pregunta_18'),
(1, 27, 18, null, 'tiempo_pregunta_18'),
(1, 27, 19, null, 'respuesta_pregunta_19'),
(1, 27, 19, null, 'tiempo_pregunta_19'),
(1, 27, 20, null, 'respuesta_pregunta_20'),
(1, 27, 20, null, 'tiempo_pregunta_20'),
(1, 27, 21, null, 'respuesta_pregunta_21'),
(1, 27, 21, null, 'tiempo_pregunta_21'),
(1, 27, 22, null, 'respuesta_pregunta_22'),
(1, 27, 22, null, 'tiempo_pregunta_22'),
(1, 27, 23, null, 'respuesta_pregunta_23'),
(1, 27, 23, null, 'tiempo_pregunta_23'),
(1, 27, 24, null, 'respuesta_pregunta_24'),
(1, 27, 24, null, 'tiempo_pregunta_24'),
(1, 27, 25, null, 'respuesta_pregunta_25'),
(1, 27, 25, null, 'tiempo_pregunta_25'),
(1, 27, 26, null, 'respuesta_pregunta_26'),
(1, 27, 26, null, 'tiempo_pregunta_26'),
(1, 27, 27, null, 'respuesta_pregunta_27'),
(1, 27, 27, null, 'tiempo_pregunta_27'),
(1, 27, 28, null, 'respuesta_pregunta_28'),
(1, 27, 28, null, 'tiempo_pregunta_28'),
(1, 27, 29, null, 'respuesta_pregunta_29'),
(1, 27, 29, null, 'tiempo_pregunta_29'),
(1, 27, 30, null, 'respuesta_pregunta_30'),
(1, 27, 30, null, 'tiempo_pregunta_30'),
(1, 27, 31, null, 'respuesta_pregunta_31'),
(1, 27, 31, null, 'tiempo_pregunta_31'),
(1, 27, 32, null, 'respuesta_pregunta_32'),
(1, 27, 32, null, 'tiempo_pregunta_32'),
(1, 27, 33, null, 'respuesta_pregunta_33'),
(1, 27, 33, null, 'tiempo_pregunta_33'),
(1, 27, 34, null, 'respuesta_pregunta_34'),
(1, 27, 34, null, 'tiempo_pregunta_34'),
(1, 27, 35, null, 'respuesta_pregunta_35'),
(1, 27, 35, null, 'tiempo_pregunta_35'),
(1, 27, 36, null, 'respuesta_pregunta_36'),
(1, 27, 36, null, 'tiempo_pregunta_36');

*/

const RANDOM_LENGTH = 12;
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
  const [cantidadColorSections, setCantidadColorSections] = useState([]);
  const [percentage, setPercentage] = useState(0);

  useDisableBack();
  const navigate = useNavigate();

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
    const cantidadOptions = [
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
        cardThreeSrc: "circle_green_1.png",
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

    const cantidadColorOptions = [
      {
        cardOneSrc: "circle_blue_1.png",
        cardTwoSrc: "triangle_red_3.png",
        cardThreeSrc: "diamond_blue_3.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "diamond_yellow_4.png",
        cardTwoSrc: "circle_red_1.png",
        cardThreeSrc: "star_yellow_1.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "star_green_3.png",
        cardTwoSrc: "diamond_red_2.png",
        cardThreeSrc: "triangle_green_2.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "triangle_red_2.png",
        cardTwoSrc: "circle_blue_3.png",
        cardThreeSrc: "diamond_red_3.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "circle_blue_2.png",
        cardTwoSrc: "star_yellow_4.png",
        cardThreeSrc: "triangle_blue_4.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "diamond_red_1.png",
        cardTwoSrc: "triangle_blue_2.png",
        cardThreeSrc: "circle_red_2.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "triangle_green_4.png",
        cardTwoSrc: "circle_yellow_2.png",
        cardThreeSrc: "star_green_2.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "circle_yellow_3.png",
        cardTwoSrc: "triangle_blue_1.png",
        cardThreeSrc: "star_yellow_1.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "triangle_red_3.png",
        cardTwoSrc: "diamond_yellow_2.png",
        cardThreeSrc: "circle_red_2.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "star_blue_1.png",
        cardTwoSrc: "triangle_red_4.png",
        cardThreeSrc: "diamond_blue_4.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "circle_yellow_4.png",
        cardTwoSrc: "triangle_blue_3.png",
        cardThreeSrc: "star_yellow_3.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "diamond_green_4.png",
        cardTwoSrc: "star_yellow_1.png",
        cardThreeSrc: "triangle_green_1.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "triangle_red_2.png",
        cardTwoSrc: "circle_green_3.png",
        cardThreeSrc: "diamond_red_3.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "star_yellow_3.png",
        cardTwoSrc: "circle_red_1.png",
        cardThreeSrc: "triangle_yellow_1.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "diamond_yellow_1.png",
        cardTwoSrc: "triangle_green_3.png",
        cardThreeSrc: "circle_yellow_3.png",
        correctAnswer: "a",
      },
      {
        cardOneSrc: "circle_green_1.png",
        cardTwoSrc: "star_red_3.png",
        cardThreeSrc: "diamond_red_1.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "diamond_blue_2.png",
        cardTwoSrc: "triangle_green_1.png",
        cardThreeSrc: "circle_green_2.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "star_yellow_2.png",
        cardTwoSrc: "circle_blue_4.png",
        cardThreeSrc: "triangle_blue_2.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "triangle_yellow_2.png",
        cardTwoSrc: "diamond_red_4.png",
        cardThreeSrc: "circle_red_2.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "circle_red_2.png",
        cardTwoSrc: "star_blue_4.png",
        cardThreeSrc: "diamond_blue_2.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "diamond_red_3.png",
        cardTwoSrc: "triangle_blue_4.png",
        cardThreeSrc: "circle_blue_3.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "triangle_green_2.png",
        cardTwoSrc: "circle_yellow_4.png",
        cardThreeSrc: "star_yellow_2.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "circle_blue_3.png",
        cardTwoSrc: "triangle_yellow_2.png",
        cardThreeSrc: "star_yellow_3.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "triangle_red_1.png",
        cardTwoSrc: "diamond_green_3.png",
        cardThreeSrc: "circle_green_1.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "star_blue_1.png",
        cardTwoSrc: "circle_red_3.png",
        cardThreeSrc: "triangle_red_1.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "circle_yellow_2.png",
        cardTwoSrc: "star_green_4.png",
        cardThreeSrc: "diamond_green_2.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "diamond_green_4.png",
        cardTwoSrc: "triangle_blue_2.png",
        cardThreeSrc: "circle_blue_4.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "star_green_1.png",
        cardTwoSrc: "circle_yellow_3.png",
        cardThreeSrc: "triangle_yellow_1.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "circle_green_2.png",
        cardTwoSrc: "diamond_red_1.png",
        cardThreeSrc: "star_red_2.png",
        correctAnswer: "l",
      },
      {
        cardOneSrc: "triangle_red_4.png",
        cardTwoSrc: "circle_blue_1.png",
        cardThreeSrc: "diamond_blue_4.png",
        correctAnswer: "l",
      },
    ];

    const cantidadesSections = cantidadOptions.map((cantidadSection, index) => {
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

    const cantidadesColoresSections = cantidadColorOptions.map(
      (cantidadSection, index) => {
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
      }
    );

    const randomCantidesSections = cantidadesSections
      .sort(() => 0.5 - Math.random()) // Desordenar aleatoriamente
      .slice(0, RANDOM_LENGTH / 2); // Tomar los primeros 10 elementos

    const randomCantidadesColorSections = cantidadesColoresSections
      .sort(() => 0.5 - Math.random())
      .slice(0, RANDOM_LENGTH / 2);

    return { randomCantidesSections, randomCantidadesColorSections };
  };

  useEffect(() => {
    // Generamos 10 casos aleatorios para forma
    const randomFormaSections = generateRandomSections(FORM_VALUES, 1, "forma");
    // Generamos 10 casos aleatorios para color
    const randomColorSections = generateRandomSections(
      COLOR_VALUES,
      13,
      "color"
    );
    const { randomCantidadesColorSections, randomCantidesSections } =
      cantidadesRandomSections(23);

    setFormaSections(randomFormaSections);
    setColorSections(randomColorSections);
    setCantidadSections(randomCantidesSections);
    setCantidadColorSections(randomCantidadesColorSections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (section === 4) {
      const handleKeyDown = (event) => {
        if (event.key.toLowerCase() === "n") {
          setSection(section + 1);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }

    if (section === 32) {
      const handleKeyDown = (event) => {
        if (event.key.toLowerCase() === "p") {
          setSection(section + 1);
        } else if (event.key.toLowerCase() === "m") {
          setPercentage(100);
          setSection(51);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [section]);

  const saveTest = async () => {
    const choicesArray = [];
    let instrumentInfo = {};
    let choices = {};

    const [selectedStudent, userData] = await getMany([
      "selectedStudent",
      "userData",
    ]);

    instrumentInfo["user_id"] = parseInt(userData["id"]);
    instrumentInfo["student_id"] = parseInt(selectedStudent);
    instrumentInfo["date"] = `${new Date().getFullYear()}/${
      new Date().getMonth() + 1
    }/${new Date().getDate()}`;
    instrumentInfo["instrument"] = 27;

    choicesArray.push(instrumentInfo);

    let itemID = 1161;

    for (let i = 0; i < formaSections.length; i++) {
      const { answer, time } = formaSections[i];
      choices[itemID] = answer;

      itemID++;

      choices[itemID] = time;

      itemID++;
    }

    for (let i = 0; i < colorSections.length; i++) {
      const { answer, time } = colorSections[i];
      choices[itemID] = answer;

      itemID++;

      choices[itemID] = time;

      itemID++;
    }

    for (let i = 0; i < cantidadSections.length; i++) {
      const { answer, time } = cantidadSections[i];
      choices[itemID] = answer;

      itemID++;

      choices[itemID] = time;

      itemID++;
    }

    for (let i = 0; i < cantidadColorSections.length; i++) {
      const { answer, time } = cantidadColorSections[i];
      choices[itemID] = answer;

      itemID++;

      choices[itemID] = time;

      itemID++;
    }

    choicesArray.push(choices);

    const backupTest = await get("backupTest");
    if (Array.isArray(backupTest) && backupTest.length > 0) {
      const completedTests = await get("completedTests");

      if (!Array.isArray(completedTests)) {
        return;
      }

      if (backupTest.length >= completedTests.length) {
        await update("backupTest", () => [...backupTest, choicesArray]);
      }
    }

    const completedTests = await get("completedTests");

    if (Array.isArray(completedTests)) {
      await update("completedTests", () => [...completedTests, choicesArray]);
    } else {
      await set("completedTests", [choicesArray]);
    }

    navigate("/");
  };

  useEffect(() => {
    const completedSections = [
      ...formaSections,
      ...colorSections,
      ...cantidadSections,
      ...cantidadColorSections,
    ].filter((section) => section.answer != null).length;

    const progressPercentage =
      (completedSections /
        [
          ...formaSections,
          ...colorSections,
          ...cantidadSections,
          ...cantidadColorSections,
        ].length) *
      100;

    setPercentage(progressPercentage);
  }, [formaSections, colorSections, cantidadSections, cantidadColorSections]);

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
            "Ahora vamos a jugar el juego de formas. Queremos ordenar la carta de abajo según su forma.",
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
      {section === 4 && (
        <WisconsinInstructions
          instructions={[]}
          specialMessage="Cuándo el participante esté listo, toca la 'N' para continuar."
          section={section}
          setSection={setSection}
        />
      )}
      {formaSections.map(
        (wisconsinSection, index) =>
          index + 5 === section && (
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
      {section === 17 && (
        <WisconsinCards
          cardOneSrc="/images/wisconsin_tren_rojo.png"
          cardTwoSrc="/images/wisconsin_estrella_azul.png"
          cardThreeSrc="/images/wisconsin_estrella_roja.png"
          top={-286.52}
          right={-248}
          left={-252.9}
          messages={[
            "Ahora vamos a jugar el juego de colores. Queremos ordenar la carta de abajo según su color.",
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
      {section === 18 && (
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
      {section === 19 && (
        <WisconsinInstructions
          instructions={[]}
          specialMessage="Cuándo el participante esté listo, toca la 'N' para continuar."
          section={section}
          setSection={setSection}
        />
      )}
      {colorSections.map(
        (wisconsinSection, index) =>
          index + 20 === section && (
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
      {section === 32 && (
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
      {section === 33 && (
        <WisconsinCards
          cardOneSrc={`/images/wisconsin/diamond_yellow_1.png`}
          cardTwoSrc={`/images/wisconsin/triangle_green_3.png`}
          cardThreeSrc={`/images/wisconsin/circle_blue_1.png`}
          top={-363}
          left={-252}
          right={-252.9}
          messages={[
            "Ahora vamos a jugar el juego por cantidades. Queremos seleccionar la carta de abajo según el número de figuras.",
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
      {section === 34 && (
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
      {section === 35 && (
        <WisconsinInstructions
          instructions={[]}
          specialMessage="Cuándo el participante esté listo, toca la 'N' para continuar."
          section={section}
          setSection={setSection}
        />
      )}
      {cantidadSections.map(
        (wisconsinSection, index) =>
          index + 36 === section && (
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
      {section === 42 && (
        <WisconsinCards
          cardOneSrc={`/images/wisconsin/diamond_yellow_1.png`}
          cardTwoSrc={`/images/wisconsin/triangle_green_3.png`}
          cardThreeSrc={`/images/wisconsin/circle_yellow_3.png`}
          top={-363}
          left={-252}
          right={-252.9}
          messages={[
            "Ahora vamos a jugar el juego de colores. Queremos ordenar la carta de abajo según su color.",
          ]}
          errorMessages={[
            "Lo siento, esa no es la respuesta correcta. Recuerda seleccionar según el color.",
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
      {section === 43 && (
        <WisconsinCards
          cardOneSrc={`/images/wisconsin/triangle_yellow_2.png`}
          cardTwoSrc={`/images/wisconsin/diamond_red_4.png`}
          cardThreeSrc={`/images/wisconsin/circle_red_2.png`}
          top={-363}
          left={-252}
          right={-252.9}
          messages={["Selecciona la carta según el color."]}
          errorMessages={[
            "Lo siento, esa no es la respuesta correcta. Recuerda seleccionar según el color.",
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
      {section === 44 && (
        <WisconsinInstructions
          instructions={[]}
          specialMessage="Cuándo el participante esté listo, toca la 'N' para continuar."
          section={section}
          setSection={setSection}
        />
      )}
      {cantidadColorSections.map(
        (wisconsinSection, index) =>
          index + 45 === section && (
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
              cantidadColorSections={cantidadColorSections}
              setCantidadColorSections={setCantidadColorSections}
            />
          )
      )}
      {section === 51 && (
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
