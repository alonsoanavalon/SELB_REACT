import React, {Fragment, useEffect, useState} from 'react';
import {get} from 'idb-keyval'
import { CSVLink } from "react-csv";
export default function Respaldo () {


    const [instrumentsRespaldo, setInstrumentsRespaldo] = useState([])
    const [csvDataRespaldo, setCsvDataRespaldo] = useState()
    const [backupTest, setBackupTest] = useState([])
    const [studentsRespaldo, setStudentsRespaldo] = useState([])
    const [userData, setUserData] = useState("")

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

    

   
    
    return (
        <Fragment>
            {/* <CsvReader />  Este nos servirá cuando queramos meter datos, ya que lee CSV*/}

            
            <div className='excel-container'>

            <h2>Respaldo de datos Local</h2>

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


  </div>
  </Fragment>




    )
}