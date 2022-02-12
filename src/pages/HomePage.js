import React, { Fragment, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { del, get, set, update } from 'idb-keyval'
import { useAlert } from 'react-alert'
import axios from 'axios'
export default function HomePage() {

    const alert = useAlert()

    const [username, setUsername] = useState("")
    const [savedTests, setSavedTests] = useState([])
    const [tejasLength, setTejasLength] = useState(undefined)
    const [mode, setMode] = useState('online')

    useEffect(() => {

        get('userData').then(res => {
            setUsername(res.name)
        })
    
        get('completedTests')
        .then(res => {
            setSavedTests(res.length)
        })

        setTimeout(() => {
            get('tejasLength')
            .then(res => {
                setTejasLength(res)
    
            })
        }, 1000)
        

  

       
        
        
    }, [])


    
    savedTests === undefined ? console.log("Ta indefinido", savedTests) : console.log("Ta definido", savedTests, savedTests.length)

    function sendNewInstrument() {

        get('completedTests')
        .then(
            res => {
                axios({
                    method: 'post',
                    url: 'https://selb.bond/newevaluation',
                    data: res
                });
            }
        )
        .then(
            _ => {
                update('completedTests', val => [])
                setTimeout(() => {

                    window.location.pathname = '/'
                }, 1000)
            }
        )

        alert.show(`Haz enviado ${savedTests} test`);
        


        
    }

    return (
        <Fragment>

        <div className="home-wrapper">
           <h1>Hola {username}!</h1>


           <div className="table-wrapper">
           <div className="sendEvaluationTable">
           <h4>Evaluaciones por enviar</h4>

                <table className="table table-home">

                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Instrumento</th>
                        <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">Tejas Lee</th>
                        <td>{savedTests && savedTests >= 0 ? savedTests : 0}</td>
                        </tr>

                    </tbody>
                    </table>

                    { navigator.onLine ? <Fragment>
                            {savedTests && savedTests >= 0 ?<button onClick={sendNewInstrument} className="button btn btn-primary">Enviar</button> : <button className="button btn btn-secondary" disabled>Enviar</button>}
                        </Fragment> : <button className="button btn btn-secondary" disabled>Enviar</button> }

             
           </div>

           <div className="instrumentInfoTable">
                <h4>Evaluaciones por Instrumento</h4>
                <table className="table table-home">
        
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Instrumento</th>
                        <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">Tejas Lee</th>
                        <td>{tejasLength && tejasLength >= 0 ? tejasLength : 0}</td>

                        </tr>
                

                    </tbody>
                    </table>
                </div>
           </div>



           </div>
          
           


        </Fragment>

    )
}
