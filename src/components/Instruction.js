import React, { Fragment } from 'react';
import { getMany, set } from 'idb-keyval'
import { useNavigate  } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Instruction (props) {

    const navigate = useNavigate()
    const isSameTest = (test, instrumentInfo) => {
        const metadata = Array.isArray(test) ? test[0] : null
        return metadata &&
            metadata.student_id === instrumentInfo.student_id &&
            metadata.user_id === instrumentInfo.user_id &&
            metadata.instrument === instrumentInfo.instrument
    }

    const collectChoices = instruments => {
        const choices = {}

        instruments.forEach(instrument => {
            const keyInput = instrument.elements.key
            if (!keyInput) return

            const fieldNames = [
                'Precalculo',
                'Precalculo-selected',
                'Precalculo-counted',
                'Precalculo-cardinal',
                'TejasLee',
                'SDQ',
                'Aces',
                'Wally',
                'EML',
                'Stroop numérico'
            ]
            const answerField = fieldNames
                .map(fieldName => instrument.elements.namedItem(fieldName))
                .find(Boolean)

            if (answerField) {
                choices[keyInput.value] = answerField.value
            }
        })

        return choices
    }

    async function saveInstrument({ partial }) {
        const confirmation = await Swal.fire({
            title: partial
                ? 'Recuerda que faltan items por terminar antes de salir'
                : '¿Deseas finalizar y guardar el test?',
            html: partial ? '¿Deseas guardar el test hasta este punto?' : undefined,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, guardar y salir'
        })

        if (!confirmation.isConfirmed) return

        const instruments = Array.from(document.querySelectorAll('.instrument-form'))
        const instrumentId = instruments[0] && instruments[0].elements.instrument

        if (!instrumentId) {
            await Swal.fire('No fue posible guardar el test', 'No se encontraron respuestas para guardar.', 'error')
            return
        }

        const [selectedStudent, userData, completedTests, backupTest] = await getMany([
            'selectedStudent',
            'userData',
            'completedTests',
            'backupTest'
        ])

        if (!selectedStudent || !userData || !userData.id) {
            await Swal.fire('No fue posible guardar el test', 'Falta el alumno o el usuario seleccionado.', 'error')
            return
        }

        const instrumentInfo = {
            user_id: Number(userData.id),
            student_id: Number(selectedStudent),
            instrument: Number(instrumentId.value),
            date: `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
        }
        const choicesArray = [instrumentInfo, collectChoices(instruments)]
        const currentCompletedTests = Array.isArray(completedTests) ? completedTests : []
        const updatedCompletedTests = [
            ...currentCompletedTests.filter(test => !isSameTest(test, instrumentInfo)),
            choicesArray
        ]

        await set('completedTests', updatedCompletedTests)

        if (Array.isArray(backupTest) && backupTest.length > 0) {
            const updatedBackupTest = [
                ...backupTest.filter(test => !isSameTest(test, instrumentInfo)),
                choicesArray
            ]
            await set('backupTest', updatedBackupTest)
        }

        navigate('/')
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
                        onClick={() => saveInstrument({ partial: false })}
                    > Guardar test</button>
                }

                {
                        props.checkPrecalculo === true && 
                        <button
                        className='button btn text-success'
                        onClick={() => saveInstrument({ partial: true })}
                    > Guardar test</button>
                }


            </div>
            
        </h3>
    </div>
    )
}