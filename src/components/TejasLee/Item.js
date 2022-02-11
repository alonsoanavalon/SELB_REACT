import React, {Fragment, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Item (props) {

    const [answerText, setAnswerText] = useState('') 

    if (props.type == 'quiz') {
        return (
            <SwiperSlide>
                     <div className="page-item">
                        <h3 className='main-description'>
                            {props.title} 
                        </h3>
                        <form key={props.itemId} id={props.instrumentName +"-"+props.num} className="instrument-form">
                            <input type="hidden" value={props.instrumentId} name="instrument"/>
                            <input type="hidden" value={props.itemId} name="key"/>
                            <label className="form-check-label"><input className="form-check-input"  type="radio" name={props.instrumentName} value="1"/> {props.answer ? `Correcto (${props.answer})` : 'Correcto'}</label>
                            <label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="2"/> Incorrecto</label>
                            <label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="3"/> No sabe / No lo conoce</label>
                            <label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="4"/> Omite o no responde</label>
                            {props.other && 
                            <Fragment>
                                <label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value={answerText}/> Otro</label>
                                <label><input
                                type="text" 
                                name={props.instrumentName}
                                placeholder="Respuesta"
                                onChange={(e) => setAnswerText(e.target.value) }
                                /></label>
                             </Fragment>}
                     
                        </form>
                    </div>
            </SwiperSlide>
        )
    }
    else if (props.type == 'multimedia') {
        return (
            <Fragment>
                <div className="page-item"> 
                    {props.title && <h3 className='main-description'>{props.title}</h3>} 
          
                    <img src={props.picture} alt={props.pictureName}/>
                </div>
            </Fragment>
        )
    }




}