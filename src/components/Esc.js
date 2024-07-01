import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom'
import { useAlert } from 'react-alert'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Instruction from '../components/Instruction'
import {get, update, getMany, set} from 'idb-keyval'

import Swal from 'sweetalert2'

import EmpathyOptions from '../components/EmpathyOptions';
export default function Esc() {
    const alert = useAlert()
    const navigate = useNavigate()
    const [wallyItems, setWallyItems] = useState([]);
    const [isArray, setIsArray] = useState(false)
    const [studentName, setStudentName] = useState("")
    const [correctAnswers] = useState({
        359: "1",
        360: "2",
        361: "3",
        362: "4",
        363: "1",
        364: "2",
        365: "3",
        366: "4",
        367: "1",
        368: "2",
        369: "3",
        370: "4",

    })
    useEffect(() => {

        get('selectedStudentName')
            .then(studentName => setStudentName(studentName))

    }, [])


    useEffect(() => {

        get('instrument/5')
            .then(
                items => {
                    setWallyItems(items.sort((a, b) => parseFloat(a.itemId) - parseFloat(b.itemId)))
                }
            )

    }, [])

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        }
    }, [])


    function getMomentByDate(date) {
        let dateBegin;
        let dateUntil;
        get('moments')
        .then(res => {
            res.map(element => {
                dateBegin = new Date(element['begin']).toLocaleDateString("zh-TW")
                dateUntil = new Date(element['until']).toLocaleDateString("zh-TW")
                if (date >= dateBegin && date <= dateUntil ) {
                    return element['id']
                } 
                
                
            })
        })
    }

    async function saveTest(){
        let choices = {}
        let instrumentInfo = {}
        let choicesArray = []


        let testDataArray = ['selectedStudent', 'userData']

        getMany(testDataArray).then(([firstVal, secondVal]) => {
            instrumentInfo['user_id'] = parseInt(secondVal['id'])
            instrumentInfo['student_id'] = parseInt(firstVal)
            instrumentInfo['date'] = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
        }
        );

        choicesArray.push(instrumentInfo)

        let allInstruments = document.getElementById('.esc-form')
        const radios = document.querySelectorAll('input[type="radio"]');

        radios.forEach(radio => {
            if (radio.checked) {
                if (correctAnswers[radio.dataset.id] == radio.value) {
                    choices[radio.dataset.id] = {
                        alternative: radio.value,
                        value: 1
                    }
                } else {
                    choices[radio.dataset.id] = {
                        alternative: radio.value,
                        value: 0
                    }
                }

            } else {
                if (!choices[radio.dataset.id]) {
                    choices[radio.dataset.id] = {
                        alternative: 0,
                        value: 0
                    }
                }


            }
        })



        instrumentInfo['instrument'] = 10;

        choicesArray.push(choices)

        try {
            get('backupTest')
            .then(response => {
                let backupLength = response.length
                if (Array.isArray(response) && response.length > 0) {
                    get('completedTests')
                        .then(res => {
                            if (backupLength >= res.length) { // Aca ya sabemos que es mas el backup
                                console.log(response, "Actualizando Backup")
                                let arrayCounter = 0;
                                response.forEach(array => {
                                    let responseMoment;
                                    let instrumentMoment;
                                    if (array[0]['student_id'] === instrumentInfo['student_id'] && array[0]['instrument'] == instrumentInfo['instrument'] && array[0]['user_id'] == instrumentInfo['user_id']) {

                                        responseMoment = getMomentByDate(array[0]['date'])
                                        instrumentMoment = getMomentByDate(instrumentInfo['date'])

                                        if (responseMoment === instrumentMoment) {
                                            response.splice(arrayCounter, 1)
                                        }
                                    }
                                    arrayCounter += 1

                                })

                                update('backupTest', val => [...response, choicesArray])
                            }
                        })
                }
            })


        get('completedTests')
            .then(response => {

                if (!isArray) {
                    if (response.length === undefined) {
                        update('completedTests', (val) =>
                            [response, choicesArray])
                        setIsArray(true)
                    } else if (response.length === 0) {

                        set('completedTests', [choicesArray])
                    } else {
                        console.log(response, "Actualizando1")
                        let arrayCounter = 0;
                        response.forEach(array => {

                            let responseMoment;
                            let instrumentMoment;
                            if (array[0]['student_id'] === instrumentInfo['student_id'] && array[0]['instrument'] == instrumentInfo['instrument'] && array[0]['user_id'] == instrumentInfo['user_id']) {

                                responseMoment = getMomentByDate(array[0]['date'])
                                instrumentMoment = getMomentByDate(instrumentInfo['date'])

                                if (responseMoment === instrumentMoment) {
                                    response.splice(arrayCounter, 1)
                                }
                            }
                            arrayCounter += 1

                        })

                        update('completedTests', val => [...response, choicesArray])


    
                    }
                } else {
                    console.log(response, "Actualizando2")
                    update('completedTests', val => [...response, choicesArray])
                }


            })
            return true    
        } catch (err) {
            console.error(err);
            Swal.fire({icon:"error", title:"Ha ocurrido un error en el guardado"})
            return false
        }
  
        
    } 

    function saveEsc() {


        Swal.fire({
            icon: 'success',
            html: `El test ha finalizado`,
            showCancelButton: false,
            allowOutsideClick: false,
            width:"50em",
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Guardar Test',
            preConfirm: async () => {
                return saveTest()
                  .then(response => {
                    if (response !== true) {
                        Swal.fire("Ha ocurrido un error en el guardado de datos")
                    }
                    return response
                  })
                  .catch(error => {
                    Swal.fire("Ha ocurrido un error en el guardado de datos")

                  })
              },
            })
       .then( async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick:false,
                    icon:"success",
                    title:"El test ha sido guardado",
                    confirmButtonText: 'Finalizar test y salir',
                  }).then(_ => {
                      setTimeout(() => {
                        window.location.pathname = '/'
                      }, 3000)
                  })
                    
            
            }
        })



    }



    return (
        <div style={{ overflow: "hidden", height: "100%"}}>
            <Fragment>



                <div className="aces-test">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        slidesPerView={1}
                        navigation/* ={{
                nextEl: '.next',
            }} */
                        spaceBetween={0}
                        allowTouchMove={false}
                    >


                        {
                            wallyItems.length > 0 &&

                            <Fragment>

                                <SwiperSlide>
                                    <Instruction instruction="Presenta brevemente cada tarjeta al niño(a) y pregúntale cómo se sentirá el personaje en esa situación. 
Si el niño(a) tiene dificultad para responder verbalmente, muestra las imágenes de las expresiones faciales 
(tarjetas 1 a 8)  y pídele que señale la expresión que mejor represente cómo se sentirá el personaje"/>
                                </SwiperSlide>

                                <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-1.png' />
                                </SwiperSlide>
                                <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-2.png' />
                                </SwiperSlide>
                                <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-3.png' />
                                </SwiperSlide>
                                <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-4.png' />
                                </SwiperSlide>
                                <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-5.png' />
                                </SwiperSlide>
                                <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-6.png' />
                                </SwiperSlide>
                                <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-7.png' />
                                </SwiperSlide>
                                <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-8.png' />
                                </SwiperSlide>


                                {/* Primera */}
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <Instruction title="Items de ejercicio" instruction="Ahora voy a mostrarte unas imagenes y debes decirme como crees que se siente el personaje. Comencemos" />
                                </SwiperSlide>


                                <>
                                    <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                        <img class="esc-image" src='/images/esc-9.png' />
                                    </SwiperSlide>
                                    <SwiperSlide key={wallyItems[0].itemId}>
                                        <EmpathyOptions
                                            type="quiz"
                                            instrumentId={10}
                                            instrumentName={'ESC'}
                                            itemId={359}
                                            gender={"F"}
                                            referenceImage={'/images/esc-9.png'}
                                        />
                                          
                                    </SwiperSlide>
                                </>

                                <>
                                    <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                        <img class="esc-image" src='/images/esc-10.png' />
                                    </SwiperSlide>
                                    <SwiperSlide key={wallyItems[0].itemId}>
                                        <EmpathyOptions
                                            type="quiz"
                                            instrumentId={10}
                                            instrumentName={'ESC'}
                                            itemId={360}
                                            gender={"F"}
                                            referenceImage={'/images/esc-10.png'}

                                        />
                                    </SwiperSlide>
                                </>


                                <>
                                    <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                        <img class="esc-image" src='/images/esc-11.png' />
                                    </SwiperSlide>
                                    <SwiperSlide key={wallyItems[0].itemId}>
                                        <EmpathyOptions
                                            type="quiz"
                                            instrumentId={10}
                                            instrumentName={'ESC'}
                                            itemId={361}
                                            gender={"F"}
                                            referenceImage={'/images/esc-11.png'}

                                        />
      
                                    </SwiperSlide>
                                </>


                                <>
                                    <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                        <img class="esc-image" src='/images/esc-12.png' />
                                    </SwiperSlide>
                                    <SwiperSlide key={wallyItems[0].itemId}>
                                        <EmpathyOptions
                                            type="quiz"
                                            instrumentId={10}
                                            instrumentName={'ESC'}
                                            itemId={362}
                                            gender={"M"}
                                            referenceImage={'/images/esc-12.png'}

                                        />
                                    </SwiperSlide>
                                </>


                                <>
                                    <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                        <img class="esc-image" src='/images/esc-13.png' />
                                    </SwiperSlide>
                                    <SwiperSlide key={wallyItems[0].itemId}>
                                        <EmpathyOptions
                                            type="quiz"
                                            instrumentId={10}
                                            instrumentName={'ESC'}
                                            itemId={363}
                                            gender={"M"}
                                            referenceImage={'/images/esc-13.png'}

                                        />
                                    </SwiperSlide>
                                </>


                                <>
                                    <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                        <img class="esc-image" src='/images/esc-14.png' />
                                    </SwiperSlide>
                                    <SwiperSlide key={wallyItems[0].itemId}>
                                        <EmpathyOptions
                                            type="quiz"
                                            instrumentId={10}
                                            instrumentName={'ESC'}
                                            itemId={364}
                                            gender={"F"}
                                            referenceImage={'/images/esc-14.png'}

                                        />
                                    </SwiperSlide>
                                </>


                                <>
                                    <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                        <img class="esc-image" src='/images/esc-15.png' />
                                    </SwiperSlide>
                                    <SwiperSlide key={wallyItems[0].itemId}>
                                        <EmpathyOptions
                                            type="quiz"
                                            instrumentId={10}
                                            instrumentName={'ESC'}
                                            itemId={365}
                                            gender={"M"}
                                            referenceImage={'/images/esc-15.png'}

                                        />
                                    </SwiperSlide>
                                </>


                                <>
                                    <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                        <img class="esc-image" src='/images/esc-16.png' />
                                    </SwiperSlide>
                                    <SwiperSlide key={wallyItems[0].itemId}>
                                        <EmpathyOptions
                                            type="quiz"
                                            instrumentId={10}
                                            instrumentName={'ESC'}
                                            itemId={366}
                                            gender={"M"}
                                            referenceImage={'/images/esc-16.png'}

                                        />
                                    </SwiperSlide>
                                </>


                                <>
                                    <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                        <img class="esc-image" src='/images/esc-17.png' />
                                    </SwiperSlide>
                                    <SwiperSlide key={wallyItems[0].itemId}>
                                        <EmpathyOptions
                                            type="quiz"
                                            instrumentId={10}
                                            instrumentName={'ESC'}
                                            itemId={367}
                                            gender={"M"}
                                            referenceImage={'/images/esc-17.png'}

                                        />
                                    </SwiperSlide>
                                </>


                                <>
                                    <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                        <img class="esc-image" src='/images/esc-18.png' />
                                    </SwiperSlide>
                                    <SwiperSlide key={wallyItems[0].itemId}>
                                        <EmpathyOptions
                                            type="quiz"
                                            instrumentId={10}
                                            instrumentName={'ESC'}
                                            itemId={368}
                                            gender={"F"}
                                            referenceImage={'/images/esc-18.png'}

                                        />
                                    </SwiperSlide>
                                </>


                                <>
                                    <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                        <img class="esc-image" src='/images/esc-19.png' />
                                    </SwiperSlide>
                                    <SwiperSlide key={wallyItems[0].itemId}>
                                        <EmpathyOptions
                                            type="quiz"
                                            instrumentId={10}
                                            instrumentName={'ESC'}
                                            itemId={369}
                                            gender={"M"}
                                            referenceImage={'/images/esc-19.png'}

                                        />
                                    </SwiperSlide>
                                </>


                                <>
                                    <SwiperSlide className="esc-slide" key={wallyItems[0].itemId + "-media"}>
                                        <img class="esc-image" src='/images/esc-20.png' />
                                    </SwiperSlide>
                                    <SwiperSlide key={wallyItems[0].itemId}>
                                        <EmpathyOptions
                                            type="quiz"
                                            instrumentId={10}
                                            instrumentName={'ESC'}
                                            itemId={370}
                                            gender={"F"}
                                            referenceImage={'/images/esc-20.png'}

                                        />
                                    </SwiperSlide>
                                </>




                                <SwiperSlide className="esc-slide">
                                    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center", alignItems:"center"}}>
                                        <h4>Lo hiciste muy bien</h4>
                                        <button className="btn btn-primary mt-3" onClick={saveEsc}>Guardar</button>
                                    </div>
                                      
                            </SwiperSlide>

                            </Fragment>

                        }


                    </Swiper>


                </div>


            </Fragment>

            <p style={{ position: "absolute", textAlign: "start", left: "1rem", bottom: "-4rem", color: "#ddd", opacity:0.6}}>Estudiante: {studentName && studentName} </p>

        </div>
    )

}