import React, { Fragment, useEffect, useState } from 'react';

export default function MultipleChoices(props) {
    return(
        <Fragment>
            <form key={props.itemId} id={props.instrumentName +"-"+props.num} className="instrument-form instrument-sdq instrument-multiple">
                
                <h6 className='h6 text-start sdq-title'>{props.title}</h6>
                <div className='sdq-option'>

                    <input type="hidden" value={props.instrumentId} name="instrument"/>
                    <input type="hidden" value={props.itemId} name="key"/>
                    
                    <div class="form-check form-check-inline">
                        <label class="form-check-label"> <input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="1"/>No</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <label class="form-check-label"> <input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="2"/>Un poco</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <label class="form-check-label"> <input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="3"/>Bastante</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <label class="form-check-label"> <input class="form-check-input" type="radio" name={props.instrumentName} id={"inlineRadioFirst-" + props.num} value="4"/>Mucho</label>
                    </div>
                    
                    
                </div>
            
            </form>
        </Fragment>
    )
}