import React, { Fragment } from 'react'
import {NavLink} from 'react-router-dom'

export default function Navbar() {
    return (

        <Fragment> 
        {window.location.pathname !== '/login' &&
                <div className='nav-bar'>
                <NavLink className={({isActive}) => isActive ? 'active' : ''} to="/">Home</NavLink>
                <NavLink className={({isActive}) => isActive ? 'active' : ''}to="/about">About</NavLink>
                <NavLink className={({isActive}) => isActive ? 'active' : ''}to="/users">Users</NavLink>
            </div>}

        </Fragment>

    )
}
