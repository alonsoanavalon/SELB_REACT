import React, {Fragment } from 'react';
import ReactAudioPlayer from 'react-audio-player';

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