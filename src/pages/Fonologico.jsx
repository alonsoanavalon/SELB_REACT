import React, { Fragment, useCallback, useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import {get, update, getMany, set} from 'idb-keyval'

export default function Fonologico () {

    const [startGame, setStartGame] = useState(false);
    const [isArray, setIsArray] = useState(false)
    const [audioPlaying, setAudioPlaying] = useState(false);
    //los ids de aca de los items deben ser iguales en bbdd para que las choices tambien se guarden con el orden y se envien correctamente
    const [items] = useState([
        {
            id: 0,
            title: "Ejemplo B",
            instruction:"Si responde con el dígito primero califique el item de 0 y diga 'recuerda que debes decirme primero la palabra, luego el número'",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861111/fonolo/item_0_qrciqj.mp3",
            audioDescription: "9, manzana",
            options: ["Manzana", "9"]
        },
        {
            id: 1,
            title: "Item 1",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861111/fonolo/item_1_k1jhs2.mp3",
            audioDescription: "Zapato, 6",
            options: ["Zapato", "6"]
        },
        {
            id: 2,
            title: "Item 2",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861111/fonolo/item_2_y2lgrd.mp3",
            audioDescription: "5, pájaro",
            options: ["Pájaro", "5"]
        },
        {
            id:3,
            title: "Item 3",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861111/fonolo/item_3_hldule.mp3",
            audioDescription: "2, carne",
            options: ["Carne", "2"]
        },
        {
            id:4,
            title: "Ejemplo C",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861979/fonolo/Ic_online-audio-converter.com_e5doen.mp3",
            audioDescription: "1, gato, leche",
            options: ["Gato", "Leche", "1"]
        },
        {
            id:5,
            title: "Item 4",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861111/fonolo/item_4_gjjvod.mp3",
            audioDescription: "8, suéter, 5",
            options: ["Suéter", "8", "5"]
        },
        {
            id: 6,
            title: "Item 5",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_5_lldzan.mp3",
            audioDescription: "Sapo, 2, cuchara",
            options: ["Sapo", "Cuchara", "2"]
        },
        {
            id: 7,
            title: "Item 6",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861112/fonolo/item_6_mtbekq.mp3",
            audioDescription: "7, fruta, casa",
            options: ["Fruta", "Casa", "7"]
        },
        {
            id: 8,
            title: "Item 7",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861112/fonolo/item_7_osybyw.mp3",
            audioDescription: "3, pan, 1, león",
            options: ["Pan", "León", "3", "1"]
        },
        {
            id: 9,
            title: "Item 8",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861112/fonolo/item_8_yos4p2.mp3",
            audioDescription: "Peine, 5, jugo, 9",
            options: ["Peine", "Jugo", "5", "9"]
        },
        {
            id: 10,
            title: "Item 9",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861112/fonolo/item_9_ehphqu.mp3",
            audioDescription: "8, caballo, media, 2",
            options: ["Caballo", "Media", "8", "2"]
        },
        {
            id: 11,
            title: "Item 10",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861112/fonolo/item_10_wkjt57.mp3",
            audioDescription: "4, naranja, 1, oso, 7",
            options: ["Naranja", "Oso", "4", "1", "7"]
        },
        {
            id: 12,
            title: "Item 11",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861114/fonolo/item_11_htldog.mp3",
            audioDescription: "Cinturón, 3, 6, Mantequilla, 8",
            options: ["Cinturón", "Mantequilla", "3", "6", "8"]
        },
        {
            id: 13,
            title: "Item 12",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_12_twm7ls.mp3",
            audioDescription: "9, conejo, 5, 4, vestido",
            options: ["Conejo", "Vestido", "9", "5", "4"]
        },
        {
            id: 14,
            title: "Item 13",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_13_i7lyni.mp3",
            audioDescription: "Vaca, 1, pastel, 3, camisa, 6",
            options: ["Vaca", "Pastel", "Camisa", "1", "3", "6"]
        },
        {
            id: 15,
            title: "Item 14",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_14_ssyvpp.mp3",
            audioDescription: "7, mosca, sopa, 2, 9, guante",
            options: ["Mosca", "Sopa", "Guante", "7", "2","9"]
        },
        {
            id: 16,
            title: "Item 15",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_15_crje9x.mp3",
            audioDescription: "8, pantalon, 3, rata, 1",
            options: ["Pantalon", "Rata", "Huevos", "8", "3", "1"]
        },
        {
            id: 17,
            title: "Item 16",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_16_o373zz.mp3",
            audioDescription: "Silla, 4, 7, ojos, azúcar, 6, 5",
            options: ["Silla", "Ojos", "Azúcar", "4", "7", "6", "5"]
        },
        {
            id: 18,
            title: "Item 17",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861115/fonolo/item_17_tph1tz.mp3",
            audioDescription: "2, araña, 9, cama, 3, falda, 1",
            options: ["Araña", "Cama", "Falda", "2", "9", "3", "1"]
        },
        {
            id: 19,
            title: "Item 18",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_18_u4eou1.mp3",
            audioDescription: "Dulce, 5, 8, cortina, puerta, botón",
            options: ["Dulce", "Cortina", "Puerta", "Botón", "5", "8", "6"]
        },
        {
            id: 20,
            title: "Item 19",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_19_nrdy1s.mp3",
            audioDescription: "4, sal, lobo, 7, estufa, 2, 9, bota",
            options: ["Sal", "Lobo", "Estufa", "Bota", "4", "7", "2", "9"]
        },
        {
            id: 21,
            title: "Item 20",
            instruction:"Si responde con el dígito primero califique el item de 0 y diga 'recuerda que debes decirme primero la palabra, luego el número'",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861114/fonolo/item_20_tnunrt.mp3",
            audioDescription: "Galleta, 1, tortuga, 5, mesa, 6, manopla, 3",
            options: ["Galleta", "Tortuga", "Mesa", "Manopla", "1", "5", "6", "3"]
        },
        {
            id: 22,
            title: "Item 21",
            instruction:"example",
            audio: "https://res.cloudinary.com/keyzen/video/upload/v1676861113/fonolo/item_21_d87pwg.mp3",
            audioDescription: "Zanahoria, 8, reloj, 4, 9, maíz, pájaro, 2",
            options: ["Zanahoria", "Reloj", "Maíz", "Pájaro", "8", "4", "9", "2"]
        },
    ])

    const [choices, setChoices] = useState({})
    const [actualItem, setActualItem] = useState({})
    const [ zeroTimes, setZeroTimes ] = useState(0)
    const [description, setDescription] = useState("Si responde con el dígito primero califique el item de 0 y diga 'recuerda que debes decirme primero la palabra, luego el número'")
    
    function getMomentByDate(date) {
        let dateBegin;
        let dateUntil;
        get('moments')
        .then(res => {
            res.map(element => {
                dateBegin = new Date(element['begin']).toLocaleDateString("zh-TW")
                dateUntil = new Date(element['until']).toLocaleDateString("zh-TW")
                if (date >= dateBegin && date <= dateUntil ) {
                    return element['id']
                } 
                
                
            })
        })
    }

    function saveTest(answers) {

        let instrumentInfo = {}
        let choicesArray = []

        let testDataArray = ['selectedStudent', 'userData']

        //Me queda arreglar esto, pq ahora al elegir el test no tenemos niño, ni fecha ni evaluador, entonces hay que ver eso dps
        getMany(testDataArray).then(([firstVal, secondVal]) =>  { 
            instrumentInfo['user_id'] = parseInt(secondVal['id'])
            instrumentInfo['student_id'] = parseInt(firstVal)
            instrumentInfo['date'] = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
        }
        );

        choicesArray.push(instrumentInfo)

        //esto de 8 tendre q poner en bdd y 7 hnf
        instrumentInfo['instrument'] = 8

        const answersArray = Object.entries(answers);
        debugger;
        const parsedAnswers = answersArray.map((answer) => {
            const id = parseInt(answer[0])+322;
            return [
                id,
                {
                    options: Array.from(answer[1].options),
                    value: answer[1].value
                }
            ]
        })
        const formatedAnswers = Object.fromEntries(parsedAnswers);


        choicesArray.push(formatedAnswers) // estas deben ser las respuestas

        //Luego viene toda la logica de si se repite o si se guarda en el backup etc.

        get('backupTest')
        .then(response => {
            let backupLength = response.length
            debugger;
            if (Array.isArray(response) && response.length > 0) {
                get('completedTests')
                .then(res => {
                    if (backupLength >= res.length) { // Aca ya sabemos que es mas el backup
                        console.log(response, "Actualizando Backup")
                        let arrayCounter = 0;
                        response.forEach(array => {
                            let responseMoment;
                            let instrumentMoment;
                            if (array[0]['student_id'] === instrumentInfo['student_id'] && array[0]['instrument'] == instrumentInfo['instrument'] && array[0]['user_id'] == instrumentInfo['user_id']) {

                                responseMoment = getMomentByDate(array[0]['date'])
                                instrumentMoment = getMomentByDate(instrumentInfo['date'])

                                if (responseMoment === instrumentMoment) {
                                    response.splice(arrayCounter, 1)
                                } 
                            }
                            arrayCounter+= 1
    
                        })
    
                        update('backupTest', val => [...response, choicesArray])
                    }
                })
            }
        })


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
                        
                        let responseMoment;
                        let instrumentMoment;
                        if (array[0]['student_id'] === instrumentInfo['student_id'] && array[0]['instrument'] == instrumentInfo['instrument'] && array[0]['user_id'] == instrumentInfo['user_id']) {

                            responseMoment = getMomentByDate(array[0]['date'])
                            instrumentMoment = getMomentByDate(instrumentInfo['date'])

                            if (responseMoment === instrumentMoment) {
                                response.splice(arrayCounter, 1)
                            } 
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

    }

   
    const startGameA = () => {
        setStartGame(true);
        setActualItem(items[0]);
    }

    const startGameB = () => {
        setStartGame(true);
        setActualItem(items[4]);
        choices[0] = {
            options: {},
            value: 0
        }
        choices[1] = {
            options: {},
            value: 0
        }
        choices[2] = {
            options: {},
            value: 0
        }
        choices[3] = {
            options: {},
            value: 0
        }
        
    }

    const saveItemChoice = useCallback((e) =>{

        e.target.classList.toggle('active-option')

        setChoices(prevValue => {
            //aca el actualItem en lugar del actualItem para asignar el numero de item en las choices, utilizariamos el e.target.dataset.id, asi sabemos en cual item estamos y podriamos obtener los valores o setearlo
            //La unica diferencia es el origen, antes estaba dado por los clicks, ahora esta dado por el slide
            if (prevValue[actualItem.id]) {

                if (Array.from(prevValue[actualItem.id]).length > 0) {

                    const actualLength = Array.from(prevValue[actualItem.id]).length
                    const testItems = [...prevValue[actualItem.id], e.target.innerHTML];
                    const newValues = testItems.filter(item => item !== e.target.innerHTML);
                    
                    if (actualLength === newValues.length) {
                        prevValue[actualItem.id] = new Set([...testItems]);

                    } else {
                        prevValue[actualItem.id] = new Set([...newValues]);

                    }
            
                }

            } else {
                prevValue[actualItem.id] = [e.target.innerHTML];

            }
            return prevValue;

           
        })
    }, [choices, actualItem])

    const matchCounter = (choicesArray, answersArray) => {
        const matches = [];
        choicesArray.forEach((answer, index) => {
            if (answer === answersArray[index]) {
                matches.push(answer);
            }
        })

        return matches;
    }

    const nextItem = useCallback(() => {

        if (choices && actualItem) {
            const choicesArray = Array.from(choices[actualItem.id]);
            const answersArray = actualItem.options;

            if (actualItem.id === 22) {
                Swal.fire({
                    icon: 'success',
                    title: "Test finalizado",
                    allowOutsideClick: false,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        saveAndExit(choices);
                    }
                })
            } else if (actualItem.id === 0 || actualItem.id === 4){
                choices[actualItem.id] = {
                    options: {},
                    value: 0
                }
                const selectedItems = document.querySelectorAll(".active-option");
                selectedItems.forEach((item) => {
                    item.classList.remove("active-option")
                })
                setActualItem(items[actualItem.id+1])
            }else {


                if (JSON.stringify(choicesArray) === JSON.stringify(answersArray)) {
                    //tenemos que agregar el puntaje que serian 2 y mostrar las opciones
                    setZeroTimes(0);
                    choices[actualItem.id] = {
                        options: choices[actualItem.id],
                        value: 2
                    }
                } else {
                    const matches = matchCounter(choicesArray, answersArray);

                    if (matches.length >= 2) {
                        //ahora esto se considera error, pero no tenemos un contador
                        //de errores, o es el de zeros?
                        choices[actualItem.id] = {
                            options: {},
                            value: 1
                        }
                    } else {
                    //tenemos que calificar con 0 y mostrar las opciones
                    choices[actualItem.id] = {
                        options: {},
                        value: 0,
                    }
                    }
                    setZeroTimes(prevValue => prevValue+1);
                }
                //quitandole estilos a botones activos
                const selectedItems = document.querySelectorAll(".active-option");
                selectedItems.forEach((item) => {
                    item.classList.remove("active-option")
                })
                setActualItem(items[actualItem.id+1])
            }
    

        }


    }, [choices, actualItem])

    const saveAndExit = useCallback(() => {
        saveTest(choices);
        window.location.href = '/';

    }, [choices, setChoices])

    useEffect(() => {
        if (zeroTimes >= 3 && choices) {
            Swal.fire({
                icon: 'error',
                title: "Test finalizado",
                allowOutsideClick: false,
                html:"Haz cometido 3 errores consecutivos"
            })
            .then((result) => {
                if (result.isConfirmed) {
                    saveAndExit(choices);
                }
            })
        }
    }, [zeroTimes, choices])

    useEffect(() => {
        if (actualItem.id === 0) {
            Swal.fire({
                icon:"warning",
                title:"Ahora vas a escuchar las palabras y los números de la grabación.",
                html:"Recuerda que debes decir primero la palabra y luego el número"
            })
        } else if (actualItem.id === 4) {
            Swal.fire({
                icon: "warning",
                title: "Ahora vas a escuchar otras palabras y otros números.",
                html:"Siempre dime las palabras en el mismo orden, luego dime los numeros en el mismo orden. Si la  tarea se te hace muy dificil dime simplemente lo que puedes recordar"
            })

        }
    }, [actualItem])

    const playInstruction = useCallback(() => {
        if (!audioPlaying) {
            var audio = new Audio(actualItem.audio);
            audio.play();
            audio.onprogress = function () {
                setAudioPlaying(true);
            }
            audio.onended = function () {
                setAudioPlaying(false);
            }
        } 

    }, [actualItem, audioPlaying, setAudioPlaying])

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
                    <h3>{actualItem.title}</h3>
          

                </div>
                <div style={{ boxSizing:"border-box", display:"flex", width: "90%", margin:"0 auto", justifyContent:"center", alignItems:"flex-start", alignContent:"center", height:"300px", gap:"2rem"}}>
                    <div style={{width:"48%", display:"flex", flexDirection:"column"}}>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", border:"1px solid #ddd", padding:".8rem", borderRadius:".5rem"}}>
                        {description}
                        <button disabled={audioPlaying ? true : false}onClick={() => setZeroTimes(prevValue => {
                            choices[actualItem.id] = {
                                options: {},
                                value: 0
                            }
                            const selectedItems = document.querySelectorAll(".active-option");
                            selectedItems.forEach((item) => {
                                item.classList.remove("active-option")
                            })
                            setActualItem(items[actualItem.id+1])
                            return prevValue +1
                        })}className='btn btn-danger' style={{width:"150px", margin:"1rem 0 .6rem 0"}}>Evaluar con 0</button>
                    </div>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center", padding:"1rem 0 1rem 0"}}>
                            <div className="play-button" onClick={playInstruction}>
                            <img  src="/images/play-button.png" alt="play" style={{width:"150px"}} />
                            </div>
                        </div>
                        <div>
                            <div style={{marginBottom:".6rem", border:"1px solid #ddd", padding:".3rem" ,borderRadius:".4rem"}}>
                                <h5>Respuestas correctas</h5>
                                <img src="/images/check.png" style={{width:"30px", marginRight:".5rem"}} alt="" />
                                <p style={{display:"inline"}}>{
                                actualItem.options && actualItem.options.map((option, key) => `${option} `)
                                }</p>
                            </div>
                            <div style={{border:"1px solid #ddd", padding:".3rem" ,borderRadius:".4rem"}}>
                                <h5>Descripción del audio</h5>
                                <img src="/images/audio-headset.png" style={{width:"30px", marginRight:".5rem"}} alt="" />
                                <p style={{display:"inline"}}>{actualItem.audioDescription}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{width:"48%", display:"flex", flexDirection:"column", border:"1px solid #ddd", padding:"1rem", borderRadius:".5rem"}}>
                        <h4 style={{textAlign:"center"}}>Opciones</h4>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            {
                                 actualItem.options && actualItem.options.map((item, key) => 
                                    <div key={key} style={{boxShadow:"1px 1px 1px 1px rgba(0, 0, 0, 0.1)", margin:".4rem auto", textAlign:"center", height:"30px", width:"150px", borderRadius:".8rem", cursor:"pointer"}} onClick={(e => saveItemChoice(e))}>{item}</div>
                                )
                            }
                        </div>

                    </div>
                </div>
                <div style={{display:"flex", width: "90%", margin:"0 auto", marginTop:"14rem", justifyContent:"center"}}>
                <button disabled={audioPlaying ? true : false}className='btn btn-primary' style={{textAlign: "center", width:"150px" }} onClick={nextItem}>Avanzar</button>

                </div>
            </Fragment>
            }

        </Fragment>
    )
}