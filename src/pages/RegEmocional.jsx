import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {get} from 'idb-keyval'
import Instruction from '../components/Instruction'

import Woman from "../components/General/Caricatura de mujer.jpg";
import Flecha from "../components/General/Flecha.png";
import Audio1 from "../components/RegEmocional/RegEmAudio1.wav";
import Audio2 from "../components/RegEmocional/RegEmAudio2.wav";
import Audio3 from "../components/RegEmocional/RegEmAudio3.wav";
import Audio4 from "../components/RegEmocional/RegEmAudio4.wav";
import Audio5 from "../components/RegEmocional/RegEmAudio5.wav";
import Audio6 from "../components/RegEmocional/RegEmAudio6.wav";
import Audio7 from "../components/RegEmocional/RegEmAudio7.wav";
import Audio8 from "../components/RegEmocional/RegEmAudio8.wav";
import AudioEst0 from "../components/RegEmocional/RegEmEst0.wav";
import AudioEst1 from "../components/RegEmocional/RegEmEst1.wav";
import AudioEst2F from "../components/RegEmocional/RegEmEst2F.wav";
import AudioEst2M from "../components/RegEmocional/RegEmEst2M.wav";
import AudioEst3 from "../components/RegEmocional/RegEmEst3.wav";
import AudioEst4 from "../components/RegEmocional/RegEmEst4.wav";
import AudioEst5 from "../components/RegEmocional/RegEmEst5.wav";
import AudioEst6 from "../components/RegEmocional/RegEmEst6.wav";
import AudioEst7 from "../components/RegEmocional/RegEmEst7.wav";
import AudioEst8 from "../components/RegEmocional/RegEmEst8.wav";
import AudioEst9 from "../components/RegEmocional/RegEmEst9.wav";
import AudioEst10 from "../components/RegEmocional/RegEmEst10.wav";

export default function RegEmocional()
{
    const [studentName, setStudentName] = useState("");
    const [studentGender, setStudentGender] = useState("");

    const [isImageVisible, setIsImageVisible] = useState(true); // Controla la visibilidad de la imagen
    const [canGoNext, setCanGoNext] = useState(false); // Controla la visibilidad de la imagen
    const [isFinished, setIsFinished] = useState(false);
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
        class RegEmocionalAnswer
        {
            constructor(answer, time)
            {
                this.answer = answer;
                this.time = time;
            }
        }

        return[
            new RegEmocionalAnswer(-1, 0),
            new RegEmocionalAnswer(-1, 0),
            new RegEmocionalAnswer(-1, 0),
            new RegEmocionalAnswer(-1, 0),
            new RegEmocionalAnswer(-1, 0),
            new RegEmocionalAnswer(-1, 0),
            new RegEmocionalAnswer(-1, 0),
            new RegEmocionalAnswer(-1, 0),
            new RegEmocionalAnswer(-1, 0),
            new RegEmocionalAnswer(-1, 0),
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
            Audio1,
            Audio2,
            Audio3,
            Audio4,
            Audio5,
            Audio6,
            Audio7,
            Audio8,
        }
    ], [])

    const questions = useMemo(() =>
    {
        class RegEmocionalQuestion
        {
            constructor(text, audio)
            {
                this.text = text;
                this.audio = audio;
            }
        }

        return[
            new RegEmocionalQuestion("Cuando quiero divertirme, invito a mis amigos a jugar", AudioEst0),
            new RegEmocionalQuestion("Cuando quiero sentirme mejor (p.e., alegre, feliz) pienso en otra cosa", AudioEst1),
            new RegEmocionalQuestion(studentGender === "M" ? "Cuando no quiero sentirme tan mal (p.e., triste, enfadado), pienso en otra cosa" : "Cuando no quiero sentirme tan mal (p.e., triste, enfadada), pienso en otra cosa", studentGender === "M" ? AudioEst2M : AudioEst2F),
            new RegEmocionalQuestion("Cuando algo me preocupa, me esfuerzo en pensar en eso de una manera que me ayude a sentirme mejor", AudioEst3),
            new RegEmocionalQuestion("Cuando quiero que algo me haga sentir mejor, cambio mi manera de pensar sobre eso", AudioEst4),
            new RegEmocionalQuestion("Controlo mis emociones cambiando la manera de pensar sobre la situación en la que estoy", AudioEst5),
            new RegEmocionalQuestion("Cuando no quiero sentirme tan mal con algo, cambio mi manera de pensar sobre eso", AudioEst6),
            new RegEmocionalQuestion("No hablo de mis emociones con los demás", AudioEst7),
            new RegEmocionalQuestion("Cuando estoy feliz intento que no se me note", AudioEst8),
            new RegEmocionalQuestion("Manejo mis emociones no mostrandolas a los demás", AudioEst9),
            new RegEmocionalQuestion("Cuando me siento mal, intento que no se me note", AudioEst10)
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

        if(currentIndex !== 0)
        {
            answers[currentIndex-1].answer = answer;
            answers[currentIndex-1].time = Date.now() - startTime;
        }
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
                            <span className="text-normal">{"Totalmente en desacuerdo"}</span>
                        </button>
                        <button className={`autocon-round-button ${activeButton === 2 ? 'active' : ''} ${highlight === 2 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(2)}>
                            <span className="text-bold">2</span>
                            <span className="text-normal">{"En desacuerdo"}</span>
                        </button>
                        <button className={`autocon-round-button ${activeButton === 3 ? 'active' : ''} ${highlight === 3 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(3)}>
                            <span className="text-bold">3</span>
                            <span className="text-normal">{"Mitad y mitad"}</span>
                        </button>
                        <button className={`autocon-round-button ${activeButton === 4 ? 'active' : ''} ${highlight === 4 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(4)}>
                            <span className="text-bold">4</span>
                            <span className="text-normal">{"De acuerdo"}</span>
                        </button>
                        <button className={`autocon-round-button ${activeButton === 5 ? 'active' : ''} ${highlight === 5 ? 'highlight' : ''}`} disabled={isImageVisible || disableButtons} onClick={() => clickAnswer(5)}>
                            <span className="text-bold">5</span>
                            <span className="text-normal">{"Totalmente de acuerdo"}</span>
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