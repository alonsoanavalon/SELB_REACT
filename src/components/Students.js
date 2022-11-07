import React from 'react';
import Student from '../components/Student'

export default function Students (props) {
    return (
        props.data.map(student => <Student key={student.studentId} name={student.name} genre={student.gender} rut={student.rut} level={student.level} letter={student.letter} id={student.studentId} surname={student.surname}/>)
    )
}