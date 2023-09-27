import { get, set } from 'idb-keyval';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert'
import { useNavigate  } from 'react-router-dom'

export default function SchoolSelector() {

    const alert = useAlert()
    const navigate = useNavigate()
 
    const [schools, setSchools] = useState(null)
    const [courses, setCourses] = useState(null)
    const [filteredCourses, setFilteredCourses] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([])

    useEffect(async () => {

        const moments = await get('moments')
        const studies = await get('studies')
        const courses = await get('courses')
        const students = await get('students')
        const schools = await get('schools')


        debugger
        if (schools) {
            setSchools(schools)
        }

        if (courses) {
            setCourses(courses)
        }

        if (students) {
            setFilteredStudents(students)
        }

    }, [])

    const renderSchools = () => {
        debugger
        return schools?.map(school => <option key={school.id}value={school.id}> {school.name}</option>)
    }

    const getCourses = (evt) => {
        let $schoolId = evt.target.value
        let $courseSelect = document.getElementById("courseSelect")
        let $filteredCourses = courses.filter(course => parseInt(course.school) === parseInt($schoolId))
        let $filteredCoursesToRender = $filteredCourses.map(course => <option key={course.course}value={course.course}> {course.courseName}</option>)

        setFilteredCourses($filteredCoursesToRender)
        $courseSelect.value = "empty"
        $courseSelect.disabled = false;
    }


    const getFormValues = () => {
        let $courseSelectValue = document.getElementById("courseSelect").value
        let $schoolSelectValue = document.getElementById("schoolSelect").value

        return [$schoolSelectValue, $courseSelectValue]

    }

    const renderTest = () => {
        debugger;
        let $formValues = getFormValues()

        let $selectedCourse = $formValues[1]

        if ($formValues.includes("empty")) {
            alert.show('Debe elegir cada una de las opciones', {type:'error'})
        } else {
            navigate('/student-selector')
            set('selectedCourse', $selectedCourse)
        }       
        
    }

    return (
        <Fragment>

            {
                schools && <div className="japi-container-center" style={{alignSelf:"center",  justifySelf:"center"}}>
                <div className="sdq-form-container" style={{alignSelf:"center", justifySelf:"center"}}>
               
                <h2 class="h2 text-start" style={{color:"rgb(56, 163, 165)", fontWeight:"bold"}}>Selector de curso</h2>
                <select onChange={getCourses}className="form-select" placeholder='Colegios' id="schoolSelect" defaultValue="empty">
                    <option value="empty" disabled>Colegios</option>
                    {renderSchools()}
                </select>   
                <select className="form-select" placeholder='Cursos' id="courseSelect" defaultValue="empty" disabled>
                <option value="empty" disabled>Cursos</option>
                {filteredCourses}
                </select>
                <div>
                <button onClick={renderTest} className='btn btn-primary btn-parent'>
                    Comenzar
                </button>
                </div>
                </div>
                </div>
     
            }

        </Fragment>
    )
}

