import React, { Fragment, useEffect } from 'react'
import ListedInstrument from '../components/ListedInstrument'

export default function InstrumentsList (props) {


    useEffect(() => {

        document.addEventListener("click", e => {
            if (e.target.matches('#instruments-list-wrapper')) {
                const $instrumentsList = document.querySelector("#instruments-list-wrapper")
                $instrumentsList.setAttribute("class", 'hidden')
            }
        })

    }, [])


    return (
        <Fragment>
        <div id="instruments-list-wrapper" className='hidden'>
            <div id="instruments-list">
                <h4>TESTS</h4>
                {props.instruments.map(data => <ListedInstrument instrument={data}/> )}
            </div>

        </div>
        </Fragment>
    )

}