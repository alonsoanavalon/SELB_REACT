import React, { Fragment, useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function Fonologico () {

    const [startGame, setStartGame] = useState(false);
    const [items, setItems] = useState([
        {
            title: "Ejemplo B",
            audio: "",
            audioDescription: "9, manzana",
            options: ["Manzana", "9"]
        },
        {
            title: "Item 1",
            audio: "",
            audioDescription: "Zapato, 6",
            options: ["Zapato", "6"]
        },
        {
            title: "Item 2",
            audio: "",
            audioDescription: "5, pájaro",
            options: ["Pájaro", "5"]
        },
        {
            title: "Item 3",
            audio: "",
            audioDescription: "2, carne",
            options: ["Carne", "2"]
        },
        {
            title: "Ejemplo C",
            audio: "",
            audioDescription: "1, gato, leche",
            options: ["Gato", "Leche", "1"]
        },
        {
            title: "Item 4",
            audio: "",
            audioDescription: "8, suéter, 5",
            options: ["Suéter", "8", "5"]
        },
        {
            title: "Item 5",
            audio: "",
            audioDescription: "Sapo, 2, cuchara",
            options: ["Sapo", "Cuchara", "2"]
        },
        {
            title: "Item 6",
            audio: "",
            audioDescription: "7, fruta, casa",
            options: ["Fruta", "Casa", "7"]
        },
        {
            title: "Item 7",
            audio: "",
            audioDescription: "3, pan, 1, león",
            options: ["Pan", "León", "3", "1"]
        },
        {
            title: "Item 8",
            audio: "",
            audioDescription: "Peine, 5, jugo, 9",
            options: ["Peine", "Jugo", "5", "9"]
        },
        {
            title: "Item 9",
            audio: "",
            audioDescription: "8, caballo, media, 2",
            options: ["Caballo", "Media", "8", "2"]
        },
        {
            title: "Item 10",
            audio: "",
            audioDescription: "4, naranja, 1, oso, 7",
            options: ["Naranja", "Oso", "4", "1", "7"]
        },
        {
            title: "Item 11",
            audio: "",
            audioDescription: "Cinturón, 3, 6, Mantequilla, 8",
            options: ["Cinturón", "Mantequilla", "3", "6", "8"]
        },
        {
            title: "Item 12",
            audio: "",
            audioDescription: "9, conejo, 5, 4, vestido",
            options: ["Conejo", "Vestido", "9", "5", "4"]
        },
        {
            title: "Item 13",
            audio: "",
            audioDescription: "Vaca, 1, pastel, 3, camisa, 6",
            options: ["Vaca", "Pastel", "Camisa", "1", "3", "6"]
        },
        {
            title: "Item 14",
            audio: "",
            audioDescription: "7, mosca, sopa, 2, 9, guante",
            options: ["Mosca", "Sopa", "Guante", "7", "2","9"]
        },
        {
            title: "Item 15",
            audio: "",
            audioDescription: "8, pantalon, 3, rata, 1",
            options: ["Pantalon", "Rata", "Huevos", "8", "3", "1"]
        },
        {
            title: "Item 16",
            audio: "",
            audioDescription: "Silla, 4, 7, ojos, azúcar, 6, 5",
            options: ["Silla", "Ojos", "Azúcar", "4", "7", "6", "5"]
        },
        {
            title: "Item 17",
            audio: "",
            audioDescription: "2, araña, 9, cama, 3, falda, 1",
            options: ["Araña", "Cama", "Falda", "2", "9", "3", "1"]
        },
        {
            title: "Item 18",
            audio: "",
            audioDescription: "Dulce, 5, 8, cortina, puerta, botón",
            options: ["Dulce", "Cortina", "Puerta", "Botón", "5", "8", "6"]
        },
        {
            title: "Item 19",
            audio: "",
            audioDescription: "4, sal, lobo, 7, estufa, 2, 9, bota",
            options: ["Sal", "Lobo", "Estufa", "Bota", "4", "7", "2", "9"]
        },
        {
            title: "Item 20",
            audio: "",
            audioDescription: "Galleta, 1, tortuga, 5, mesa, 6, manopla, 3",
            options: ["Galleta", "Tortuga", "Mesa", "Manopla", "1", "5", "6", "3"]
        },
        {
            title: "Item 21",
            audio: "",
            audioDescription: "Zanahoria, 8, reloj, 4, 9, maíz, pájaro, 2",
            options: ["Zanahoria", "Reloj", "Maíz", "Pájaro", "8", "4", "9", "2"]
        },
    ])

    const [description, setDescription] = useState("Si responde con el dígito primero califique el item de 0 y diga 'recuerda que debes decirme primero la palabra, luego el número'")

    return (
        
        <Fragment>
            {
                !startGame &&
                    <Fragment>
                        <h1 style={{textAlign:"center", marginTop:"3rem"}}>Seleccione un punto de partida</h1>
                        <div style={{ display:"flex", width: "90%", margin:"0 auto", justifyContent:"center", alignItems:"center", alignContent:"center", height:"300px", gap:"2rem"}}>
                            <div onClick={{}} class="btn btn-success">Ejemplo A</div>
                            <div class="btn btn-success">Ejemplo B</div>
                            <div class="btn btn-success">Ejemplo C</div>
                        </div>
                    </Fragment>
            }

            {
                startGame && 
                <Fragment>
                <h1 style={{textAlign:"center", marginTop:"3rem"}}>Seleccione un punto de partida</h1>
                <div style={{ display:"flex", width: "90%", margin:"0 auto", justifyContent:"center", alignItems:"center", alignContent:"center", height:"300px", gap:"2rem"}}>
                    <h1>Comienza el juego</h1>
                </div>
            </Fragment>
            }

        </Fragment>
    )
}