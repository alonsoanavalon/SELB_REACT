import React, { Fragment } from 'react';
import Student from '../components/Student'

export default function Students (props) {

    console.log("Studentss")
    console.log(props.data)

    return (
        props.data.map(student => <Student key={student.studentId} name={student.name} genre={student.genre} rut={student.rut} level={student.level} letter={student.letter} id={student.studentId}/>)
    )
}