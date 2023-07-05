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

    set('completedTests', [
 
      [
        {
            "instrument": 2,
            "user_id": 51,
            "student_id": 629,
            "date": "2023/4/2"
        },
        {
            "73": "1",
            "74": "1",
            "75": "1",
            "76": "1",
            "77": "1",
            "78": "1",
            "79": "1",
            "80": "1",
            "81": "1",
            "82": "1",
            "83": "1",
            "84": "1",
            "85": "1",
            "86": "1",
            "87": "1",
            "88": "1",
            "89": "1",
            "90": "3",
            "91": "3",
            "92": "3",
            "93": "4",
            "94": "4",
            "95": "4",
            "96": "6",
            "97": "6",
            "98": "6",
            "99": "1",
            "100": "1",
            "101": "1",
            "102": "1",
            "103": "1",
            "104": "1",
            "105": "1",
            "106": "1",
            "107": "1",
            "108": "1",
            "109": "1",
            "110": "1",
            "111": "10",
            "112": "1",
            "113": "1",
            "114": "1",
            "115": "1",
            "116": "1",
            "117": "2",
            "118": "2",
            "119": "2",
            "120": "2",
            "121": "2",
            "122": "2",
            "123": "2",
            "124": "2",
            "125": "2",
            "126": "2",
            "127": "",
            "128": "",
            "129": "",
            "130": "",
            "131": "",
            "132": "",
            "133": "",
            "134": "",
            "135": "",
            "136": "",
            "137": "",
            "138": "",
            "139": "",
            "140": "",
            "141": "",
            "142": "",
            "143": "",
            "144": "",
            "145": ""
        }
    ],
    ])

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
              cancelButtonColor: '#cc4846',
              confirmButtonColor: "#1674d8",
              allowOutsideClick: false,
              confirmButtonText: '¿Deseas enviar los test?',
              showLoaderOnConfirm: true,
              preConfirm: async () => {
                return fetch(/* 'http://localhost:3500/newevaluation'||*/  'https://selb.bond/newevaluation', {
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
