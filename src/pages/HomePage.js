import React, { Fragment, useEffect, useState } from 'react'
import { get, set, update } from 'idb-keyval'
import { useAlert } from 'react-alert'
import Swal from 'sweetalert2';

export default function HomePage() {

  const alert = useAlert()

  const [username, setUsername] = useState("")
  const [savedFonoTests, setSavedFonoTests] = useState([])
  const [savedHnfTests, setSavedHnfTests] = useState([])
  const [savedTejasTests, setSavedTejasTests] = useState([])
  const [savedCalculoTests, setSavedCalculoTests] = useState([])
  const [savedSdqTests, setSavedSdqTests] = useState([])
  const [savedWallyTests, setSavedWallyTests] = useState([])
  const [savedCorsiTests, setSavedCorsiTests] = useState([])
  const [savedAcesTests, setSavedAcesTests] = useState([])


  const [savedTests, setSavedTests] = useState(false)
  const [tejasLength, setTejasLength] = useState(undefined)
  const [calculoLength, setCalculoLength] = useState(undefined)
  const [sdqLength, setSdqLength] = useState(undefined)
  const [wallyLength, setWallyLength] = useState(undefined)
  const [acesLength, setAcesLength] = useState(undefined)
  const [corsiLength, setCorsiLength] = useState(undefined)
  const [hnfLength, setHnfLength] = useState(undefined)
  const [fonoLength, setFonoLength] = useState(undefined)
  const [completeName, setCompleteName] = useState("")

  function eliminarTestAntiguos() {

    Swal.fire({
      icon: "info",
      title:"¿Deseas limpiar los test antiguos para iniciar un nuevo periodo de evaluacion?",
      html:"No te preocupes, los test permanecerán en el respaldo si no lo has reiniciado",
      showConfirmButton: true,
      showCancelButton: true
    })
    .then(result => {
      if (result.isConfirmed) {
        get('completedTests')
        .then(res => {
          let counterEliminados = 0;
          const testNuevos = res.filter((test) => {
            const fechaTest = new Date(test[0].date)
            const fechaLimite = new Date('2023/04/17')
  
            if (fechaTest > fechaLimite) {
              return test;
            } else {
              counterEliminados++
            }
          })
          return [testNuevos, counterEliminados];
        })
        .then((data) => {
          Swal.fire('Se eliminaron: ' + data[1] + ' test antiguos')
          update('completedTests', val => data[0])
  
          setTimeout(() => {
            window.location.pathname = '/'
          }, 2000)
        })
      }
    })
   
  }

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

    // set('completedTests', [
      
    // ])

    get('completedTests')
      .then(res => {
        let tejas = 0;
        let calculo = 0;
        let sdq = 0;
        let wally = 0;
        let aces = 0;
        let corsi = 0;
        let hnf = 0;
        let fono = 0;

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
          if (element[0]['instrument'] === 4) {
            aces++
            setSavedTests(true)
          }
          if (element[0]['instrument'] === 5) {
            wally++
            setSavedTests(true)
          } if (element[0]['instrument'] === 6) {
            corsi++
            setSavedTests(true)
          } 
          if (element[0]['instrument'] === 7) {
            hnf++
            setSavedTests(true)
          }
          if (element[0]['instrument'] === 8) {
            fono++
                        setSavedTests(true)
          }
        })

        setSavedHnfTests(hnf)
        setSavedFonoTests(fono)
        setSavedTejasTests(tejas)
        setSavedCalculoTests(calculo)
        setSavedWallyTests(wally)
        setSavedAcesTests(aces)
        setSavedSdqTests(sdq)
        setSavedCorsiTests(corsi)

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

      get('acesLength')
        .then(res => {
          setAcesLength(res)
        })

      get('wallyLength')
        .then(res => {
          setWallyLength(res)
        })


      get('corsiLength')
        .then(res => {
          setCorsiLength(res)
        })

        get('hnfLength')
        .then(res => {
          setHnfLength(res)
        })


        get('fonoLength')
        .then(res => {
          setFonoLength(res)
        })





    }, 1000)











  }, [])





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
              cancelButtonColor: '#cc4846',
              confirmButtonColor: "#1674d8",
              allowOutsideClick: false,
              confirmButtonText: '¿Deseas enviar los test?',
              showLoaderOnConfirm: true,
              preConfirm: async () => {
                return fetch('http://localhost:3500/newevaluation'||  'https://selb.bond/newevaluation', {
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
                      `Ha ocurrido un error en el envío de datos desde el dispositivo: ${error.message}`
                    )
                  })
              },
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  showCancelButton: true,
                  cancelButtonText: 'Finalizar',
                  cancelButtonColor: '#70C851',
                  confirmButtonColor: "#E6BB34",
                  showConfirmButton: true,
                  allowOutsideClick: false,
                  confirmButtonText: 'Finalizar y eliminar test por enviar',
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
                    }, 3000)
                  } else {
                    setTimeout(() => {
                      window.location.pathname = '/'
                    }, 3000)
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
            <p>(Evaluaciones guardadas en la tablet)</p>

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

                <tr>
                  <th scope="row">Aces</th>
                  <td>{savedAcesTests && savedAcesTests >= 0 ? savedAcesTests : 0}</td>
                </tr>

                <tr>
                  <th scope="row">Wally</th>
                  <td>{savedWallyTests && savedWallyTests >= 0 ? savedWallyTests : 0}</td>
                </tr>

                <tr>
                  <th scope="row">Corsi</th>
                  <td>{savedCorsiTests && savedCorsiTests >= 0 ? savedCorsiTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">HNF</th>
                  <td>{savedHnfTests && savedHnfTests >= 0 ? savedHnfTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">Fonológico</th>
                  <td>{savedFonoTests && savedFonoTests >= 0 ? savedFonoTests : 0}</td>
                </tr>
              </tbody>
            </table>

            {navigator.onLine ? <Fragment>
              {savedTests === true ? <button onClick={sendNewInstrument} className="button btn btn-primary">Enviar</button> : <button className="button btn btn-secondary" disabled>Enviar</button>}
            </Fragment> : <button className="button btn btn-secondary" disabled>Enviar</button>}

              {/* Esta funcion me elimina los test guardados entre X fechas */}
            {/* <button className="btn btn-info"  style={{marginLeft:"2rem"}}onClick={eliminarTestAntiguos}>Eliminar test antiguos</button> */}



          </div>

          <div className="instrumentInfoTable">
            <h4>Evaluaciones por Instrumento</h4>
            <p>(Evaluaciones ingresadas en la base de datos a tu nombre)</p>
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

                <tr>
                  <th scope="row">Aces</th>
                  <td>{acesLength && acesLength >= 0 ? acesLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">Wally</th>
                  <td>{wallyLength && wallyLength >= 0 ? wallyLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">Corsi</th>
                  <td>{corsiLength && corsiLength >= 0 ? corsiLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">HNF</th>
                  <td>{hnfLength && hnfLength >= 0 ? hnfLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">Fonológico</th>
                  <td>{fonoLength && fonoLength >= 0 ? fonoLength : 0}</td>

                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* <a href="/corsi">Test Corsi</a> */}

      </div>





    </Fragment>

  )
}
