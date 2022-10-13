import React, {Fragment, useState, useEffect} from 'react';
import { SwiperSlide } from 'swiper/react';

export default function ImageResponse (props) {

    const [options, setOptions] = useState([])

    useEffect(() => {

        const randomNumber = parseInt(Math.random() * 100)

        console.log(randomNumber)

        if (randomNumber >= 0 && randomNumber <= 30) {
            setOptions([
            <label className="form-check-label wally-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="1"/> 
            <img className="wally-emotion" src="/images/smiling-face.png" alt="profile"/>
            <p>Feliz</p>
            </label>,
            <label className="form-check-label wally-label"><input  className={`${props.identifier} form-check-input`} type="radio" name={props.instrumentName} value="2"/><img className="wally-emotion" src="/images/sad.png" alt="profile"/>
            <p>Triste</p>
            </label>,
            <label className="form-check-label wally-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="4"/>
            <img className="wally-emotion" src="/images/poker-face.png" alt="profile"/>
            <p>Solo bien</p>
            </label>,
            <label className="form-check-label wally-label">
            <input className="form-check-input" type="radio" name={props.instrumentName} value="3"/> 
            <img className="wally-emotion" src="/images/angry.png" alt="profile"/>
            <p>Enojado</p>
            </label>])
        } else if (randomNumber > 30 && randomNumber <= 60) {
            setOptions([
                <label className="form-check-label wally-label">
                    <input className="form-check-input" type="radio" name={props.instrumentName} value="4"/>
                <img className="wally-emotion" src="/images/poker-face.png" alt="profile"/>
                <p>Solo bien</p>
                </label>,
                <label className="form-check-label wally-label">
                <input className="form-check-input" type="radio" name={props.instrumentName} value="3"/> 
                <img className="wally-emotion" src="/images/angry.png" alt="profile"/>
                <p>Enojado</p>
                </label>,
                <label className="form-check-label wally-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="1"/> 
                <img className="wally-emotion" src="/images/smiling-face.png" alt="profile"/>
                <p>Feliz</p>
                </label>,
                <label className="form-check-label wally-label"><input  className={`${props.identifier} form-check-input`} type="radio" name={props.instrumentName} value="2"/><img className="wally-emotion" src="/images/sad.png" alt="profile"/>
                <p>Triste</p>
                </label>
                ])
        } else if (randomNumber > 60) {
            setOptions([
                <label className="form-check-label wally-label"><input  className={`${props.identifier} form-check-input`} type="radio" name={props.instrumentName} value="2"/><img className="wally-emotion" src="/images/sad.png" alt="profile"/>
                <p>Triste</p>
                </label>,
                <label className="form-check-label wally-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="1"/> 
                <img className="wally-emotion" src="/images/smiling-face.png" alt="profile"/>
                <p>Feliz</p>
                </label>,
                <label className="form-check-label wally-label">
                <input className="form-check-input" type="radio" name={props.instrumentName} value="3"/> 
                <img className="wally-emotion" src="/images/angry.png" alt="profile"/>
                <p>Enojado</p>
                </label>,
                <label className="form-check-label wally-label"><input className="form-check-input" type="radio" name={props.instrumentName} value="4"/><img className="wally-emotion" src="/images/poker-face.png" alt="profile"/>
                <p>Solo bien</p>
                </label>
            ])
        }
    }, [])
    
    return (
            <SwiperSlide>
            <div className="page-item">
            <h3 className='main-description'>
                {props.title} 

            </h3>
            <form onClick={props.onclick} key={props.itemId} id={props.instrumentName +"-"+props.num} className="instrument-form wally-form">
                <input type="hidden" value={props.instrumentId} name="instrument"/>
                <input type="hidden" value={props.itemId} name="key"/>
                {
                                    options && options
                }
            </form>
            </div>
            </SwiperSlide>

    )

}

