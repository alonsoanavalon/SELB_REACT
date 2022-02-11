import React, { Fragment, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

export default function Book (props) {


    return (
        
        <div className='page-item'>

            <div className='book-wrapper'>
            <HTMLFlipBook width={500} height={400} mobileScrollSupport={true} drawShadow={true} showCover={true} size={"stretch"} maxShadowOpacity={0.3} autoSize={true} >
                <img className="demoPage" alt="page-1" src="https://res.cloudinary.com/keyzen/image/upload/v1644189009/selb/tejaslee/book/book1_fzvvan.jpg"/>
                <img className="demoPage" alt="page-2" src="https://res.cloudinary.com/keyzen/image/upload/v1644355908/selb/tejaslee/book/new/Screenshot_1_ohb05c.jpg"/>
                <img className="demoPage" alt="page-3" src="https://res.cloudinary.com/keyzen/image/upload/v1644355908/selb/tejaslee/book/new/Screenshot_2_yus7z9.jpg"/>
                <img className="demoPage" alt="page-4" src="https://res.cloudinary.com/keyzen/image/upload/v1644355908/selb/tejaslee/book/new/Screenshot_3_dkpvkd.jpg"/>
                <img className="demoPage" alt="page-5" src="https://res.cloudinary.com/keyzen/image/upload/v1644355908/selb/tejaslee/book/new/Screenshot_4_qflql8.jpg"/>
                <img className="demoPage" alt="page-6" src="https://res.cloudinary.com/keyzen/image/upload/v1644355908/selb/tejaslee/book/new/Screenshot_5_ufgfvu.jpg"/>
                <img className="demoPage" alt="page-7" src="https://res.cloudinary.com/keyzen/image/upload/v1644355908/selb/tejaslee/book/new/Screenshot_6_rmga8s.jpg"/>
                <img className="demoPage" alt="page-8" src="https://res.cloudinary.com/keyzen/image/upload/v1644355908/selb/tejaslee/book/new/Screenshot_7_a8mcnr.jpg"/>
                <img className="demoPage" alt="page-9" src="https://res.cloudinary.com/keyzen/image/upload/v1644355908/selb/tejaslee/book/new/Screenshot_8_y7sg0x.jpg"/>
                <img className="demoPage" alt="page-10" src="https://res.cloudinary.com/keyzen/image/upload/v1644355908/selb/tejaslee/book/new/Screenshot_9_vkwukq.jpg"/>
                <img className="demoPage" alt="page-11" src="https://res.cloudinary.com/keyzen/image/upload/v1644355909/selb/tejaslee/book/new/Screenshot_10_prtsxx.jpg"/>
                <img className="demoPage" alt="page-12" src="https://res.cloudinary.com/keyzen/image/upload/v1644355909/selb/tejaslee/book/new/Screenshot_11_hlppuk.jpg"/>
                <img className="demoPage" alt="page-13" src="https://res.cloudinary.com/keyzen/image/upload/v1644355909/selb/tejaslee/book/new/Screenshot_12_wygalk.jpg"/>
                <img className="demoPage" alt="page-14" src="https://res.cloudinary.com/keyzen/image/upload/v1644189007/selb/tejaslee/book/book14_k6196i.jpg"/>
            </HTMLFlipBook>
            </div>
                
          
            </div>

    )

}

