import React, { Fragment, useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { get } from 'idb-keyval';
import Instruction from '../components/Instruction'
import Item from '../components/Item'

export default function Aces () {

    const [items, setItems] = useState([])

    useEffect(() => {

        get('instrument/4')
        .then(
            items => {
                setItems(items)
            }
        )

    }, [])


    items && console.log(items)


    return (
        
        <Fragment>
              <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={1}
            navigation/* ={{
                nextEl: '.next',
            }} */
            spaceBetween={50}
            allowTouchMove={false}
            >

            <SwiperSlide className="next">
                <Instruction instruction="“Ahora voy a mostrarte algunas imágenes de niños y niñas y quiero que tú me digas cómo se siente cada uno. Ella/Él se siente ¿feliz, triste, enojada/o, o asustada/o?. ¿Lo has entendido?… (espere respuesta del niño) Comencemos...”"/>


            </SwiperSlide>
            

            {
                items && items.map((item) => 
                    <SwiperSlide className="next" key={item.itemId+"-media"}>
                    <Item
                        title={item.title}
                        type={item.type}
                        picture={item.picture}
                        pictureName={item.pictureName}
                        key={item.itemId + "-media"}
                        num={item.num}
                        instrumentName={item.instrumentName}
                        instrumentId={item.instrumentId}
                        itemId={item.itemId}
                    />
                    </SwiperSlide >
                )
            }

            <SwiperSlide>
                <Instruction checkpoint={true} instruction="Lo hiciste muy bien"/>
            </SwiperSlide>

            </Swiper>

        </Fragment>
    )
}