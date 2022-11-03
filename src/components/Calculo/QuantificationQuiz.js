import React, {Fragment, useState, useEffect} from 'react';

export default function QuantificationQuiz (props) {

    const [selectedValue, setSelectedValue] = useState(0)
    const [countedValue, setCountedValue] = useState(0)
    const [cardinalValue, setCardinalValue] = useState(0)
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

    useEffect(() => {

        const counters = document.querySelectorAll(".quantification-value");
        counters.forEach((counter) => {
            counter.addEventListener("click", e => {
                e.preventDefault();
            })
        })

    }, [])

    const substractSelectedValue = (e) => {
        e.preventDefault();
        if (selectedValue > 0) {
            setSelectedValue(prevValue => prevValue -1)
        }
    }

    const sumSelectedValue = (e) => {
        e.preventDefault();

            setSelectedValue(prevValue => prevValue +1)

    }
     

    const substractCountedValue = (e) => {
        e.preventDefault();
        if (countedValue > 0) {
            setCountedValue(prevValue => prevValue -1)
        }
    }

    const sumCountedValue = (e) => {
        e.preventDefault();
            setCountedValue(prevValue => prevValue +1)

    }


    const substractCardinalValue = (e) => {
        e.preventDefault();
        if (cardinalValue > 0) {
            setCardinalValue(prevValue => prevValue -1)
        }
    }

    const sumCardinalValue = (e) => {
        e.preventDefault();
            setCardinalValue(prevValue => prevValue +1)

    }
     


    

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
               <div className="quantification-counter">
               <p>Número de fichas entregadas</p>
               <div>
                <button className="btn btn-dark" onClick={substractSelectedValue}>-</button>

                <label className="form-check-label"><input  className="quantification-value" type="number" name={props.instrumentName+"-selected"} value={selectedValue} disabled min="0" onChange={(e) => setSelectedValue(e.target.value)}/></label>
                <button className="btn btn-dark" onClick={sumSelectedValue}>+</button>
                </div>  
               </div>

           </form>
           <form key={props.itemId+"-counted"} id={props.instrumentName +"-"+props.num} className="instrument-form">
               <input type="hidden" value={props.instrumentId} name="instrument"/>
               <input type="hidden" value={keys[1]} name="key"/>
               <div className="quantification-counter">
                <p>Número de fichas conteo</p>
                <div>
                    <button className="btn btn-dark" onClick={substractCountedValue}>-</button>
                    <label className="form-check-label"><input  className="quantification-value" type="number" name={props.instrumentName+"-counted"}  value={countedValue} disabled min="0" onChange={(e) => setCountedValue(e.target.value)}/></label>
                    <button className="btn btn-dark" onClick={sumCountedValue}>+</button>
               </div>
               </div>
           </form>
           <form key={props.itemId+"-cardinal"} id={props.instrumentName +"-"+props.num} className="instrument-form">
               <input type="hidden" value={props.instrumentId} name="instrument"/>
               <input type="hidden" value={keys[2]} name="key"/>
               <div className="quantification-counter">
                <p>Número de fichas cardinalidad</p>
                <div>
                <button className="btn btn-dark" onClick={substractCardinalValue}>-</button>
                <label className="form-check-label"><input  className="quantification-value" type="number" name={props.instrumentName+"-cardinal"} value={cardinalValue} disabled min="0"  onChange={(e) => setCardinalValue(e.target.value)}/></label>  
                <button className="btn btn-dark" onClick={sumCardinalValue}>+</button>
                </div>

               </div> 
           </form>
           </div>

       </div>
            }
        
       </Fragment>
    )
}