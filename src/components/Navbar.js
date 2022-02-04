import React, { Fragment, useState } from 'react';


export default function NavBar() {

    const [asideState, setAsideState] = useState(false)

    function showAside () {
        let aside = document.querySelector("#root > div.aside-bar")

        if (aside.classList) {
            let asideIsActive = aside.classList.contains('aside-bar-active')        
            if (asideIsActive) {
    
                aside.classList.remove('aside-bar-active')
                aside.classList.add('aside-bar-hidden')
            } else {
    
                aside.classList.add('aside-bar-active')
            }
        }

 

/*         if (asideState) {
            alert("vamos a cerrarla")
            aside.classList.remove('aside-bar-active')
            aside.classList.add('aside-bar-hidden')

        } else {
            alert("vamos a abrirla")
            aside.classList.remove('aside-bar-hidden')
            aside.classList.add('aside-bar-active')
        } */

    }


    return (      
        <Fragment>
            {
                            
            window.location.pathname !== '/login' &&
                <header className="header">
                    <button 
                    className="hamburger hamburger--collapse" 
                    type="button"
                    onClick={showAside}
                    >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                    </button>

                    <div className='selb-icon-wrapper'>
                        <h4>SELB</h4>
                    </div>
                </header>
            }
        </Fragment>
    )
}

