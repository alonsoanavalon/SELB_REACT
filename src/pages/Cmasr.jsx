import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {get} from 'idb-keyval'
import Instruction from '../components/Instruction'

import XIcon from "../components/CMASR/X_botón autocorrección.png";
import Woman from "../components/General/Caricatura de mujer.jpg";
import Flecha from "../components/General/Flecha.png";
import AudioIntro from "../components/CMASR/ansiedad general_audio 1.wav";
import AudioSi from "../components/CMASR/ansiedad general_audio 2.wav";
import AudioNo from "../components/CMASR/ansiedad general_audio 3.wav";
import AudioNoWrongs from "../components/CMASR/ansiedad general_audio 4.wav";
import AudioYouCanChange from "../components/CMASR/ansiedad general_audio 5.wav";
import AudioToGoNext from "../components/CMASR/ansiedad general_audio 6.wav";
import AudioChangeAnswer from "../components/CMASR/ansiedad-general_autocorrección.wav";
import AudioRec from "../components/CMASR/ansiedad-general_audio-recordatorio-.wav";
import AudioEst1 from "../components/CMASR/ansiedad general_estímulo 1.wav";
import AudioEst2 from "../components/CMASR/ansiedad general_estimulo 2.wav";
import AudioEst3M from "../components/CMASR/ansiedad general_estimulo 3_masculino.wav";
import AudioEst3F from "../components/CMASR/ansiedad general_estimulo 3_femenino.wav";
import AudioEst4M from "../components/CMASR/ansiedad general_estimulo 4_masculino.wav";
import AudioEst4F from "../components/CMASR/ansiedad general_estimulo 4_femenino.wav";
import AudioEst5 from "../components/CMASR/ansiedad general_estimulo 5.wav";
import AudioEst6 from "../components/CMASR/ansiedad-general_estimulo-6.wav";
import AudioEst7M from "../components/CMASR/ansiedad-general_estimulo-7_masculino.wav";
import AudioEst7F from "../components/CMASR/ansiedad-general_estimulo-7_femenino.wav";
import AudioEst8 from "../components/CMASR/ansiedad-general_estimulo-8.wav";
import AudioEst9 from "../components/CMASR/ansiedad-general_estímulo-9.wav";
// import AudioEst10 from "../components/CMASR/ansiedad-general_estimulo-10.wav";

export default function Cmasr()
{
    const [studentName, setStudentName] = useState("");
    const [studentGender, setStudentGender] = useState("");

    const [isImageVisible, setIsImageVisible] = useState(true); // Controla la visibilidad de la imagen
    const [canGoNext, setCanGoNext] = useState(false); // Controla la visibilidad de la imagen
    const [isFinished, setIsFinished] = useState(false); // Controla la visibilidad de la imagen
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [startTime2, setStartTime2] = useState(null);
    const [endTime2, setEndTime2] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const audioRef = useRef(null);
    
    const [currentIndex, setCurrentIndex] = useState(0); // Clave actual en el diccionario
    const [instructionIndex, setInstructionIndex] = useState(0); // Clave actual en el diccionario
    const [highlight, setHighlight] = useState(null);

    class CmasrAnswer
    {
        constructor(answer, answer2, time)
        {
            this.answer = answer;
            this.answer2 = answer2;
            this.time = time;
        }
    }
    
    const answers = useMemo(() => [], []);

    useEffect(() =>
    {
        get('selectedStudentName').then(studentName => setStudentName(studentName));
        get('selectedStudentGender').then(studentGender => setStudentGender(studentGender));
    }, [studentGender]);

    const instructionAudios = useMemo(() =>
    [
        AudioIntro,
        AudioSi,
        AudioNo,
        AudioNoWrongs,
        AudioYouCanChange,
        AudioToGoNext
    ], []);

    const audios = useMemo(() =>
    [
        AudioEst1,
        AudioEst2,
        studentGender === "M" ? AudioEst3M : AudioEst3F,
        studentGender === "M" ? AudioEst4M : AudioEst4F,
        AudioEst5,
        AudioEst6,
        studentGender === "M" ? AudioEst7M : AudioEst7F,
        AudioEst8,
        AudioEst9,
        null // AudioEst10
    ], [studentGender]);

    const questions = useMemo(() =>
    [
        "Muchas veces siento asco o náuseas",
        "Tengo demasiados dolores de cabeza",
        studentGender === "M" ? "Algunas veces me despierto asustado" : "Algunas veces me despierto asustada",
        studentGender === "M" ? "Soy muy nervioso" : "Soy muy nerviosa",
        "Muchas veces me preocupa que algo malo me pase",
        "Me preocupa no agradarle a los otros",
        studentGender === "M" ? "La gente me pone nervioso" : "La gente me pone nerviosa",
        "Tengo miedo que otros niños se rían de mí durante la clase",
        "Siento que alguien va a decirme que hago mal las cosas",
        "Tengo miedo que los demás se rían de mí"
    ], [studentGender]);
    
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
        if (audioRef.current && isImageVisible)
        {
            setIsImageVisible(true);
            audioRef.current.onended = () =>
            {
                setInstructionIndex((prevIndex) =>
                {
                    if (prevIndex < instructionAudios.length - 1)
                    {
                        return prevIndex + 1;
                    }
                    else
                    {
                        setIsImageVisible(false);
                        return prevIndex; // Mantén el índice actual
                    }
                });
            };
        }
    }, [audioRef, instructionAudios.length, isImageVisible]);


    useEffect(() =>
    {
        if(!isImageVisible)
        {
            setInstructionIndex(9);
            const currentAudio = audios[currentIndex];
            if (audioRef.current && currentAudio)
            {
                audioRef.current.src = currentAudio;
                console.log("Reproduciendo audio \"" + currentAudio + "\"");
                audioRef.current.play().catch(error =>
                {
                    console.error("Error al reproducir el audio \"" + currentAudio + "\":", error);
                });
            }
        }
    }, [audios, currentIndex, isImageVisible])

    
    useEffect(() =>
    {
        switch(instructionIndex)
        {
            case 1:     setHighlight(1);    break;
            case 2:     setHighlight(2);    break;
            case 4:     setHighlight(3);    break;
            case 5:     setHighlight(4);    break;
            default:    setHighlight(null); break;
        }
    }, [instructionIndex])

    function getMomentByDate(date)
    {
        let dateBegin;
        let dateUntil;
        get('moments').then(res => {
            res.map(element => {
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

    const changeAnswer = () =>
    {
        if(answers[currentIndex] && answers[currentIndex].answer2 === null)
        {
            setCanGoNext(false);
            setActiveButton(null);
            setStartTime2(Date.now());
            new Audio(AudioChangeAnswer).play();
        }
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
        
        if(!answers[currentIndex])
        {
            setEndTime(Date.now());
            answers[currentIndex] = new CmasrAnswer(answer, null, endTime - startTime);
        }
        else
        {
            setEndTime2(Date.now());
            answers[currentIndex].answer2 = answer;
            answers[currentIndex].time = (endTime - startTime) + (endTime2 - startTime2);
        }
    };

    

    return (
        <div className="cmasr-container">
            {isFinished ?
            (
                <Instruction checkpoint={true} instruction="Lo hiciste muy bien"/>
            ) :
            (
                <>
                    {isImageVisible &&
                    (
                        <div className="cmasr-image-container">
                            <img src={Woman} alt="Visual" className="cmasr-center-image" />
                        </div>
                    )}
                    {!isImageVisible &&
                    (
                        <div className="cmasr-central-text"> {questions[currentIndex]}</div>
                    )}
                    <div className="cmasr-button-container">
                        <button className={`cmasr-round-button ${activeButton === 1 ? 'active' : ''} ${highlight === 1 ? 'highlight' : ''}`} disabled={canGoNext} onClick={() => clickAnswer(1)}>SÍ</button>
                        <button className={`cmasr-round-button ${activeButton === 0 ? 'active' : ''} ${highlight === 2 ? 'highlight' : ''}`} disabled={canGoNext} onClick={() => clickAnswer(0)}>NO</button>
                    </div>
                    <button className={`cmasr-top-right-button  ${highlight === 3 ? 'highlight' : ''}`} disabled={!canGoNext} onClick={changeAnswer}>
                        <img src={XIcon} alt="X" />
                    </button>
                    <button className={`cmasr-bottom-right-button ${highlight === 4 ? 'highlight' : ''}`} disabled={!canGoNext} onClick={() => nextElement()}>
                        <img src={Flecha} alt="Icon" className="cmasr-arrow"/>
                        <span className="cmasr-button-text">SIGUIENTE</span>
                    </button>
                </>
            )}
            <audio ref={audioRef} />

            <p style={{position:"absolute", textAlign:"start", left:"1rem", bottom:"-4rem", color: "#ddd", opacity:0.6}}>Estudiante: {studentName && studentName} </p>
        </div>
    );
    
}