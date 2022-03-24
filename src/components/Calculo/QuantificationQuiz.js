import React, {Fragment, useState, useEffect} from 'react';

export default function QuantificationQuiz (props) {

    const [selectedValue, setSelectedValue] = useState()
    const [countedValue, setCountedValue] = useState()
    const [cardinalValue, setCardinalValue] = useState()
    const [keys, setKeys] = useState([])

    useEffect(() => {

        let keysArray = props.itemId

        keysArray = keysArray.sort()

        if (keysArray.includes(100)){
            keysArray = [99, 100, 101]
        }

        setKeys(keysArray)
        keys && console.log(keys)

    }, [])
    
    

    return (
        <Fragment>
            {
                keys[1] && 

            <div className="page-item">
           <h3 className='main-description'>
               {props.title} 
           </h3>
           <div className='quantification-wrapper'>
           <form key={props.itemId+"-selected"} id={props.instrumentName +"-"+props.num} className="instrument-form">
               <input type="hidden" value={props.instrumentId} name="instrument"/>
               <input type="hidden" value={keys[0]} name="key"/>
               <label className="form-check-label"><input  className="quantification-value" type="number" name={props.instrumentName+"-selected"} value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}/> Número de fichas entregadas</label>
           </form>
           <form key={props.itemId+"-counted"} id={props.instrumentName +"-"+props.num} className="instrument-form">
               <input type="hidden" value={props.instrumentId} name="instrument"/>
               <input type="hidden" value={keys[1]} name="key"/>
               <label className="form-check-label"><input  className="quantification-value" type="number" name={props.instrumentName+"-counted"}  value={countedValue} onChange={(e) => setCountedValue(e.target.value)}/> Número de fichas conteo</label>
           </form>
           <form key={props.itemId+"-cardinal"} id={props.instrumentName +"-"+props.num} className="instrument-form">
               <input type="hidden" value={props.instrumentId} name="instrument"/>
               <input type="hidden" value={keys[2]} name="key"/>
               <label className="form-check-label"><input  className="quantification-value" type="number" name={props.instrumentName+"-cardinal"} value={cardinalValue} onChange={(e) => setCardinalValue(e.target.value)}/> Número de fichas cardinalidad</label>   
           </form>
           </div>

       </div>
            }
        
       </Fragment>
    )
}