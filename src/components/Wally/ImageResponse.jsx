import React, {Fragment, useState} from 'react';
import { SwiperSlide } from 'swiper/react';

export default function ImageResponse (props) {

    return (
            <SwiperSlide>
            <div className="page-item">
            <h3 className='main-description'>
                {props.title} 

            </h3>
            <form onClick={props.onclick} key={props.itemId} id={props.instrumentName +"-"+props.num} className="instrument-form wally-form">
                <input type="hidden" value={props.instrumentId} name="instrument"/>
                <input type="hidden" value={props.itemId} name="key"/>
                <label className="form-check-label wally-label">
                    <input className="form-check-input" type="radio" name={props.instrumentName} value="1"/> 
                    <img className="wally-emotion" src="/images/smiling-face.png" alt="profile"/>
                </label>
                <label className="form-check-label wally-label">
                    <input  className={`${props.identifier} form-check-input`} type="radio" name={props.instrumentName} value="2"/> 
                    <img className="wally-emotion" src="/images/sad.png" alt="profile"/>
                </label>
                <label className="form-check-label wally-label">
                    <input className="form-check-input" type="radio" name={props.instrumentName} value="3"/> 
                    <img className="wally-emotion" src="/images/poker-face.png" alt="profile"/>
                </label>
                <label className="form-check-label wally-label">
                    <input className="form-check-input" type="radio" name={props.instrumentName} value="4"/> 
                    <img className="wally-emotion" src="/images/angry.png" alt="profile"/>
                </label>
            </form>
            </div>
            </SwiperSlide>

    )

}

