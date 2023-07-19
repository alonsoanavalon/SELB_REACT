import React, {Fragment, useEffect, useState } from 'react';
import {get, getMany, set} from 'idb-keyval'
import { CSVLink } from "react-csv";
import { useAlert } from 'react-alert'
export default function Respaldo () {


    const [csvDataRespaldo, setCsvDataRespaldo] = useState()
    const [userData, setUserData] = useState("")
    const alert = useAlert()
    const [jsonData, setJsonData] = useState([])

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

    }

    function exportUserInfo(testArray) {

        const fileData = JSON.stringify(testArray);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "respaldo-administrador.json";
        link.href = url;
        link.click();
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

    const igualarRespaldoALocal = () => {
        get('completedTests')
        .then(completed => {
            alert.show('El respaldo se ha reinicializado. RECUERDA: Sale y vuelve de esta pantalla para descargar el respaldo con los NUEVOS datos', {
                type:'success'
            })
                set('backupTest', completed)
        })
    }

    

    csvDataRespaldo && console.log(csvDataRespaldo)
    
    return (
        <Fragment>
            {/* <CsvReader />  Este nos servirá cuando queramos meter datos, ya que lee CSV*/}

            
            <div className='excel-container'>

            <h2 style={{margin: 0, padding: 0}}>Respaldo de datos Local</h2>

            <div style={{border:"1px solid #ccc", display: "flex", flexDirection:"column", gap: ".6rem", minHeight:"100px"}}>
            {
                            <button id="btn-excel"className='btn btn-primary' onClick={getCsvRespaldo2}>Obtener respaldo</button>
                        }

                        {
                            (csvDataRespaldo !== undefined) && 
                            <Fragment>
    
                                <CSVLink className="btn btn-success "filename="respaldo-test" data={csvDataRespaldo}>Descargar respaldo evaluador</CSVLink>
                                 </Fragment>


                        }
                        {
                            (csvDataRespaldo !== undefined && jsonData !== undefined) && <button onClick={(e) => downloadJson(jsonData)} className="btn btn-primary">Descargar respaldo administrador</button>

                        }


            </div>
            <h2 style={{margin: 0, padding: 0}}>Reinicializar respaldo</h2>
            <h3 style={{margin: 0, padding: 0}}>¡Precaución!</h3>
            <h6>Recuerda que al reinicializar el respaldo, este quedará igualado a los test "Por Enviar"</h6>
            <h3>Esto es útil cuando: </h3>
            <ul>
                <li><h6>Cuando existan inconsistencias o diferencias en los datos respaldados y "Por Enviar"</h6><p>Es decir cuando los datos que descargues no sean los que ves en tu panel de datos por enviar</p></li>
                <li><h6>Cuando se pase a un nuevo momento de evaluaciones, para que no existan datos duplicados</h6></li>
            </ul>

 <button style= {{marginTop:"1rem"}} className="btn btn-warning" onClick={igualarRespaldoALocal}>Reinicializar respaldo</button>

  </div>
  </Fragment>




    )
}