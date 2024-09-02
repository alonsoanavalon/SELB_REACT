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
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const audioRef = useRef(null);
    
    const [currentDictIndex, setCurrentDictIndex] = useState(0); // Índice del diccionario actual
    const [currentKeyIndex, setCurrentKeyIndex] = useState(0); // Clave actual en el diccionario
    const [instructionIndex, setInstructionIndex] = useState(0); // Clave actual en el diccionario
    const [highlight, setHighlight] = useState(0);

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
            {  0: new StroopElement("AZUL", Color.blue, Color.null, Color.null),             1: new StroopElement("ROJO", Color.red, Color.null, Color.null),
            2: new StroopElement("AMARILLO", Color.yellow, Color.null, Color.null),       3: new StroopElement("VERDE", Color.green, Color.null, Color.null)  
            },

            // Congruente práctica
            {  0: new StroopElement("ROJO", Color.red, Color.red, Color.null),               1: new StroopElement("AZUL", Color.blue, Color.blue, Color.null),
            //    2: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),     3: new StroopElement("VERDE", Color.green, Color.green, Color.null),
            //    4: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),     5: new StroopElement("VERDE", Color.green, Color.green, Color.null),
            //    6: new StroopElement("ROJO", Color.red, Color.red, Color.null),               7: new StroopElement("AZUL", Color.blue, Color.blue, Color.null),
            //    8: new StroopElement("ROJO", Color.red, Color.red, Color.null),               9: new StroopElement("AZUL", Color.blue, Color.blue, Color.null),
            //   10: new StroopElement("VERDE", Color.green, Color.green, Color.null),         11: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null)  
            },

            // Congruente evaluación
            {  0: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),     1: new StroopElement("ROJO", Color.red, Color.red, Color.null),
            //    2: new StroopElement("AZUL", Color.blue, Color.blue, Color.null),             3: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),
            //    4: new StroopElement("VERDE", Color.green, Color.green, Color.null),          5: new StroopElement("ROJO", Color.red, Color.red, Color.null),
            //    6: new StroopElement("VERDE", Color.green, Color.green, Color.null),          7: new StroopElement("ROJO", Color.red, Color.red, Color.null),
            //    8: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),     9: new StroopElement("VERDE", Color.green, Color.green, Color.null),
            //   10: new StroopElement("AZUL", Color.blue, Color.blue, Color.null),            11: new StroopElement("VERDE", Color.green, Color.green, Color.null),
            //   12: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),    13: new StroopElement("ROJO", Color.red, Color.red, Color.null),
            //   14: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),    15: new StroopElement("AZUL", Color.blue, Color.blue, Color.null),
            //   16: new StroopElement("VERDE", Color.green, Color.green, Color.null),         17: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),
            //   18: new StroopElement("AZUL", Color.blue, Color.blue, Color.null),            19: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),
            //   20: new StroopElement("VERDE", Color.green, Color.green, Color.null),         21: new StroopElement("AZUL", Color.blue, Color.blue, Color.null),
            //   22: new StroopElement("VERDE", Color.green, Color.green, Color.null),         23: new StroopElement("AZUL", Color.blue, Color.blue, Color.null),
            //   24: new StroopElement("ROJO", Color.red, Color.red, Color.null),              25: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),
            //   26: new StroopElement("AZUL", Color.blue, Color.blue, Color.null),            27: new StroopElement("ROJO", Color.red, Color.red, Color.null),
            //   28: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),    29: new StroopElement("ROJO", Color.red, Color.red, Color.null),
            //   30: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),    31: new StroopElement("AZUL", Color.blue, Color.blue, Color.null),
            //   32: new StroopElement("ROJO", Color.red, Color.red, Color.null),              33: new StroopElement("VERDE", Color.green, Color.green, Color.null),
            //   34: new StroopElement("ROJO", Color.red, Color.red, Color.null),              35: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),
            //   36: new StroopElement("VERDE", Color.green, Color.green, Color.null),         37: new StroopElement("AMARILLO", Color.yellow, Color.yellow, Color.null),
            //   38: new StroopElement("VERDE", Color.green, Color.green, Color.null),         39: new StroopElement("ROJO", Color.red, Color.red, Color.null)  
            },


            
            // Incongruente modelado
            {  0: new StroopElement("ROJO", Color.yellow, Color.null, Color.null),           1: new StroopElement("VERDE", Color.blue, Color.null, Color.null),
            2: new StroopElement("AMARILLO", Color.red, Color.null, Color.null),          3: new StroopElement("AZUL", Color.green, Color.null, Color.null)  
            },

            // Incongruente práctica
            {  0: new StroopElement("AMARILLO", Color.red, Color.red, Color.AMARILLO),       1: new StroopElement("VERDE", Color.blue, Color.blue, Color.VERDE),
            //    2: new StroopElement("ROJO", Color.yellow, Color.yellow, Color.ROJO),         3: new StroopElement("AZUL", Color.green, Color.green, Color.AZUL),
            //    4: new StroopElement("ROJO", Color.yellow, Color.yellow, Color.ROJO),         5: new StroopElement("VERDE", Color.blue, Color.blue, Color.VERDE),
            //    6: new StroopElement("AMARILLO", Color.red, Color.red, Color.AMARILLO),       7: new StroopElement("AZUL", Color.green, Color.green, Color.AZUL),
            //    8: new StroopElement("ROJO", Color.yellow, Color.yellow, Color.ROJO),         9: new StroopElement("VERDE", Color.blue, Color.blue, Color.VERDE), 
            //   10: new StroopElement("AMARILLO", Color.red, Color.red, Color.AMARILLO),      11: new StroopElement("AZUL", Color.green, Color.green, Color.AZUL)  
            },

            // Incongruente evaluación
            {  0: new StroopElement("AMARILLO", Color.green, Color.green, Color.AMARILLO),   1: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //    2: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.VERDE),       3: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //    4: new StroopElement("AMARILLO", Color.green, Color.green, Color.AMARILLO),   5: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //    6: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.VERDE),       7: new StroopElement("ROJO", Color.blue, Color.blue, Color.ROJO),
            //    8: new StroopElement("AMARILLO", Color.green, Color.green, Color.AMARILLO),   9: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //   10: new StroopElement("AMARILLO", Color.green, Color.green, Color.AMARILLO),  11: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //   12: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.VERDE),      13: new StroopElement("ROJO", Color.blue, Color.blue, Color.ROJO),
            //   14: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.VERDE),      15: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //   16: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.VERDE),      17: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //   18: new StroopElement("AMARILLO", Color.green, Color.green, Color.AMARILLO),  19: new StroopElement("ROJO", Color.blue, Color.blue, Color.ROJO),
            //   20: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.VERDE),      21: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //   22: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.VERDE),      23: new StroopElement("ROJO", Color.blue, Color.blue, Color.ROJO),
            //   24: new StroopElement("AMARILLO", Color.green, Color.green, Color.AMARILLO),  25: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //   26: new StroopElement("AMARILLO", Color.green, Color.green, Color.AMARILLO),  27: new StroopElement("ROJO", Color.blue, Color.blue, Color.ROJO),
            //   28: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.VERDE),      29: new StroopElement("ROJO", Color.blue, Color.blue, Color.ROJO),
            //   30: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.VERDE),      31: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //   32: new StroopElement("AMARILLO", Color.green, Color.green, Color.AMARILLO),  33: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //   34: new StroopElement("AMARILLO", Color.green, Color.green, Color.AMARILLO),  35: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //   36: new StroopElement("VERDE", Color.yellow, Color.yellow, Color.VERDE),      37: new StroopElement("AZUL", Color.red, Color.red, Color.AZUL),
            //   38: new StroopElement("AMARILLO", Color.green, Color.green, Color.AMARILLO),  39: new StroopElement("ROJO", Color.blue, Color.blue, Color.ROJO),  
            }
        ]
    }, [Color.AMARILLO, Color.AZUL, Color.VERDE, Color.blue, Color.green, Color.null, Color.red, Color.yellow]);

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
                setCurrentKeyIndex(0);
            }
            else
            {
                setIsTextVisible(false);
            }
        }
    }, [currentDictIndex, currentKeyIndex, dictionaries, instructionIndex]);

    const handleButtonClick = (answer) =>
    {
        setIsTextVisible(false);
        handleAnswer(answer);
        nextElement();
    };
    
    const handleAnswer = useCallback((answer) =>
    {
        setEndTime(Date.now());
        answers[currentDictIndex][currentKeyIndex].answer = answer;
        answers[currentDictIndex][currentKeyIndex].time = endTime - startTime;
    }, [answers, currentDictIndex, currentKeyIndex, endTime, startTime]);
    
    const handleSwitchDict = useCallback(() =>
    {
        let nextDictIndex = currentDictIndex + 1;

        if (nextDictIndex >= dictionaries.length)
        {
            setIsFinished(true);
            return;
        }

        setCurrentDictIndex(nextDictIndex);
        setCurrentKeyIndex(0);
    }, [currentDictIndex, dictionaries.length]);

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
                    // setStartTime(Date.now());
                    timeoutRefs.current.push(setTimeout(() =>
                    {
                        // Ocultar número y pasar a la pantalla negra
                        setIsTextVisible(false);
                        timeoutRefs.current.push(setTimeout(() =>
                        {
                            // Avanzar al siguiente ítem
                            handleAnswer(3);
                            nextElement();
                            
                        }, TIME_AFTER_NUMBER));
                    }, TIME_NUMBER_VISIBLE));
                }, TIME_AFTER_CROSS));
            }, TIME_CROSS_VISIBLE));
        }, TIME_BEFORE_CROSS));
    }, [handleAnswer, nextElement]);
    
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
                            <button style={{backgroundColor: 'red'}}    className={`stroopcol-round-button ${highlight === 1 ? 'highlight' : ''}`} onClick={() => handleButtonClick(1)} disabled={buttonsDisabled}></button>
                            <button className="stroopcol-no-button" disabled={true}></button>
                            <button className="stroopcol-no-button" disabled={true}></button>
                            <button style={{backgroundColor: 'green'}}  className={`stroopcol-round-button ${highlight === 2 ? 'highlight' : ''}`} onClick={() => handleButtonClick(2)} disabled={buttonsDisabled}></button>
                        </div> 
                        <div className="stroopcol-button-grid stroopcol-button-grid-right">
                            <button className="stroopcol-no-button" disabled={true}></button>
                            <button style={{backgroundColor: 'yellow'}} className={`stroopcol-round-button ${highlight === 4 ? 'highlight' : ''}`} onClick={() => handleButtonClick(4)} disabled={buttonsDisabled}></button>
                            <button style={{backgroundColor: 'blue'}}   className={`stroopcol-round-button ${highlight === 3 ? 'highlight' : ''}`} onClick={() => handleButtonClick(3)} disabled={buttonsDisabled}></button>
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
