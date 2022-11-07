import React, { Fragment } from 'react';

export default function QuizOpen (props) {



    return (
        <Fragment>
                <form key={props.itemId} id={props.instrumentName +"-"+props.num} className="instrument-form instrument-sdq__open">
                
                <h6 className='h6 text-start sdq-title'>{props.num + ". " +props.title}</h6>

                <div className='sdq-option'>


                <input type="hidden" value={props.instrumentId} name="instrument"/>
                <input type="hidden" value={props.itemId} name="key"/>
                <textarea name={props.instrumentName}></textarea>
    
                </div>
                
    
                </form>
        </Fragment>
    )
}