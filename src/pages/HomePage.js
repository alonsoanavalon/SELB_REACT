import React, { Fragment, useEffect, useState } from 'react'
import { get, set, update } from 'idb-keyval'
import { useAlert } from 'react-alert'
import axios from 'axios'
import Swal from 'sweetalert2';

export default function HomePage() {

    const alert = useAlert()

    const [username, setUsername] = useState("")
    const [savedTejasTests, setSavedTejasTests] = useState([])
    const [savedCalculoTests, setSavedCalculoTests] = useState([])
    const [savedSdqTests, setSavedSdqTests] = useState([])
    const [tejasLength, setTejasLength] = useState(undefined)

    const [savedTests, setSavedTests] = useState(false)
    const [calculoLength, setCalculoLength] = useState(undefined)
    const [sdqLength, setSdqLength] = useState(undefined)
    const [completeName, setCompleteName] = useState("")

    useEffect(() => {
        get('backupTest')
        .then(res => {
          if (res === undefined) {
            get('completedTests')
            .then(res => {
              if (res !== undefined) {
                set('backupTest', res)
              }
            })
          } else if (res.length === 0) {
             {
              get('completedTests')
              .then(res => {
                if (res !== undefined) {
                  set('backupTest', res)
                }
              })
            }
          } else {
            get('completedTests')
            .then(completed => {
                if (completed.length > res.length) {
                    set('backupTest', completed)
                }
            })
          }
        })
      }, [])

    useEffect(() => {

        get('userData').then(res => {
            setUsername(res.name)
            setCompleteName(`${res.name} ${res.surname}`)
        })
    
        get('completedTests')
        .then(res => {
            let tejas = 0;
            let calculo = 0;
            let sdq = 0;

            res.forEach(element => {
                if (element[0]['instrument'] === 1) {
                    tejas++
                    setSavedTests(true)
                }
                if (element[0]['instrument'] === 2) {
                    calculo++
                    setSavedTests(true)
                }
                if (element[0]['instrument'] === 3) {
                    sdq++
                    setSavedTests(true)
                }
            })

            setSavedTejasTests(tejas)
            setSavedCalculoTests(calculo)
            setSavedSdqTests(sdq)
            
        })

        setTimeout(() => {
            get('tejasLength')
            .then(res => {
                setTejasLength(res)
    
            })

            get('calculoLength')
            .then(res => {
                setCalculoLength(res)
            })
            
            
            get('sdqLength')
            .then(res => {
                setSdqLength(res)
            })

      

            
        }, 1000)






  

       
        
        
    }, [])




    
    savedTejasTests === undefined ? console.log("Ta indefinido", savedTejasTests) : console.log("Ta definido", savedTejasTests, savedTejasTests.length)

    function sendNewInstrument() {

        get('completedTests')
        .then(
            res => {
                if (res !== undefined) {
                    Swal.fire({
                        inputAttributes: {
                          autocapitalize: 'off'
                        },
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        cancelButtonColor:'#cc4846',
                        confirmButtonColor:"#1674d8",
                        confirmButtonText: '¿Deseas enviar los test?',
                        showLoaderOnConfirm: true,
                        preConfirm: async () => {
                          return fetch(/* 'http://localhost:3500/newevaluation'|| */ 'https://selb.bond/newevaluation', { 
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(res)
                            })
                            .then(response => {
                              if (!response.ok) {
                                throw new Error(response.statusText)
                              }
                              return response.json()
                            })
                            .catch(error => {
                              Swal.showValidationMessage(
                                `Ha ocurrido un error en el envío de datos desde el dispositivo`
                              )
                            })
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            showCancelButton: true,
                            cancelButtonText: 'Finalizar',
                            cancelButtonColor:'#cc4846',
                            confirmButtonColor:"#1674d8",
                            confirmButtonText: 'Finalizar y limpiar test por enviar',
                            title: `${result.value.statusText}`,
                            html: `<b>Total enviados</b>: ${result.value.instrumentsLength}
                                   <br>
                                   <b>Ingresados</b>: ${result.value.createdCounter}
                                   <br>
                                   <b>Actualizados</b>: ${result.value.updatedCounter}
                                   <br></br>
                                   ${result.value.htmlText}`
                          }).then(result => {
                            if (result.isConfirmed) {
                                update('completedTests', val => [])
                                setTimeout(() => {
                                    window.location.pathname = '/'
                                }, 1500)
                            }
                        })

                        }
                    })
                      
                      
                }
            }


        )
/*         .then(
            _ => {
                update('completedTests', val => [])
                setTimeout(() => {

                    window.location.pathname = '/'
                }, 1000)
            }
        ) */


        
    }


    return (
        <Fragment>

        <div className="home-wrapper">
           <h1>¡Hola {username}!</h1>


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
                        <td>{savedTejasTests && savedTejasTests >= 0 ? savedTejasTests : 0}</td>
                        </tr>
                        <tr>
                        <th scope="row">Cálculo</th>
                        <td>{savedCalculoTests && savedCalculoTests >= 0 ? savedCalculoTests : 0}</td>
                        </tr>
                        <tr>
                        <th scope="row">SDQ</th>
                        <td>{savedSdqTests && savedSdqTests >= 0 ? savedSdqTests : 0}</td>
                        </tr>

                    </tbody>
                    </table>

{/*                     { navigator.onLine ? <Fragment>
                            {savedTests === true?<button onClick={sendNewInstrument} className="button btn btn-primary">Enviar</button> : <button className="button btn btn-secondary" disabled>Enviar</button>}
                        </Fragment> : <button className="button btn btn-secondary" disabled>Enviar</button> }
 */}

             
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
                
                        <tr>
                        <th scope="row">Cálculo</th>
                        <td>{calculoLength && calculoLength >= 0 ? calculoLength : 0}</td>

                        </tr>
                        <tr>
                        <th scope="row">SDQ</th>
                        <td>{sdqLength && sdqLength >= 0 ? sdqLength : 0}</td>

                        </tr>

                    </tbody>
                    </table>
            </div>
           </div>



           </div>
          
           



        </Fragment>

    )
}
