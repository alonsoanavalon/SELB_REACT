import React, { Fragment, useEffect, useState } from 'react';
import { Apple, AppleWrapper } from './style';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { getMany, get, set, update } from 'idb-keyval';

export default function AppleCounter (props) {

    const [appleCounter, setAppleCounter] = useState([]);
    const [isArray, setIsArray] = useState(false)
    const navigate = useNavigate();
    const alert = useAlert();

    useEffect(() => {
        setAppleCounter()
    }, [])

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

            
        })

        instrumentInfo['instrument'] = parseInt(allInstruments[0]['instrument'].value)

        choicesArray.push(choices)

        console.log(choicesArray)

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
                        
                        if (array[0]['student_id'] === instrumentInfo['student_id'] && array[0]['instrument'] == instrumentInfo['instrument']) {
                            console.log(response, arrayCounter)
                            response.splice(arrayCounter, 1)
                            
                
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

    useEffect(() => {

        if (props.counter >= 6) {
            Swal.fire({
                title: 'Haz cometido 6 errores',
                text: "¿Deseas salir?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Si, salir y guardar'
              }).then((result) => {
                if (result.isConfirmed) {
                    saveInstrumentOnline()
                }
              })
        }

    }, [props.counter])

    return (
       <Fragment>
            <AppleWrapper className="apple-wrapper">
                {
                    props.counter < 6
                    && [...Array(6 - props.counter)].map((e, i) => <Apple key= {i}/>)
                }
                </AppleWrapper>    
       </Fragment> 
    )
}