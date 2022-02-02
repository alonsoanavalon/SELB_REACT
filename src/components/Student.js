import React, { Fragment } from 'react';

export default function Student (props) {

    function selectStudent (evt) {
        console.log(evt.target.parentNode.dataset.id)
    }

    console.log(props, "props")
    return (
        <Fragment>
            <tr key={props.id} data-id={props.id}onClick={selectStudent} class='listed-student'>
                <th class="genre"scope="row">{props.genre == "M" ? <img src='/images/son.png' alt='boy' class='kid-icon'></img> : <img src='/images/daughter.png' alt='boy' class='kid-icon'></img>}</th>
                <td>{props.name}</td>
                <td>{props.rut}</td>
                <td>{props.level + " " +props.letter}</td>
            </tr>
        </Fragment>
    )
}