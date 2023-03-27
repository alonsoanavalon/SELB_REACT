import { get } from 'idb-keyval';
import React, {Fragment, useEffect, useState} from 'react'
import { useAlert } from 'react-alert'
import { useNavigate  } from 'react-router-dom'

// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Item from '../components/Item'
import Book from '../components/TejasLee/Book';
import Instruction from '../components/Instruction'
import Audio from '../components/TejasLee/Audio'

/* 
    let allInstruments = document.querySelectorAll('.instrument-form')
    allInstruments.forEach(instrument => console.log(instrument['Tejas Lee']))
    allInstruments[0]['instrument'].value
*/

export default function TejasLee () {

    const navigate = useNavigate()

    const alert = useAlert()

    const [vocabulary, setVocabulary] = useState([])
    const [bookPages, setBookPages] = useState([])
    const [print, setPrint] = useState([])
    const [firstLetter, setFirstLetter] = useState([])
    const [syllable, setSyllable] = useState([])
    const [secondLetter, setSecondLetter] = useState([])
    const [initialSound, setInitialSound] = useState([])
    const [storySound, setStorySound] = useState([])
    const [auditiveComprehension, setAuditiveComprehension] = useState([])

    useEffect(() => {

        get('instrument/1')
        .then(
            items => {
            setVocabulary(items.filter(item => item.itemId >= 1 && item.itemId <= 17))
            setBookPages(items.filter(item => item.itemId === 18))
            setPrint(items.filter(item => item.itemId >= 19  && item.itemId <= 27))
            setFirstLetter(items.filter(item => item.itemId >= 28 && item.itemId <= 42))
            setSyllable(items.filter(item => item.itemId >= 43 && item.itemId <= 48))
            setSecondLetter(items.filter(item => item.itemId >= 49 && item.itemId <= 60))
            setInitialSound(items.filter(item => item.itemId >=61 && item.itemId <= 66))
            setStorySound(items.filter(item => item.itemId === 67 ))
            setAuditiveComprehension(items.filter(item => item.itemId >= 67 && item.itemId <= 72))
            }    
        )      



        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
        window.history.go(1);
     };
        
        

    }, [])
    
    
    return (


        <div style={{ height:"100%"}}>
            

            <div className="first-instrument">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        slidesPerView={1}
                        navigation
                        allowTouchMove={false}
                        
                        >
                    <SwiperSlide>
                        <Instruction instruction="A continuación haremos algunas actividades usando letras y palabras, aquí no hay respuestas buenas ni malas, si hay algo que no sabes está bien, haz lo mejor que puedas."/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Instruction instruction="Ahora haremos un juego de adivinanza. Yo te voy a decir una adivinanza y tú me dices lo que es."></Instruction>
                    </SwiperSlide>
                    {
                    vocabulary.map(item => 
                        <SwiperSlide key={item.itemId}>
                            <Item
                                other = {true}
                                title = {item.title}       
                                type = {item.type}   
                                answer= {item.answer}
                                instrumentId = {item.instrumentId}
                                instrumentName = {item.instrumentName}          
                                num = {item.num}
                                itemId = {item.itemId}            
                            />
                        </SwiperSlide>)
                    }

                    <SwiperSlide>
                        <Instruction checkpoint={true} instruction="“Aquí hay un libro” (mostrar el libro de cuentos). “Vamos a hacer unas actividades divertidas usando este libro”."/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Instruction instruction="Muéstrame la portada (carátula/cubierta) del libro" statement={true}/>
                    </SwiperSlide>

                    {
                        <SwiperSlide>
                             <Book pages={bookPages}/>
                        </SwiperSlide>
                       
                    }

                    {
                   
                        bookPages[0] != undefined &&
                            <Fragment>

                                <SwiperSlide key={bookPages[0].itemId}>
                                    <Item 
                                        title = {bookPages[0].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {bookPages[0].answer}
                                        instrumentId = {bookPages[0].instrumentId}
                                        instrumentName = {bookPages[0].instrumentName}          
                                        num = {bookPages[0].num}     
                                        itemId = {bookPages[0].itemId}      
                                    />
                                </SwiperSlide>
                            </Fragment>
                    }

                    {
                        print.map(item => 
                            <Fragment>
                                <SwiperSlide key={item.itemId+"-media"}>
                                    <Item
                                        type={item.type}
                                        picture={item.picture}
                                        pictureName={item.pictureName}
                                        key={item.itemId + "-media"}
                                        title={item.title}
                                    />
                                </SwiperSlide>
                                <SwiperSlide key={item.itemId}>
                                    <Item 
                                        title = {item.title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {item.answer}
                                        instrumentId = {item.instrumentId}
                                        instrumentName = {item.instrumentName}          
                                        num = {item.num}     
                                        itemId = {item.itemId}      
                                    />
                                </SwiperSlide>
                            </Fragment>
                            )
                    }

                    <SwiperSlide>
                        <Instruction instruction="“Voy a mostrarte unas letras. Quiero que me digas el nombre de cada letra. Si no conoces alguna letra, está bien, inténtalo lo mejor que puedas”.
*A continuación aparecerán en pantalla letras, la evaluadora en cada ítem deberá realizar la pregunta: ¿Cómo se llama esta letra?."/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Instruction title="Item de ensayo" instruction="Mostrar la primera letra (R) y decir: '¿Cómo se llama esta letra?' a) Si la respuesta es incorrecta, decir: El nombre de esta letra es 'erre'" secondInstruction="b) Si el/la niño/a dice el sonido de una letra en vez de su nombre, decir: “Ese es el sonido de la letra, ¿cuál es su nombre?”"/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Instruction statementInstruction={true} instruction = "¿Como se llama esta letra?" secondInstruction="R"/>
                    </SwiperSlide>

                    {
                        firstLetter.map(
                            item => 
                            <Fragment>                           
                                <SwiperSlide key={item.itemId+ "-media"}>
                                    <Item
                                        type={item.type}
                                        picture={item.picture}
                                        pictureName={item.pictureName}
                                        title={item.title}
                                    />
                                </SwiperSlide>
                                <SwiperSlide key={item.itemId}>
                                    <Item
                                        title = {item.title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {item.answer}
                                        instrumentId = {item.instrumentId}
                                        instrumentName = {item.instrumentName}          
                                        num = {item.num}     
                                        itemId = {item.itemId} 
                                    />

                                </SwiperSlide>
                            </Fragment>
                        )
                    }

                    <SwiperSlide>
                        <Instruction checkpoint={true} instruction="“Te voy a decir unas palabras que quiero que dividas en sílabas. Por ejemplo, voy a dividir la palabra ‘mesa’: /me/ /sa/” (Demuestre el ejercicio con aplausos)"/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Instruction title="Item de ensayo" instruction="Decir: “Ahora vamos a practicar, Si digo ‘toro’, dime ¿cómo se divide en sílabas la palabra ‘toro’?” Si la respuesta es incorrecta, decir: “La palabra ‘toro’ se divide en sílabas /to/ /ro/”. 
" secondInstruction="Luego proseguir con un segundo ejemplo, para este usted deberá decir: “Vamos a hacer
otro ejemplo. Si digo ‘cocina’, dime ¿cómo se divide en sílabas la palabra ‘cocina’? Si la respuesta es incorrecta, decir: “La palabra ‘cocina’ se divide en sílabas /co/ /ci/
/na/. Ahora sigamos con otras palabras.
"/>
                    </SwiperSlide>

                    {
                        syllable.map(
                            item => 
                            <Fragment>
                                <SwiperSlide key={item.itemId}>
                                <Item
                                        title = {item.title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {item.answer}
                                        instrumentId = {item.instrumentId}
                                        instrumentName = {item.instrumentName}          
                                        num = {item.num}     
                                        itemId = {item.itemId} 
                                    />
                                </SwiperSlide>
                            </Fragment>
                        )
                    }

                    <SwiperSlide>
                        <Instruction checkpoint={true} instruction="“Vamos a seguir jugando con las letras. Voy a mostrarte unas letras, y quiero
que me digas el nombre de cada una. Si no conoces alguna letra está bien, inténtalo lo mejor que puedas”" secondInstruction="*A continuación aparecerán en pantalla letras, la evaluadora en cada ítem deberá realizar la pregunta: ¿Cómo se llama esta letra? "/>
                    </SwiperSlide>

                    {
                        secondLetter.map(
                            item => 
                            <Fragment>
                                <SwiperSlide key={item.itemId + "-media"}>
                                    <Item
                                        type={item.type}
                                        picture={item.picture}
                                        pictureName={item.pictureName}
                                        title={item.title}
                                    />
                                </SwiperSlide>
                                <SwiperSlide key={item.itemId}>
                                    <Item
                                        title = {item.title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {item.answer}
                                        instrumentId = {item.instrumentId}
                                        instrumentName = {item.instrumentName}          
                                        num = {item.num}     
                                        itemId = {item.itemId} 
                                    />

                                </SwiperSlide>
                            </Fragment>
                        )
                    }

                    <SwiperSlide>
                        <Instruction  checkpoint={true} instruction="Te voy a decir una palabra. Quiero que me digas con qué sonido empieza esa palabra. Por ejemplo, la palabra “sombrero” empieza con el sonido /s/. (Pronuncie el sonido de la letra, no diga el nombre)."/>
                    </SwiperSlide>

                    {
                        initialSound.map(
                            item => 
                            <Fragment>
                                <SwiperSlide key={item.itemId}>
                                <Item
                                        title = {item.title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {item.answer}
                                        instrumentId = {item.instrumentId}
                                        instrumentName = {item.instrumentName}          
                                        num = {item.num}     
                                        itemId = {item.itemId} 
                                    />
                                </SwiperSlide>
                            </Fragment>
                        )
                    }

                    <SwiperSlide>
                        <Instruction checkpoint={true} instruction="“Vas a escuchar un cuento llamado “La sopa de letras”. Después te haré unas preguntas. Escúchalo con atención”."/>
                    </SwiperSlide>
                    
                    <SwiperSlide>
                        <Audio audio={storySound[0]}/>
                    </SwiperSlide>
                  
                  {
                      auditiveComprehension.map(
                        item => 
                            <Fragment>
                                <SwiperSlide key={item.itemId}>
                                    <Item
                                        other = {true}
                                        title = {item.title}       
                                        type = "quiz"
                                        answer= {item.answer}
                                        instrumentId = {item.instrumentId}
                                        instrumentName = {item.instrumentName}          
                                        num = {item.num}
                                        itemId = {item.itemId}            
                                    />
                                </SwiperSlide>
                            </Fragment>
                      )
                  }

                    <SwiperSlide>
                        <Instruction checkpoint={true} instruction="Lo hiciste muy bien, ahora seguiremos con otra actividad."/>

                    </SwiperSlide>

                </Swiper>

            </div>
            </div>

    )
}