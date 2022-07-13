import React, { Fragment, useState } from 'react';
import { useAlert } from 'react-alert'

export default function NavBar() {

    const alert = useAlert()
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

    function reloadPage() {
        window.location.reload()
    }

    function showVersionInfo () {
        
        const textInfo = `
        Version: 1.0.6 ||
        Ultima Actualizacion: 13/07/2022 ||
        Cache: v2
        `
        alert.show(textInfo, {
            type:'success'
        })
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
                        <svg onClick={reloadPage} id="refresh-icon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <h4
                            onClick={showVersionInfo}
                            className='selb-info'
                        >
                        SELB
                        </h4>
                    </div>
                </header>
            }
        </Fragment>
    )
}

