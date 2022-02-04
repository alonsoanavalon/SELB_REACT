import { get } from 'idb-keyval';
import React, {Fragment, useEffect, useState} from 'react'

export default function SecondInstrument () {

    const [items, setItems] = useState([]);

    useEffect(() => {

        get('items')
        .then(response => {
            let filteredResponse = response.filter(element => element['instrument_id'] == 2)
            return filteredResponse
        })
        .then(filteredResponse => setItems(filteredResponse))
    
    }, [])

    return (
        <Fragment>
            <div>
                <h2>Second Instrument</h2>
            </div>
        </Fragment>
    )
}