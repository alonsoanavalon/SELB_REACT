import { get, set, update, getMany } from 'idb-keyval';
import React, {Fragment, useEffect, useState} from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactAudioPlayer from 'react-audio-player';
import { useAlert } from 'react-alert'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Item from '../components/TejasLee/Item'
import Book from '../components/TejasLee/Book';
import Instruction from '../components/TejasLee/Instruction';
import Audio from '../components/TejasLee/Audio'

/* 
    let allInstruments = document.querySelectorAll('.instrument-form')
    allInstruments.forEach(instrument => console.log(instrument['Tejas Lee']))
    allInstruments[0]['instrument'].value
*/

export default function TejasLee () {

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
    const [isArray, setIsArray] = useState(false)



    useEffect(() => {

        get('instrument/1')
        .then(items => {
            setVocabulary(items.filter(item => item.itemId >= 1 && item.itemId <= 17))
            setBookPages(items.filter(item => item.itemId === 18))
            setPrint(items.filter(item => item.itemId >= 19  && item.itemId <= 27))
            setFirstLetter(items.filter(item => item.itemId >= 28 && item.itemId <= 42))
            setSyllable(items.filter(item => item.itemId >= 43 && item.itemId <= 48))
            setSecondLetter(items.filter(item => item.itemId >= 49 && item.itemId <= 60))
            setInitialSound(items.filter(item => item.itemId >=61 && item.itemId <= 66))
            setStorySound(items.filter(item => item.itemId === 67 ))
            setAuditiveComprehension(items.filter(item => item.itemId >= 68 && item.itemId <= 72))
            }    
        )      

    }, [])


    function saveInstrumentOnline () {
        let choices = {}
        let instrumentInfo = {}
        let choicesArray = []

        let testDataArray = ['selectedStudent', 'userData']

        getMany(testDataArray).then(([firstVal, secondVal]) =>  {
            instrumentInfo['user_id'] = parseInt(secondVal['id'])
            instrumentInfo['student_id'] = parseInt(firstVal)
            instrumentInfo['date'] = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
        }
        );

        choicesArray.push(instrumentInfo)

        let allInstruments = document.querySelectorAll('.instrument-form')
        allInstruments.forEach(instrument => {
            let key = instrument['key'].value
            let value = instrument['TejasLee'].value
            choices[key] =  value
        })

        instrumentInfo['instrument'] = parseInt(allInstruments[0]['instrument'].value)

        choicesArray.push(choices)

        get('completedTests')
        .then(response => {

            if (!isArray) {
                if (response.length === undefined) {
                    update('completedTests', (val) => 
                    [response , choicesArray])         
                    setIsArray(true)
                } else if (response.length === 0) {
                    set('completedTests', [choicesArray])
                } else {
                    console.log(response, "Actualizando1")
                    let arrayCounter = 0;
                    response.forEach(array => {
                        
                        if (array[0]['student_id'] === instrumentInfo['student_id'] && array[0]['instrument'] == instrumentInfo['instrument']) {
                            console.log(response, arrayCounter)
                            response.splice(arrayCounter, 1)
                            
                
                        }
                        arrayCounter+= 1

                    })

                    update('completedTests', val => [...response, choicesArray])

                    
                }
            } else {
                console.log(response, "Actualizando2")
                update('completedTests', val => [...response, choicesArray])

            }

        })      

        alert.show('Test guardado con éxito', {
            type:'success'
        })
                
    }   
    
    return (
        <Fragment>

            <div className="first-instrument">
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        slidesPerView={1}
                        navigation
                        allowTouchMove={false}
                        scrollbar={{ draggable: true }}
                        >
                    <SwiperSlide>
                        <Instruction instruction="A continuación haremos algunas actividades usando letras y palabras, aquí no hay respuestas buenas ni malas, si hay algo que no sabes está bien, haz lo mejor que puedas."/>
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
                        <Instruction instruction="“Aquí hay un libro” (mostrar el libro de cuentos). “Vamos a hacer unas actividades divertidas usando este libro”."/>
                    </SwiperSlide>

                    {
                        <SwiperSlide>
                             <Book pages={bookPages}/>
                        </SwiperSlide>
                       
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
                        <Instruction instruction="“Voy a mostrarte unas letras. Quiero que me digas el nombre de cada letra. Si no conoces alguna letra, está bien, inténtalo lo mejor que puedas”."/>
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
                        <Instruction instruction="“Te voy a decir unas palabras que quiero que dividas en sílabas. Por ejemplo, voy a dividir la palabra ‘mesa’: /me/ /sa/” (Demuestre el ejercicio con aplausos)"/>
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
                        <Instruction instruction="Vamos a seguir jugando con las letras. Voy a mostrarte unas letras, y quiero que me digas el nombre de cada una."/>
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
                        <Instruction instruction="“Te voy a decir una palabra. Quiero que me digas con qué sonido empieza esa palabra. Por ejemplo, la palabra “teléfono” empieza con el sonido /t/.” (Pronuncie el sonido de la letra, no diga el nombre)."/>
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
                        <Instruction instruction="“Vas a escuchar un cuento llamado “La sopa de letras”. Después te haré unas preguntas. Escúchalo con atención”."/>
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
                                        type = {item.type}   
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
                        <Instruction instruction="Muchas gracias, lo hiciste muy bien"/>

                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="page-item">
                        <button
                        
                            className='button btn btn-primary'
                            onClick={saveInstrumentOnline}
                        > Guardar test</button>

                        </div>
               
                    </SwiperSlide>

                </Swiper>

            </div>
        </Fragment>
    )
}