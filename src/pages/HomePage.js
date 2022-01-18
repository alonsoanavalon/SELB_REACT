import React from 'react'
import {Link} from 'react-router-dom'

export default function HomePage() {
    return (
        <div>
           <h1>Application</h1>
           <Link to="/users">Usuarios</Link>
        </div>
    )
}
