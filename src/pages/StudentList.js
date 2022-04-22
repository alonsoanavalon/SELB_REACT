import React, { Fragment, useState, useEffect } from 'react'
import {get} from 'idb-keyval'
import Student from '../components/Student'
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

    


    const renderSchoolOptions = ()  => {
        return schools.map(school => <option key={school.id}value={school.id}> {school.name}</option>)
    }

/*     function getStudents (evt) {
        let schoolId = evt.target.value
        let filteredStudents;
     
        if (schoolId == 0) {
            get('students')
            .then(res => {
                setStudents(res)
            })
                      
        } else {
            get('students')
            .then(res => {
                setStudents(res)
                return res
            })
            .then(allStudents => {
                filteredStudents = allStudents.filter(student => student.schoolId == schoolId)
                setStudents(filteredStudents)

            })
          
        }

    }
 */

    const renderSchools = () => {
        return schools.map(school => <option key={school.id}value={school.id}> {school.name}</option>)
    }

    const getCourses = (evt) => {
        let $schoolId = evt.target.value
        let $courseSelect = document.getElementById("courseSelect")
        let $filteredCourses = courses.filter(course => parseInt(course.school) === parseInt($schoolId))
        let $filteredCoursesToRender = $filteredCourses.map(course => <option key={course.course}value={course.course}> {course.courseName}</option>)

        console.log($schoolId)
        console.log($filteredCourses)

        setFilteredCourses($filteredCoursesToRender)
        $courseSelect.value = "empty"
        $courseSelect.disabled = false;
    }


    const getStudents = (evt) => {
  

        let $courseSelect = document.getElementById("courseSelect")
        console.log(evt.target, "aca")
        let $courseId = evt.target.value
        let $filteredStudents = students.filter(student => parseInt(student.courseId) === parseInt($courseId))
        let $filteredStudentsToRender = $filteredStudents.map(student => <option key={student.studentId} value={student.studentId}> {student.name + " " + student.surname}</option>)

        setFilteredStudents($filteredStudents)
        $courseSelect.value = $courseId

        console.log("ACa esta la wea")
        console.log($filteredStudents)

        
   
    


    }   

    console.log(filteredStudents)
    console.log("******************")
    console.log(students)





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