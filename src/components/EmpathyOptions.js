import React, { Fragment, useState, useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';

export default function  EmpathyOptions(props) {

    const [options, setOptions] = useState([])

    useEffect(() => {

        const randomNumber = parseInt(Math.random() * 100)
        if (randomNumber >= 0 && randomNumber <= 30) {
            if (props.gender == 'F') {
                setOptions([
                <label className="esc-test" >
                    <img  className="esc-emotion" src="/images/esc-1.png" alt="profile" />
                    <input  type="radio" name={props.instrumentName} value="1" data-id={props.itemId} />
                </label>,
                <label className="esc-test">
                    <img className="esc-emotion" src="/images/esc-2.png" alt="profile" />
                    <input  type="radio" name={props.instrumentName} value="2" data-id={props.itemId} />
                </label>,
                <label className="esc-test">
                    <img className="esc-emotion" src="/images/esc-3.png" alt="profile" />
                    <input  type="radio" name={props.instrumentName} value="3" data-id={props.itemId} />
                </label>,
                <label className="esc-test">
                    <img className="esc-emotion" src="/images/esc-4.png" alt="profile" />
                    <input  type="radio" name={props.instrumentName} value="4" data-id={props.itemId}/>
                </label>,
                ])
            } else {
                setOptions([
               
                    <label className="esc-test">
                        <img className="esc-emotion" src="/images/esc-5.png" alt="profile" />
                        <input  type="radio" name={props.instrumentName} value="1" data-id={props.itemId}/>
                    </label>,
                    <label className="esc-test">
                        <img className="esc-emotion" src="/images/esc-6.png" alt="profile" />
                        <input  type="radio" name={props.instrumentName} value="2" data-id={props.itemId} />
                    </label>,
                    <label className="esc-test">
                        <img className="esc-emotion" src="/images/esc-7.png" alt="profile" />
                        <input  type="radio" name={props.instrumentName} value="3" data-id={props.itemId} />
                    </label>,
                    <label className="esc-test">
                        <img className="esc-emotion" src="/images/esc-8.png" alt="profile" />
                        <input  type="radio" name={props.instrumentName} value="4" data-id={props.itemId} />
                    </label>
        
                    ])
            }
        } else if (randomNumber > 30 && randomNumber <= 60) {
            if (props.gender == 'F') {
                setOptions([
                <label className="esc-test">
                    <img className="esc-emotion" src="/images/esc-2.png" alt="profile" />
                    <input  type="radio" name={props.instrumentName} value="2" data-id={props.itemId} />
                </label>,
                               <label className="esc-test" >
                               <img  className="esc-emotion" src="/images/esc-1.png" alt="profile" />
                               <input type="radio" name={props.instrumentName} value="1"  data-id={props.itemId}/>
                           </label>,
 
                <label className="esc-test">
                    <img className="esc-emotion" src="/images/esc-4.png" alt="profile" />
                    <input  type="radio" name={props.instrumentName} value="4" data-id={props.itemId} />
                </label>,
                               <label className="esc-test">
                               <img className="esc-emotion" src="/images/esc-3.png" alt="profile" />
                               <input  type="radio" name={props.instrumentName} value="3"  data-id={props.itemId}/>
                           </label>,
                ])
            } else {
                setOptions([
               
 
                    <label className="esc-test">
                        <img className="esc-emotion" src="/images/esc-6.png" alt="profile" />
                        <input  type="radio" name={props.instrumentName} value="2" data-id={props.itemId} />
                    </label>,
                                       <label className="esc-test">
                                       <img className="esc-emotion" src="/images/esc-5.png" alt="profile" />
                                       <input  type="radio" name={props.instrumentName} value="1" data-id={props.itemId} />
                                   </label>,
   
                    <label className="esc-test">
                        <img className="esc-emotion" src="/images/esc-8.png" alt="profile" />
                        <input  type="radio" name={props.instrumentName} value="4" data-id={props.itemId} />
                    </label>,
                                     <label className="esc-test">
                                     <img className="esc-emotion" src="/images/esc-7.png" alt="profile" />
                                     <input  type="radio" name={props.instrumentName} value="3" data-id={props.itemId}/>
                                 </label>,
        
                    ])
            }
        } else if (randomNumber > 60) {
            if (props.gender == 'F') {
                setOptions([
                    <label className="esc-test">
                    <img className="esc-emotion" src="/images/esc-4.png" alt="profile" />
                    <input  type="radio" name={props.instrumentName} value="4" data-id={props.itemId}/>
                </label>,

                <label className="esc-test">
                    <img className="esc-emotion" src="/images/esc-2.png" alt="profile" />
                    <input  type="radio" name={props.instrumentName} value="2" data-id={props.itemId}/>
                </label>,
                <label className="esc-test">
                    <img className="esc-emotion" src="/images/esc-3.png" alt="profile" />
                    <input  type="radio" name={props.instrumentName} value="3" data-id={props.itemId}/>
                </label>,
                <label className="esc-test" >
                     <img className="esc-emotion" src="/images/esc-1.png" alt="profile" />
                    <input  type="radio" name={props.instrumentName} value="1" data-id={props.itemId}/>
                </label>,

                ])
            } else {
                setOptions([
                    <label className="esc-test">
                        <img className="esc-emotion" src="/images/esc-8.png" alt="profile" />
                        <input  type="radio" name={props.instrumentName} value="4" data-id={props.itemId}/>
                    </label>,
               
                    <label className="esc-test">
                        <img className="esc-emotion" src="/images/esc-6.png" alt="profile" />
                        <input  type="radio" name={props.instrumentName} value="2" data-id={props.itemId}/>
                    </label>,

                    <label className="esc-test">
                        <img className="esc-emotion" src="/images/esc-7.png" alt="profile" />
                        <input  type="radio" name={props.instrumentName} value="3"data-id={props.itemId} />
                    </label>,

                  <label className="esc-test">
                        <img className="esc-emotion" src="/images/esc-5.png" alt="profile" />
                        <input  type="radio" name={props.instrumentName} value="1" data-id={props.itemId}/>
                 </label>,
        
                    ])
            }
          
        }
    }, [])

    return (
        <SwiperSlide>
            <div className="page-item">
                <h3 className='main-description'>

                </h3>
                <form data-instrument={props.instrumentId} data-item={props.itemId} className="esc-form" onClick={props.onclick} key={props.itemId} style={{display:"flex", flexDirection:"row", flexWrap:"wrap", gap:".5rem", alignItems:"center", alignContent:"center", justifyContent:"flex-start"}}>

                    <input type="hidden" value={props.instrumentId} name="instrument" />
                    <input type="hidden" value={props.itemId} name="key" />
                    {
                        options && options
                    }
                    <img style={{width:"24%", outline:"1px solid #ccc"}} src={props.referenceImage}/>


                </form>
                
            </div>
        </SwiperSlide>

    )

}

