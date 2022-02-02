import React, { Fragment, useState, useEffect } from 'react'
import {get} from 'idb-keyval'
import Student from '../components/Student'
import Students from '../components/Students'

export default function StudentList () {

    const [students, setStudents] = useState([])
    const [schools, setSchools] = useState([])


    useEffect(() => { 

        get('students')
        .then(res => {
            setStudents(res)
        })

        get('schools')
        .then(res => {
            setSchools(res)
        })
      
    }, [])




    const renderSchoolOptions = ()  => {
        return schools.map(school => <option key={school.id}value={school.id}> {school.name}</option>)
    }

    function getStudents (evt) {
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



    return (
        <Fragment>
            <select onChange={getStudents} className="form-select" aria-label="Default select example" placeholder='Listado de colegios' id="schoolSelect" defaultValue="empty">
                <option value="empty" disabled>Selecciona una opción</option>
                <option key="0" value="0">Todos los alumnos</option>
                {renderSchoolOptions()}
            </select>
            <table class="table" id="students-table">
                <thead className="thead-dark">
                    <tr>    
                    <th scope="col"></th>
                    <th scope="col">Alumno</th>
                    <th scope="col">Rut</th>
                    <th scope="col">Curso</th>
                    </tr>
                </thead>
                <tbody>
                    <Students data={students}/>
                </tbody>
                </table>

                

        </Fragment>
    )
}