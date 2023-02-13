import React, { Fragment, useCallback, useEffect, useState } from 'react';
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
            id: 0,
            title: "Ejemplo B",
            instruction:"Si responde con el dígito primero califique el item de 0 y diga 'recuerda que debes decirme primero la palabra, luego el número'",
            audio: "",
            audioDescription: "9, manzana",
            options: ["Manzana", "9"]
        },
        {
            id: 1,
            title: "Item 1",
            instruction:"example",
            audio: "",
            audioDescription: "Zapato, 6",
            options: ["Zapato", "6"]
        },
        {
            id: 2,
            title: "Item 2",
            instruction:"example",
            audio: "",
            audioDescription: "5, pájaro",
            options: ["Pájaro", "5"]
        },
        {
            id:3,
            title: "Item 3",
            instruction:"example",
            audio: "",
            audioDescription: "2, carne",
            options: ["Carne", "2"]
        },
        {
            id:4,
            title: "Ejemplo C",
            instruction:"example",
            audio: "",
            audioDescription: "1, gato, leche",
            options: ["Gato", "Leche", "1"]
        },
        {
            id:5,
            title: "Item 4",
            instruction:"example",
            audio: "",
            audioDescription: "8, suéter, 5",
            options: ["Suéter", "8", "5"]
        },
        {
            id: 6,
            title: "Item 5",
            instruction:"example",
            audio: "",
            audioDescription: "Sapo, 2, cuchara",
            options: ["Sapo", "Cuchara", "2"]
        },
        {
            id: 7,
            title: "Item 6",
            instruction:"example",
            audio: "",
            audioDescription: "7, fruta, casa",
            options: ["Fruta", "Casa", "7"]
        },
        {
            id: 8,
            title: "Item 7",
            instruction:"example",
            audio: "",
            audioDescription: "3, pan, 1, león",
            options: ["Pan", "León", "3", "1"]
        },
        {
            id: 9,
            title: "Item 8",
            instruction:"example",
            audio: "",
            audioDescription: "Peine, 5, jugo, 9",
            options: ["Peine", "Jugo", "5", "9"]
        },
        {
            id: 10,
            title: "Item 9",
            instruction:"example",
            audio: "",
            audioDescription: "8, caballo, media, 2",
            options: ["Caballo", "Media", "8", "2"]
        },
        {
            id: 11,
            title: "Item 10",
            instruction:"example",
            audio: "",
            audioDescription: "4, naranja, 1, oso, 7",
            options: ["Naranja", "Oso", "4", "1", "7"]
        },
        {
            id: 12,
            title: "Item 11",
            instruction:"example",
            audio: "",
            audioDescription: "Cinturón, 3, 6, Mantequilla, 8",
            options: ["Cinturón", "Mantequilla", "3", "6", "8"]
        },
        {
            id: 13,
            title: "Item 12",
            instruction:"example",
            audio: "",
            audioDescription: "9, conejo, 5, 4, vestido",
            options: ["Conejo", "Vestido", "9", "5", "4"]
        },
        {
            id: 14,
            title: "Item 13",
            instruction:"example",
            audio: "",
            audioDescription: "Vaca, 1, pastel, 3, camisa, 6",
            options: ["Vaca", "Pastel", "Camisa", "1", "3", "6"]
        },
        {
            id: 15,
            title: "Item 14",
            instruction:"example",
            audio: "",
            audioDescription: "7, mosca, sopa, 2, 9, guante",
            options: ["Mosca", "Sopa", "Guante", "7", "2","9"]
        },
        {
            id: 16,
            title: "Item 15",
            instruction:"example",
            audio: "",
            audioDescription: "8, pantalon, 3, rata, 1",
            options: ["Pantalon", "Rata", "Huevos", "8", "3", "1"]
        },
        {
            id: 17,
            title: "Item 16",
            instruction:"example",
            audio: "",
            audioDescription: "Silla, 4, 7, ojos, azúcar, 6, 5",
            options: ["Silla", "Ojos", "Azúcar", "4", "7", "6", "5"]
        },
        {
            id: 18,
            title: "Item 17",
            instruction:"example",
            audio: "",
            audioDescription: "2, araña, 9, cama, 3, falda, 1",
            options: ["Araña", "Cama", "Falda", "2", "9", "3", "1"]
        },
        {
            id: 19,
            title: "Item 18",
            instruction:"example",
            audio: "",
            audioDescription: "Dulce, 5, 8, cortina, puerta, botón",
            options: ["Dulce", "Cortina", "Puerta", "Botón", "5", "8", "6"]
        },
        {
            id: 20,
            title: "Item 19",
            instruction:"example",
            audio: "",
            audioDescription: "4, sal, lobo, 7, estufa, 2, 9, bota",
            options: ["Sal", "Lobo", "Estufa", "Bota", "4", "7", "2", "9"]
        },
        {
            id: 21,
            title: "Item 20",
            instruction:"Si responde con el dígito primero califique el item de 0 y diga 'recuerda que debes decirme primero la palabra, luego el número'",
            audio: "",
            audioDescription: "Galleta, 1, tortuga, 5, mesa, 6, manopla, 3",
            options: ["Galleta", "Tortuga", "Mesa", "Manopla", "1", "5", "6", "3"]
        },
        {
            id: 22,
            title: "Item 21",
            instruction:"example",
            audio: "",
            audioDescription: "Zanahoria, 8, reloj, 4, 9, maíz, pájaro, 2",
            options: ["Zanahoria", "Reloj", "Maíz", "Pájaro", "8", "4", "9", "2"]
        },
    ])

    const [choices, setChoices] = useState({})
    const [actualItem, setActualItem] = useState()

    const [description, setDescription] = useState("Si responde con el dígito primero califique el item de 0 y diga 'recuerda que debes decirme primero la palabra, luego el número'")

    const startGameA = () => {
        setStartGame(true);
        setActualItem(items[21]);
    }

    const startGameB = () => {
        setStartGame(true);
        setActualItem(items[4]);
    }

    const saveItemChoice = useCallback((e) =>{
        setChoices(prevValue => {
            debugger;

            if (prevValue[actualItem.id]) {

                //aca ya es porque el valor esta creado

                //eliminar del array si fuera necesario

                if (Array.from(prevValue[actualItem.id]).length > 0) {

                    const actualLength = Array.from(prevValue[actualItem.id]).length
                    const testItems = [...prevValue[actualItem.id], e.target.innerHTML];
                    const newValues = testItems.filter(item => item !== e.target.innerHTML);
                    debugger;
                    
                    if (actualLength === newValues.length) {
                        prevValue[actualItem.id] = new Set([...testItems]);

                    } else {
                        prevValue[actualItem.id] = new Set([...newValues]);

                    }
                

                    // const newValues = testItems.filter(item => item !== e.target.innerHTML);

                    // debugger;
    
                    // if (newValues.length == prevValue[actualItem.id].length) {
                    //     prevValue[actualItem.id] = new Set([...prevValue[actualItem.id], e.target.innerHTML]);
                    // } else {
                    //     prevValue[actualItem.id] = new Set([...prevValue[actualItem.id]]);
                    // }
                }



            } else {
                prevValue[actualItem.id] = [e.target.innerHTML];

            }

            return prevValue;

           
        })
    }, [choices, actualItem])

    return (
        
        <Fragment>
            {
                !startGame &&
                    <Fragment>
                        <h1 style={{textAlign:"center", marginTop:"3rem"}}>Seleccione un punto de partida</h1>
                        <div style={{ display:"flex", width: "90%", margin:"0 auto", justifyContent:"center", alignItems:"center", alignContent:"center", height:"300px", gap:"2rem"}}>
                            <div onClick={startGameA} class="btn btn-success">Ejemplo A</div>
                            <div onClick={startGameB}class="btn btn-success">Ejemplo B</div>
                        </div>
                    </Fragment>
            }

            {
                startGame && 
                <Fragment>
                <div style={{textAlign:"center", marginTop:"1rem", width: "90%", margin:"1.5rem auto"}}>
                    <h1 >{actualItem.title}</h1>


                </div>
                <div style={{ boxSizing:"border-box", display:"flex", width: "90%", margin:"0 auto", justifyContent:"center", alignItems:"flex-start", alignContent:"center", height:"300px", gap:"2rem"}}>
                    <div style={{width:"48%", display:"flex", flexDirection:"column"}}>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", border:"1px solid #ddd", padding:"1rem", borderRadius:".5rem"}}>
                        {actualItem.instruction}
                        <button className='btn btn-danger' style={{width:"150px"}}>Evaluar con 0</button>
                    </div>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center", padding:"1rem 0 3rem 0  "}}>
                            <div className="play-button">
                            <img  src="/images/play-button.png" alt="play" style={{maxWidth:"150px", marginTop:"2rem"}} />
                            </div>
                        </div>
                        <div>
                            <div style={{marginBottom:".6rem"}}>
                                <img src="/images/audio-headset.png" style={{width:"30px", marginRight:".5rem"}} alt="" />
                                <p style={{display:"inline"}}>{actualItem.options.map((option) => `${option} `)}</p>
                            </div>
                            <div>
                                <img src="/images/check.png" style={{width:"30px", marginRight:".5rem"}} alt="" />
                                <p style={{display:"inline"}}>{actualItem.audioDescription}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{width:"48%", display:"flex", flexDirection:"column", border:"1px solid #ddd", padding:"1rem", borderRadius:".5rem"}}>
                        <h4 style={{textAlign:"center"}}>Opciones</h4>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            {
                                actualItem.options.map((item) => 
                                    <div style={{boxShadow:"1px 1px 1px 1px rgba(0, 0, 0, 0.1)", margin:".4rem", textAlign:"center", height:"30px"}} onClick={(e => saveItemChoice(e))}>{item}</div>
                                )
                            }
                        </div>

                    </div>
                </div>
                <div style={{display:"flex", width: "90%", margin:"0 auto", marginTop:"12rem", justifyContent:"center"}}>
                <button className='btn btn-primary' style={{textAlign: "center", width:"150px"}}>Avanzar</button>

                </div>
            </Fragment>
            }

        </Fragment>
    )
}