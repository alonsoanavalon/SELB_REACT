
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