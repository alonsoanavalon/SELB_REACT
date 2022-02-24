import React, {Fragment, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Item (props) {

    const [answerText, setAnswerText] = useState('') 


    function toggleTitles (e) {

        let allInstructions = Array.from(document.querySelectorAll(".image-instruction"))

        allInstructions.map(instruction => instruction.classList.toggle("hidden"))




    }

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
                    {props.title && 
                    <Fragment> 
                        <div class="image-instruction-container">
                        <h3 className='main-description image-instruction'>{props.title}</h3>
                            <button class="btn-visibility"
                                onClick={toggleTitles}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
                            </button>
                            </div>
                            </Fragment>} 
          
                    <img src={props.picture} alt={props.pictureName}/>
                </div>
            </Fragment>
        )
    }




}