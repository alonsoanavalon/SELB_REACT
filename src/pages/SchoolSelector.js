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

    const [isLoading, setIsLoading] = useState(true) // Nuevo estado para controlar la carga de datos


    useEffect(async () => {
        const fetchData = async () => {
            const moments = await get('moments')
            const studies = await get('studies')
            const courses = await get('courses')
            const students = await get('students')
            const schools = window.localStorage.getItem('school-assignation')

                if (!courses) {
                    const localCourses = window.localStorage.getItem('courses');
                    if (localCourses) {
                        const parsedCourses = JSON.parse(localCourses)
                        setCourses(parsedCourses)
                    }
                } else {
                    setCourses(courses)
                }
        
                if (!students) {
                    const localStudents = window.localStorage.getItem('students');
                    if (localStudents) {
                        setFilteredStudents(JSON.parse(localStudents))
                    }
                } else {
                    setFilteredStudents(students)
                }

                if (!schools) {
                    const localSchools = window.localStorage.getItem('school-assignation');
                    if (localSchools) {
                        setSchools(JSON.parse(localSchools))
                    }
                } else {
                    setSchools(JSON.parse(schools))
                }

                setIsLoading(false) // Establecer isLoading en false si se encuentran datos
       

        }

        try {
            setTimeout(() => {
                fetchData()
            }, 1500)
        }
        catch (error) {
            console.log(error);
        }
   

    }, [])

    const renderSchools = () => {
        return schools?.map(school => <option key={school.id}value={school.id}> {school.name}</option>)
    }

    const getCourses = (evt) => {
        let $schoolId = evt.target.value
        let $courseSelect = document.getElementById("courseSelect")
        let $filteredCourses = courses?.filter(course => parseInt(course.school) === parseInt($schoolId))
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
        ;
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

{isLoading ? (
                // Muestra un indicador de carga mientras se obtienen los datos
                <div>Cargando...</div>
            ) : schools ? (
                // Muestra el contenido si schools tiene datos
                <div className="japi-container-center" style={{alignSelf:"center",  justifySelf:"center"}}>
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
            ) : (
                // Maneja el caso en que schools sea null o vacío
                <div>No se encontraron escuelas.</div>
            )}




        </Fragment>
    )
}

