import React, { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'
import { get } from 'idb-keyval'
export default function HomePage() {

    const [username, setUsername] = useState("")

    get('userData').then(res => {
        setUsername(res.name)
    })

    return (
        <Fragment>

        <div className="home-wrapper">
           <h1>Hola {username}</h1>
        </div>
        </Fragment>

    )
}
