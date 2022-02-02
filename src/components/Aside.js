import React, { Fragment, useEffect } from 'react'
import {NavLink} from 'react-router-dom'

export default function Aside() {

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
        
    }, [])
    
    return (

        <Fragment> 
        {window.location.pathname !== '/login' &&
                <div className='aside-bar aside-bar-hidden'>
                <div className="aside-head">
                    Sidebar
                </div>
                <div className='aside-menu'>
                <NavLink className={({isActive}) => isActive ? 'active' : ''} to="/">Inicio</NavLink>
                <NavLink className={({isActive}) => isActive ? 'active' : ''}to="/students">Mis alumnos</NavLink>
                <NavLink className={({isActive}) => isActive ? 'active' : ''}to="/users">Usuarios</NavLink>
                </div>

            </div>}

        </Fragment>

    )
}
