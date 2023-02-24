import React, {Fragment, useState, useEffect} from 'react';
import { get } from 'idb-keyval';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Instruction from '../components/Instruction'
import ItemImage from '../components/Wally/ItemImage';
import ImageResponse from '../components/Wally/ImageResponse'; 
import ImageAction from '../components/Wally/ImageAction';

export default function Wally () {

    const [wallyItems, setWallyItems] = useState([]);

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
                    <Instruction instruction="“Ahora vamos a hacer un juego donde yo te cuento algunas historias sobre unos niños de tu edad. Voy a utilizar unas imágenes para ayudar a contarte mi historia. Luego aparecerán otras imágenes para que me digas lo que piensas de la historia. ¿Lo has entendido?…(Espere la respuesta del niño) Comencemos…”"/>
                </SwiperSlide>
                

                {/* Primera */}
                <SwiperSlide key={wallyItems[0].itemId+"-media"}>
                                        <ItemImage
                                            picture={wallyItems[0].picture}
                                            pictureName={wallyItems[0].pictureName}
                                            title="María/Juan estaba construyendo una torre muy alta con bloques. Bruno lo derribó"
                                        />
                </SwiperSlide>
                <SwiperSlide key={wallyItems[0].itemId}>
                                    <ImageResponse
                                        title = {wallyItems[0].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {wallyItems[0].answer}
                                        instrumentId = {wallyItems[0].instrumentId}
                                        instrumentName = {wallyItems[0].instrumentName}          
                                        num = {wallyItems[0].num}     
                                        itemId = {wallyItems[0].itemId} 
                                    />

                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[1].itemId}>
                                    <ImageAction
                                        title = {wallyItems[1].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {wallyItems[1].answer}
                                        instrumentId = {wallyItems[1].instrumentId}
                                        instrumentName = {wallyItems[1].instrumentName}          
                                        num = {wallyItems[1].num}     
                                        itemId = {wallyItems[1].itemId} 
                                        firstAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_1_2_n4kx4u.png" 
                                        secondAction =  "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_1_3_molmqr.png" 
                                        thirdAction ="https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_1_4_snhvbq.png"
                                        fourthAction =  "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_1_1_gzmoys.png" 
                                        firstDescription = "¿Pedirle a Bruno que construya otra torre contigo?"
                                        secondDescription = "¿Pegarle a Bruno o gritarle?"
                                        thirdDescription = "¿Llorar?"
                                        fourthDescription = "¿Ir a buscar otra cosa para jugar?"
                                    />

                                </SwiperSlide>

                {/* Segunda */}

                <SwiperSlide key={wallyItems[2].itemId+"-media"}>
                                        <ItemImage
                                            picture={wallyItems[2].picture}
                                            pictureName={wallyItems[2].pictureName}
                                            title="María/Juan se está divirtiendo jugando en el patio cuando Bruno le pega."
                                        />
                </SwiperSlide>
                <SwiperSlide key={wallyItems[2].itemId}>
                                    <ImageResponse
                                        title = {wallyItems[2].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {wallyItems[2].answer}
                                        instrumentId = {wallyItems[2].instrumentId}
                                        instrumentName = {wallyItems[2].instrumentName}          
                                        num = {wallyItems[2].num}     
                                        itemId = {wallyItems[2].itemId} 
                                    />

                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[3].itemId}>
                                    <ImageAction
                                        title = {wallyItems[3].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {wallyItems[3].answer}
                                        instrumentId = {wallyItems[3].instrumentId}
                                        instrumentName = {wallyItems[3].instrumentName}          
                                        num = {wallyItems[3].num}     
                                        itemId = {wallyItems[3].itemId} 
                                        firstAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_2_4_mv65zb.png"
                                        secondAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_2_2_pi9xap.png" 
                                        thirdAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_2_3_xq86c4.png" 
                                        fourthAction =  "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_2_1_wnxxkq.png" 
                                        firstDescription = "¿Decirle que hacer eso no es algo bueno?"
                                        secondDescription = "¿Pegarle a Bruno o gritarle?"
                                        thirdDescription = "¿Llorar?"
                                        fourthDescription = "¿Ir a buscar otra cosa para jugar?"
                                    />

                                </SwiperSlide>
                {/* Tercera */}


                <SwiperSlide key={wallyItems[4].itemId+"-media"}>
                                        <ItemImage
                                            picture={wallyItems[4].picture}
                                            pictureName={wallyItems[4].pictureName}
                                            title="María/Juan estaba pegándole a una pelota de fútbol. Llegó Bruno y le quitó la pelota."
                                        />
                </SwiperSlide>
                <SwiperSlide key={wallyItems[4].itemId}>
                                    <ImageResponse
                                        title = {wallyItems[4].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {wallyItems[4].answer}
                                        instrumentId = {wallyItems[4].instrumentId}
                                        instrumentName = {wallyItems[4].instrumentName}          
                                        num = {wallyItems[4].num}     
                                        itemId = {wallyItems[4].itemId} 
                                    />

                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[5].itemId}>
                                    <ImageAction
                                        title = {wallyItems[5].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {wallyItems[5].answer}
                                        instrumentId = {wallyItems[5].instrumentId}
                                        instrumentName = {wallyItems[5].instrumentName}          
                                        num = {wallyItems[5].num}     
                                        itemId = {wallyItems[5].itemId} 
                                        firstAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_3_2_cexdtp.png" 
                                        secondAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_3_4_skmbb3.png" 
                                        thirdAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_3_1_sgxf4j.png" 
                                        fourthAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666821/selb/wally/behavior/behavior_3_3_ipn623.png" 
                                        firstDescription = "¿Pedirle a Bruno que juegue contigo?"
                                        secondDescription = "¿Quitarle la pelota devuelta o gritarle?"
                                        thirdDescription = "¿Llorar?"
                                        fourthDescription = "¿Ir a buscar otra cosa para jugar?"
                                    />

                                </SwiperSlide>


                {/* Cuarta */}

                
                <SwiperSlide key={wallyItems[6].itemId+"-media"}>
                                        <ItemImage
                                            picture={wallyItems[6].picture}
                                            pictureName={wallyItems[6].pictureName}
                                            title=" María/Juan le pidió a Bruno que jugara con él/ella. Pero Bruno dijo que no quería jugar con María/Juan. Él/Ella va a jugar con Tomás."
                                        />
                </SwiperSlide>
                <SwiperSlide key={wallyItems[6].itemId}>
                                    <ImageResponse
                                        title = {wallyItems[6].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {wallyItems[6].answer}
                                        instrumentId = {wallyItems[6].instrumentId}
                                        instrumentName = {wallyItems[6].instrumentName}          
                                        num = {wallyItems[6].num}     
                                        itemId = {wallyItems[6].itemId} 
                                    />

                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[7].itemId}>
                                    <ImageAction
                                        title = {wallyItems[7].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {wallyItems[7].answer}
                                        instrumentId = {wallyItems[7].instrumentId}
                                        instrumentName = {wallyItems[7].instrumentName}          
                                        num = {wallyItems[7].num}     
                                        itemId = {wallyItems[7].itemId} 
                                        firstAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666822/selb/wally/behavior/behavior_4_4_tknz9j.png" 
                                        secondAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666822/selb/wally/behavior/behavior_4_3_cnnpvq.png" 
                                        thirdAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666822/selb/wally/behavior/behavior_4_2_obu8qu.png" 
                                        fourthAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666822/selb/wally/behavior/behavior_4_1_fyndfn.png" 
                                        firstDescription = "¿Preguntar si también puedes jugar con Tomás?"
                                        secondDescription = '¿Empujar a Bruno y decirle: "Tú no eres mi amigo?'
                                        thirdDescription = "¿Llorar?"
                                        fourthDescription = "¿Ir a jugar con otra persona?"
                                    />

                                </SwiperSlide>


                {/* Quinta */}


                
                <SwiperSlide key={wallyItems[8].itemId+"-media"}>
                                        <ItemImage
                                            picture={wallyItems[8].picture}
                                            pictureName={wallyItems[8].pictureName}
                                            title="María/Juan hizo un dibujo de un perro. Bruno lo miró y le dijo: “No parece un perro. ¡Parece un mounstro feo!”, y comenzó a reirse."
                                        />
                </SwiperSlide>
                <SwiperSlide key={wallyItems[8].itemId}>
                                    <ImageResponse
                                        title = {wallyItems[8].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {wallyItems[8].answer}
                                        instrumentId = {wallyItems[8].instrumentId}
                                        instrumentName = {wallyItems[8].instrumentName}          
                                        num = {wallyItems[8].num}     
                                        itemId = {wallyItems[8].itemId} 
                                    />

                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[9].itemId}>
                                    <ImageAction
                                        title = {wallyItems[9].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {wallyItems[9].answer}
                                        instrumentId = {wallyItems[9].instrumentId}
                                        instrumentName = {wallyItems[9].instrumentName}          
                                        num = {wallyItems[9].num}     
                                        itemId = {wallyItems[9].itemId} 
                                        firstAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666822/selb/wally/behavior/behavior_5_2_xzjkvx.png" 
                                        secondAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666823/selb/wally/behavior/behavior_5_4_hk4a2v.png" 
                                        thirdAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666823/selb/wally/behavior/behavior_5_3_zp5ymd.png" 
                                        fourthAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666822/selb/wally/behavior/behavior_5_1_d0veor.png" 
                                        firstDescription = '¿Decirle a Bruno: "No importa, a mí me gusta mí dibujo"?'
                                        secondDescription = "¿Pegarle a Bruno o gritarle?" 
                                        thirdDescription = "¿Llorar?"
                                        fourthDescription = "¿Dejar de dibujar y buscar otra cosa para hacer?"
                                    />

                                </SwiperSlide>
                {/* Sexta */}

                
                <SwiperSlide key={wallyItems[10].itemId+"-media"}>
                                        <ItemImage
                                            picture={wallyItems[10].picture}
                                            pictureName={wallyItems[10].pictureName}
                                            title=" María/Juan trajo un/a muñeco/a a la escuela para la hora de la siesta. Bruno le dijo: “¡Eres una guagua!”"
                                        />
                </SwiperSlide>
                <SwiperSlide key={wallyItems[10].itemId}>
                                    <ImageResponse
                                        title = {wallyItems[10].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {wallyItems[10].answer}
                                        instrumentId = {wallyItems[10].instrumentId}
                                        instrumentName = {wallyItems[10].instrumentName}          
                                        num = {wallyItems[10].num}     
                                        itemId = {wallyItems[10].itemId} 
                                    />

                                </SwiperSlide>
                                <SwiperSlide key={wallyItems[11].itemId}>
                                    <ImageAction
                                        title = {wallyItems[11].title}       
                                        type = "quiz"
                                        other = {false}   
                                        answer = {wallyItems[11].answer}
                                        instrumentId = {wallyItems[11].instrumentId}
                                        instrumentName = {wallyItems[11].instrumentName}          
                                        num = {wallyItems[11].num}     
                                        itemId = {wallyItems[11].itemId} 
                                        firstAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666823/selb/wally/behavior/behavior_6_3_jybvz7.png" 
                                        secondAction ="https://res.cloudinary.com/keyzen/image/upload/v1665666823/selb/wally/behavior/behavior_6_4_tnvsr6.png"  
                                        thirdAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666823/selb/wally/behavior/behavior_6_1_mvziqj.png" 
                                        fourthAction = "https://res.cloudinary.com/keyzen/image/upload/v1665666823/selb/wally/behavior/behavior_6_2_zhtx0k.png" 
                                        firstDescription = "¿Traer un juguete para que Bruno duerma con él?"
                                        secondDescription = '¿Decirle a Bruno :"¡No, tú eres una guagua!" o pegarle?'
                                        thirdDescription = "¿Llorar?"
                                        fourthDescription = "¿Ignorar a Bruno?"
                                    />

                                </SwiperSlide>





                <SwiperSlide>
                    <Instruction checkpoint={true} instruction="Lo hiciste muy bien"/>
                </SwiperSlide>

            </Fragment>

        }
                

            </Swiper>
            </div>
        </Fragment>
    )
}