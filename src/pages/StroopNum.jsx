import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { get } from 'idb-keyval';
import Instruction from "../components/Instruction";
import ConInst from "../components/StroopNum/Stroop numérico_Congruente.wav";
import InconInst from "../components/StroopNum/Stroop-numérico_Incongruente.wav";
import ConMod1 from "../components/StroopNum/Congruente_Modelado 1.wav";
import ConMod2 from "../components/StroopNum/Congruente_Modelado 2.wav";
import ConMod3 from "../components/StroopNum/Congruente_Modelado 3.wav";
import ConMod4 from "../components/StroopNum/Congruente_Modelado 4.wav";
import InconMod1 from "../components/StroopNum/Incongruente_Modelado 1.wav";
import InconMod2 from "../components/StroopNum/Incongruente_Modelado 2.wav";
import InconMod3 from "../components/StroopNum/Incongruente_Modelado 3.wav";
import InconMod4 from "../components/StroopNum/Incongruente_Modelado 4.wav";
import Pract from "../components/StroopNum/Inicio Fase Práctica.wav";

export default function StroopNum() {
    const TIME_BEFORE_CROSS = 500;  // Tiempo en milisegundos para la pantalla negra antes de la cruz
    const TIME_CROSS_VISIBLE = 500; // Tiempo en milisegundos que la cruz de fijación es visible
    const TIME_AFTER_CROSS = 100;  // Tiempo en milisegundos para la pantalla negra después de la cruz
    const TIME_NUMBER_VISIBLE = 750; // Tiempo en milisegundos para mostrar el número
    const TIME_AFTER_NUMBER = 1000; // Tiempo en milisegundos después del número antes de la pantalla negra

    const [studentName, setStudentName] = useState("");

    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [isCrossVisible, setIsCrossVisible] = useState(false); // Inicialmente no mostrar la cruz
    const [isTextVisible, setIsTextVisible] = useState(true); // Inicialmente no mostrar el texto
    const [cycleRunning, setCycleRunning] = useState(true); // Controlar el ciclo
    const [isFinished, setIsFinished] = useState(false); // Controlar el ciclo
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
            36: new StroopAnswer(-1, 0),  37: new StroopAnswer(-1, 0),  38: new StroopAnswer(-1, 0),  39: new StroopAnswer(-1, 0),   },

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
            constructor(text, correctAnswer)
            {
                this.text = text;
                this.correctAnswer = correctAnswer;
            }
        }

        return [
            // Congruente modelado
            { 0: new StroopElement("333", 3),       1: new StroopElement("4444", 4),      2: new StroopElement("1", 1),         3: new StroopElement("22", 2)   },

            // Congruente práctica
            { 0: new StroopElement("4444", 4),      1: new StroopElement("22", 2),        2: new StroopElement("333", 3),       3: new StroopElement("1", 1),
            //   4: new StroopElement("4444", 4),      5: new StroopElement("1", 1),         6: new StroopElement("333", 3),       7: new StroopElement("22", 2),
            //   8: new StroopElement("333", 3),       9: new StroopElement("1", 1),        10: new StroopElement("4444", 4),     11: new StroopElement("22", 2)   
            },

            // Congruente evaluación
            { 0: new StroopElement("4444", 4),      1: new StroopElement("1", 1),         2: new StroopElement("22", 2),        3: new StroopElement("333", 3),
            //   4: new StroopElement("1", 1),         5: new StroopElement("22", 2),        6: new StroopElement("333", 3),       7: new StroopElement("4444", 4),
            //   8: new StroopElement("333",3 ),       9: new StroopElement("22", 2),       10: new StroopElement("1", 1),        11: new StroopElement("4444", 4),
            //  12: new StroopElement("1", 1),        13: new StroopElement("333", 3),      14: new StroopElement("22", 2),       15: new StroopElement("4444", 4),
            //  16: new StroopElement("22", 2),       17: new StroopElement("1", 1),        18: new StroopElement("333", 3),      19: new StroopElement("4444", 4),
            //  20: new StroopElement("1", 1),        21: new StroopElement("4444", 4),     22: new StroopElement("333", 3),      23: new StroopElement("22", 2),
            //  24: new StroopElement("1", 1),        25: new StroopElement("4444", 4),     26: new StroopElement("22", 2),       27: new StroopElement("333", 3),
            //  28: new StroopElement("22", 2),       29: new StroopElement("4444", 4),     30: new StroopElement("1", 1),        31: new StroopElement("333", 3),
            //  32: new StroopElement("1", 1),        33: new StroopElement("4444", 4),     34: new StroopElement("22", 2),       35: new StroopElement("333", 3),
            //  36: new StroopElement("22", 2),       37: new StroopElement("1", 1),        38: new StroopElement("4444", 4),     39: new StroopElement("333", 3)  
            },


            
            // Incongruente modelado
            { 0: new StroopElement("33", 2),       1: new StroopElement("444", 3),      2: new StroopElement("2", 1),         3: new StroopElement("1111", 4)   },

            // Incongruente práctica
            { 0: new StroopElement("3", 1),        1: new StroopElement("44", 2),       2: new StroopElement("222", 3),       3: new StroopElement("4", 1),
            //   4: new StroopElement("2", 1),        5: new StroopElement("11", 2),       6: new StroopElement("3333", 4),      7: new StroopElement("222", 3),
            //   8: new StroopElement("444", 3),      9: new StroopElement("2", 1),       10: new StroopElement("111", 3),      11: new StroopElement("33", 2)     
            },

            // Incongruente evaluación
            { 0: new StroopElement("1111", 4),     1: new StroopElement("2", 1),        2: new StroopElement("111", 3),       3: new StroopElement("2222", 4),
            //   4: new StroopElement("44", 2),       5: new StroopElement("3333", 4),     6: new StroopElement("4", 1),         7: new StroopElement("444", 3),
            //   8: new StroopElement("3", 1),        9: new StroopElement("222", 3),     10: new StroopElement("11", 2),       11: new StroopElement("2222", 4),
            //  12: new StroopElement("33", 2),      13: new StroopElement("2", 1),       14: new StroopElement("11", 2),       15: new StroopElement("3", 1),
            //  16: new StroopElement("111", 3),     17: new StroopElement("1111", 4),    18: new StroopElement("444", 3),      19: new StroopElement("4", 1),
            //  20: new StroopElement("44", 2),      21: new StroopElement("3333", 4),    22: new StroopElement("222", 3),      23: new StroopElement("33", 2),
            //  24: new StroopElement("444", 3),     25: new StroopElement("2", 1),       26: new StroopElement("222", 3),      27: new StroopElement("3333", 4),
            //  28: new StroopElement("11", 2),      29: new StroopElement("2222", 4),    30: new StroopElement("44", 2),       31: new StroopElement("4", 1),
            //  32: new StroopElement("33", 2),      33: new StroopElement("1111", 4),    34: new StroopElement("111", 3),      35: new StroopElement("3", 1),
            //  36: new StroopElement("444", 3),     37: new StroopElement("44", 2),      38: new StroopElement("1111", 4),     39: new StroopElement("4", 1)      
            }
        ]
    }, []);

    function getMomentByDate(date)
    {
        let dateBegin;
        let dateUntil;
        get('moments').then(res => {
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
                case 2:     setHighlight(4);    break;
                case 3:     setHighlight(1);    break;
                case 4:     setHighlight(2);    break;
                default:    setHighlight(null); break;
            }
        }
        else if(currentDictIndex === 3)
        {
            switch(instructionIndex)
            {
                case 1:     setHighlight(2);    break;
                case 2:     setHighlight(3);    break;
                case 3:     setHighlight(1);    break;
                case 4:     setHighlight(4);    break;
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
        <div className="stroopnum-black-section">
            {isFinished ?
            (
                <Instruction checkpoint={true} instruction="Lo hiciste muy bien"/>
            ) : 
            (
                <>
                    {isCrossVisible && (
                    <div className="stroopnum-cross-container">
                        <div className="stroopnum-cross stroopnum-horizontal"></div>
                        <div className="stroopnum-cross stroopnum-vertical"></div>
                    </div>
                    )}

                    <div className="stroopnum-container">
                        {isTextVisible &&
                        (
                            <div className="stroopnum-central-text"> {dictionaries[currentDictIndex][currentKeyIndex].text} </div>
                        )}
                        <div className="stroopnum-button-grid stroopnum-button-grid-left">
                            <button className={`stroopnum-round-button ${highlight === 1 ? 'highlight' : ''}`} onClick={() => handleButtonClick(1)} disabled={buttonsDisabled}>1</button>
                            <button className="stroopnum-no-button" disabled={true}></button>
                            <button className="stroopnum-no-button" disabled={true}></button>
                            <button className={`stroopnum-round-button ${highlight === 2 ? 'highlight' : ''}`} onClick={() => handleButtonClick(2)} disabled={buttonsDisabled}>2</button>
                        </div>
                        <div className="stroopnum-button-grid stroopnum-button-grid-right">
                            <button className="stroopnum-no-button" disabled={true}></button>
                            <button className={`stroopnum-round-button ${highlight === 4 ? 'highlight' : ''}`} onClick={() => handleButtonClick(4)} disabled={buttonsDisabled}>4</button>
                            <button className={`stroopnum-round-button ${highlight === 3 ? 'highlight' : ''}`} onClick={() => handleButtonClick(3)} disabled={buttonsDisabled}>3</button>
                            <button className="stroopnum-no-button" disabled={true}></button>
                        </div>
                        <audio ref={audioRef} />
                    </div>
                </>
            )}

            <p style={{position:"absolute", textAlign:"start", left:"1rem", bottom:"-4rem", color: "#fff", opacity:0.13}}>Estudiante: {studentName && studentName} </p>
        </div>
    );
}
