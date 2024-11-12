
import React, { Fragment } from 'react'
import { useNavigate  } from 'react-router-dom'

export default function ListedInstrument (props) {


    const navigate = useNavigate()
        
    function renderInstrument(evt) {    
        
        const $selectedInstrument = evt.target.dataset.instrument
      

        if ($selectedInstrument == 1) {
            navigate('/tejaslee')
        } else if ($selectedInstrument == 2){
            navigate('/calculo')
        } else if ($selectedInstrument == 4){
            navigate('/aces')
        } else if ($selectedInstrument == 5){
            navigate('/wally')
        }else if ($selectedInstrument == 6){
            navigate('/corsi')
        }else if ($selectedInstrument == 7) {
            navigate('/hnf')
        } else if ($selectedInstrument == 8) {
            navigate('/fonologico')
        } else if ($selectedInstrument == 9) {
            navigate('/torre')
        } else if ($selectedInstrument == 10) {
            navigate('/esc')
        } else if ($selectedInstrument == 11) {
            navigate('/eml')
        } else if ($selectedInstrument == 12) {
            navigate('/japi')
        } else if ($selectedInstrument == 13) {
            navigate('/stroopnum')
        } else if ($selectedInstrument == 14) {
            navigate('/stroopcol')
        } else if ($selectedInstrument == 15) {
            navigate('/autoconcepto')
        } else if ($selectedInstrument == 16) {
            navigate('/actMat')
        } else if ($selectedInstrument == 17) {
            navigate('/cmasr')
        } else if (Number($selectedInstrument) === 19) {
            navigate("/aah")
        } else if ($selectedInstrument == 20) {
            navigate('/clpt')
        } else if ($selectedInstrument == 21) {
            navigate('/listeningSpan')
        } else if ($selectedInstrument == 22) {
            navigate('/digitSpan')
        } else if ($selectedInstrument == 23) {
            navigate('/regEmocional')
        } else if ($selectedInstrument == 24) {
            navigate('/actCiencias')
        } else if ($selectedInstrument == 25) {
            navigate('/ansMat')
        } else if ($selectedInstrument == 26) {
            navigate('/countSpan')
        }
        

    }

    
    return (
        <Fragment>
            <div className='listed-instrument' data-instrument={props.instrument.id} onClick={renderInstrument}>
            <svg id="instrument-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            {props.instrument.name}
            </div>
        </Fragment>
    )
}