import React, { Fragment, useState, useEffect } from 'react';
import { useAlert } from 'react-alert'
import Swal from 'sweetalert2'
import { get, set } from 'idb-keyval';
import { ROLES } from './constants';

export default function NavBarJapi() {

    const alert = useAlert()
    const [userRole, setUserRole] = useState('')
    const [studentsLength, setStudentsLength] = useState(undefined)

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
        Version: 1.2.8 ||
        Ultima Actualización: 23/06/2024 ||
        Cache: v3.7
        `
        alert.show(textInfo, {
            type:'success'
        })
    }


    return (      
        <Fragment>
   

{
            userRole &&                             
            (window.location.pathname !== '/login' ) &&
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




