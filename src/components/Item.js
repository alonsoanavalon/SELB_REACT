import React, {Fragment, useEffect, useState} from "react";
import { SwiperSlide } from 'swiper/react';

export default function Item (props) {

    const [answerText, setAnswerText] = useState('') 
    const [options, setOptions] = useState([])

    useEffect(() => {

        const randomNumber = parseInt(Math.random() * 100)

        if (randomNumber >= 0 && randomNumber <= 30) {
            setOptions([<label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="1"/>Enojado </label>,
            <label className="form-check-label"><input className={`${props.identifier} form-check-input`} type="radio" name={props.instrumentName} value="2"/>Feliz</label>,
            <label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="3"/>Triste</label>,
            <label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="4"/>Asustado</label>])
        } else if (randomNumber > 30 && randomNumber <= 60) {
            setOptions([
            <label className="form-check-label"><input className={`${props.identifier} form-check-input`} type="radio" name={props.instrumentName} value="2"/>Feliz</label>,
            <label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="1"/>Enojado </label>,
            <label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="4"/>Asustado</label>,
            <label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="3"/>Triste</label>])
        } else if (randomNumber > 60) {
            setOptions([
                <label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="3"/>Triste</label>,
                <label className="form-check-label"><input className={`${props.identifier} form-check-input`} type="radio" name={props.instrumentName} value="2"/>Feliz</label>,
                <label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="1"/>Enojado </label>,
                <label className="form-check-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="4"/>Asustado</label>])
        }
    }, [])

    useEffect(() => {


        document.querySelector('.instrument-form').addEventListener('submit', function(event) {
            // Evita que el formulario se envíe
            event.preventDefault();
            return false;
        })


    }, [])




    function toggleTitles (e) {

        let allInstructions = Array.from(document.querySelectorAll(".image-instruction"))
        allInstructions.map(instruction => instruction.classList.toggle("hidden"))
    }

    function preventOnSubmit (e) {
        e.preventDefault()
    }

    if (props.type == 'quiz') {
        return (
            <SwiperSlide>
                     <div className="page-item">
                        <h3 className='main-description'>
                            {props.title} 

                        </h3>
                        <form onSubmit={preventOnSubmit} onClick={props.onclick} key={props.itemId} id={props.instrumentName +"-"+props.num} className="instrument-form">
                            <input type="hidden" value={props.instrumentId} name="instrument"/>
                            <input type="hidden" value={props.itemId} name="key"/>
                            <label className="form-check-label">
                                <input className="form-check-input" type="radio" name={props.instrumentName} value="1"/> {props.answer ? `Correcto (${props.answer})` : 'Correcto'}
                            </label>
                            <label className="form-check-label"><input  className={`${props.identifier} form-check-input`} type="radio" name={props.instrumentName} value="2"/> Incorrecto</label>
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
                        <div className="image-instruction-container">
                        <h3 className='main-description image-instruction'>{props.title}</h3>
                            <button className="btn-visibility"
                                onClick={toggleTitles}
                            >
                            </button>
                            </div>
                            </Fragment>} 
          
                    <img src={props.picture} alt={props.pictureName}/>
                </div>
            </Fragment>
        )
    } else if (props.type == 'aces') {
        return (
            <Fragment>
 <div className="page-item aces-direction aces-page-item" >
                        <h3 className='main-description'>
                            {props.title} 

                        </h3>
                                               
                        <img src={props.picture} alt={props.pictureName}/>
                        <div className="main-content-wrapper aces-content-wrapper" >
                            <form className="aces-form instrument-form" onClick={props.onclick} key={props.itemId} id={props.instrumentName +"-"+props.num}>
                                <input type="hidden" value={props.instrumentId} name="instrument"/>
                                <input type="hidden" value={props.itemId} name="key"/>
                                {
                                    options && options
                                }
                            </form>

                        </div>
                    </div>
            </Fragment>
        )
    }




}
