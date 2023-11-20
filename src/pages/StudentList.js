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

    useEffect(() => { 

        get('schools').then(schools => {
            if (!schools) {
                
                let localSchools = window.localStorage.getItem('schools')
                if (localSchools) {
                    localSchools = JSON.parse(localSchools)
                    setSchools(localSchools)

                }
            } else {
                setSchools(schools)

            }
        })
        get('courses').then(courses => {
            if (!courses) {
                let localCourses = window.localStorage.getItem('courses')
                if (localCourses) {
                    localCourses = JSON.parse(localCourses)
                    setCourses(localCourses)
                }
            } else {
                setCourses(courses)

            }
        })
        get('students').then(students => {
            if (!students) {
                let localStudents = window.localStorage.getItem('students')
                if (localStudents) {
                    localStudents = JSON.parse(localStudents)
                    setStudents(localStudents)
                }
            } else {
                setStudents(students)

            }
        })

        get('instruments')
        .then(data => {
            if (!data) {
                let localInstruments = window.localStorage.getItem('instruments')
                if (localInstruments) {
                    localInstruments = JSON.parse(localInstruments)
                    return localInstruments.filter(instrument => instrument['instrument_type_id'] === 1)
                }
            } else {
                return data.filter(instrument => instrument['instrument_type_id'] === 1)
            }
        })
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

        if ($courseSelect) {
            $courseSelect.value = "empty"
            $courseSelect.disabled = false;
        }

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