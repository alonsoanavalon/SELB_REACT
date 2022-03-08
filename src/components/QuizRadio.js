import React, { Fragment, useState, useEffect } from 'react';

export default function QuizRadio(props) {

    const [isSecondItem, setIsSecondItem] = useState(undefined)

    useEffect(() => {

        if (props.choices) setIsSecondItem(true)  

    }, [])

    return (
        <Fragment>
      

            {
                props.choices === 3 && 
 

            <form key={props.itemId} id={props.instrumentName +"-"+props.num} className="instrument-form instrument-sdq ">
                <h6 className='h6 text-start sdq-title'>{props.num + ". " +props.title}</h6>
                <div className='sdq-option'>

                <input type="hidden" value={props.instrumentId} name="instrument"/>
                <input type="hidden" value={props.itemId} name="key"/>
                
                <div class="form-check form-check-inline">
                    <label class="form-check-label"><input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="1"/>Falso</label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label"><input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="2"/>Medianamente Verdadero</label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label"> <input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="3"/>Muy verdadero</label>
                </div>

                </div>
            </form>  


            }
            {
                props.choices === 4 &&

                <form key={props.itemId} id={props.instrumentName +"-"+props.num} className="instrument-form instrument-sdq__extended  ">

                <h6 className='h6 text-start sdq-title'>{props.num + ". " +props.title}</h6>
                <div className='sdq-option'>

                <input type="hidden" value={props.instrumentId} name="instrument"/>
                <input type="hidden" value={props.itemId} name="key"/>
                
                <div class="form-check form-check-inline">
                    <label class="form-check-label"><input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="1"/>No</label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label"><input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="2"/>Si, pocas dificultades</label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label"> <input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="3"/>Si, claras dificultades</label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label"> <input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="3"/>Si, graves dificultades</label>
                </div>
                
                </div>

                </form>   


            }

{
                props.choices === 4.1 &&


            
            <form key={props.itemId} id={props.instrumentName +"-"+props.num} className="instrument-form instrument-sdq__extended  ">
            <h6 className='h6 text-start sdq-title'>{props.num + ". " +props.title}</h6>
                <div className='sdq-option'>

                <input type="hidden" value={props.instrumentId} name="instrument"/>
                <input type="hidden" value={props.itemId} name="key"/>
                
                <div class="form-check form-check-inline">
                    <label class="form-check-label"><input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="1"/>Menos de un mes</label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label"><input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="2"/>1-5 Meses</label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label"> <input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="3"/>6-12 Meses</label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label"> <input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="3"/>Más de un año</label>
                </div>
                
                </div>
            </form>   

            }

{
                props.choices === 4.2 &&

            <form key={props.itemId} id={props.instrumentName +"-"+props.num} className="instrument-form instrument-sdq__extended ">
            <h6 className='h6 text-start sdq-title'>{props.num + ". " +props.title}</h6>
                <div className='sdq-option'>

                <input type="hidden" value={props.instrumentId} name="instrument"/>
                <input type="hidden" value={props.itemId} name="key"/>
                
                <div class="form-check form-check-inline">
                    <label class="form-check-label"><input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="1"/>No</label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label"><input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="2"/>Un poco</label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label"> <input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="3"/>Bastante</label>
                </div>
                <div class="form-check form-check-inline">
                    <label class="form-check-label"> <input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="3"/>Mucho</label>
                </div>
                
                </div>
            </form>   


            }



            


        </Fragment>
    )
}