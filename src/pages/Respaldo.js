import React, {Fragment, useEffect, useState } from 'react';
import {get, getMany, set} from 'idb-keyval'
import { CSVLink } from "react-csv";
import { useAlert } from 'react-alert'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaFileCode, FaFileCsv, FaRotateLeft } from 'react-icons/fa6';
import '../css/operations.css';

export default function Respaldo () {


    const [csvDataRespaldo, setCsvDataRespaldo] = useState()
    const [userData, setUserData] = useState("")
    const alert = useAlert()
    const [jsonData, setJsonData] = useState([])

    const navigate = useNavigate()
    
    useEffect(() => {

        get('userData').then(res => {
            setUserData(res)
        })

    }, [])


    const getCsvRespaldo2 = () => {
        let instrumentId;
        let studentId;
        let testArray = []

        getMany(['backupTest', 'instruments', 'students'])
        .then(([backupTest, instrumentsRespaldo, studentsRespaldo]) => {
            
            backupTest.map((test) => {
                instrumentId = test[0]['instrument']
                /* let userId = test[0]['user_id'] */
                studentId = test[0]['student_id'];
    
                let localArray = []
                let studentName;
                let instrumentName;
                let answers = []


                studentsRespaldo.forEach((student) => {
                    if (student['studentId'] == studentId) {
                        studentName = student['name']
                    }
                })
                instrumentsRespaldo.forEach((instrument) => {
                    if (instrument['id'] == instrumentId) {
                        instrumentName = instrument['name']
                    }
                })
                Object.entries(test[1]).map((element) => {
                    if (instrumentName == "HNF") {
                        element[1] === "" ? answers.push(0) : answers.push(element[1].choice)
                    } else if (instrumentName == "Fonológico") {
                        element[1] === "" ? answers.push(0) : answers.push(element[1].options.toString())
                    } else if (instrumentName == "TorreLondres") {
                        element[1] === "" ? answers.push(0) : answers.push(element[1].value.toString())
                    } else if (instrumentName == "ESC") {
                        element[1] === "" ? answers.push(0) : answers.push(element[1].value.toString())
                    }
                    
                    else {
                        element[1] === "" ? answers.push(0) : answers.push(element[1])
                    }

                })

                setJsonData(prevValue => [...prevValue, [test[0], test[1]]])
                localArray.push(instrumentName, test[0]['date'], studentName, ...answers, "FIN", JSON.stringify(test))
                testArray.push(localArray)
    
            })
            setCsvDataRespaldo(testArray)
        })
        .catch(error => {
            console.log(error)
            sendErrorLog(error)
        });

    }

    function sendErrorLog(error) {
        let errorLog = {
            error: error.message,
            userData: userData,
            date: new Date()
        }

        const url = `${process.env.REACT_APP_API_URL}/api/error-log`

        ;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(errorLog),
            headers: {
              "Content-Type": "application/json",            },

          })
            .then((response) => {
                if (response.status !== 200) {
                    Swal.fire({
                        icon: "error",
                        title: "Error al enviar el reporte",
                        text: "Error al enviar el reporte",
                    });

                    console.log("Error al enviar el reporte")
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Reporte enviado",
                        text: "El reporte de error se ha enviado correctamente",
                    });

                    console.log("Reporte enviado")
                }
     
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error al enviar el reporte",
                    text: error,
                });
                console.log(error);
            });
    }

    function exportUserInfo(testArray) {

        try {
          const fileData = JSON.stringify(testArray);
          const blob = new Blob([fileData], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = "respaldo-administrador.json";
          link.href = url;
          link.click();
                    URL.revokeObjectURL(url);
       
        } catch (error) {
          sendErrorLog(error);  
          console.log(error);
        }
      }


    function downloadJson(testArray) {
        exportUserInfo(testArray)
    }



/*     const getCsvRespaldo = () => {

        let instrumentId;
        let studentId;
        let testArray = []
        backupTest.map((test) => {
            instrumentId = test[0]['instrument']
            
            studentId = test[0]['student_id'];

            let localArray = []
            let studentName;
            let instrumentName;
            let answers = []
            studentsRespaldo.forEach((student) => {
                if (student['studentId'] == studentId) {
                    studentName = student['name']
                }
            })
            instrumentsRespaldo.forEach((instrument) => {
                if (instrument['id'] == instrumentId) {
                    instrumentName = instrument['name']
                }
            })
            Object.entries(test[1]).map((element) => element[1] === "" ? answers.push(0) : answers.push(element[1]))
            localArray.push(instrumentName, test[0]['date'], studentName, ...answers, "FIN", JSON.stringify(test))
            testArray.push(localArray)

        })

        setCsvDataRespaldo(testArray)
    } */

    const igualarRespaldoALocal = async () => {
        await set("completedTests", [])
        await set("backupTest", [])
        navigate("/")
    }


    useEffect(() => {
        const handleWindowError = (event) => {
          // Maneja el error aquí
          console.error('Error en el DOM:', event.error.message);
          sendErrorLog(event.error)
        };
    
        window.addEventListener('error', handleWindowError);
    
        // Limpia el event listener cuando el componente se desmonta
        return () => {
          window.removeEventListener('error', handleWindowError);
        };
      }, []); 

    csvDataRespaldo && console.log(csvDataRespaldo)
    
    return (
        <Fragment>
            {/* <CsvReader />  Este nos servirá cuando queramos meter datos, ya que lee CSV*/}

            
                        <main className='operations-page'>
                            <header className="operations-header">
                                <div>
                                    <p className="operations-eyebrow">Este dispositivo</p>
                                    <h1>Respaldo local</h1>
                                    <p>Prepara una copia de las evaluaciones almacenadas en esta tablet.</p>
                                </div>
                                <span className="operations-chip operations-chip--local">Datos locales</span>
                            </header>

                            <section className="operations-panel" aria-labelledby="backup-export-title">
                                <div className="operations-panel__header">
                                    <div>
                                        <h2 id="backup-export-title">Descargar respaldo</h2>
                                        <p>Primero prepara el respaldo y luego elige el formato de descarga.</p>
                                    </div>
                                </div>
                                <div className="operations-actions">
                                    <button id="btn-excel" className='btn btn-primary' onClick={getCsvRespaldo2}>
                                        <FaDownload aria-hidden="true" /> Preparar respaldo
                                    </button>
                                    {csvDataRespaldo !== undefined && (
                                        <Fragment>
                                            <CSVLink className="btn btn-success" filename="respaldo-test" data={csvDataRespaldo}>
                                                <FaFileCsv aria-hidden="true" /> Descargar respaldo evaluador
                                            </CSVLink>
                                            <button onClick={() => downloadJson(jsonData)} className="btn btn-outline-primary">
                                                <FaFileCode aria-hidden="true" /> Descargar respaldo administrador
                                            </button>
                                        </Fragment>
                                    )}
                                </div>
                            </section>

                            <section className="operations-panel operations-panel--warning" aria-labelledby="backup-reset-title">
                                <div className="operations-panel__header">
                                    <div>
                                        <p className="operations-eyebrow">Acción de recuperación</p>
                                        <h2 id="backup-reset-title">Reinicializar respaldo</h2>
                                        <p>El respaldo quedará igualado a los tests “Por enviar” de este dispositivo.</p>
                                    </div>
                                </div>
                                <div className="operations-guidance">
                                    <p>Úsalo sólo cuando el respaldo descargado no coincide con el panel “Por enviar”, o al iniciar un nuevo momento para evitar duplicados.</p>
                                </div>
                                <button className="btn btn-warning operations-reset" onClick={igualarRespaldoALocal}>
                                    <FaRotateLeft aria-hidden="true" /> Reinicializar respaldo
                                </button>
                            </section>
                        </main>
  </Fragment>




    )
}