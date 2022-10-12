import React, {Fragment} from 'react';

export default function ItemImage (props) {


    return (

        <Fragment>
            <div className="item-image-wally">
                <h2>{props.title}</h2>
                <img src={props.picture} alt="" />
            </div>

        </Fragment>

    )

}

