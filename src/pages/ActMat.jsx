import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {get} from 'idb-keyval'
import Instruction from '../components/Instruction'

import Woman from "../components/General/Caricatura de mujer.jpg";
import Flecha from "../components/General/Flecha.png";
import ActMat1 from "../components/ActMat/ActMat1.wav";
import ActMat2 from "../components/ActMat/ActMat2.wav";
import ActMat3 from "../components/ActMat/ActMat3.wav";
import ActMat4 from "../components/ActMat/ActMat4.wav";
import ActMat5 from "../components/ActMat/ActMat5.wav";
import ActMat6 from "../components/ActMat/ActMat6.wav";
import ActMat7 from "../components/ActMat/ActMat7.wav";
import ActMat8 from "../components/ActMat/ActMat8.wav";
import ActMatRec from "../components/ActMat/ActMatRec.wav";

export default function ActMat()
{
    const [studentName, setStudentName] = useState("");

    const [isImageVisible, setIsImageVisible] = useState(true); // Controla la visibilidad de la imagen
    const [isFinished, setIsFinished] = useState(false); // Controla la visibilidad de la imagen
    const [canGoNext, setCanGoNext] = useState(false); // Controla la visibilidad de la imagen
    const [disableButtons, setDisableButtons] = useState(false);

    const [activeButton, setActiveButton] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const audioRef = useRef(null);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [instructionIndex, setInstructionIndex] = useState(0);
    const [highlight1, setHighlight1] = useState(null);
    const [highlight2, setHighlight2] = useState(null);

    class ActMatAnswer
    {
        constructor(answer, time)
        {
            this.answer = answer;
            this.time = time;
        }
    }


    const answers = useMemo(() => [], []);

    useEffect(() =>
    {
        get('selectedStudentName').then(studentName => setStudentName(studentName));
    }, []);

    const instructionAudios = useMemo(() =>
    [
        ActMat1,
        ActMat2,
        ActMat3,
        ActMat4,
        ActMat5,
        ActMat6,
        ActMat7,
        ActMat8,
    ], []);

    const questions = useMemo(() =>
    {
        class ActMatQuestion
        {
            constructor(text1, text2)
            {
                this.text1 = text1;
                this.text2 = text2;
            }
        }

        return[
            new ActMatQuestion("Aburridas","Divertidas"),
            new ActMatQuestion("Complejas","Básicas"),
            new ActMatQuestion("Desafiantes","Poco desafiantes"),
            new ActMatQuestion("Complicadas","Simples"),
            new ActMatQuestion("Confusas","Claras"),
            new ActMatQuestion("Difíciles","Fáciles"),
            new ActMatQuestion("Incomprensibles","Comprensibles"),
            new ActMatQuestion("Desagradables","Agradables"),
            new ActMatQuestion("Frustrantes","Gratificantes"),
            new ActMatQuestion("Incómodas","Cómodas"), 
            new ActMatQuestion("Desordenadas","Ordenadas"),
            new ActMatQuestion("Inútiles","Útiles"),
            new ActMatQuestion("Malas","Buenas"),
            new ActMatQuestion("Desmotivantes","Motivantes"),
            new ActMatQuestion("Sin valor","Beneficiosas"),
            new ActMatQuestion("Irrelevantes","Importantes")
        ];
    }, []);
    
    useEffect(() =>
    {
        const currentAudio = instructionAudios[instructionIndex];
        if (audioRef.current && currentAudio)
        {
            audioRef.current.src = currentAudio;
            audioRef.current.play().catch(error =>
            {
                console.error("Error al reproducir el audio \"" + currentAudio + "\":", error);
            });
        }
        
    }, [instructionAudios, instructionIndex]);

    useEffect(() =>
    {
        switch(instructionIndex)
        {
            case 2:     setHighlight1(7);       setHighlight2(null);    break;
            case 3:     setHighlight1(5);       setHighlight2(6);       break;
            case 4:     setHighlight1(1);       setHighlight2(null);    break;
            case 5:     setHighlight1(4);       setHighlight2(null);    break;
            case 6:     setHighlight1(0);       setHighlight2(null);    break;
            default:    setHighlight1(null);    setHighlight2(null);    break;
        }
    }, [instructionIndex])

    useEffect(() =>
    {
        const audioElement = audioRef.current;
    
        const handlePlay = () => { setDisableButtons(true); };
    
        const handleEnded = () =>
        {
            setInstructionIndex((prevIndex) =>
            {
                if (isImageVisible && prevIndex < instructionAudios.length - 1)
                {
                    return prevIndex + 1;
                }
                else
                {
                    setIsImageVisible(false);
                    return prevIndex; // Mantener el índice actual
                }
            });
            setDisableButtons(false);
            setStartTime(Date.now());
        };
    
        if (audioElement)
        {
            audioElement.addEventListener('play', handlePlay);
            audioElement.addEventListener('ended', handleEnded);
        }
    
        return () =>
        {
            if (audioElement)
            {
                audioElement.removeEventListener('play', handlePlay);
                audioElement.removeEventListener('ended', handleEnded);
            }
        };
    }, [audioRef, instructionAudios.length, isImageVisible]);

    function getMomentByDate(date)
    {
        let dateBegin;
        let dateUntil;
        get('moments').then(res => {
            res.foreach(element => {
                dateBegin = new Date(element['begin']).toLocaleDateString("zh-TW");
                dateUntil = new Date(element['until']).toLocaleDateString("zh-TW");
                if (date >= dateBegin && date <= dateUntil) {
                    return element['id'];
                }
            });
        });
    }

    async function saveTest(testAnswers)
    {
        // Implementar función para guardar respuestas del test
    }

    const nextElement = useCallback(() =>
    {
        setCanGoNext(false);
        setActiveButton(null);
        const keys = Object.keys(questions);
        
        let nextKeyIndex = currentIndex + 1;
        if (nextKeyIndex >= keys.length)
        {
            setIsFinished(true);
        }
        setCurrentIndex(nextKeyIndex);
    }, [currentIndex, questions])

    const clickAnswer = (answer) =>
    {
        setActiveButton(answer);
        setCanGoNext(true);
        
        setEndTime(Date.now());
        answers[currentIndex] = new ActMatAnswer(answer, endTime - startTime);
    };

    

    return (
        <div className="actmat-container">
            {isFinished ?
            (
                <Instruction checkpoint={true} instruction="Lo hiciste muy bien"/>
            ) :
            (
                <>
                    {isImageVisible &&
                    (
                        <div className="actmat-image-container">
                            <img src={Woman} alt="Visual" className="actmat-center-image" />
                        </div>
                    )}
                    {!isImageVisible &&
                    (
                        <div className="actmat-central-text"> Las matemáticas son:</div>
                    )}
                    <div className="actmat-button-container">
                        <button className="actmat-label">{questions[currentIndex].text1}</button>
                        <button className={`actmat-button ${activeButton === 1 ? 'active' : ''} ${highlight1 === 1 ? 'highlight' : ''} ${highlight2 === 1 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(1)}>1</button>
                        <button className={`actmat-button ${activeButton === 2 ? 'active' : ''} ${highlight1 === 2 ? 'highlight' : ''} ${highlight2 === 2 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(2)}>2</button>
                        <button className={`actmat-button ${activeButton === 3 ? 'active' : ''} ${highlight1 === 3 ? 'highlight' : ''} ${highlight2 === 3 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(3)}>3</button>
                        <button className={`actmat-button ${activeButton === 4 ? 'active' : ''} ${highlight1 === 4 ? 'highlight' : ''} ${highlight2 === 4 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(4)}>4</button>
                        <button className={`actmat-button ${activeButton === 5 ? 'active' : ''} ${highlight1 === 5 ? 'highlight' : ''} ${highlight2 === 5 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(5)}>5</button>
                        <button className={`actmat-button ${activeButton === 6 ? 'active' : ''} ${highlight1 === 6 ? 'highlight' : ''} ${highlight2 === 6 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(6)}>6</button>
                        <button className={`actmat-button ${activeButton === 7 ? 'active' : ''} ${highlight1 === 7 ? 'highlight' : ''} ${highlight2 === 7 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(7)}>7</button>
                        <button className="actmat-label">{questions[currentIndex].text2}</button>
                    </div>
                    <button className={`actmat-bottom-right-button ${highlight1 === 0 ? 'highlight' : ''}`} disabled={!canGoNext} onClick={() => nextElement()}>
                        <img src={Flecha} alt="Icon" className="actmat-arrow"/>
                        <span className="actmat-button-text">SIGUIENTE</span>
                    </button>
                </>
            )}
            <audio ref={audioRef} />

            <p style={{position:"absolute", textAlign:"start", left:"1rem", bottom:"-4rem", color: "#ddd", opacity:0.6}}>Estudiante: {studentName && studentName} </p>
        </div>
    );
    
}