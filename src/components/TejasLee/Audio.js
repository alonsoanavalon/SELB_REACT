import React, {Fragment } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default function Audio () {

    return(
        <Fragment>

        <div className='page-item'>
            <ReactAudioPlayer
            src={"https://res.cloudinary.com/keyzen/video/upload/v1644189037/selb/tejaslee/Tejas_Lee_-_audio_comprensi%C3%B3n_auditiva_NT1_dciytg.wav"}
            autoPlay={false}
            controls={true}
            />
        </div> 


    </Fragment>
    )





}