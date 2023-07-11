import { set } from 'idb-keyval';
import React, { Fragment } from 'react';

export default function Student (props) {

    function selectStudent (evt) {

        set('selectedStudent', evt.target.parentNode.dataset.id)
        set('selectedStudentName', evt.target.parentElement.children[1].innerHTML)

        const $instrumentsList = document.querySelector("#instruments-list-wrapper")
        $instrumentsList.setAttribute("class", 'active')
    
    }

    return (
        <Fragment>
            <tr key={props.id} data-id={props.id}onClick={selectStudent} className='listed-student'>
                <th className="genre"scope="row">{props.genre == "M" ? <img src='/images/son.png' alt='boy' className='kid-icon'></img> : <img src='/images/daughter.png' alt='boy' className='kid-icon'></img>}</th>
                <td>{props.name + " " + props.surname}</td>
                <td>{props.rut}</td>
                <td>{props.level + " " +props.letter}</td>
            </tr>
        </Fragment>
    )
}