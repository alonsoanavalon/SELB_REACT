import React, { Fragment, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Instruction from "../components/Instruction";
import {get, update, getMany, set} from 'idb-keyval'
import AudioImage from "../components/ListeningSpan/AudioImage.png";
import LSInst1 from "../components/ListeningSpan/LS_Inst1.wav";
import LSInst2 from "../components/ListeningSpan/LS_Inst2.wav";
import LSInst3 from "../components/ListeningSpan/LS_Inst3.wav";
import LSInst4 from "../components/ListeningSpan/LS_Inst4.wav";
import LSInst5 from "../components/ListeningSpan/LS_Inst5.wav";
import LSInst6 from "../components/ListeningSpan/LS_Inst6.wav";
import LSInst7 from "../components/ListeningSpan/LS_Inst7.wav";
import LS011 from "../components/ListeningSpan/LS_0.1.1.wav";
import LS012 from "../components/ListeningSpan/LS_0.1.2.wav";
import LS021 from "../components/ListeningSpan/LS_0.2.1.wav";
import LS022 from "../components/ListeningSpan/LS_0.2.2.wav";
import LS111 from "../components/ListeningSpan/LS_1.1.1.wav";
import LS121 from "../components/ListeningSpan/LS_1.2.1.wav";
import LS211 from "../components/ListeningSpan/LS_2.1.1.wav";
import LS212 from "../components/ListeningSpan/LS_2.1.2.wav";
import LS311 from "../components/ListeningSpan/LS_3.1.1.wav";
import LS312 from "../components/ListeningSpan/LS_3.1.2.wav";
import LS313 from "../components/ListeningSpan/LS_3.1.3.wav";
import LS321 from "../components/ListeningSpan/LS_3.2.1.wav";
import LS322 from "../components/ListeningSpan/LS_3.2.2.wav";
import LS323 from "../components/ListeningSpan/LS_3.2.3.wav";
import LS411 from "../components/ListeningSpan/LS_4.1.1.wav";
import LS412 from "../components/ListeningSpan/LS_4.1.2.wav";
import LS413 from "../components/ListeningSpan/LS_4.1.3.wav";
import LS414 from "../components/ListeningSpan/LS_4.1.4.wav";
import LS421 from "../components/ListeningSpan/LS_4.2.1.wav";
import LS422 from "../components/ListeningSpan/LS_4.2.2.wav";
import LS423 from "../components/ListeningSpan/LS_4.2.3.wav";
import LS424 from "../components/ListeningSpan/LS_4.2.4.wav";
import LS511 from "../components/ListeningSpan/LS_5.1.1.wav";
import LS512 from "../components/ListeningSpan/LS_5.1.2.wav";
import LS513 from "../components/ListeningSpan/LS_5.1.3.wav";
import LS514 from "../components/ListeningSpan/LS_5.1.4.wav";
import LS515 from "../components/ListeningSpan/LS_5.1.5.wav";
import LS521 from "../components/ListeningSpan/LS_5.2.1.wav";
import LS522 from "../components/ListeningSpan/LS_5.2.2.wav";
import LS523 from "../components/ListeningSpan/LS_5.2.3.wav";
import LS524 from "../components/ListeningSpan/LS_5.2.4.wav";
import LS525 from "../components/ListeningSpan/LS_5.2.5.wav";
import LS611 from "../components/ListeningSpan/LS_6.1.1.wav";
import LS612 from "../components/ListeningSpan/LS_6.1.2.wav";
import LS613 from "../components/ListeningSpan/LS_6.1.3.wav";
import LS614 from "../components/ListeningSpan/LS_6.1.4.wav";
import LS615 from "../components/ListeningSpan/LS_6.1.5.wav";
import LS616 from "../components/ListeningSpan/LS_6.1.6.wav";
import LS621 from "../components/ListeningSpan/LS_6.2.1.wav";
import LS622 from "../components/ListeningSpan/LS_6.2.2.wav";
import LS623 from "../components/ListeningSpan/LS_6.2.3.wav";
import LS624 from "../components/ListeningSpan/LS_6.2.4.wav";
import LS625 from "../components/ListeningSpan/LS_6.2.5.wav";
import LS626 from "../components/ListeningSpan/LS_6.2.6.wav";
import { forEach } from 'underscore';

export default function ListeningSpan()
{
    const [studentName, setStudentName] = useState("");

    const Phase =
    {
        comprension: "comprensión",
        almacenamiento: "almacenamiento",
        recuerdo: "recuerdo"
    }
    
    const [phase, setPhase] = useState(Phase.recuerdo);
    const [isFinished, setIsFinished] = useState(false); // Controlar el ciclo
    const audioRef = useRef(null);

    useEffect(() =>
    {
        get('selectedStudentName').then(studentName => setStudentName(studentName));
    }, []);

    const [letterIndex, setLetterIndex] = useState(1);
    const [reminderText, setReminderText] = useState("");
    const [buttonTexts, setButtonTexts] = useState(
    [
        "", "", "", "", "", "", "", "", "", "", "", ""
    ])

    const letters = useMemo(() =>
    [
        "F", "H", "J", "K", "L", "N", "P", "Q", "R", "S", "T", "Y"
    ], [])

    const instructionAudios = useMemo(() =>
    [
        {
            LSInst1,
            LSInst2,
            LSInst3,
            LSInst4,
        },
        {
            LSInst5,
        },
        {
            LSInst6,
        },
        {
            LSInst7,
        }
    ], [])


    const borrar = () =>
    {
        setReminderText((prevReminderText) => prevReminderText.slice(0, -1));
        setButtonTexts((buttonTexts) =>
        {
            const newButtonTexts = [...buttonTexts];
            const index = buttonTexts.indexOf((letterIndex-1).toString());
            if (index !== -1)
                newButtonTexts[index] = "";

            return newButtonTexts;
        });
        setLetterIndex((prevIndex) => prevIndex - 1);
    }
    
    const blanco = () =>
    {
        setReminderText(prevText =>
        {
            return prevText + "_";
        });
        setLetterIndex(index => index + 1);
    }

    const listo = () =>
    {
        setLetterIndex(1);
        setReminderText("");
        setButtonTexts(["", "", "", "", "", "", "", "", "", "", "", ""]);
    }

    const buttonClicked = (index, letter) =>
    {
        setButtonTexts(buttonTexts =>
        {
            const aux = [...buttonTexts];
            aux[index] = letterIndex.toString();
            return aux;
        });
        setReminderText(prevText =>
        {
            return prevText + letter;
        });
        setLetterIndex(index => index + 1);
    }


    return (
        <div className="listspan-black-section">
            {isFinished ? (
                <Instruction checkpoint={true} instruction="Lo hiciste muy bien" />
            ) : (
                <>
                    {(() => {
                        switch (phase) {
                            case Phase.comprension:
                                return (
                                    <>
                                        <div className="listspan-image-container">
                                            <img src={AudioImage} alt="Visual" className="listspan-center-image" />
                                        </div>
                                        <div className="listspan-buttons-container">
                                            <button className="listspan-button">Verdadero</button>
                                            <button className="listspan-button">Falso</button>
                                        </div>
                                    </>
                                );
    
                            case Phase.almacenamiento:
                                return (
                                    <div className="listspan-text-container">
                                        <div className="listspan-central-text">K</div>
                                    </div>
                                );
    
                            case Phase.recuerdo:
                                return (
                                    <>
                                        <div className="listspan-grid-container">
                                            <div className="listspan-grid-item">
                                                <button className="listspan-grid-button" disabled={buttonTexts[0] !== ""} onClick={() => buttonClicked(0, "F")}>{buttonTexts[0]}</button>
                                                <span className="listspan-grid-text">F</span>
                                            </div>
                                            <div className="listspan-grid-item">
                                                <button className="listspan-grid-button" disabled={buttonTexts[1] !== ""} onClick={() => buttonClicked(1, "H")}>{buttonTexts[1]}</button>
                                                <span className="listspan-grid-text">H</span>
                                            </div>
                                            <div className="listspan-grid-item">
                                                <button className="listspan-grid-button" disabled={buttonTexts[2] !== ""} onClick={() => buttonClicked(2, "J")}>{buttonTexts[2]}</button>
                                                <span className="listspan-grid-text">J</span>
                                            </div>
                                            <div className="listspan-grid-item">
                                                <button className="listspan-grid-button" disabled={buttonTexts[3] !== ""} onClick={() => buttonClicked(3, "K")}>{buttonTexts[3]}</button>
                                                <span className="listspan-grid-text">K</span>
                                            </div>
                                            <div className="listspan-grid-item">
                                                <button className="listspan-grid-button" disabled={buttonTexts[4] !== ""} onClick={() => buttonClicked(4, "L")}>{buttonTexts[4]}</button>
                                                <span className="listspan-grid-text">L</span>
                                            </div>
                                            <div className="listspan-grid-item">
                                                <button className="listspan-grid-button" disabled={buttonTexts[5] !== ""} onClick={() => buttonClicked(5, "N")}>{buttonTexts[5]}</button>
                                                <span className="listspan-grid-text">N</span>
                                            </div>
                                            <div className="listspan-grid-item">
                                                <button className="listspan-grid-button" disabled={buttonTexts[6] !== ""} onClick={() => buttonClicked(6, "P")}>{buttonTexts[6]}</button>
                                                <span className="listspan-grid-text">P</span>
                                            </div>
                                            <div className="listspan-grid-item">
                                                <button className="listspan-grid-button" disabled={buttonTexts[7] !== ""} onClick={() => buttonClicked(7, "Q")}>{buttonTexts[7]}</button>
                                                <span className="listspan-grid-text">Q</span>
                                            </div>
                                            <div className="listspan-grid-item">
                                                <button className="listspan-grid-button" disabled={buttonTexts[8] !== ""} onClick={() => buttonClicked(8, "R")}>{buttonTexts[8]}</button>
                                                <span className="listspan-grid-text">R</span>
                                            </div>
                                            <div className="listspan-grid-item">
                                                <button className="listspan-grid-button" disabled={buttonTexts[9] !== ""} onClick={() => buttonClicked(9, "S")}>{buttonTexts[9]}</button>
                                                <span className="listspan-grid-text">S</span>
                                            </div>
                                            <div className="listspan-grid-item">
                                                <button className="listspan-grid-button" disabled={buttonTexts[10] !== ""} onClick={() => buttonClicked(10, "T")}>{buttonTexts[10]}</button>
                                                <span className="listspan-grid-text">T</span>
                                            </div>
                                            <div className="listspan-grid-item">
                                                <button className="listspan-grid-button" disabled={buttonTexts[11] !== ""} onClick={() => buttonClicked(11, "Y")}>{buttonTexts[11]}</button>
                                                <span className="listspan-grid-text">Y</span>
                                            </div>
                                        </div>
                                        <p className="listspan-info-text">{reminderText}</p>

                                        <div className="listspan-additional-buttons">
                                            <button className="listspan-additional-button" onClick={borrar}>Borrar</button>
                                            <button className="listspan-additional-button" onClick={blanco}>Blanco</button>
                                            <button className="listspan-additional-button" onClick={listo}>Listo</button>
                                        </div>
                                    </>
                                );
    
                            default:
                                return <></>;
                        }
                    })()}
                </>
            )}
    
            <div className="listspan-container">
                <audio ref={audioRef} />
            </div>
    
            <p style={{ position: "absolute", textAlign: "start", left: "1rem", bottom: "-4rem", color: "#fff", opacity: 0.13 }}>
                Estudiante: {studentName && studentName}
            </p>
        </div>
    );
    
}