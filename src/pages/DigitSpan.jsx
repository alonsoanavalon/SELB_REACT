import React, { Fragment, useEffect, useState, useRef } from 'react';
import Instruction from "../components/Instruction";
import {get, update, getMany, set} from 'idb-keyval'

export default function DigitSpan()
{
    const [studentName, setStudentName] = useState("");
    
    const [isFinished, setIsFinished] = useState(false); // Controlar el ciclo
    const audioRef = useRef(null);

    useEffect(() =>
    {
        get('selectedStudentName').then(studentName => setStudentName(studentName));
    }, []);





    return (
        <div className="listspan-black-section">
            {isFinished ?
            (
                <Instruction checkpoint={true} instruction="Lo hiciste muy bien"/>
            ) : 
            (
                <>
                    <div className="listspan-container">
                        
                        <audio ref={audioRef} />
                    </div>
                </>
            )}

            <p style={{position:"absolute", textAlign:"start", left:"1rem", bottom:"-4rem", color: "#fff", opacity:0.13}}>Estudiante: {studentName && studentName} </p>
        </div>
    );
}