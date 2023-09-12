import React, { Fragment, useState, useEffect } from 'react';
import { useAlert } from 'react-alert'
import Swal from 'sweetalert2'
import { get, set } from 'idb-keyval';
import { ROLES } from './constants';

export default function NavBar() {

    const alert = useAlert()
    const [userRole, setUserRole] = useState('')
    const [studentsLength, setStudentsLength] = useState(0)

    useEffect(() => {
        get('userRole').then((val) => {
            setUserRole(val)
        })


    }, [])

    async function getStudentsLength (){
        const students = await get('students')
        if (students) {
            setStudentsLength(students.length)

        }
    }

    function showSelbAside () {
        let aside = document.querySelector("#root > div.aside-bar")

        if (aside.classList) {
            let asideIsActive = aside.classList.contains('aside-bar-active')        
            if (asideIsActive) {
                aside.classList.remove('aside-bar-active')
                aside.classList.add('aside-bar-hidden')
            } else {
            Swal.fire({
            title: '¿Deseas ingresar al menú?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, ingresar'
          }).then((result) => {
            if (result.isConfirmed) {
                 aside.classList.add('aside-bar-active')
            }
          })

            }
        }

    }


    function showJapiAside () {
        let aside = document.querySelector("#root > div.aside-bar")

        if (aside.classList) {
            let asideIsActive = aside.classList.contains('aside-bar-active')        
            if (asideIsActive) {
                aside.classList.remove('aside-bar-active')
                aside.classList.add('aside-bar-hidden')
            } else {

                 aside.classList.add('aside-bar-active')

            }
        }

    }

    function reloadPage() {

        Swal.fire({
            title: '¿Deseas recargar la página?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload()
            }
          })
     
    }

    function showVersionInfo () {
        
        const textInfo = `
        Version: 1.2.5 ||
        Ultima Actualización: 10/09/2023 ||
        Cache: v2.1
        `
        alert.show(textInfo, {
            type:'success'
        })
    }


    return (      
        <Fragment>
            {
            userRole &&                             
            (window.location.pathname !== '/login' && (userRole == ROLES.ADMIN || userRole == ROLES.EVALUATOR)) ?
                <header className="header">
                    <button 
                    className="hamburger hamburger--collapse" 
                    type="button"
                    onClick={showSelbAside}
                    >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                    </button>

                    <div className='selb-icon-wrapper'>
                        <svg onClick={reloadPage} id="refresh-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        {
                            studentsLength > 0 && <div> {studentsLength} </div>
                        }
                        <button onClick={getStudentsLength}>
                            Obtener Cantidad Alumnos
                        </button>
                        <h4
                            onClick={showVersionInfo}
                            className='selb-info'
                        >
                        SELB
                        </h4>
                    </div>
                </header>
                : (userRole == ROLES.EVALUATOR || userRole == ROLES.TEACHER) && 
                <header className="header-japi">

                <button 
                style={{backgroundColor:"rgb(56, 163, 165)", borderRadius:"1rem"}}
                className="hamburger hamburger--collapse" 
                type="button"
                onClick={showJapiAside}
                >
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>

                </button>

                <div className='selb-icon-wrapper'>
                    <h4
                        onClick={showVersionInfo}
                        className='selb-info'
                    >

                    </h4>
                    <img src="/images/japi.png" style={{width:"150px", marginRight:".5rem"}} alt="" />
                </div>

            </header>
            }
        </Fragment>
    )
}

