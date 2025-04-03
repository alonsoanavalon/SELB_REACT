import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {get} from 'idb-keyval'
import Instruction from '../components/Instruction'

import Woman from "../components/General/Caricatura de mujer.jpg";
import Flecha from "../components/General/Flecha.png";
import Audio11 from "../components/Autoconcepto/Autoconcepto1.1.wav";
import Audio12 from "../components/Autoconcepto/Autoconcepto1.2.wav";
import Audio13 from "../components/Autoconcepto/Autoconcepto1.3.wav";
import Audio14 from "../components/Autoconcepto/Autoconcepto1.4.wav";
import Audio15 from "../components/Autoconcepto/Autoconcepto1.5.wav";
import Audio16 from "../components/Autoconcepto/Autoconcepto1.6.wav";
import Audio17 from "../components/Autoconcepto/Autoconcepto1.7.wav";
import Audio18 from "../components/Autoconcepto/Autoconcepto1.8.wav";
import Audio21 from "../components/Autoconcepto/Autoconcepto2.1.wav";
import Audio22 from "../components/Autoconcepto/Autoconcepto2.2.wav";
import Audio23 from "../components/Autoconcepto/Autoconcepto2.3.wav";
import Audio24 from "../components/Autoconcepto/Autoconcepto2.4.wav";
import Audio25 from "../components/Autoconcepto/Autoconcepto2.5.wav";
import Audio26 from "../components/Autoconcepto/Autoconcepto2.6.wav";
import Audio27 from "../components/Autoconcepto/Autoconcepto2.7.wav";
import Audio28 from "../components/Autoconcepto/Autoconcepto2.8.wav";
import Audio1Rec from "../components/Autoconcepto/Autoconcepto1_Rec.wav";
import Audio2Rec from "../components/Autoconcepto/Autoconcepto2_Rec.wav";
import Audio1Est1 from "../components/Autoconcepto/AutoconceptoEstimulo1.1.wav";
import Audio1Est2 from "../components/Autoconcepto/AutoconceptoEstimulo1.2.wav";
import Audio1Est3 from "../components/Autoconcepto/AutoconceptoEstimulo1.3.wav";
import Audio1Est4 from "../components/Autoconcepto/AutoconceptoEstimulo1.4.wav";
// import Audio1Est5 from "../components/Autoconcepto/AutoconceptoEstimulo1.5.wav";
import Audio1Est6 from "../components/Autoconcepto/AutoconceptoEstimulo1.6.wav";
import Audio1Est7 from "../components/Autoconcepto/AutoconceptoEstimulo1.7.wav";
import Audio1Est8F from "../components/Autoconcepto/AutoconceptoEstimulo1.8_F.wav";
import Audio1Est8M from "../components/Autoconcepto/AutoconceptoEstimulo1.8_M.wav";
import Audio1Est9 from "../components/Autoconcepto/AutoconceptoEstimulo1.9.wav";
import Audio2Est1 from "../components/Autoconcepto/AutoconceptoEstimulo2.1.wav";
import Audio2Est2 from "../components/Autoconcepto/AutoconceptoEstimulo2.2.wav";

export default function Autoconcepto()
{
    const [studentName, setStudentName] = useState("");
    const [studentGender, setStudentGender] = useState("");

    const [isImageVisible, setIsImageVisible] = useState(true); // Controla la visibilidad de la imagen
    const [canGoNext, setCanGoNext] = useState(false); // Controla la visibilidad de la imagen
    const [isFinished, setIsFinished] = useState(false); // Controla la visibilidad de la imagen
    const [isPartTwo, setIsPartTwo] = useState(false); // Controla la visibilidad de la imagen
    const [disableButtons, setDisableButtons] = useState(false);

    const [activeButton, setActiveButton] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const audioRef = useRef(null);
    
    const [currentIndex, setCurrentKeyIndex] = useState(0); // Clave actual en el diccionario
    const [instructionListIndex, setInstructionListtIndex] = useState(0);
    const [instructionIndex, setInstructionIndex] = useState(0);
    const [highlight, setHighlight] = useState(0);

    
    const answers = useMemo(() =>
    {
        class AutoconAnswer
        {
            constructor(answer, time)
            {
                this.answer = answer;
                this.time = time;
            }
        }

        return [
            new AutoconAnswer(-1, 0),
            new AutoconAnswer(-1, 0),
            new AutoconAnswer(-1, 0),
            new AutoconAnswer(-1, 0),
            new AutoconAnswer(-1, 0),
            new AutoconAnswer(-1, 0),
            new AutoconAnswer(-1, 0),
            new AutoconAnswer(-1, 0),
            new AutoconAnswer(-1, 0),
            new AutoconAnswer(-1, 0),
            new AutoconAnswer(-1, 0)
        ]
    }, []);

    useEffect(() =>
    {
        get('selectedStudentName').then(studentName => setStudentName(studentName));
        get('selectedStudentGender').then(studentGender => setStudentGender(studentGender));
    }, [studentGender]);

    const instructionAudios = useMemo(() =>
    [
        {
            Audio11,
            Audio12,
            Audio13,
            Audio14,
            Audio15,
            Audio16,
            Audio17,
            Audio18
        },
        {
            Audio21,
            Audio22,
            Audio23,
            Audio24,
            Audio25,
            Audio26,
            Audio27,
            Audio28
        }
    ], [])

    const questions = useMemo(() =>
    {
        class AutoconceptoQuestion
        {
            constructor(text, audio)
            {
                this.text = text;
                this.audio = audio;
            }
        }

        return[
            new AutoconceptoQuestion("Me gustan las matemáticas", Audio1Est1),
            new AutoconceptoQuestion("Las matemáticas me parecen aburridas", Audio1Est2),
            new AutoconceptoQuestion("Las matemáticas son más difíciles para mí que para mis compañeros", Audio1Est3),
            new AutoconceptoQuestion("La clase de matemáticas es la más difícil", Audio1Est4),
            new AutoconceptoQuestion(studentGender === "M" ? "Mi profesora me dice que soy bueno en matemáticas" : "Mi profesora me dice que soy buena en matemáticas", Audio14),// Audio1Est5),
            new AutoconceptoQuestion("Me va bien en matemáticas", Audio1Est6),
            new AutoconceptoQuestion("Ojalá no tuviera que estudiar matemáticas", Audio1Est7),
            new AutoconceptoQuestion(studentGender === "M" ? "Soy bueno resolviendo cálculos difíciles" : "Soy buena resolviendo cálculos difíciles", studentGender === "M" ? Audio1Est8M : Audio1Est8F),
            new AutoconceptoQuestion("Siempre quiero que llegue la clase de matemáticas", Audio1Est9),
            new AutoconceptoQuestion(null, null),
            new AutoconceptoQuestion("¿Qué tan importante es para ti tener éxito en matemáticas?", Audio2Est1),
            new AutoconceptoQuestion("¿Qué tan importante es para ti tener un buen desempeño en tareas de matemáticas?", Audio2Est2)
        ];
    }, [studentGender]);


    useEffect(() =>
    {
        if(currentIndex < questions.length)
        {
            if(questions[currentIndex].audio === null)
            {
                setInstructionIndex(0);
                setInstructionListtIndex((index) => {return index + 1;});
                setCurrentKeyIndex((index) => {return index + 1;});
            }
        }
    }, [currentIndex, questions])
        
    useEffect(() =>
    {
        const currentAudio = instructionAudios[instructionListIndex][Object.keys(instructionAudios[instructionListIndex])[instructionIndex]];
        if (audioRef.current && currentAudio && isImageVisible)
        {
            audioRef.current.src = currentAudio;
            audioRef.current.play().catch(error =>
            {
                console.error("Error al reproducir el audio \"" + currentAudio + "\":", error);
            });
        }
        
    }, [instructionAudios, instructionIndex, instructionListIndex, isImageVisible]);
    
    useEffect(() =>
    {
        switch(instructionIndex)
        {
            case 1:     setHighlight(1);    break;
            case 2:     setHighlight(2);    break;
            case 3:     setHighlight(3);    break;
            case 4:     setHighlight(4);    break;
            case 5:     setHighlight(5);    break;
            case 6:     setHighlight(6);    break;
            default:    setHighlight(0);    break;
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
                if (isImageVisible && prevIndex < Object.keys(instructionAudios[instructionListIndex]).length - 1)
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
    }, [instructionAudios, instructionListIndex, isImageVisible]);


    useEffect(() =>
    {
        if(currentIndex > 8)
            setIsPartTwo(true);
    }, [currentIndex])
    
    useEffect(() =>
    {
        if(currentIndex < questions.length)
        {
            const currentAudio = questions[currentIndex].audio;
            if (audioRef.current && currentAudio && !isImageVisible)
            {
                audioRef.current.src = currentAudio;
                audioRef.current.play().catch(error =>
                {
                    console.error("Error al reproducir el audio \"" + currentAudio + "\":", error);
                });
            }
        }
        
    }, [currentIndex, isImageVisible, questions]);

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
        setCurrentKeyIndex(nextKeyIndex);
    }, [currentIndex, questions])

    
    const clickAnswer = (answer) =>
    {
        setActiveButton(answer);
        setCanGoNext(true);
        
        answers[currentIndex].answer = answer;
        answers[currentIndex].time = Date.now() - startTime;
    };

    

    return (
        <div className="autocon-container">
            {isFinished ?
            (
                <Instruction checkpoint={true} instruction="Lo hiciste muy bien"/>
            ) :
            (
                <>
                    {isImageVisible &&
                    (
                        <div className="autocon-image-container">
                            <img src={Woman} alt="Visual" className="autocon-center-image" />
                        </div>
                    )}
                    {!isImageVisible &&
                    (
                        <div className="autocon-central-text"> {questions[currentIndex].text}</div>
                    )}
                    <div className="autocon-button-container">
                        <button className={`autocon-round-button ${activeButton === 1 ? 'active' : ''} ${highlight === 1 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(1)}>
                            <span className="text-bold">1</span>
                            <span className="text-normal">{!isPartTwo ? "Totalmente en desacuerdo" : "Nada importante"}</span>
                        </button>
                        <button className={`autocon-round-button ${activeButton === 2 ? 'active' : ''} ${highlight === 2 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(2)}>
                            <span className="text-bold">2</span>
                            <span className="text-normal">{!isPartTwo ? "En desacuerdo" : "Poco importante"}</span>
                        </button>
                        <button className={`autocon-round-button ${activeButton === 3 ? 'active' : ''} ${highlight === 3 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(3)}>
                            <span className="text-bold">3</span>
                            <span className="text-normal">{!isPartTwo ? "Mitad y mitad" : "Más o menos importante"}</span>
                        </button>
                        <button className={`autocon-round-button ${activeButton === 4 ? 'active' : ''} ${highlight === 4 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(4)}>
                            <span className="text-bold">4</span>
                            <span className="text-normal">{!isPartTwo ? "De acuerdo" : "Importante"}</span>
                        </button>
                        <button className={`autocon-round-button ${activeButton === 5 ? 'active' : ''} ${highlight === 5 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(5)}>
                            <span className="text-bold">5</span>
                            <span className="text-normal">{!isPartTwo ? "Totalmente de acuerdo" : "Totalmente importante"}</span>
                        </button>
                    </div>
                    <button className={`autocon-bottom-right-button ${highlight === 6 ? 'highlight' : ''}`} disabled={!canGoNext} onClick={() => nextElement()}>
                        <img src={Flecha} alt="Icon" className="autocon-arrow"/>
                        <span className="autocon-button-text">SIGUIENTE</span>
                    </button>
                </>
            )}
            <audio ref={audioRef} />

            <p style={{position:"absolute", textAlign:"start", left:"1rem", bottom:"-4rem", color: "#ddd", opacity:0.6}}>Estudiante: {studentName && studentName} </p>
        </div>
    );
    
}