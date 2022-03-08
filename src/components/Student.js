import { get, set } from 'idb-keyval';
import React, { Fragment, useState } from 'react';

import {useNavigate} from 'react-router-dom'

export default function Student (props) {

    function selectStudent (evt) {

        set('selectedStudent', evt.target.parentNode.dataset.id)

        const $instrumentsList = document.querySelector("#instruments-list-wrapper")
        $instrumentsList.setAttribute("class", 'active')
    
    }

    return (
        <Fragment>
            <tr key={props.id} data-id={props.id}onClick={selectStudent} class='listed-student'>
                <th className="genre"scope="row">{props.genre == "M" ? <img src='/images/son.png' alt='boy' class='kid-icon'></img> : <img src='/images/daughter.png' alt='boy' class='kid-icon'></img>}</th>
                <td>{props.name + " " + props.surname}</td>
                <td>{props.rut}</td>
                <td>{props.level + " " +props.letter}</td>
            </tr>
        </Fragment>
    )
}