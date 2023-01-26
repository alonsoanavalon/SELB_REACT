import React, { Fragment, useEffect, useState } from 'react';

export default function HNF() {

    return (
        <Fragment>
            <div className="hnf-container">
                <div className="hnf-option-container">
                    <div className="hnf-box" data-id="0"></div>
                    <div className="hnf-box"></div>
                    <div className="hnf-box" data-id="1"></div>
                </div>
                <div className="hnf-button-container">
                    <button className="hnf-button"></button>
                    <button className="hnf-button"></button>
                </div>
            </div>
        </Fragment>
    )
}