import { get } from 'idb-keyval'
import React, { Fragment, useEffect, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'

export default function Aside() {

    const [userData, setUserData] = useState([])
    const cookies = new Cookies()
    const navigate = useNavigate()

    useEffect(() => {
        let aside = document.querySelector("#root > div.aside-bar")
        document.addEventListener("click", e => {

            if (aside.classList) {
                if (aside.classList.contains('aside-bar-active')) {
                    if (!e.target.matches('#root > div.aside-bar.aside-bar-hidden.aside-bar-active *') 
                    && (!e.target.matches("#root > div.aside-bar.aside-bar-hidden.aside-bar-active"))
                    && (!e.target.matches("#root > header > button"))
                    && (!e.target.matches("#root > header > button *"))
                    ){
                        aside.classList.remove('aside-bar-active')
                        aside.classList.add('aside-bar-hidden')
                    }
                }
            }
        })

        get('userData')
        .then(res => setUserData(res))
        .then(console.log(userData))
    }, [])


    function logout() {
        cookies.remove('id',{path:'/'})
        cookies.remove('email', {path:'/'})
        window.location.pathname = '/login'
    }
    
    return (

        <Fragment> 
        {window.location.pathname !== '/login' &&
                <div className='aside-bar aside-bar-hidden'>
                <div className="aside-head">
                    <div className='profile-picture-wrapper'>
                        <img src="/images/man.png" alt="profile"/>
                    </div>

                    <h6>{userData['name'] + " " + userData['surname']}</h6>
                   

                </div>
                <div className='aside-menu'>
                <NavLink className={({isActive}) => isActive ? 'active' : ''} to="/">
                <svg id="home-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>Inicio</NavLink>
                <NavLink className={({isActive}) => isActive ? 'active' : ''}to="/students">
                <svg id="students-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>Mis alumnos</NavLink>
{/*                 <NavLink className={({isActive}) => isActive ? 'active' : ''}to="/users">
                <svg id="users-icon"xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>Usuarios</NavLink> */}
                <NavLink className={({isActive}) => isActive ? 'active' : ''}to="/excel">
                <svg id="excel-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>Datos</NavLink>

                <a href="/login" onClick={logout}>
                    <svg id="logout-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>   
                    Salir
                </a>
 
                </div>


 

            </div>}

        </Fragment>

    )
}
