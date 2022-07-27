import React, {Fragment, useEffect, useState} from 'react';
import {get, set} from 'idb-keyval'
import { CSVLink } from "react-csv";
import { useAlert } from 'react-alert'
export default function Respaldo () {


    const [instrumentsRespaldo, setInstrumentsRespaldo] = useState([])
    const [csvDataRespaldo, setCsvDataRespaldo] = useState()
    const [backupTest, setBackupTest] = useState([])
    const [studentsRespaldo, setStudentsRespaldo] = useState([])
    const [userData, setUserData] = useState("")
    const alert = useAlert()

    useEffect(() => {

        get('userData').then(res => {
            setUserData(res)
        })

        get('backupTest')
        .then(res => setBackupTest(res))



    }, [])

    setTimeout(() => {
        get('students')
        .then(res => setStudentsRespaldo(res))

        get('instruments').then(res => setInstrumentsRespaldo(res))

    }, 5000) 



    const getCsvRespaldo = () => {




        let instrumentId;
        let studentId;
        let testArray = []
       



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
            Object.entries(test[1]).map((element) => element[1] === "" ? answers.push(0) : answers.push(element[1]))
            localArray.push(instrumentName, test[0]['date'], studentName, ...answers, "FIN", JSON.stringify(test))
            testArray.push(localArray)
            


            
            


        })

        console.log(testArray)

        setCsvDataRespaldo(testArray)
        


    }

    const igualarRespaldoALocal = () => {
        get('completedTests')
        .then(completed => {
            alert.show('El respaldo se ha reinicializado. RECUERDA: Actualiza esta pantalla para descargar el respaldo con los NUEVOS datos', {
                type:'success'
            })
                set('backupTest', completed)
        })
    }

    

   
    
    return (
        <Fragment>
            {/* <CsvReader />  Este nos servirá cuando queramos meter datos, ya que lee CSV*/}

            
            <div className='excel-container'>

            <h2 style={{margin: 0, padding: 0}}>Respaldo de datos Local</h2>

            <div style={{border:"1px solid #ccc", display: "flex", flexDirection:"column", gap: ".6rem", minHeight:"100px"}}>
            {
                            studentsRespaldo.length > 0 && <button id="btn-excel"className='btn btn-primary' onClick={getCsvRespaldo}>Obtener respaldo</button>
                        }

                        {
                            csvDataRespaldo !== undefined && 
                            <Fragment>
                                <CSVLink className="btn btn-success "filename="respaldo-test" data={csvDataRespaldo}>Descargar</CSVLink>
                               
                            </Fragment>


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