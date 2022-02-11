import React, { Fragment } from 'react';

export default function Instruction (props) {
    return (
        <div className="page-item">
        <h3 className='main-description'>
            {props.instruction}
        </h3>
    </div>
    )
}