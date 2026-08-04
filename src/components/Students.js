import React from 'react';
import Student from '../components/Student'

export default function Students (props) {
    return (
        props.data.map((student) => (
            <Student key={student.studentId} student={student} onSelect={props.onSelect} />
        ))
    )
}
