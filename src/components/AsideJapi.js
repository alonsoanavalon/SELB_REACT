import { get } from 'idb-keyval'
import React, { Fragment, useEffect, useState } from 'react'
import {NavLink } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { ROLES } from './constants'

export default function AsideJapi() {

    const [userData, setUserData] = useState([])
    const cookies = new Cookies()
    // const [userRole, setUserRole] = useState('')

    //crea un efecto para guardar el rol del localstorage
    // useEffect(() => {
    //     get('userRole').then((val) => {
    //         setUserRole(val)
    //     })
    // }, [userRole])

    useEffect(() => {
        const aside = document.querySelector(".aside-menu");

        if (aside) {
            aside.addEventListener("click", e => {
                let aside = document.querySelector("#root > div.aside-bar")
                aside.classList.remove('aside-bar-active')
                aside.classList.add('aside-bar-hidden')
            })
    
        }


        get('userData')
        .then(res => setUserData(res))
        .then(console.log(userData))
    }, [])


    function logout() {
        cookies.remove('id',{path:'/'})
        cookies.remove('email', {path:'/'})
        window.localStorage.clear()
        window.location.pathname = '/login'
    }
    
    return (

        <Fragment> 
{
    (window.location.pathname !== '/login') && 
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

{/* <NavLink className={({isActive}) => isActive ? 'active' : ''}to="*">
<svg id="parents-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>Tutorial</NavLink>

{   
    userData.role === ROLES.TEACHER &&
    <NavLink className={({isActive}) => isActive ? 'active' : ''}to="/school-selector">
<svg id="students-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>Reportes</NavLink>
}
<NavLink className={({isActive}) => isActive ? 'active' : ''}to="*">
<svg id="parents-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>Información</NavLink> */}
<a href="/login" onClick={logout}>
    <svg id="logout-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>   
    Salir
</a>
</div>
</div>
}
        </Fragment>

    )
}


