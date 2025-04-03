import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {get} from 'idb-keyval'
import Instruction from '../components/Instruction'

import Woman from "../components/General/Caricatura de mujer.jpg";
import Flecha from "../components/General/Flecha.png";
import ActCiencias1 from "../components/ActCiencias/ActCiencias1.wav";
import ActCiencias2 from "../components/ActCiencias/ActCiencias2.wav";

export default function ActCiencias()
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
   
    const answers = useMemo(() =>
    {
        class ActCienciasAnswer
        {
            constructor(answer, time)
            {
                this.answer = answer;
                this.time = time;
            }
        }

        return [
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0),
            new ActCienciasAnswer(-1, 0)
        ];
    }, []);

    useEffect(() =>
    {
        get('selectedStudentName').then(studentName => setStudentName(studentName));
    }, []);

    const instructionAudios = useMemo(() =>
    [
        ActCiencias1,
        ActCiencias2,
        // ActCiencias3,
        // ActCiencias4,
        // ActCiencias5,
        // ActCiencias6,
        // ActCiencias7,
        // ActCiencias8,
    ], []);

    const questions = useMemo(() =>
    {
        class ActCienciasQuestion
        {
            constructor(text1, text2)
            {
                this.text1 = text1;
                this.text2 = text2;
            }
        }

        return[
            new ActCienciasQuestion("Aburridas","Divertidas"),
            new ActCienciasQuestion("Complejas","Básicas"),
            new ActCienciasQuestion("Desafiantes","Poco desafiantes"),
            new ActCienciasQuestion("Complicadas","Simples"),
            new ActCienciasQuestion("Confusas","Claras"),
            new ActCienciasQuestion("Difíciles","Fáciles"),
            new ActCienciasQuestion("Incomprensibles","Comprensibles"),
            new ActCienciasQuestion("Desagradables","Agradables"),
            new ActCienciasQuestion("Frustrantes","Gratificantes"),
            new ActCienciasQuestion("Incómodas","Cómodas"), 
            new ActCienciasQuestion("Desordenadas","Ordenadas"),
            new ActCienciasQuestion("Inútiles","Útiles"),
            new ActCienciasQuestion("Malas","Buenas"),
            new ActCienciasQuestion("Desmotivantes","Motivantes"),
            new ActCienciasQuestion("Sin valor","Beneficiosas"),
            new ActCienciasQuestion("Irrelevantes","Importantes")
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
        answers[currentIndex].answer = answer;
        answers[currentIndex].time = endTime - startTime;
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
                        <div className="actmat-central-text"> Las ciencias naturales son:</div>
                    )}
                    <div className="actmat-button-container">
                        <button className="actmat-label">{questions[currentIndex].text1}</button>
                        <button className={`actmat-button ${activeButton === 1 ? 'active' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(1)}>1</button>
                        <button className={`actmat-button ${activeButton === 2 ? 'active' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(2)}>2</button>
                        <button className={`actmat-button ${activeButton === 3 ? 'active' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(3)}>3</button>
                        <button className={`actmat-button ${activeButton === 4 ? 'active' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(4)}>4</button>
                        <button className={`actmat-button ${activeButton === 5 ? 'active' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(5)}>5</button>
                        <button className={`actmat-button ${activeButton === 6 ? 'active' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(6)}>6</button>
                        <button className={`actmat-button ${activeButton === 7 ? 'active' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(7)}>7</button>
                        <button className="actmat-label">{questions[currentIndex].text2}</button>
                    </div>
                    <button className="actmat-bottom-right-button" disabled={!canGoNext} onClick={() => nextElement()}>
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