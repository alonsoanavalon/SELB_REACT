import { get } from 'idb-keyval';
import React, {Fragment, useEffect, useState} from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactAudioPlayer from 'react-audio-player';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function FirstInstrument () {

    const [items, setItems] = useState([]);
    const [firstAnswerText, setFirstAnswerText] = useState('')

    useEffect(() => {
        get('items')
        .then(response => {
            let filteredResponse = response.filter(element => element['instrument_id'] == 1)
            return filteredResponse
        })
        .then(filteredResponse => setItems(filteredResponse))
    }, [])

    return (
        <Fragment>
            <div className="first-instrument">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        slidesPerView={1}
                        navigation
                        allowTouchMove={true}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        >
                    <SwiperSlide>
                    <div className="page-item">
                        <h3 className='main-description'>
                        A continuación haremos algunas actividades usando letras y palabras, aquí no hay respuestas buenas ni malas, si hay algo que no sabes está bien, haz lo mejor que puedas.
                        </h3>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item">
                        <h3 className='main-description'>
                        “Ahora haremos un juego de adivinanza. Yo te voy a decir una adivinanza y tú me dices lo que es. ¿Lo has entendido? Comencemos”.
                        </h3>
                    </div>

                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item first-instrument-1">
                        <h3 className='main-description'>
                            ¿Quién nos llevó en su guata nueve meses, nos cuida y nos quiere?
                        </h3>
                        <form id="first-instrument-1" className="instrument-form">
                            <label><input type="radio" name="firstAnswer" value="1"/> Correcto (Mamá)</label>
                            <label><input type="radio" name="firstAnswer" value="2"/> Incorrecto</label>
                            <label><input type="radio" name="firstAnswer" value="3"/> No sabe / No lo conoce</label>
                            <label><input type="radio" name="firstAnswer" value="4"/> Omite o no responde</label>
                            <label><input type="radio" name="firstAnswer" value={firstAnswerText}/> Otro</label>
                            <label><input
                             type="text" 
                             name="firstAnswer" 
                             placeholder="Respuesta"
                             onChange={(e) => setFirstAnswerText(e.target.value) }
                             /></label>
                        </form>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item">
                        <h3 className='main-description'>
                        “Aquí verás un libro. Vamos a hacer unas actividades divertidas usando este libro. Comencemos”
                        </h3>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item">
                        Libro
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item">
                        Libro
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item">
                        <h3 className='main-description'>
                                Respuesta: Muéstrame la portada (carátula/cubierta) del libro
                        </h3>
                        <form id="first-instrument-2" className="instrument-form">
                            <label><input type="radio" name="firstAnswer" value="1"/> Correcto</label>
                            <label><input type="radio" name="firstAnswer" value="2"/> Incorrecto</label>
                            <label><input type="radio" name="firstAnswer" value="3"/> No sabe / No lo conoce</label>
                            <label><input type="radio" name="firstAnswer" value="4"/> Omite o no responde</label>
                        </form>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item">

                        <h3 className='main-description'>
                            “Voy a mostrarte unas letras. Quiero que me digas el nombre de cada letra. Si no conoces alguna letra, está bien, inténtalo lo mejor que puedas”.
                        </h3>


                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item">
                        <img className="letter-example" src="\instruments\tejasLee\Tejas Lee - Y.jpg" alt="letter-example"/>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item">
                        <h3 className='main-description'>
                        Respuesta: Como se llama esta letra
                        </h3>
                        <form id="first-instrument-3" className="instrument-form">
                            <label><input type="radio" name="firstAnswer" value="1"/> Correcto (Y)</label>
                            <label><input type="radio" name="firstAnswer" value="2"/> Incorrecto</label>
                            <label><input type="radio" name="firstAnswer" value="3"/> No sabe / No lo conoce</label>
                            <label><input type="radio" name="firstAnswer" value="4"/> Omite o no responde</label>
                        </form>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item">

                        <h3 className='main-description'>
                        “Te voy a decir unas palabras que quiero que dividas en sílabas. Por ejemplo, voy a dividir la palabra ‘mesa’: /me/ /sa/” (Demuestre el ejercicio con aplausos).

                        </h3>


                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item">
                        <h3 className='main-description'>
                        Dime, ¿Cómo se divide en sílabas la palabra ‘ JUGO’?
                        </h3>
                        <form id="first-instrument-4" className="instrument-form">
                            <label><input type="radio" name="firstAnswer" value="1"/> Correcto /ju/ /go/</label>
                            <label><input type="radio" name="firstAnswer" value="2"/> Incorrecto</label>
                            <label><input type="radio" name="firstAnswer" value="3"/> No sabe / No lo conoce</label>
                            <label><input type="radio" name="firstAnswer" value="4"/> Omite o no responde</label>
                        </form>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item">

                        <h3 className='main-description'>
                        “Te voy a decir una palabra. Quiero que me digas con qué sonido empieza esa palabra. Por ejemplo, la palabra “sombrero” empieza con el sonido /s/.” (Pronuncie el sonido de la letra, no diga el nombre).


                        </h3>


                    </div>
                    </SwiperSlide>

                    <SwiperSlide>
                    <div className="page-item">
                        <h3 className='main-description'>
                        ¿Con qué sonido empieza ‘limón’?
                        </h3>
                        <form id="first-instrument-5" className="instrument-form">
                            <label><input type="radio" name="firstAnswer" value="1"/> Correcto /l/</label>
                            <label><input type="radio" name="firstAnswer" value="2"/> Incorrecto</label>
                            <label><input type="radio" name="firstAnswer" value="3"/> No sabe / No lo conoce</label>
                            <label><input type="radio" name="firstAnswer" value="4"/> Omite o no responde</label>
                        </form>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="page-item">

                        <h3 className='main-description'>
                        “Vas a escuchar un cuento llamado “La sopa de letras”. Después te haré unas preguntas. Escúchalo con atención”.
                        </h3>
                    </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className='page-item'>
                        <ReactAudioPlayer
                        src="\instruments\tejasLee\Tejas Lee.wav"
                        autoPlay={false}
                        controls
                        />
                        </div>
  
                    </SwiperSlide>

                    <SwiperSlide>
                    <div className="page-item">
                        <h3 className='main-description'>
                        ¿De dónde salió la mamá?
                        </h3>
                        <form id="first-instrument-5" className="instrument-form">
                            <label><input type="radio" name="firstAnswer" value="1"/> Correcto (de la cocina)</label>
                            <label><input type="radio" name="firstAnswer" value="2"/> Incorrecto</label>
                            <label><input type="radio" name="firstAnswer" value="3"/> No sabe / No lo conoce</label>
                            <label><input type="radio" name="firstAnswer" value="4"/> Omite o no responde</label>
                        </form>
                    </div>
                    </SwiperSlide>

                    <SwiperSlide>
                    <div className="page-item">
                        <h3 className='main-description'>
                        ¡Muchas gracias, lo hiciste muy bien!                       
                        </h3>
                    </div>
                    </SwiperSlide>

                
                </Swiper>



            </div>
        </Fragment>
    )
}