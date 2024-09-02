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
  const [savedEMLTests, setSavedEMLTests] = useState([])
  const [savedCorsiTests, setSavedCorsiTests] = useState([])
  const [savedAcesTests, setSavedAcesTests] = useState([])
  const [savedTorreTests, setSavedTorreTests] = useState([])
  const [savedEscTests, setSavedEscTests] = useState([])
  const [savedJapiTests, setSavedJapiTests] = useState([])
  const [savedStroopnumTests, setSavedStroopnumTests] = useState([])
  const [savedStroopcolTests, setSavedStroopcolTests] = useState([])
  const [savedAutoconceptoTests, setSavedAutoconceptoTests] = useState([])
  const [savedActMatTests, setSavedActMatTests] = useState([])
  const [savedCmasrTests, setSavedCmasrTests] = useState([])
  const [savedClptTests, setSavedClptTests] = useState([])
  const [savedListeningSpanTests, setSavedListeningSpanTests] = useState([])
  const [savedDigitSpanTests, setSavedDigitSpanTests] = useState([])
  const [savedRegEmocionalTests, setSavedRegEmocionalTests] = useState([])
  const [savedActCienciasTests, setSavedActCienciasTests] = useState([])
  const [savedAnsMatTests, setSavedAnsMatTests] = useState([])
  const [savedCountSpanTests, setSavedCountSpanTests] = useState([])


  const [savedTests, setSavedTests] = useState(false)
  const [tejasLength, setTejasLength] = useState(undefined)
  const [calculoLength, setCalculoLength] = useState(undefined)
  const [sdqLength, setSdqLength] = useState(undefined)
  const [wallyLength, setWallyLength] = useState(undefined)
  const [emlLength, setEMLLength] = useState(undefined)
  const [acesLength, setAcesLength] = useState(undefined)
  const [corsiLength, setCorsiLength] = useState(undefined)
  const [hnfLength, setHnfLength] = useState(undefined)
  const [fonoLength, setFonoLength] = useState(undefined)
  const [torreLength, setTorreLength] = useState(undefined);
  const [escLength, setEscLength] = useState(undefined);
  const [japiLength, setJapiLength] = useState(undefined);
  const [stroopnumLength, setStroopnumLength] = useState(undefined)
  const [stroopcolLength, setStroopcolLength] = useState(undefined)
  const [autoconceptoLength, setAutoconceptoLength] = useState(undefined)
  const [actMatLength, setActMatLength] = useState(undefined)
  const [cmasrLength, setCmasrLength] = useState(undefined)
  const [clptLength, setClptLength] = useState(undefined)
  const [listeningSpanLength, setListeningSpanLength] = useState(undefined)
  const [digitSpanLength, setDigitSpanLength] = useState(undefined)
  const [regEmocionalLength, setRegEmocionalLength] = useState(undefined)
  const [actCienciasLength, setActCienciasLength] = useState(undefined)
  const [ansMatLength, setAnsMatLength] = useState(undefined)
  const [countSpanLength, setCountSpanLength] = useState(undefined)

  const [completeName, setCompleteName] = useState("")
  const [lastTests, setLastTests] = useState([])
  const [lastTestsArray, setLastTestsArray] = useState([])
  const [lastTestLength, setLastTestLength] = useState(0)

  useEffect(() => {
    get('schools').then((
      val => window.localStorage.setItem('schools', JSON.stringify(val))
    ))
    get('courses').then((
      val => window.localStorage.setItem('courses', JSON.stringify(val))
    ))
    get('students').then((
      val => window.localStorage.setItem('students', JSON.stringify(val))
    ))
    get('instruments').then((
      val => window.localStorage.setItem('instruments', JSON.stringify(val))
    ))
    
  }, [])

  useEffect(() => {

    setTimeout(() => {
      get('completedTests').then((
        res => {
          if (res !== undefined) {
            setLastTests(res.slice(-10))
            setLastTestLength(res.slice(-10).length) 
          }
        }
      ))
    }, 1000)

    
  }, [])

  const getStudentName = async (inputStudentId) => {
    let studentName = ""
    await get('students').then(res => {
      if (res !== undefined){
        const student = res.find(student => student.studentId === inputStudentId)
        studentName = student.name + ' ' + student.surname
      }


    })

    return studentName
  }

  const getInstrumentName = async (inputInstrumentId) => {
    let instrumentName = ""
    await get('instruments').then(res => {
      if (res !== undefined) {
        const instrument = res.find(instrument => instrument.id === inputInstrumentId)
        instrumentName = instrument.name
      }

    })
    return instrumentName 
  }

  useEffect(async() => {

    if (lastTests.length > 0) {
      const response = lastTests.map(async (test) => {
        const studentName = await getStudentName(test[0].student_id)
        const instrumentName = await getInstrumentName(test[0].instrument)
          return {studentName: studentName, instrumentName: instrumentName, date: test[0].date}
      })
      Promise.all(response).then(resolvedResponse => {
        setLastTestsArray(resolvedResponse.reverse())
      })
    }

  }
  , [lastTests])

  
  function  eliminarTestAntiguos() {

    const fechaLimite = new Date()

    Swal.fire({
      icon: "info",
      title: "¿Deseas limpiar los test antiguos para iniciar un nuevo periodo de evaluacion?",
      showConfirmButton: true,
      showCancelButton: true
    })
      .then(result => {
        if (result.isConfirmed) {

          
          get('backupTest')
          .then(res => {
            let counterEliminados = 0;
            const testNuevos = res.filter((test) => {
              const fechaTest = new Date(test[0].date)

              if (fechaTest > fechaLimite) {
                return test;
              } else {
                counterEliminados++
              }
            })
            return [testNuevos, counterEliminados];
          })
          .then((data) => {
            update('backupTest', val => data[0])
          })


          get('completedTests')
            .then(res => {
              let counterEliminados = 0;
              const testNuevos = res.filter((test) => {
                const fechaTest = new Date(test[0].date)

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

    // set('completedTests', val => []) // Aca se pueden ingresar el json del respaldo de administrador

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
        let torre = 0;
        let esc = 0;
        let eml = 0;
        let japi = 0;
        let stroopnum = 0;
        let stroopcol = 0;
        let autoconcepto = 0;
        let actMat = 0;
        let cmasr = 0;
        let clpt = 0;
        let listeningSpan = 0;
        let digitSpan = 0;
        let regEmocional = 0;
        let actCiencias = 0;
        let ansMat = 0;
        let countSpan = 0;

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
          if (element[0]['instrument'] === 9) {
            torre++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 10) {
            esc++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 11) {
            eml++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 12) {
            japi++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 13) {
            stroopnum++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 14) {
            stroopcol++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 15) {
            autoconcepto++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 16) {
            actMat++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 17) {
            cmasr++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 20) {
            clpt++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 21) {
            listeningSpan++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 22) {
            digitSpan++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 23) {
            regEmocional++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 24) {
            actCiencias++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 25) {
            ansMat++
            setSavedTests(true);
          }
          if (element[0]['instrument'] === 26) {
            countSpan++
            setSavedTests(true);
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
        setSavedTorreTests(torre)
        setSavedEscTests(esc)
        setSavedEMLTests(eml)
        setSavedStroopnumTests(stroopnum)
        setSavedStroopcolTests(stroopcol);
        setSavedAutoconceptoTests(autoconcepto);
        setSavedActMatTests(actMat);
        setSavedCmasrTests(cmasr);
        setSavedClptTests(clpt);
        setSavedListeningSpanTests(listeningSpan);
        setSavedDigitSpanTests(digitSpan);
        setSavedRegEmocionalTests(regEmocional);
        setSavedActCienciasTests(actCiencias);
        setSavedAnsMatTests(ansMat);
        setSavedCountSpanTests(countSpan);
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
        
        get('torreLength')
        .then(res => {
            setTorreLength(res);
        })
        
        get('escLength')
        .then(res => {
            setEscLength(res);
        })
        
        
        get('emlLength')
        .then(res => {
            setEMLLength(res)
        })
        

        
        get('japiLength')
        .then(res => {
            setJapiLength(res)
        })
        
        get('stroopnumLength')
        .then(res => {
            setStroopnumLength(res)
        })
        
        get('stroopcolLength')
        .then(res => {
            setStroopcolLength(res)
        })
        
        get('autoconceptoLength')
        .then(res => {
            setAutoconceptoLength(res)
        })
        
        get('actMatLength')
        .then(res => {
            setActMatLength(res)
        })
        
        get('cmasrLength')
        .then(res => {
            setCmasrLength(res)
        })
        
        get('clptLength')
        .then(res => {
            setClptLength(res)
        })
        
        get('listeningSpanLength')
        .then(res => {
            setListeningSpanLength(res)
        })
        
        get('digitSpanLength')
        .then(res => {
            setDigitSpanLength(res)
        })
        
        get('regEmocionalLength')
        .then(res => {
            setRegEmocionalLength(res)
        })
        
        get('actCienciasLength')
        .then(res => {
            setActCienciasLength(res)
        })
        
        get('ansMatLength')
        .then(res => {
            setAnsMatLength(res)
        })
        
        get('countSpanLength')
        .then(res => {
            setCountSpanLength(res)
        })


    }, 1000)











  }, [])





  async function sendNewInstrument() {




    get('completedTests')
      .then( async (res) => {
          if (res !== undefined) {
            const activeStudies = await get('studies/active');
            const options = {}
            activeStudies.forEach((study) => {
              options[study.id] = study.name;
            })
            console.log(activeStudies)


            const {value} = await Swal.fire({
              title: 'Selecciona un estudio',
              input: 'select',
              inputOptions: options,
              inputPlaceholder: 'Selecciona un estudio',
              showCancelButton: true,
              inputValidator: (value) => {
                return new Promise((resolve) => {

                  if (value !== '') {
                    resolve()
                  } else {

                    resolve('Necesitas seleccionar un estudio')
                  }
                })
              }
            })

            if (value) {

              const studyId = value;

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
                    const batchSize = 30; // Tamaño del lote
                    let start = 0;
                    let end = Math.min(batchSize, res.length);
                    let updateCounter = 0;
                    let createdCounter = 0;
                  
                    while (start < res.length) {
                      const currentBatch = res.slice(start, end);
                  
                      const response = await fetch('https://selb.bond/newevaluation', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          studyId: studyId,
                          instruments: currentBatch,
                        }),
                      });
                  
                      if (!response.ok) {
                        Swal.showValidationMessage(`Ha ocurrido un error en el envío de datos desde el dispositivo: ${response.statusText}`);
                        return false;
                      }
                  
                      const result = await response.json();
                      updateCounter += result.updatedCounter;
                      createdCounter += result.createdCounter;
                      start = end;
                      end = Math.min(end + batchSize, res.length);
                    }
                
                    return {
                      updatedCounter: updateCounter,
                      createdCounter: createdCounter,
                      instrumentsLength: res.length,
                    };
                  }
                }).then((result) => {
                  if (result.isConfirmed) {
                    const results = result.value;
                    const createdCounter = results.createdCounter;
                    const updatedCounter = results.updatedCounter; 
                    const instrumentsLength = results.instrumentsLength;
                    Swal.fire({
                      showCancelButton: false,
                      confirmButtonColor: "#E6BB34",
                      showConfirmButton: true,
                      allowOutsideClick: false,
                      confirmButtonText: 'Finalizar',
                      title: `Los test han sido enviados correctamente`,
                      html: `<b>Total enviados</b>: ${instrumentsLength}
                                       <br>
                                       <b>Ingresados</b>: ${createdCounter}
                                       <br>
                                       <b>Actualizados</b>: ${updatedCounter}
                                       <br></br>
                                       <p>Recuerda que la cantidad de test que se agregarán a tus "Test enviados" serán los <b>ingresados</b>, no aquellos <b>actualizados</b></p>
                                       <br>
                                       <p>En caso de que existan inconsistencias puedes descargar tu <a href="/respaldo">respaldo</a> y comunicarte con el administrador</p>
                                      `
                    }).then(result => {
                      if (result.isConfirmed) {
                        // descomentar esto para eliminar test luego de enviarlos
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
        }
      )
  }


  return (
    <Fragment>

      <div className="home-wrapper">
        <h1>¡Hola {username}!</h1>

        {
          lastTestsArray.length > 0 && <div style={{overflowY:'auto', maxHeight: '300px', marginBottom:'50px '}}>
                    {
          (lastTestsArray.length == lastTestLength) ? <div>
            <h4>Últimos test realizados</h4>
            <table className="table table-home">
              <thead className="thead-dark">
                <tr>  
                  <th scope="col">Estudiante</th>
                  <th scope="col">Instrumento</th>
                  <th scope="col">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {lastTestsArray.map((test, index) => {
                  return <tr key={index}>
                    <td>{test.studentName}</td>
                    <td>{test.instrumentName}</td>
                    <td>{test.date}</td>
                  </tr>
                })}
              </tbody>
            </table>
          </div> : <div className="lastTests">
            <h4>Últimos test realizados</h4>
            <p>No hay test realizados</p>
          </div>
        }

            </div>
        }


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
                  <th scope="row">EML</th>
                  <td>{savedEMLTests && savedEMLTests >= 0 ? savedEMLTests : 0}</td>
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
                <tr>
                  <th scope="row">Torre de Londres</th>
                  <td>{savedTorreTests && savedTorreTests >= 0 ? savedTorreTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">ESC</th>
                  <td>{savedEscTests && savedEscTests >= 0 ? savedEscTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">Japi</th>
                  <td>{savedJapiTests && savedJapiTests >= 0 ? savedJapiTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">StroopNum</th>
                  <td>{savedStroopnumTests && savedStroopnumTests >= 0 ? savedStroopnumTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">StroopCol</th>
                  <td>{savedStroopcolTests && savedStroopcolTests >= 0 ? savedStroopcolTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">Autoconcepto</th>
                  <td>{savedAutoconceptoTests && savedAutoconceptoTests >= 0 ? savedAutoconceptoTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">ActMat</th>
                  <td>{savedActMatTests && savedActMatTests >= 0 ? savedActMatTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">Cmasr</th>
                  <td>{savedCmasrTests && savedCmasrTests >= 0 ? savedCmasrTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">Clpt</th>
                  <td>{savedClptTests && savedClptTests >= 0 ? savedClptTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">ListeningSpan</th>
                  <td>{savedListeningSpanTests && savedListeningSpanTests >= 0 ? savedListeningSpanTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">DigitSpan</th>
                  <td>{savedDigitSpanTests && savedDigitSpanTests >= 0 ? savedDigitSpanTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">RegEmocional</th>
                  <td>{savedRegEmocionalTests && savedRegEmocionalTests >= 0 ? savedRegEmocionalTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">ActCiencias</th>
                  <td>{savedActCienciasTests && savedActCienciasTests >= 0 ? savedActCienciasTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">AnsMat</th>
                  <td>{savedAnsMatTests && savedAnsMatTests >= 0 ? savedAnsMatTests : 0}</td>
                </tr>
                <tr>
                  <th scope="row">CountSpan</th>
                  <td>{savedCountSpanTests && savedCountSpanTests >= 0 ? savedCountSpanTests : 0}</td>
                </tr>
              </tbody>
            </table>

            {navigator.onLine ? <Fragment>
              {savedTests === true ? <button onClick={sendNewInstrument} className="button btn btn-primary">Enviar</button> : <button className="button btn btn-secondary" disabled>Enviar</button>}
            </Fragment> : <button className="button btn btn-secondary" disabled>Enviar</button>}

            {/* Esta funcion me elimina los test guardados entre X fechas */}
             {/* <button className="btn btn-info"  style={{marginLeft:"2rem", color:"#fff"}}onClick={eliminarTestAntiguos}>Eliminar tests antiguos</button> */}



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
                  <th scope="row">EML</th>
                  <td>{emlLength && emlLength >= 0 ? emlLength : 0}</td>

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


                <tr>
                  <th scope="row">Torre de Londres</th>
                  <td>{torreLength && torreLength >= 0 ? torreLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">ESC</th>
                  <td>{escLength && escLength >= 0 ? escLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">Japi</th>
                  <td>{japiLength && japiLength >= 0 ? japiLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">StroopNum</th>
                  <td>{stroopnumLength && stroopnumLength >= 0 ? stroopnumLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">StroopCol</th>
                  <td>{stroopcolLength && stroopcolLength >= 0 ? stroopcolLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">Autoconcepto</th>
                  <td>{autoconceptoLength && autoconceptoLength >= 0 ? autoconceptoLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">ActMat</th>
                  <td>{actMatLength && actMatLength >= 0 ? actMatLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">Cmasr</th>
                  <td>{cmasrLength && cmasrLength >= 0 ? cmasrLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">Clpt</th>
                  <td>{clptLength && clptLength >= 0 ? clptLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">ListeningSpan</th>
                  <td>{listeningSpanLength && listeningSpanLength >= 0 ? listeningSpanLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">DigitSpan</th>
                  <td>{digitSpanLength && digitSpanLength >= 0 ? digitSpanLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">RegEmocional</th>
                  <td>{regEmocionalLength && regEmocionalLength >= 0 ? regEmocionalLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">ActCiencias</th>
                  <td>{actCienciasLength && actCienciasLength >= 0 ? actCienciasLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">AnsMat</th>
                  <td>{ansMatLength && ansMatLength >= 0 ? ansMatLength : 0}</td>

                </tr>

                <tr>
                  <th scope="row">CountSpan</th>
                  <td>{countSpanLength && countSpanLength >= 0 ? countSpanLength : 0}</td>

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
