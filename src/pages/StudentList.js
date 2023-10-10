import React, { Fragment, useState, useEffect } from 'react'
import {get} from 'idb-keyval'
import Students from '../components/Students'
import InstrumentsList from '../components/InstrumentsList';

export default function StudentList () {

    const [students, setStudents] = useState([])
    const [schools, setSchools] = useState([])
    const [instruments, setInstruments] = useState([])
    const [courses, setCourses] = useState([])
    const [filteredCourses, setFilteredCourses] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([])

    function getData(data, setter){
        get(data)
        .then(res => setter(res))
    }

    useEffect(() => { 

        get('students').then(students => setStudents(students))
        getData('courses', setCourses)
        getData('schools', setSchools)
        get('instruments')
        .then(data => data.filter(instrument => instrument['instrument_type_id'] === 1))
        .then(filteredInstruments => setInstruments(filteredInstruments))
    
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
        $courseSelect.value = "empty"
        $courseSelect?.disabled = false;
    }


    const getStudents = (evt) => {
  

        let $courseSelect = document.getElementById("courseSelect")
        let $courseId = evt.target.value
        let $filteredStudents = students.filter(student => parseInt(student.courseId) === parseInt($courseId))
        
        setFilteredStudents($filteredStudents)
        $courseSelect.value = $courseId
    }   

    return (
        <Fragment>
            <div className="student-list-wrapper">
            <select onChange={getCourses}className="form-select" placeholder='Colegios' id="schoolSelect" defaultValue="empty">
                <option value="empty" disabled>Colegios</option>
                {renderSchools()}
            </select>   
            <select onChange={getStudents} className="form-select" placeholder='Cursos' id="courseSelect" defaultValue="empty" disabled>
            <option value="empty" disabled>Cursos</option>
            {filteredCourses}
            </select>

            <table className="table" id="students-table">
                <thead className="thead-dark">
                    <tr>    
                    <th scope="col"></th>
                    <th scope="col">Alumno</th>
                    <th scope="col">Rut</th>
                    <th scope="col">Curso</th>
                    </tr>
                </thead>
                <tbody>
                    <Students data={filteredStudents}/>
                </tbody>
            </table>

            <div>
                <InstrumentsList instruments={instruments}/>
            </div>    
            </div>
           

        </Fragment>
    )
}