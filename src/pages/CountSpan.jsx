import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import {get} from 'idb-keyval'
import Instruction from '../components/Instruction';
import MC1 from "../components/CountSpan/Imágenes/Bloque de modelado/Span2_modelado_Card1_4Red.png";
import MC2 from "../components/CountSpan/Imágenes/Bloque de modelado/Span2_modelado_Card2_6Red.png";
import PI1C1 from "../components/CountSpan/Imágenes/Bloque de práctica/Span2_Ítem1_Card1_8Red.png";
import PI1C2 from "../components/CountSpan/Imágenes/Bloque de práctica/Span2_Ítem1_Card2_5Red.png";
import PI2C1 from "../components/CountSpan/Imágenes/Bloque de práctica/Span2_Ítem2_Card1_4Red.png";
import PI2C2 from "../components/CountSpan/Imágenes/Bloque de práctica/Span2_Ítem2_Card2_8Red.png";
import E2I1C1 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span2_Ítem1_Card1_6Red.png";
import E2I1C2 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span2_Ítem1_Card2_4Red.png";
import E2I2C1 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span2_Ítem2_Card1_8Red.png";
import E2I2C2 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span2_Ítem2_Card2_7Red.png";
import E3I1C1 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span3_Ítem1_Card1_9Red.png";
import E3I1C2 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span3_Ítem1_Card2_4Red.png";
import E3I1C3 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span3_ítem1_Card3_8Red.png";
import E3I2C1 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span3_Ítem2_Card1_5Red.png";
import E3I2C2 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span3_Ítem2_Card2_8Red.png";
import E3I2C3 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span3_Ítem2_Card3_4Red.png";
import E4I1C1 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span4_Ítem1_Card1_6Red.png";
import E4I1C2 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span4_Ítem1_Card2_9Red.png";
import E4I1C3 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span4_Ítem1_Card3_5Red.png";
import E4I1C4 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span4_Ítem1_Card4_4Red.png";
import E4I2C1 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span4_Ítem2_Card1_9Red.png";
import E4I2C2 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span4_Ítem2_Card2_7Red.png";
import E4I2C3 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span4_Ítem2_Card3_8Red.png";
import E4I2C4 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span4_Ítem2_Card4_4Red.png";
import E5I1C1 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span5_Ítem1_Card1_5Red.png";
import E5I1C2 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span5_Ítem1_Card2_8Red.png";
import E5I1C3 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span5_Ítem1_Card3_9Red.png";
import E5I1C4 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span5_Ítem1_Card4_7Red.png";
import E5I1C5 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span5_Ítem1_Card5_6Red.png";
import E5I2C1 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span5_Ítem2_Card1_4Red.png";
import E5I2C2 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span5_Ítem2_Card2_7Red.png";
import E5I2C3 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span5_Ítem2_Card3_5Red.png";
import E5I2C4 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span5_Ítem2_Card4_9Red.png";
import E5I2C5 from "../components/CountSpan/Imágenes/Bloque de evaluación/Span5_Ítem2_Card5_6Red.png";
import A2cartas from "../components/CountSpan/Audios/CS_2 cartas.wav";
import A3cartas from "../components/CountSpan/Audios/CS_3 cartas.wav";
import A4cartas from "../components/CountSpan/Audios/CS_4 cartas.wav";
import A5cartas from "../components/CountSpan/Audios/CS_5 cartas.wav";
import ACorrectivo from "../components/CountSpan/Audios/CS_feedback correctivo.wav";
import APositivo from "../components/CountSpan/Audios/CS_feedback positivo.wav";
import AInicial from "../components/CountSpan/Audios/CS_instrucción inicial.wav";
import AMod1 from "../components/CountSpan/Audios/CS_modelado 1.wav";
import AMod2a from "../components/CountSpan/Audios/CS_modelado 2a.wav";
import AMod2b from "../components/CountSpan/Audios/CS_modelado 2b.wav";
import AMod3a from "../components/CountSpan/Audios/CS_modelado 3a.wav";
import AMod3b from "../components/CountSpan/Audios/CS_modelado 3b.wav";
import AMod4 from "../components/CountSpan/Audios/CS_modelado 4.wav";
import AMod5a from "../components/CountSpan/Audios/CS_modelado 5a.wav";
import AMod5b from "../components/CountSpan/Audios/CS_modelado 5b.wav";
import AMod6 from "../components/CountSpan/Audios/CS_modelado 6.wav";

export default function CountSpan()
{
    const [studentName, setStudentName] = useState("");

    const [isFinished, setIsFinished] = useState(false);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const startTimeRef = useRef(null);
    const audioRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [highlight, setHighlight] = useState([]);

    const[CE_ML, setCE_ML] = useState(0);
    const[CE_TT, setCE_TT] = useState(0);
    const[ML, setML] = useState(0);

    const images = useMemo(() =>
    [
        [null],
        // [MC1, MC1, MC1, null, MC2, MC2, null, null, null, null],
        [PI1C1, PI1C2, null, null],
        [PI2C1, PI2C2, null, null],
        [E2I1C1, E2I1C2, null, null],
        [E2I2C1, E2I2C2, null, null],
        [E3I1C1, E3I1C2, E3I1C3, null, null, null],
        [E3I2C1, E3I2C2, E3I2C3, null, null, null],
        [E4I1C1, E4I1C2, E4I1C3, E4I1C4, null, null, null, null],
        [E4I2C1, E4I2C2, E4I2C3, E4I2C4, null, null, null, null],
        [E5I1C1, E5I1C2, E5I1C3, E5I1C4, E5I1C5, null, null, null, null, null],
        [E5I2C1, E5I2C2, E5I2C3, E5I2C4, E5I2C5, null, null, null, null, null]
    ], [])

    const audios = useMemo(() =>
    [
        [AInicial],
        // [AMod1, AMod2a, AMod2b, AMod3a, AMod2a, AMod3b, AMod4, AMod5a, AMod5b, AMod6],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
    ], [])

    const answers = useMemo(() =>
    {    
        class CountAnswer
        {
            constructor(correct, answer, score, time)
            {
                this.correct = correct;
                this.answer = answer;
                this.score = score;
                this.time = time;
            }
        }

        return [
            [  null ],
            // Modelado
            // [  null, null, null, null, null, null, null, null, null, null ],

            // Práctica
            [  new CountAnswer(8, 0, 0, 0),   new CountAnswer(5, 0, 0, 0), new CountAnswer(8, 0, 0, 0),   new CountAnswer(5, 0, 0, 0) ],
            [  new CountAnswer(4, 0, 0, 0),   new CountAnswer(8, 0, 0, 0), new CountAnswer(4, 0, 0, 0),   new CountAnswer(8, 0, 0, 0) ],

            // Evaluación
            [  new CountAnswer(6, 0, 0, 0),   new CountAnswer(4, 0, 0, 0),   new CountAnswer(6, 0, 0, 0),   new CountAnswer(4, 0, 0, 0) ],
            [  new CountAnswer(8, 0, 0, 0),   new CountAnswer(7, 0, 0, 0),   new CountAnswer(8, 0, 0, 0),   new CountAnswer(7, 0, 0, 0) ],
            [  new CountAnswer(9, 0, 0, 0),   new CountAnswer(4, 0, 0, 0),   new CountAnswer(8, 0, 0, 0),   new CountAnswer(9, 0, 0, 0),   new CountAnswer(4, 0, 0, 0),   new CountAnswer(8, 0, 0, 0) ],
            [  new CountAnswer(5, 0, 0, 0),   new CountAnswer(8, 0, 0, 0),   new CountAnswer(4, 0, 0, 0),   new CountAnswer(5, 0, 0, 0),   new CountAnswer(8, 0, 0, 0),   new CountAnswer(4, 0, 0, 0) ],
            [  new CountAnswer(6, 0, 0, 0),   new CountAnswer(9, 0, 0, 0),   new CountAnswer(5, 0, 0, 0),   new CountAnswer(4, 0, 0, 0),   new CountAnswer(6, 0, 0, 0),   new CountAnswer(9, 0, 0, 0),   new CountAnswer(5, 0, 0, 0),   new CountAnswer(4, 0, 0, 0) ],
            [  new CountAnswer(9, 0, 0, 0),   new CountAnswer(7, 0, 0, 0),   new CountAnswer(8, 0, 0, 0),   new CountAnswer(4, 0, 0, 0),   new CountAnswer(9, 0, 0, 0),   new CountAnswer(7, 0, 0, 0),   new CountAnswer(8, 0, 0, 0),   new CountAnswer(4, 0, 0, 0) ],
            [  new CountAnswer(5, 0, 0, 0),   new CountAnswer(8, 0, 0, 0),   new CountAnswer(9, 0, 0, 0),   new CountAnswer(7, 0, 0, 0),   new CountAnswer(6, 0, 0, 0),   new CountAnswer(5, 0, 0, 0),   new CountAnswer(8, 0, 0, 0),   new CountAnswer(9, 0, 0, 0),   new CountAnswer(7, 0, 0, 0),   new CountAnswer(6, 0, 0, 0) ],
            [  new CountAnswer(4, 0, 0, 0),   new CountAnswer(7, 0, 0, 0),   new CountAnswer(5, 0, 0, 0),   new CountAnswer(9, 0, 0, 0),   new CountAnswer(6, 0, 0, 0),   new CountAnswer(4, 0, 0, 0),   new CountAnswer(7, 0, 0, 0),   new CountAnswer(5, 0, 0, 0),   new CountAnswer(9, 0, 0, 0),   new CountAnswer(6, 0, 0, 0) ],
        ]
    }, []);

    useEffect(() =>
    {
        if(phaseIndex === 0)
        {
            setButtonsDisabled(true);
        }
        else if(phaseIndex === 0)
        {
            setButtonsDisabled(true);
            switch(currentIndex)
            {
                case 1:     setHighlight([]);       break;
                case 2:     setHighlight([4]);      break;
                case 3:     setHighlight([]);       break;
                case 4:     setHighlight([]);       break;
                case 5:     setHighlight([6]);      break;
                case 6:     setHighlight([]);       break;
                case 7:     setHighlight([4]);      break;
                case 8:     setHighlight([4, 6]);   break;
                default:    setHighlight([]);       break;
            }
        }
        else if(images[phaseIndex][currentIndex-1] === null)
        {
            setButtonsDisabled(false);
        }
        else
        {
            setButtonsDisabled(false);
            setHighlight([]);
        }
    }, [phaseIndex, currentIndex, images])

    useEffect(() =>
    {
        get('selectedStudentName').then(studentName => setStudentName(studentName));
    }, []);

    const handleSwitchDict = useCallback(() =>
    {
        let nextPhaseIndex = phaseIndex + 1;

        if (nextPhaseIndex >= images.length)
        {
            setIsFinished(true);
            return;
        }

        // Analizar memoria de secuencias de puntos objetivo

        setPhaseIndex(nextPhaseIndex);
        setCurrentIndex(0);
        setButtonsDisabled(false);
    }, [images.length, phaseIndex]);

    useEffect(() =>
    {
        const currentAudio = audios[phaseIndex][currentIndex];
        if (audioRef.current && currentAudio)
        {
            audioRef.current.src = currentAudio;
            audioRef.current.play().catch(error =>
            {
                console.error("Error al reproducir el audio \"" + currentAudio + "\":", error);
            });
        }
        
    }, [phaseIndex, audios, currentIndex]);

    useEffect(() =>
    {
        if (audioRef.current)
        {
            audioRef.current.onended = () =>
            {
                setCurrentIndex((prevIndex) =>
                {
                    if (prevIndex < audios[phaseIndex].length - 1)
                    {
                        return prevIndex + 1;
                    }
                    else
                    {
                        handleSwitchDict();
                    }
                });
            };
        }
    }, [audioRef, audios, handleSwitchDict, phaseIndex]);
    

    const nextElement = useCallback(() =>
    {
        const keys = Object.keys(images[phaseIndex]);

        let nextKeyIndex = currentIndex + 1;
        if (nextKeyIndex >= keys.length)
        {
            nextKeyIndex = 0; // Volver al primer elemento si se supera el último
            handleSwitchDict();
        }
        
        setCurrentIndex(nextKeyIndex);
        startTimeRef.current = Date.now();
    }, [images, phaseIndex, currentIndex, handleSwitchDict])

    const handleAnswer = useCallback((answer) =>
    {
        let ans = 3;
        const correct = answers[phaseIndex][currentIndex].correct;
        if(answer !== 0)
        {
            if(answer === correct) ans = 1;
            else ans = 0;
        }
        
        answers[phaseIndex][currentIndex].answer = answer;
        answers[phaseIndex][currentIndex].time = Date.now() - startTimeRef;
        answers[phaseIndex][currentIndex].score = ans;
        console.log(correct + " -> pressed " + answer + " -> " + ans);
    }, [answers, phaseIndex, currentIndex]);

    const buttonClicked = (num) =>
    {
        handleAnswer(num);
        nextElement();

        if(images[phaseIndex][currentIndex] !== null)
        {
            setHighlight([num]);
        }
        else
        {
            setHighlight(prev => [...prev, num]);
        }
    };
    
    return (
        <div className="countspan-centered-container">
            {isFinished ?
            (
                <Instruction checkpoint={true} instruction="Lo hiciste muy bien"/>
            ) : 
            (
                <>
                    {images[phaseIndex][currentIndex] != null &&
                    (
                        <div className="countspan-image-container">
                            <img src={images[phaseIndex][currentIndex]} alt="Imagen con puntos rojos" className="countspan-image" />
                        </div>
                    )}
                    <div className="countspan-buttons-container">
                        <div className="countspan-button-row">
                            <button className={`countspan-number-button ${highlight.includes(0) ? 'active' : ''}`} disabled={buttonsDisabled} onClick={() => buttonClicked(0)}>0</button>
                            <button className={`countspan-number-button ${highlight.includes(1) ? 'active' : ''}`} disabled={buttonsDisabled} onClick={() => buttonClicked(1)}>1</button>
                            <button className={`countspan-number-button ${highlight.includes(2) ? 'active' : ''}`} disabled={buttonsDisabled} onClick={() => buttonClicked(2)}>2</button>
                            <button className={`countspan-number-button ${highlight.includes(3) ? 'active' : ''}`} disabled={buttonsDisabled} onClick={() => buttonClicked(3)}>3</button>
                            <button className={`countspan-number-button ${highlight.includes(4) ? 'active' : ''}`} disabled={buttonsDisabled} onClick={() => buttonClicked(4)}>4</button>
                        </div>
                        <div className="countspan-button-row">
                            <button className={`countspan-number-button ${highlight.includes(5) ? 'active' : ''}`} disabled={buttonsDisabled} onClick={() => buttonClicked(5)}>5</button>
                            <button className={`countspan-number-button ${highlight.includes(6) ? 'active' : ''}`} disabled={buttonsDisabled} onClick={() => buttonClicked(6)}>6</button>
                            <button className={`countspan-number-button ${highlight.includes(7) ? 'active' : ''}`} disabled={buttonsDisabled} onClick={() => buttonClicked(7)}>7</button>
                            <button className={`countspan-number-button ${highlight.includes(8) ? 'active' : ''}`} disabled={buttonsDisabled} onClick={() => buttonClicked(8)}>8</button>
                            <button className={`countspan-number-button ${highlight.includes(9) ? 'active' : ''}`} disabled={buttonsDisabled} onClick={() => buttonClicked(9)}>9</button>
                        </div>
                        <audio ref={audioRef} />
                    </div>
                </>
            )}
            <p style={{position:"absolute", textAlign:"start", left:"1rem", bottom:"-4rem", color: "#ddd", opacity:0.6}}>Estudiante: {studentName && studentName} </p>
        </div>
    )
};