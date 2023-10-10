import { get, set } from 'idb-keyval';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert'
import { useNavigate  } from 'react-router-dom'

export default function Parents() {

    const alert = useAlert()
    const navigate = useNavigate()
 
    const [schools, setSchools] = useState([])
    const [courses, setCourses] = useState([])
    const [filteredCourses, setFilteredCourses] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([])
    const [students, setStudents] = useState([])

    useEffect(() => {

        get('schools').then(schools => setSchools(schools))
        get('courses').then(courses => setCourses(courses))
        get('students').then(students => setStudents(students))

    }, [])

    const renderSchools = () => {
        return schools?.map(school => <option key={school.id}value={school.id}> {school.name}</option>)
    }

    const getCourses = (evt) => {
        let $schoolId = evt.target.value
        let $courseSelect = document.getElementById("courseSelect")
        let $filteredCourses = courses.filter(course => parseInt(course.school) === parseInt($schoolId))
        let $filteredCoursesToRender = $filteredCourses.map(course => <option key={course.course}value={course.course}> {course.courseName}</option>)

        setFilteredCourses($filteredCoursesToRender)
        $courseSelect?.value = "empty"
        $courseSelect?.disabled = false;
    }

    const getStudents = (evt) => {
        let $courseSelect = document.getElementById("courseSelect")
        let $courseId = evt.target.value
        
        let $studentsSelect = document.getElementById("studentSelect")
        let $filteredStudents = students.filter(student => parseInt(student.courseId) === parseInt($courseId))
        let $filteredStudentsToRender = $filteredStudents.map(student => <option key={student.studentId} value={student.studentId}> {student.name + " " + student.surname}</option>)

        setFilteredStudents($filteredStudentsToRender)
        $courseSelect?.value = $courseId
        $studentsSelect?.disabled = false;
    }   

    const getFormValues = () => {
        let $studentsSelectValue = document.getElementById("studentSelect").value
        let $courseSelectValue = document.getElementById("courseSelect").value
        let $schoolSelectValue = document.getElementById("schoolSelect").value

        return [$schoolSelectValue, $courseSelectValue, $studentsSelectValue]

    }

    const renderTest = () => {
        let $formValues = getFormValues()
        let $selectedStudent = $formValues[2]

        if ($formValues.includes("empty")) {
            alert.show('Debe elegir cada una de las opciones', {type:'error'})
        } else {
            set('selectedStudent', $selectedStudent)

            navigate('/sdq')
        }       
        
    }

    return (
        <Fragment>
            <div className="sdq-form-container">
            <h2 className="h2 text-center p-4">Formulario apoderados</h2>
            <select onChange={getCourses}className="form-select" placeholder='Colegios' id="schoolSelect" defaultValue="empty">
                <option value="empty" disabled>Colegios</option>
                {renderSchools()}
            </select>   
            <select onChange={getStudents} className="form-select" placeholder='Cursos' id="courseSelect" defaultValue="empty" disabled>
            <option value="empty" disabled>Cursos</option>
            {filteredCourses}
            </select>
            <select  className="form-select" placeholder='Estudiantes' id="studentSelect" defaultValue="empty" disabled>
            <option value="empty" disabled>Estudiantes</option>
            {filteredStudents}
            </select>
            <button onClick={renderTest} className='btn btn-primary btn-parent'>
                Comenzar
            </button>
            </div>
 
        </Fragment>
    )
}

