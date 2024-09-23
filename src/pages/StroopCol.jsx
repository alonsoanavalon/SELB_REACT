import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { get } from 'idb-keyval';
import Instruction from "../components/Instruction";
import ConInst from "../components/StroopCol/Stroop palabra color_Congruente.wav";
import InconInst from "../components/StroopCol/Stroop palabra color_Incongruente.wav";
import ConMod1 from "../components/StroopCol/Congruente_Modelado 1.wav";
import ConMod2 from "../components/StroopCol/Congruente_Modelado 2.wav";
import ConMod3 from "../components/StroopCol/Congruente_Modelado 3.wav";
import ConMod4 from "../components/StroopCol/Congruente_Modelado 4.wav";
import InconMod1 from "../components/StroopCol/Incongruente_Modelado 1.wav";
import InconMod2 from "../components/StroopCol/Incongruente_Modelado 2.wav";
import InconMod3 from "../components/StroopCol/Incongruente_Modelado 3.wav";
import InconMod4 from "../components/StroopCol/Incongruente_Modelado 4.wav";
import Pract from "../components/StroopCol/Inicio Fase Práctica.wav";

export default function StroopCol() {
    const TIME_BEFORE_CROSS = 500;  // Tiempo en milisegundos para la pantalla negra antes de la cruz
    const TIME_CROSS_VISIBLE = 500; // Tiempo en milisegundos que la cruz de fijación es visible
    const TIME_AFTER_CROSS = 100;  // Tiempo en milisegundos para la pantalla negra después de la cruz
    const TIME_NUMBER_VISIBLE = 750; // Tiempo en milisegundos para mostrar el número
    const TIME_AFTER_NUMBER = 1000; // Tiempo en milisegundos después del número antes de la pantalla negra

    const [studentName, setStudentName] = useState("");

    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [isCrossVisible, setIsCrossVisible] = useState(false); // Inicialmente no mostrar la cruz
    const [isTextVisible, setIsTextVisible] = useState(false); // Inicialmente no mostrar el texto
    const [cycleRunning, setCycleRunning] = useState(false); // Controlar el ciclo
    const [isFinished, setIsFinished] = useState(false); // Inicialmente no mostrar el texto
    const startTimeRef = useRef(null);
    const audioRef = useRef(null);
    
    const [currentDictIndex, setCurrentDictIndex] = useState(0); // Índice del diccionario actual
    const [currentKeyIndex, setCurrentKeyIndex] = useState(0); // Clave actual en el diccionario
    const [instructionIndex, setInstructionIndex] = useState(0); // Clave actual en el diccionario
    const [highlight, setHighlight] = useState(0);
    const [practiceAttempts, setPracticeAttempts] = useState(0);

    useEffect(() => {
        get('selectedStudentName').then(studentName => setStudentName(studentName));
    }, []);

    const Color =
    {
        red: 'red',
        green: 'green',
        yellow: 'yellow',
        blue: 'blue',
    }

    
    const answers = useMemo(() =>
    {
        class StroopAnswer
        {
            constructor(score, time)
            {
                this.score = score;
                this.time = time;
            }
        }
    
        return [
          { 0: new StroopAnswer(-1, 0),   1: new StroopAnswer(-1, 0),   2: new StroopAnswer(-1, 0),   3: new StroopAnswer(-1, 0),   },

          { 0: new StroopAnswer(-1, 0),   1: new StroopAnswer(-1, 0),   2: new StroopAnswer(-1, 0),   3: new StroopAnswer(-1, 0),
            4: new StroopAnswer(-1, 0),   5: new StroopAnswer(-1, 0),   6: new StroopAnswer(-1, 0),   7: new StroopAnswer(-1, 0),
            8: new StroopAnswer(-1, 0),   9: new StroopAnswer(-1, 0),  10: new StroopAnswer(-1, 0),  11: new StroopAnswer(-1, 0),   },

          { 0: new StroopAnswer(-1, 0),   1: new StroopAnswer(-1, 0),   2: new StroopAnswer(-1, 0),   3: new StroopAnswer(-1, 0),
            4: new StroopAnswer(-1, 0),   5: new StroopAnswer(-1, 0),   6: new StroopAnswer(-1, 0),   7: new StroopAnswer(-1, 0),
            8: new StroopAnswer(-1, 0),   9: new StroopAnswer(-1, 0),  10: new StroopAnswer(-1, 0),  11: new StroopAnswer(-1, 0),
            12: new StroopAnswer(-1, 0),  13: new StroopAnswer(-1, 0),  14: new StroopAnswer(-1, 0),  15: new StroopAnswer(-1, 0),
            16: new StroopAnswer(-1, 0),  17: new StroopAnswer(-1, 0),  18: new StroopAnswer(-1, 0),  19: new StroopAnswer(-1, 0),
            20: new StroopAnswer(-1, 0),  21: new StroopAnswer(-1, 0),  22: new StroopAnswer(-1, 0),  23: new StroopAnswer(-1, 0),
            24: new StroopAnswer(-1, 0),  25: new StroopAnswer(-1, 0),  26: new StroopAnswer(-1, 0),  27: new StroopAnswer(-1, 0),
            28: new StroopAnswer(-1, 0),  29: new StroopAnswer(-1, 0),  30: new StroopAnswer(-1, 0),  31: new StroopAnswer(-1, 0),
            32: new StroopAnswer(-1, 0),  33: new StroopAnswer(-1, 0),  34: new StroopAnswer(-1, 0),  35: new StroopAnswer(-1, 0),
            36: new StroopAnswer(-1, 0),  37: new StroopAnswer(-1, 0),  38: new StroopAnswer(-1, 0),  39: new StroopAnswer(-1, 0),   },
            
          { 0: new StroopAnswer(-1, 0),   1: new StroopAnswer(-1, 0),   2: new StroopAnswer(-1, 0),   3: new StroopAnswer(-1, 0),   },

          { 0: new StroopAnswer(-1, 0),   1: new StroopAnswer(-1, 0),   2: new StroopAnswer(-1, 0),   3: new StroopAnswer(-1, 0),
            4: new StroopAnswer(-1, 0),   5: new StroopAnswer(-1, 0),   6: new StroopAnswer(-1, 0),   7: new StroopAnswer(-1, 0),
            8: new StroopAnswer(-1, 0),   9: new StroopAnswer(-1, 0),  10: new StroopAnswer(-1, 0),  11: new StroopAnswer(-1, 0),   },

          { 0: new StroopAnswer(-1, 0),   1: new StroopAnswer(-1, 0),   2: new StroopAnswer(-1, 0),   3: new StroopAnswer(-1, 0),
            4: new StroopAnswer(-1, 0),   5: new StroopAnswer(-1, 0),   6: new StroopAnswer(-1, 0),   7: new StroopAnswer(-1, 0),
            8: new StroopAnswer(-1, 0),   9: new StroopAnswer(-1, 0),  10: new StroopAnswer(-1, 0),  11: new StroopAnswer(-1, 0),
            12: new StroopAnswer(-1, 0),  13: new StroopAnswer(-1, 0),  14: new StroopAnswer(-1, 0),  15: new StroopAnswer(-1, 0),
            16: new StroopAnswer(-1, 0),  17: new StroopAnswer(-1, 0),  18: new StroopAnswer(-1, 0),  19: new StroopAnswer(-1, 0),
            20: new StroopAnswer(-1, 0),  21: new StroopAnswer(-1, 0),  22: new StroopAnswer(-1, 0),  23: new StroopAnswer(-1, 0),
            24: new StroopAnswer(-1, 0),  25: new StroopAnswer(-1, 0),  26: new StroopAnswer(-1, 0),  27: new StroopAnswer(-1, 0),
            28: new StroopAnswer(-1, 0),  29: new StroopAnswer(-1, 0),  30: new StroopAnswer(-1, 0),  31: new StroopAnswer(-1, 0),
            32: new StroopAnswer(-1, 0),  33: new StroopAnswer(-1, 0),  34: new StroopAnswer(-1, 0),  35: new StroopAnswer(-1, 0),
            36: new StroopAnswer(-1, 0),  37: new StroopAnswer(-1, 0),  38: new StroopAnswer(-1, 0),  39: new StroopAnswer(-1, 0),   }
        ]
    }, []);

    const instructionAudios = useMemo(() =>
    [
        { 0: ConInst, 1: ConMod1, 2: ConMod2, 3: ConMod3, 4: ConMod4, 5: Pract },
        {},
        {},
        { 0: InconInst, 1: InconMod1, 2: InconMod2, 3: InconMod3, 4: InconMod4, 5: Pract },
        {},
        {},
    ], []);

    const dictionaries = useMemo(() =>
    {
        class StroopElement
        {
            constructor(text, textColor, correctAnswer, comisionError)
            {
                this.text = text;
                this.textColor = textColor;
                this.correctAnswer = correctAnswer;
                this.comisionError = comisionError;
            }
        }

        return [
            // Congruente modelado
            {  0: new StroopElement("AZUL", Color.blue, null, null),             1: new StroopElement("ROJO", Color.red, null, null),
               2: new StroopElement("AMARILLO", Color.yellow, null, null),       3: new StroopElement("VERDE", Color.green, null, null)  
            },

            // Congruente práctica
            {  0: new StroopElement("ROJO", Color.red, Color.red, null),               1: new StroopElement("AZUL", Color.blue, Color.blue, null),
               2: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),     3: new StroopElement("VERDE", Color.green, Color.green, null),
               4: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),     5: new StroopElement("VERDE", Color.green, Color.green, null),
               6: new StroopElement("ROJO", Color.red, Color.red, null),               7: new StroopElement("AZUL", Color.blue, Color.blue, null),
               8: new StroopElement("ROJO", Color.red, Color.red, null),               9: new StroopElement("AZUL", Color.blue, Color.blue, null),
              10: new StroopElement("VERDE", Color.green, Color.green, null),         11: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null)  
            },

            // Congruente evaluación
            {  0: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),     1: new StroopElement("ROJO", Color.red, Color.red, null),
               2: new StroopElement("AZUL", Color.blue, Color.blue, null),             3: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),
               4: new StroopElement("VERDE", Color.green, Color.green, null),          5: new StroopElement("ROJO", Color.red, Color.red, null),
               6: new StroopElement("VERDE", Color.green, Color.green, null),          7: new StroopElement("ROJO", Color.red, Color.red, null),
               8: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),     9: new StroopElement("VERDE", Color.green, Color.green, null),
              10: new StroopElement("AZUL", Color.blue, Color.blue, null),            11: new StroopElement("VERDE", Color.green, Color.green, null),
              12: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),    13: new StroopElement("ROJO", Color.red, Color.red, null),
              14: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),    15: new StroopElement("AZUL", Color.blue, Color.blue, null),
              16: new StroopElement("VERDE", Color.green, Color.green, null),         17: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),
              18: new StroopElement("AZUL", Color.blue, Color.blue, null),            19: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),
              20: new StroopElement("VERDE", Color.green, Color.green, null),         21: new StroopElement("AZUL", Color.blue, Color.blue, null),
              22: new StroopElement("VERDE", Color.green, Color.green, null),         23: new StroopElement("AZUL", Color.blue, Color.blue, null),
              24: new StroopElement("ROJO", Color.red, Color.red, null),              25: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),
              26: new StroopElement("AZUL", Color.blue, Color.blue, null),            27: new StroopElement("ROJO", Color.red, Color.red, null),
              28: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),    29: new StroopElement("ROJO", Color.red, Color.red, null),
              30: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),    31: new StroopElement("AZUL", Color.blue, Color.blue, null),
              32: new StroopElement("ROJO", Color.red, Color.red, null),              33: new StroopElement("VERDE", Color.green, Color.green, null),
              34: new StroopElement("ROJO", Color.red, Color.red, null),              35: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),
              36: new StroopElement("VERDE", Color.green, Color.green, null),         37: new StroopElement("AMARILLO", Color.yellow, Color.yellow, null),
              38: new StroopElement("VERDE", Color.green, Color.green, null),         39: new StroopElement("ROJO", Color.red, Color.red, null)  
            },


            
            // Incongruente modelado
            {  0: new StroopElement("ROJO", Color.yellow, null, null),           1: new StroopElement("VERDE", Color.blue, null, null),
               2: new StroopElement("AMARILLO", Color.red, null, null),          3: new StroopElement("AZUL", Color.green, null, null)  
            },

            // Incongruente práctica
            {  0: new StroopElement("AMARILLO", Color.red, Color.red, Color.yellow),       1: new StroopElement("VERDE", Color.blue, Color.blue, Color.green),
               2: new StroopElement("ROJO", Color.yellow, Color.yellow, Color.red),        3: new StroopElement("AZUL", Color.green, Color.green, Color.blue),
               4: new StroopElement("ROJO", Color.yellow, Color.yellow, Color.red),        5: new StroopElement("VERDE", Color.blue, Color.blue, Color.green),
               6: new StroopElement("AMARILLO", Color.red, Color.red, Color.yellow),       7: new StroopElement("AZUL", Color.green, Color.green, Color.blue),
               8: new StroopElement("ROJO", Color.yellow, Color.yellow, Color.red),        9: new StroopElement("VERDE", Color.blue, Color.blue, Color.green), 
              10: new StroopElement("AMARILLO", Color.red, Color.red, Color.yellow),      11: new StroopElement("AZUL", Color.green, Color.green, Color.blue)  
            },

            // Incongruente evaluación
            {  0: new StroopElement("AMARILLO", Color.green, Color.green, Color.yellow),   1: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
               2: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.green),     3: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
               4: new StroopElement("AMARILLO", Color.green, Color.green, Color.yellow),   5: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
               6: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.green),     7: new StroopElement("ROJO", Color.blue, Color.blue, Color.red),
               8: new StroopElement("AMARILLO", Color.green, Color.green, Color.yellow),   9: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
              10: new StroopElement("AMARILLO", Color.green, Color.green, Color.yellow),  11: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
              12: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.green),    13: new StroopElement("ROJO", Color.blue, Color.blue, Color.red),
              14: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.green),    15: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
              16: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.green),    17: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
              18: new StroopElement("AMARILLO", Color.green, Color.green, Color.yellow),  19: new StroopElement("ROJO", Color.blue, Color.blue, Color.red),
              20: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.green),    21: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
              22: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.green),    23: new StroopElement("ROJO", Color.blue, Color.blue, Color.red),
              24: new StroopElement("AMARILLO", Color.green, Color.green, Color.yellow),  25: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
              26: new StroopElement("AMARILLO", Color.green, Color.green, Color.yellow),  27: new StroopElement("ROJO", Color.blue, Color.blue, Color.red),
              28: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.green),    29: new StroopElement("ROJO", Color.blue, Color.blue, Color.red),
              30: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.green),    31: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
              32: new StroopElement("AMARILLO", Color.green, Color.green, Color.yellow),  33: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
              34: new StroopElement("AMARILLO", Color.green, Color.green, Color.yellow),  35: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
              36: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.green),    37: new StroopElement("AZUL", Color.red, Color.red, Color.blue),
              38: new StroopElement("AMARILLO", Color.green, Color.green, Color.yellow),  39: new StroopElement("ROJO", Color.blue, Color.blue, Color.red),  
            }
        ]
    }, [Color.yellow, Color.blue, Color.green, Color.red]);

    function getMomentByDate(date)
    {
        let dateBegin;
        let dateUntil;
        get('moments').then(res =>
        {
            res.foreach(element =>
            {
                dateBegin = new Date(element['begin']).toLocaleDateString("zh-TW");
                dateUntil = new Date(element['until']).toLocaleDateString("zh-TW");
                if (date >= dateBegin && date <= dateUntil)
                {
                    return element['id'];
                }
            });
        });
    }

    async function saveTest(testAnswers)
    {
        // Implementar función para guardar respuestas del test
    }

    useEffect(() =>
    {
        const currentAudio = instructionAudios[currentDictIndex][instructionIndex];
        if (audioRef.current && currentAudio)
        {
            audioRef.current.src = currentAudio;
            audioRef.current.play().catch(error =>
            {
                console.error("Error al reproducir el audio \"" + currentAudio + "\":", error);
            });
        }
        
    }, [currentDictIndex, instructionAudios, instructionIndex]);

    useEffect(() =>
    {
        if (audioRef.current)
        {
            audioRef.current.onended = () =>
            {
                setInstructionIndex((prevIndex) =>
                {
                    if (prevIndex < instructionAudios.length)
                    {
                        return prevIndex + 1;
                    }
                });
            };
        }
    }, [audioRef, instructionAudios.length]);

    useEffect(() =>
    {
        if(currentDictIndex === 0)
        {
            switch(instructionIndex)
            {
                case 1:     setHighlight(3);    break;
                case 2:     setHighlight(1);    break;
                case 3:     setHighlight(4);    break;
                case 4:     setHighlight(2);    break;
                default:    setHighlight(null); break;
            }
        }
        else if(currentDictIndex === 3)
        {
            switch(instructionIndex)
            {
                case 1:     setHighlight(4);    break;
                case 2:     setHighlight(3);    break;
                case 3:     setHighlight(1);    break;
                case 4:     setHighlight(2);    break;
                default:    setHighlight(null); break;
            }
        }
        else
        {
            setInstructionIndex(0);
        }
    }, [currentDictIndex, instructionIndex])

    useEffect(() =>
    {
        if(instructionIndex > 0)
        {
            if(instructionIndex < Object.keys(dictionaries[currentDictIndex]).length + 1)
            {
                setIsTextVisible(true);
                setCurrentKeyIndex(instructionIndex - 1);
            }
            else if(instructionIndex === 6 && currentKeyIndex !== 0)
            {
                setCurrentDictIndex((prevIndex) => prevIndex + 1);
                switch(currentDictIndex)
                {
                    case 0:     console.log("--- Congruente: Fase de práctica (intento " + (practiceAttempts+1) + ") ---");   break;
                    case 3:     console.log("--- Incongruente: Fase de práctica (intento " + (practiceAttempts+1) + ") ---");   break;
                    default:    break;
                }
                setCurrentKeyIndex(0);
            }
            else
            {
                setIsTextVisible(false);
            }
        }
    }, [currentDictIndex, currentKeyIndex, dictionaries, instructionIndex, practiceAttempts]);

    const handleButtonClick = (answer, element) =>
    {
        setIsTextVisible(false);
        handleAnswer(answer, element);
        nextElement();
    };
    
    const handleAnswer = useCallback((answer, element) =>
    {
        let ans = 3;
        if(answer !== null)
        {
            if(answer === element.correctAnswer) ans = 1;
            else if(answer === element.comisionError) ans = 2;
            else ans = 4;
        }
        
        answers[currentDictIndex][currentKeyIndex].time = Date.now() - startTimeRef;
        answers[currentDictIndex][currentKeyIndex].score = ans;
        console.log(element.textColor + " -> pressed " + answer + " -> " + ans);
    }, [answers, currentDictIndex, currentKeyIndex, startTimeRef]);
    
    const handleSwitchDict = useCallback(() =>
    {
        if((currentDictIndex === 1 || currentDictIndex === 4) && practiceAttempts < 2)
        {
            const practice = answers[currentDictIndex];
            const requiredToPass = Math.ceil(Object.keys(practice).length * 0.6);
            let corrects = 0;
            for (let i = 0; i < Object.keys(practice).length; i++)
            {
                if(practice[i].score === 1) corrects++;
            }
            
            if(corrects < requiredToPass)
            {
                setPracticeAttempts(prev => prev + 1);
                setCurrentKeyIndex(0);

                switch(currentDictIndex)
                {
                    case 1:     console.log("--- Congruente: Fase de práctica (intento " + (practiceAttempts+2) + ") ---");   break;
                    case 4:     console.log("--- Incongruente: Fase de práctica (intento " + (practiceAttempts+2) + ") ---");   break;
                    default:    break;
                }
                return;
            }
        }
            
        let nextDictIndex = currentDictIndex + 1;
        
        switch(nextDictIndex)
        {
            case 2:     console.log("--- Congruente: Fase de evaluación ---");     break;
            case 3:     console.log("--- Incongruente: Fase de modelado ---");     break;
            case 5:     console.log("--- Incongruente: Fase de evaluación ---");   break;
            default:    break;
        }

        if (nextDictIndex >= dictionaries.length)
        {
            setIsFinished(true);
            return;
        }

        setPracticeAttempts(0);
        setCurrentDictIndex(nextDictIndex);
        setCurrentKeyIndex(0);
    }, [answers, currentDictIndex, dictionaries.length, practiceAttempts]);

    const nextElement = useCallback(() =>
    {
        const keys = Object.keys(dictionaries[currentDictIndex]);

        let nextKeyIndex = currentKeyIndex + 1;
        if (nextKeyIndex >= keys.length)
        {
            nextKeyIndex = 0; // Volver al primer elemento si se supera el último
            handleSwitchDict();
        }

        setCurrentKeyIndex(nextKeyIndex);
    }, [currentDictIndex, currentKeyIndex, dictionaries, handleSwitchDict])

    
    const timeoutRefs = useRef([]);
    
    useEffect(() =>
    {
        if(currentDictIndex === 0 || currentDictIndex === 3)
            setCycleRunning(false);
        else
            setCycleRunning(true);
    }, [currentDictIndex])

    const runCycle = useCallback(() =>
    {
        // Limpia temporizadores activos al iniciar un nuevo ciclo
        timeoutRefs.current.forEach(clearTimeout);
        timeoutRefs.current = [];

        // Pantalla negra antes de la cruz
        setIsCrossVisible(false);
        setIsTextVisible(false);
        setButtonsDisabled(true);

        timeoutRefs.current.push(setTimeout(() =>
        {
            // Mostrar cruz de fijación
            setIsCrossVisible(true);
            timeoutRefs.current.push(setTimeout(() =>
            {
                // Ocultar cruz y mostrar número
                setIsCrossVisible(false);
                timeoutRefs.current.push(setTimeout(() =>
                {
                    setIsTextVisible(true);
                    setButtonsDisabled(false);
                    startTimeRef.current = Date.now()
                    timeoutRefs.current.push(setTimeout(() =>
                    {
                        // Ocultar número y pasar a la pantalla negra
                        setIsTextVisible(false);
                        timeoutRefs.current.push(setTimeout(() =>
                        {
                            // Avanzar al siguiente ítem
                            handleAnswer(null, dictionaries[currentDictIndex][currentKeyIndex]);
                            nextElement();
                            
                        }, TIME_AFTER_NUMBER));
                    }, TIME_NUMBER_VISIBLE));
                }, TIME_AFTER_CROSS));
            }, TIME_CROSS_VISIBLE));
        }, TIME_BEFORE_CROSS));
    }, [currentDictIndex, currentKeyIndex, dictionaries, handleAnswer, nextElement]);
    
    useEffect(() =>
    {
        if (cycleRunning)
        {
            runCycle();
            setButtonsDisabled(false);
        }
        else
        {
            setButtonsDisabled(true);
        }
        // Limpieza al desmontar el componente
        return () =>
        {
            timeoutRefs.current.forEach(clearTimeout);
        };
    }, [cycleRunning, runCycle]);

    useEffect(() => 
    {
        if(isFinished)
        {
            setCycleRunning(false);
        }
    }, [isFinished])
    

    return (
        <div className="stroopcol-black-section">
            {isFinished ?
            (
                <Instruction checkpoint={true} instruction="Lo hiciste muy bien"/>
            ) : 
            (
                <>
                    {isCrossVisible && (
                        <div className="stroopcol-cross-container">
                            <div className="stroopcol-cross stroopcol-horizontal"></div>
                            <div className="stroopcol-cross stroopcol-vertical"></div>
                        </div>
                    )}

                    <div className="stroopcol-container">
                        {isTextVisible &&
                        (
                            <div style={{color: dictionaries[currentDictIndex][currentKeyIndex].textColor}} className="stroopcol-central-text"> {dictionaries[currentDictIndex][currentKeyIndex].text} </div>
                        )}
                        <div className="stroopcol-button-grid stroopcol-button-grid-left">
                            <button style={{backgroundColor: 'red'}}    className={`stroopcol-round-button ${highlight === 1 ? 'highlight' : ''}`} onClick={() => handleButtonClick(Color.red,    dictionaries[currentDictIndex][currentKeyIndex])} disabled={buttonsDisabled}></button>
                            <button className="stroopcol-no-button" disabled={true}></button>
                            <button className="stroopcol-no-button" disabled={true}></button>
                            <button style={{backgroundColor: 'green'}}  className={`stroopcol-round-button ${highlight === 2 ? 'highlight' : ''}`} onClick={() => handleButtonClick(Color.green,  dictionaries[currentDictIndex][currentKeyIndex])} disabled={buttonsDisabled}></button>
                        </div> 
                        <div className="stroopcol-button-grid stroopcol-button-grid-right">
                            <button className="stroopcol-no-button" disabled={true}></button>
                            <button style={{backgroundColor: 'yellow'}} className={`stroopcol-round-button ${highlight === 4 ? 'highlight' : ''}`} onClick={() => handleButtonClick(Color.yellow, dictionaries[currentDictIndex][currentKeyIndex])} disabled={buttonsDisabled}></button>
                            <button style={{backgroundColor: 'blue'}}   className={`stroopcol-round-button ${highlight === 3 ? 'highlight' : ''}`} onClick={() => handleButtonClick(Color.blue,   dictionaries[currentDictIndex][currentKeyIndex])} disabled={buttonsDisabled}></button>
                            <button className="stroopcol-no-button" disabled={true}></button>
                        </div> 
                        <audio ref={audioRef} />
                    </div>
                    </>
            )}

            <p style={{position:"absolute", textAlign:"start", left:"1rem", bottom:"-4rem", color: "#fff", opacity:0.13}}>Estudiante: {studentName && studentName} </p>
        </div>
    );
}
