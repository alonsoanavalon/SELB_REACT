import React, {Fragment, useState, useEffect} from 'react';
import { get } from 'idb-keyval';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Instruction from '../components/Instruction'

import Item from '../components/Item'

export default function EML () {

    const [studentName, setStudentName] = useState("")
    const [emlItems, setEmlItems] = useState([])


    useEffect(() => {

        get('selectedStudentName')
        .then(studentName => setStudentName(studentName))

    }, [])


    useEffect(() => {

        get('instrument/11')
        .then(
            items => {
            setEmlItems([
                {
                    itemId: 1101,
                    num: 1, title: "1. Respecto de la lectura, mis amigos creen que yo soy:",
                    value1:"4", answer1: "un muy buen lector",
                    value2:"3", answer2: "un buen lector",
                    value3:"2", answer3: "un lector medio",
                    value4:"1", answer4: "no lector"
                },
                {
                    itemId: 1102,
                    num: 2, title: "2. Leer un libro/cuento/historia es algo que a mí (colocar el nombre del niño) me gusta hacer:",
                    value1:"1", answer1: "nunca",
                    value2:"2", answer2: "no muy seguido",
                    value3:"3", answer3: "a veces",
                    value4:"4", answer4: "muy seguido"
                },
                {
                    itemId: 1103,
                    num: 3, title: "3. Yo leo:",
                    value1:"1", answer1: "no tan bien como mis amigos",
                    value2:"2", answer2: "casi igual que mis amigos",
                    value3:"3", answer3: "un poquito mejor que mis amigos",
                    value4:"4", answer4: "bastante mejor que mis amigos"
                },
                {
                    itemId: 1104,
                    num: 4, title: "4. Mis mejores amigos piensan que leer es:",
                    value1:"4", answer1: "muy entretenido",
                    value2:"3", answer2: "entretenido",
                    value3:"2", answer3: "aceptable",
                    value4:"1", answer4: "aburrido"
                },
                {
                    itemId: 1105,
                    num: 5, title: "5. Cuando me encuentro con una palabra que no conozco, puedo:",
                    value1:"4", answer1: "casi siempre lograr entenderla",
                    value2:"3", answer2: "a veces la logro entender",
                    value3:"2", answer3: "casi nunca la logro entender",
                    value4:"1", answer4: "nunca la logro entender"
                },
                {
                    itemId: 1106,
                    num: 6, title: "6. Yo le cuento a mis amigos sobre los buenos libros/cuentos/historias para leer.",
                    value1:"1", answer1: "nunca lo hago",
                    value2:"2", answer2: "casi nunca lo hago",
                    value3:"3", answer3: "lo hago algunas veces",
                    value4:"4", answer4: "lo hago mucho"
                },
                {
                    itemId: 1107,
                    num: 7, title: "7. Cuando leo o me leen una historia/cuento, comprendo:",
                    value1:"4", answer1: "casi todo lo que leo",
                    value2:"3", answer2: "algo de lo que leo",
                    value3:"2", answer3: "casi nada de lo que leo",
                    value4:"1", answer4: "nada de lo que leo"
                },
                {
                    itemId: 1108,
                    num: 8, title: "8. Las personas que leen mucho son :",
                    value1:"4", answer1: "muy interesantes",
                    value2:"3", answer2: "interesantes",
                    value3:"2", answer3: "poco interesantes",
                    value4:"1", answer4: "aburridas"
                },
                {
                    itemId: 1109,
                    num: 9, title: "9. Yo soy:",
                    value1:"1", answer1: "no lector",
                    value2:"2", answer2: "un lector aceptable",
                    value3:"3", answer3: "un buen lector",
                    value4:"4", answer4: "un muy buen lector"
                },
                {
                    itemId: 1110,
                    num: 10, title: "10. Yo creo que las bibliotecas son:",
                    value1:"4", answer1: "un lugar muy entretenido para pasar el tiempo",
                    value2:"3", answer2: "un lugar interesante para pasar el tiempo",
                    value3:"2", answer3: "un lugar aceptable (pasable) para pasar el tiempo",
                    value4:"1", answer4: "un lugar aburrido para pasar el tiempo"
                },
                {
                    itemId: 1111,
                    num: 11, title: "11. Me preocupa lo que los otros niños piensen de mi lectura:",
                    value1:"4", answer1: "mucho (todos los días)",
                    value2:"3", answer2: "un poco (casi todos los días)",
                    value3:"2", answer3: "casi nada (de vez en cuando)",
                    value4:"1", answer4: "nada (nunca)"
                },
                {
                    itemId: 1112,
                    num: 12, title: "12. Saber leer bien es:",
                    value1:"1", answer1: "No muy importante",
                    value2:"2", answer2: "Más menos importante",
                    value3:"3", answer3: "Importante",
                    value4:"4", answer4: "Muy importante"
                },
                {
                    itemId: 1113,
                    num: 13, title: "13. Cuando el profesor me pregunta sobre lo que yo he leído (o sobre lo que me han leído):",
                    value1:"1", answer1: "No se me ocurre qué responder",
                    value2:"2", answer2: "Me cuesta pensar lo que voy a responder",
                    value3:"3", answer3: "A veces pienso en una respuesta",
                    value4:"4", answer4: "Siempre pienso en una respuesta"
                },
                {
                    itemId: 1114,
                    num: 14, title: "14. Creo que leer es:",
                    value1:"1", answer1: "una forma aburrida de pasar el tiempo",
                    value2:"2", answer2: "una forma aceptable (pasable) de pasar el tiempo",
                    value3:"3", answer3: "una forma interesante (entretenida) de pasar el tiempo",
                    value4:"4", answer4: "una forma grandiosa (muy entretenida) de pasar el tiempo"
                },
                {
                    itemId: 1115,
                    num: 15, title: "15. Leer es:",
                    value1:"4", answer1: "muy fácil para mí",
                    value2:"3", answer2: "más menos fácil para mí",
                    value3:"2", answer3: "más menos difícil para mí",
                    value4:"1", answer4: "muy difícil para mí"
                },
                {
                    itemId: 1116,
                    num: 16, title: "16. Cuando sea grande yo:",
                    value1:"1", answer1: "no voy a pasar tiempo leyendo",
                    value2:"2", answer2: "voy a pasar poco tiempo leyendo",
                    value3:"3", answer3: "voy a pasar algún tiempo leyendo",
                    value4:"4", answer4: "voy a pasar mucho tiempo leyendo"
                },
                {
                    itemId: 1117,
                    num: 17, title: "17. Cuando estoy en un grupo contando historias:",
                    value1:"1", answer1: "casi nunca hablo de mis ideas",
                    value2:"2", answer2: "algunas veces hablo de mis ideas",
                    value3:"3", answer3: "casi siempre hablo de mis ideas",
                    value4:"4", answer4: "siempre hablo de mis ideas"
                },
                {
                    itemId: 1118,
                    num: 18, title: "18. Me gustaría que mi profesor nos leyera libros en voz alta en clase:",
                    value1:"4", answer1: "todos los días",
                    value2:"3", answer2: "casi todos los días",
                    value3:"2", answer3: "de vez en cuando",
                    value4:"1", answer4: "nunca"
                },
                {
                    itemId: 1119,
                    num: 19, title: "19. Cuando yo leo (por ej. letras, palabras, oraciones) en voz alta, leo:",
                    value1:"1", answer1: "muy mal",
                    value2:"2", answer2: "más o menos",
                    value3:"3", answer3: "bien",
                    value4:"4", answer4: "muy bien"
                },
                {
                    itemId: 1120,
                    num: 20, title: "20. Cuando me regalan un libro, me siento:",
                    value1:"4", answer1: "muy feliz",
                    value2:"3", answer2: "feliz",
                    value3:"2", answer3: "no muy feliz",
                    value4:"1", answer4: "nada feliz"
                },
             ])
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
        <div style={{ height:"100%", paddingTop:"1.5rem"}}>



        <div className="eml-test">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                navigation/* ={{
                    nextEl: '.next',
                }} */
                spaceBetween={0}
                allowTouchMove={false}
            >
            <SwiperSlide>
                <Instruction instruction="Te quiero invitar a conversar sobre la lectura. Cuéntame, ¿tú lees? (esperar respuesta. Si dice “no”, seguir).
                OK, pero…  ¿estás aprendiendo las vocales, las letras, ¿cierto? Y cuéntame, ¿A ti, te gusta que te lean cuentos o historias? Ah!, eso
                también vale como lectura, porque cuando otra persona te lee la historia, tú la escuchas ¿cierto? Ahora, te voy a hacer varias preguntas
                sobre la lectura. ¡Comencemos!"/>
            </SwiperSlide>

            {
                emlItems.map(item => 
                    <SwiperSlide key="eml">
                        <Item
                            title = {item.title}
                            type = "eml"
                            answer1= {item.answer1}
                            answer2= {item.answer2}
                            answer3= {item.answer3}
                            answer4= {item.answer4}
                            value1= {item.value1}
                            value2= {item.value2}
                            value3= {item.value3}
                            value4= {item.value4}
                            instrumentId = "11"
                            instrumentName = "EML"
                            num = {item.num}
                            itemId = {item.itemId}
                        />
                    </SwiperSlide>)
            }

            <SwiperSlide>
                <Instruction checkpoint={true} instruction="Lo hiciste muy bien"/>
            </SwiperSlide>



            </Swiper>
        </div>


        <p style={{position:"absolute", textAlign:"start", left:"1rem", bottom:"-4rem", color: "#ddd", opacity:0.6}}>Estudiante: {studentName && studentName} </p>
        </div>
    )
}