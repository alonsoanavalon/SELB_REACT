import { get, set } from 'idb-keyval';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert'
import { useNavigate  } from 'react-router-dom'

export default function StudentParentSelector() {

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
            const students =JSON.parse(window.localStorage.getItem('listparents'));
            
            if (students) {
                setFilteredStudents(students)

            } else {
                setFilteredStudents([])
            }
                

                setIsLoading(false) // Establecer isLoading en false si se encuentran datos
       

        }

            fetchData()


   

    }, [])

    const renderStudents = () => {
        return filteredStudents?.map(student => <option key={student.rut}value={student.rut}> {student.rut}</option>)
    }


    const getFormValues = () => {
        let $studentSelectValue = document.getElementById("studentSelect").value
        return $studentSelectValue;

    }

    const renderTest = () => {
        ;
        let $formValues = getFormValues()
        let $studentSelectValue = $formValues;

        if ($formValues.includes("empty")) {
            alert.show('Debe elegir cada una de las opciones', {type:'error'})
        } else {
            window.location.href = `/charts/${$studentSelectValue}`
        }       
        
    }

    return (
        <Fragment>

{isLoading ? (
                // Muestra un indicador de carga mientras se obtienen los datos
                <div>Cargando...</div>
            ) : filteredStudents ? (
                // Muestra el contenido si schools tiene datos
                <div className="japi-container-center" style={{alignSelf:"center",  justifySelf:"center"}}>
                <div className="sdq-form-container" style={{alignSelf:"center", justifySelf:"center"}}>
               
                <h2 class="h2 text-start" style={{color:"rgb(56, 163, 165)", fontWeight:"bold"}}>Selector de alumno</h2>
                <select className="form-select" placeholder='Alumnos' id="studentSelect" defaultValue="empty">
                    <option value="empty" disabled>Estudiantes</option>
                    {renderStudents()}
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

