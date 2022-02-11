import React, {Fragment, useEffect, useState} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { render } from 'react-dom';

export default function Audio (props) {

    return(
        <Fragment>

        <div className='page-item'>
            <ReactAudioPlayer
            src={props.audio? props.audio.audio : undefined}
            autoPlay={false}
            controls={true}
            />
        </div> 


    </Fragment>
    )





}