import React, { Fragment, useState } from 'react';
import {get, update, getMany, set} from 'idb-keyval'
import { useAlert } from 'react-alert'
import { useNavigate  } from 'react-router-dom'

export default function Instruction (props) {

    const navigate = useNavigate()
    const alert = useAlert()

    const [isArray, setIsArray] = useState(false)

    function getMomentByDate(date) {
        let dateBegin;
        let dateUntil;
        get('moments')
        .then(res => {
            res.map(element => {
                dateBegin = new Date(element['begin']).toLocaleDateString("zh-TW")
                dateUntil = new Date(element['until']).toLocaleDateString("zh-TW")
                if (date >= dateBegin && date <= dateUntil ) {
                    return element['id']
                } 
                
                
            })
        })
    }

    function saveInstrumentOnline() {
        let choices = {}
        let instrumentInfo = {}
        let choicesArray = []

        let testDataArray = ['selectedStudent', 'userData']

        getMany(testDataArray).then(([firstVal, secondVal]) =>  {
            instrumentInfo['user_id'] = parseInt(secondVal['id'])
            instrumentInfo['student_id'] = parseInt(firstVal)
            instrumentInfo['date'] = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
        }
        );

        choicesArray.push(instrumentInfo)

        let allInstruments = document.querySelectorAll('.instrument-form')
        allInstruments.forEach(instrument => {
            let key;
            let value;
            if (instrument['Precalculo']) {
                key = instrument['key'].value
                value= instrument['Precalculo'].value
                choices[key] =  value
            } else if (instrument['Precalculo-selected']) {
                key = instrument['key'].value
                value= instrument['Precalculo-selected'].value
                choices[key] =  value
            } else if (instrument['Precalculo-counted']) {
                key = instrument['key'].value
                value= instrument['Precalculo-counted'].value
                choices[key] =  value
            } else if (instrument['Precalculo-cardinal']) {
                key = instrument['key'].value
                value= instrument['Precalculo-cardinal'].value
                choices[key] =  value
            }

            if (instrument['TejasLee']) {
                let key = instrument['key'].value
                let value = instrument['TejasLee'].value
                choices[key] =  value
            }

            if (instrument['SDQ']) {
                let key = instrument['key'].value
                let value = instrument['SDQ'].value
                choices[key] = value
            }

            if (instrument['Aces']) {
                let key = instrument['key'].value
                let value = instrument['Aces'].value
                choices[key] = value
            }

            if (instrument['Wally']) {
                let key = instrument['key'].value
                let value = instrument['Wally'].value
                choices[key] = value
            }

            
        })

        instrumentInfo['instrument'] = parseInt(allInstruments[0]['instrument'].value)

        choicesArray.push(choices)

        get('backupTest')
        .then(response => {
            let backupLength = response.length
            if (Array.isArray(response) && response.length > 0) {
                get('completedTests')
                .then(res => {
                    if (backupLength >= res.length) { // Aca ya sabemos que es mas el backup
                        console.log(response, "Actualizando Backup")
                        let arrayCounter = 0;
                        response.forEach(array => {
                            let responseMoment;
                            let instrumentMoment;
                            if (array[0]['student_id'] === instrumentInfo['student_id'] && array[0]['instrument'] == instrumentInfo['instrument'] && array[0]['user_id'] == instrumentInfo['user_id']) {

                                responseMoment = getMomentByDate(array[0]['date'])
                                instrumentMoment = getMomentByDate(instrumentInfo['date'])

                                if (responseMoment === instrumentMoment) {
                                    response.splice(arrayCounter, 1)
                                } 
                            }
                            arrayCounter+= 1
    
                        })
    
                        update('backupTest', val => [...response, choicesArray])
                    }
                })
            }
        })


        get('completedTests')
        .then(response => {

            if (!isArray) {
                if (response.length === undefined) {
                    update('completedTests', (val) => 
                    [response , choicesArray])         
                    setIsArray(true)
                } else if (response.length === 0) {

                    set('completedTests', [choicesArray])
                } else {
                    console.log(response, "Actualizando1")
                    let arrayCounter = 0;
                    response.forEach(array => {
                        
                        let responseMoment;
                        let instrumentMoment;
                        if (array[0]['student_id'] === instrumentInfo['student_id'] && array[0]['instrument'] == instrumentInfo['instrument'] && array[0]['user_id'] == instrumentInfo['user_id']) {

                            responseMoment = getMomentByDate(array[0]['date'])
                            instrumentMoment = getMomentByDate(instrumentInfo['date'])

                            if (responseMoment === instrumentMoment) {
                                response.splice(arrayCounter, 1)
                            } 
                        }
                        arrayCounter+= 1

                    })

                    update('completedTests', val => [...response, choicesArray])

                    
                }
            } else {
                console.log(response, "Actualizando2")
                update('completedTests', val => [...response, choicesArray])

            }

            alert.show('Test guardado con éxito', {
                type:'success'
            })

            setTimeout(() => {
                navigate('/')
            }, 2000)

        })   
    }

    return (
        <div className="page-item">
        <h3 className='main-description'>

            {
                props.title && <h3 className="p-4">{props.title}</h3>
            }

            <div className={props.statement ? 'statement' : 'instruction' }>
                <p>{props.instruction}</p>
                
                {props.secondInstruction && 
                <Fragment>
                <br></br>
                 <p className={props.statementInstruction && 'statement-instruction'}>{props.secondInstruction}</p>
                </Fragment>

                 }
                {
                    props.checkpoint === true &&
                    <button
                    
                        className='button btn text-success'
                        onClick={saveInstrumentOnline}
                    > Guardar test</button>

                }


            </div>
            
        </h3>
    </div>
    )
}