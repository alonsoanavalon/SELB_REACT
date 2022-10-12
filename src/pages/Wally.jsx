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

    wallyItems && console.log(wallyItems)

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
                                        firstAction = "https://placeimg.com/200/200/animals" 
                                        secondAction = "https://placeimg.com/200/200/tech" 
                                        thirdAction = "https://placeimg.com/200/200/animals" 
                                        fourthAction = "https://placeimg.com/200/200/tech" 
                                    />

                                </SwiperSlide>

                {/* Segunda */}

                <SwiperSlide key={wallyItems[2].itemId+"-media"}>
                                        <ItemImage
                                            picture={wallyItems[2].picture}
                                            pictureName={wallyItems[2].pictureName}
                                            title="María/Juan estaba construyendo una torre muy alta con bloques. Bruno lo derribó"
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
                                        firstAction = "https://placeimg.com/200/200/animals" 
                                        secondAction = "https://placeimg.com/200/200/tech" 
                                        thirdAction = "https://placeimg.com/200/200/animals" 
                                        fourthAction = "https://placeimg.com/200/200/tech" 
                                    />

                                </SwiperSlide>
                {/* Tercera */}


                <SwiperSlide key={wallyItems[4].itemId+"-media"}>
                                        <ItemImage
                                            picture={wallyItems[4].picture}
                                            pictureName={wallyItems[4].pictureName}
                                            title="María/Juan estaba construyendo una torre muy alta con bloques. Bruno lo derribó"
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
                                        firstAction = "https://placeimg.com/200/200/animals" 
                                        secondAction = "https://placeimg.com/200/200/tech" 
                                        thirdAction = "https://placeimg.com/200/200/animals" 
                                        fourthAction = "https://placeimg.com/200/200/tech" 
                                    />

                                </SwiperSlide>


                {/* Cuarta */}

                
                <SwiperSlide key={wallyItems[6].itemId+"-media"}>
                                        <ItemImage
                                            picture={wallyItems[6].picture}
                                            pictureName={wallyItems[6].pictureName}
                                            title="María/Juan estaba construyendo una torre muy alta con bloques. Bruno lo derribó"
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
                                        firstAction = "https://placeimg.com/200/200/animals" 
                                        secondAction = "https://placeimg.com/200/200/tech" 
                                        thirdAction = "https://placeimg.com/200/200/animals" 
                                        fourthAction = "https://placeimg.com/200/200/tech" 
                                    />

                                </SwiperSlide>


                {/* Quinta */}


                
                <SwiperSlide key={wallyItems[8].itemId+"-media"}>
                                        <ItemImage
                                            picture={wallyItems[8].picture}
                                            pictureName={wallyItems[8].pictureName}
                                            title="María/Juan estaba construyendo una torre muy alta con bloques. Bruno lo derribó"
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
                                        firstAction = "https://placeimg.com/200/200/animals" 
                                        secondAction = "https://placeimg.com/200/200/tech" 
                                        thirdAction = "https://placeimg.com/200/200/animals" 
                                        fourthAction = "https://placeimg.com/200/200/tech" 
                                    />

                                </SwiperSlide>
                {/* Sexta */}

                
                <SwiperSlide key={wallyItems[10].itemId+"-media"}>
                                        <ItemImage
                                            picture={wallyItems[10].picture}
                                            pictureName={wallyItems[10].pictureName}
                                            title="María/Juan estaba construyendo una torre muy alta con bloques. Bruno lo derribó"
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
                                        firstAction = "https://placeimg.com/200/200/animals" 
                                        secondAction = "https://placeimg.com/200/200/tech" 
                                        thirdAction = "https://placeimg.com/200/200/animals" 
                                        fourthAction = "https://placeimg.com/200/200/tech" 
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