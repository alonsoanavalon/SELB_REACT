import React, {Fragment} from 'react';

export default function Sidebar () {

    
    return (

        <Fragment>
        
        { window.location.pathname !== '/login' &&

        <div>NAv</div>
        }
            
           
        </Fragment>
       
    
    )
}