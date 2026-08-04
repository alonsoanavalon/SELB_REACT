import React from 'react';

export default function Student ({ student, onSelect }) {
    const studentName = `${student.name || ''} ${student.surname || ''}`.trim();

    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(student);
        }
    }

    return (
        <tr
            data-id={student.studentId}
            onClick={() => onSelect(student)}
            onKeyDown={handleKeyDown}
            className="listed-student"
            tabIndex="0"
            aria-label={`Seleccionar a ${studentName}`}
        >
            <td className="genre">
                <img
                    src={student.gender === 'M' ? '/images/son.png' : '/images/daughter.png'}
                    alt=""
                    className="kid-icon"
                    data-testid={`student-icon-${student.studentId}`}
                />
            </td>
            <th scope="row">{studentName}</th>
            <td>{student.rut}</td>
            <td>{`${student.level || ''} ${student.letter || ''}`.trim()}</td>
        </tr>
    )
}
