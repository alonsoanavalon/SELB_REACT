import { useState, Fragment } from 'react'

export default function Desarrollo(){
    return(
        <Fragment>
            <h3 style={{ margin: "2rem"}}>Test en etapa de prueba</h3>
            <ul>
                <li>
                    <a className="btn btn-success" href="/corsi">Corsi</a>
                </li>
                <li>
                    <a className="btn btn-success" href="/hnf">HNF</a>
                </li>
                
                
            </ul>
        </Fragment>
    );

}