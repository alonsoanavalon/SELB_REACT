import React, { Fragment, useState, useEffect } from 'react';
import { get } from 'idb-keyval';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Instruction from '../components/Instruction'

import ImageResponse from '../components/Wally/ImageResponse';
import ImageAction from '../components/Wally/ImageAction';
export default function Esc() {

    const [wallyItems, setWallyItems] = useState([]);
    const [studentName, setStudentName] = useState("")
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



    return (
        <div style={{ overflow: "hidden", height: "100%", paddingTop: "1.5rem" }}>
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

                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-1.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-2.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-3.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-4.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-5.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-6.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-7.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-8.png' />
                                </SwiperSlide>


                                {/* Primera */}
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <Instruction instruction="Items de ejercicio" />
                                </SwiperSlide>


                                <>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-9.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title={wallyItems[0].title}
                                        type="quiz"
                                        other={false}
                                        answer={wallyItems[0].answer}
                                        instrumentId={wallyItems[0].instrumentId}
                                        instrumentName={wallyItems[0].instrumentName}
                                        num={wallyItems[0].num}
                                        itemId={wallyItems[0].itemId}
                                    />
                                </SwiperSlide>
                                </>

                                <>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-10.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title={wallyItems[0].title}
                                        type="quiz"
                                        other={false}
                                        answer={wallyItems[0].answer}
                                        instrumentId={wallyItems[0].instrumentId}
                                        instrumentName={wallyItems[0].instrumentName}
                                        num={wallyItems[0].num}
                                        itemId={wallyItems[0].itemId}
                                    />
                                </SwiperSlide>
                                </>


                                <>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-11.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title={wallyItems[0].title}
                                        type="quiz"
                                        other={false}
                                        answer={wallyItems[0].answer}
                                        instrumentId={wallyItems[0].instrumentId}
                                        instrumentName={wallyItems[0].instrumentName}
                                        num={wallyItems[0].num}
                                        itemId={wallyItems[0].itemId}
                                    />
                                </SwiperSlide>
                                </>


                                <>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-12.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title={wallyItems[0].title}
                                        type="quiz"
                                        other={false}
                                        answer={wallyItems[0].answer}
                                        instrumentId={wallyItems[0].instrumentId}
                                        instrumentName={wallyItems[0].instrumentName}
                                        num={wallyItems[0].num}
                                        itemId={wallyItems[0].itemId}
                                    />
                                </SwiperSlide>
                                </>


                                <>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-13.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title={wallyItems[0].title}
                                        type="quiz"
                                        other={false}
                                        answer={wallyItems[0].answer}
                                        instrumentId={wallyItems[0].instrumentId}
                                        instrumentName={wallyItems[0].instrumentName}
                                        num={wallyItems[0].num}
                                        itemId={wallyItems[0].itemId}
                                    />
                                </SwiperSlide>
                                </>


                                <>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-14.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title={wallyItems[0].title}
                                        type="quiz"
                                        other={false}
                                        answer={wallyItems[0].answer}
                                        instrumentId={wallyItems[0].instrumentId}
                                        instrumentName={wallyItems[0].instrumentName}
                                        num={wallyItems[0].num}
                                        itemId={wallyItems[0].itemId}
                                    />
                                </SwiperSlide>
                                </>


                                <>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-15.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title={wallyItems[0].title}
                                        type="quiz"
                                        other={false}
                                        answer={wallyItems[0].answer}
                                        instrumentId={wallyItems[0].instrumentId}
                                        instrumentName={wallyItems[0].instrumentName}
                                        num={wallyItems[0].num}
                                        itemId={wallyItems[0].itemId}
                                    />
                                </SwiperSlide>
                                </>


                                <>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-16.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title={wallyItems[0].title}
                                        type="quiz"
                                        other={false}
                                        answer={wallyItems[0].answer}
                                        instrumentId={wallyItems[0].instrumentId}
                                        instrumentName={wallyItems[0].instrumentName}
                                        num={wallyItems[0].num}
                                        itemId={wallyItems[0].itemId}
                                    />
                                </SwiperSlide>
                                </>


                                <>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-17.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title={wallyItems[0].title}
                                        type="quiz"
                                        other={false}
                                        answer={wallyItems[0].answer}
                                        instrumentId={wallyItems[0].instrumentId}
                                        instrumentName={wallyItems[0].instrumentName}
                                        num={wallyItems[0].num}
                                        itemId={wallyItems[0].itemId}
                                    />
                                </SwiperSlide>
                                </>


                                <>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-18.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title={wallyItems[0].title}
                                        type="quiz"
                                        other={false}
                                        answer={wallyItems[0].answer}
                                        instrumentId={wallyItems[0].instrumentId}
                                        instrumentName={wallyItems[0].instrumentName}
                                        num={wallyItems[0].num}
                                        itemId={wallyItems[0].itemId}
                                    />
                                </SwiperSlide>
                                </>


                                <>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-19.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title={wallyItems[0].title}
                                        type="quiz"
                                        other={false}
                                        answer={wallyItems[0].answer}
                                        instrumentId={wallyItems[0].instrumentId}
                                        instrumentName={wallyItems[0].instrumentName}
                                        num={wallyItems[0].num}
                                        itemId={wallyItems[0].itemId}
                                    />
                                </SwiperSlide>
                                </>


                                <>
                                <SwiperSlide key={wallyItems[0].itemId + "-media"}>
                                    <img class="esc-image" src='/images/esc-20.png' />
                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title={wallyItems[0].title}
                                        type="quiz"
                                        other={false}
                                        answer={wallyItems[0].answer}
                                        instrumentId={wallyItems[0].instrumentId}
                                        instrumentName={wallyItems[0].instrumentName}
                                        num={wallyItems[0].num}
                                        itemId={wallyItems[0].itemId}
                                    />
                                </SwiperSlide>
                                </>




                                <SwiperSlide>
                                    <Instruction checkpoint={true} instruction="Lo hiciste muy bien" />
                                </SwiperSlide>

                            </Fragment>

                        }


                    </Swiper>


                </div>


            </Fragment>

            <p style={{ position: "absolute", textAlign: "start", left: "1rem", bottom: "-4rem", color: "#aaa" }}>Estudiante: {studentName && studentName} </p>

        </div>
    )

}