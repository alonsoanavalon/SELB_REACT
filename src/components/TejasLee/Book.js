import React from 'react';
import HTMLFlipBook from 'react-pageflip';

export default function Book (props) {


    return (
        
        <div className='page-item'>

            <div className='book-wrapper'>
            <HTMLFlipBook width={500} height={400} mobileScrollSupport={true} drawShadow={true} showCover={true} size={"stretch"} maxShadowOpacity={0.3} autoSize={true} >
                <img className="demoPage" alt="page-1" src="https://res.cloudinary.com/keyzen/image/upload/v1645727162/selb/tejaslee/book/01_pzeieo.jpg"/>
                <img className="demoPage" alt="page-2" src="https://res.cloudinary.com/keyzen/image/upload/v1645727162/selb/tejaslee/book/02_kphnm6.jpg"/>
                <img className="demoPage" alt="page-3" src="https://res.cloudinary.com/keyzen/image/upload/v1645727162/selb/tejaslee/book/03_dzroa9.jpg"/>
                <img className="demoPage" alt="page-4" src="https://res.cloudinary.com/keyzen/image/upload/v1645727162/selb/tejaslee/book/04_coezzz.jpg"/>
                <img className="demoPage" alt="page-5" src="https://res.cloudinary.com/keyzen/image/upload/v1645727162/selb/tejaslee/book/05_vulpgq.jpg"/>

            </HTMLFlipBook>
            </div>
                
          
            </div>

    )

}

