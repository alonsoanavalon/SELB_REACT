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

           <h4>Evaluaciones por Instrumento</h4>
        <table class="table table-home">
   
            <thead class="thead-dark">
                <tr>
                <th scope="col">Instrumento</th>
                <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">Wally</th>
                <td>3</td>

                </tr>
                <tr>
                <th scope="row">Corsi</th>
                <td>2</td>

                </tr>

            </tbody>
            </table>
        </div>


        </Fragment>

    )
}
