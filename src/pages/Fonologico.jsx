import React, { Fragment, useCallback, useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import {get, update, getMany, set} from 'idb-keyval'

export default function Fonologico () {

    const [startGame, setStartGame] = useState(false);
    const [isArray, setIsArray] = useState(false)
    const [zeroText, setZeroText] = useState("Evaluar con 0")
    const [audioPlaying, setAudioPlaying] = useState(false);
    //los ids de aca de los items deben ser iguales en bbdd para que las choices tambien se guarden con el orden y se envien correctamente
    const [items] = useState([
        {
            id: 0,
            title: "Ejemplo A",
            instruction:"Si responde con el dígito primero califique el item de 0 y diga 'recuerda que debes decirme primero la palabra, luego el número'",
            audio: null,
            audioDescription: "3, perro",
            options: ["Perro", "3"]
        },
        {
            id: 1,
            title: "Ejemplo B",
            instruction:"Si responde con el dígito primero califique el item de 0 y diga 'recuerda que debes decirme primero la palabra, luego el número'",
            audio: "./sounds/item-zero.mp3",
            audioDescription: "9, manzana",
            options: ["Manzana", "9"]
        },
        {
            id: 2,
            title: "Item 1",
            instruction:"example",
            audio: "./sounds/item-one.mp3",
            audioDescription: "Zapato, 6",
            options: ["Zapato", "6"]
        },
        {
            id: 3,
            title: "Item 2",
            instruction:"example",
            audio: "./sounds/item-two.mp3",
            audioDescription: "5, pájaro",
            options: ["Pájaro", "5"]
        },
        {
            id:4,
            title: "Item 3",
            instruction:"example",
            audio: "./sounds/item-three.mp3",
            audioDescription: "2, carne",
            options: ["Carne", "2"]
        },
        {
            id:5,
            title: "Ejemplo C",
            instruction:"example",
            audio: "./sounds/example-c.mp3",
            audioDescription: "1, gato, leche",
            options: ["Gato", "Leche", "1"]
        },
        {
            id:6,
            title: "Item 4",
            instruction:"example",
            audio: "./sounds/item-four.mp3",
            audioDescription: "8, suéter, 5",
            options: ["Suéter", "8", "5"]
        },
        {
            id: 7,
            title: "Item 5",
            instruction:"example",
            audio: "./sounds/item-five.mp3",
            audioDescription: "Sapo, 2, cuchara",
            options: ["Sapo", "Cuchara", "2"]
        },
        {
            id: 8,
            title: "Item 6",
            instruction:"example",
            audio: "./sounds/item-six.mp3",
            audioDescription: "7, fruta, casa",
            options: ["Fruta", "Casa", "7"]
        },
        {
            id: 9,
            title: "Item 7",
            instruction:"example",
            audio: "./sounds/item-seven.mp3",
            audioDescription: "3, pan, 1, león",
            options: ["Pan", "León", "3", "1"]
        },
        {
            id: 10,
            title: "Item 8",
            instruction:"example",
            audio: "./sounds/item-eight.mp3",
            audioDescription: "Peine, 5, jugo, 9",
            options: ["Peine", "Jugo", "5", "9"]
        },
        {
            id: 11,
            title: "Item 9",
            instruction:"example",
            audio: "./sounds/item-nine.mp3",
            audioDescription: "8, caballo, media, 2",
            options: ["Caballo", "Media", "8", "2"]
        },
        {
            id: 12,
            title: "Item 10",
            instruction:"example",
            audio: "./sounds/item-ten.mp3",
            audioDescription: "4, naranja, 1, oso, 7",
            options: ["Naranja", "Oso", "4", "1", "7"]
        },
        {
            id: 13,
            title: "Item 11",
            instruction:"example",
            audio: "./sounds/item-eleven.mp3",
            audioDescription: "Cinturón, 3, 6, Mantequilla, 8",
            options: ["Cinturón", "Mantequilla", "3", "6", "8"]
        },
        {
            id: 14,
            title: "Item 12",
            instruction:"example",
            audio: "./sounds/item-twelve.mp3",
            audioDescription: "9, conejo, 5, 4, vestido",
            options: ["Conejo", "Vestido", "9", "5", "4"]
        },
        {
            id: 15,
            title: "Item 13",
            instruction:"example",
            audio: "./sounds/item-thirteen.mp3",
            audioDescription: "Vaca, 1, pastel, 3, camisa, 6",
            options: ["Vaca", "Pastel", "Camisa", "1", "3", "6"]
        },
        {
            id: 16,
            title: "Item 14",
            instruction:"example",
            audio: "./sounds/item-fourteen.mp3",
            audioDescription: "7, mosca, sopa, 2, 9, guante",
            options: ["Mosca", "Sopa", "Guante", "7", "2","9"]
        },
        {
            id: 17,
            title: "Item 15",
            instruction:"example",
            audio: "./sounds/item-fifteen.mp3",
            audioDescription: "8, pantalon, 3, rata, 1",
            options: ["Pantalon", "Rata", "Huevos", "8", "3", "1"]
        },
        {
            id: 18,
            title: "Item 16",
            instruction:"example",
            audio: "./sounds/item-sixteen.mp3",
            audioDescription: "Silla, 4, 7, ojos, azúcar, 6, 5",
            options: ["Silla", "Ojos", "Azúcar", "4", "7", "6", "5"]
        },
        {
            id: 19,
            title: "Item 17",
            instruction:"example",
            audio: "./sounds/item-seventeen.mp3",
            audioDescription: "2, araña, 9, cama, 3, falda, 1",
            options: ["Araña", "Cama", "Falda", "2", "9", "3", "1"]
        },
        {
            id: 20,
            title: "Item 18",
            instruction:"example",
            audio: "./sounds/item-eighteen.mp3",
            audioDescription: "Dulce, 5, 8, cortina, puerta, botón",
            options: ["Dulce", "Cortina", "Puerta", "Botón", "5", "8", "6"]
        },
        {
            id: 21,
            title: "Item 19",
            instruction:"example",
            audio: "./sounds/item-nineteen.mp3",
            audioDescription: "4, sal, lobo, 7, estufa, 2, 9, bota",
            options: ["Sal", "Lobo", "Estufa", "Bota", "4", "7", "2", "9"]
        },
        {
            id: 22,
            title: "Item 20",
            instruction:"Si responde con el dígito primero califique el item de 0 y diga 'recuerda que debes decirme primero la palabra, luego el número'",
            audio: "./sounds/item-twenty.mp3",
            audioDescription: "Galleta, 1, tortuga, 5, mesa, 6, manopla, 3",
            options: ["Galleta", "Tortuga", "Mesa", "Manopla", "1", "5", "6", "3"]
        },
        {
            id: 23,
            title: "Item 21",
            instruction:"example",
            audio: "./sounds/item-twentyone.mp3",
            audioDescription: "Zanahoria, 8, reloj, 4, 9, maíz, pájaro, 2",
            options: ["Zanahoria", "Reloj", "Maíz", "Pájaro", "8", "4", "9", "2"]
        },
    ])

    const [actualDescription, setActualDescription] = useState()
    const [actualOptions, setActualOptions] = useState()
    const [choices, setChoices] = useState({})
    const [actualItem, setActualItem] = useState({})
    const [ zeroTimes, setZeroTimes ] = useState(0)
    const [description, setDescription] = useState("Si responde con el dígito primero califique el item de 0 y diga 'recuerda que debes decirme primero la palabra, luego el número'")
    
    const [studentName, setStudentName] = useState("")
    useEffect(() => {

        get('selectedStudentName')
        .then(studentName => setStudentName(studentName))

    }, [])
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

    async function saveTest(answers) {
        let startItemPoint = Object.keys(answers).length;
        let answersEntries = Object.entries(answers)
        let leftItems = {};
        items.forEach((item, key) => {
            if (key >= startItemPoint) {
                let obj = {
                    options:{},
                    value:0,
                }

                leftItems[key] = obj;
            }
        })


        let allAnswers = Object.assign(answers, leftItems)
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

        const answersArray = Object.entries(allAnswers);

        const parsedAnswers = answersArray.map((answer) => {
            const id = parseInt(answer[0])+323;
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

        try {
            await get('backupTest')
            .then(response => {
                let backupLength = response.length
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
    
            await get('completedTests')
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

            return true
        } catch (err) {
            console.error(err);
            Swal.fire({icon:"error", title:"Ha ocurrido un error en el guardado"})
            return false
        }



    }

   
    const startGameA = () => {
        setStartGame(true);
        setActualItem(items[0]);
    }

    const startGameB = () => {
        setStartGame(true);
        setActualItem(items[1]);
        choices[0] = {
            options: {},
            value: 0
        }
        
    }

    const startGameC = () => {
        setStartGame(true);
        setActualItem(items[5]);
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
        choices[4] = {
            options: {},
            value: 0
        }
        
    }

    const saveItemChoice = useCallback((e) =>{
        e.target.classList.toggle('active-option');

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


            if (Array.from(prevValue[actualItem.id]).length === 0) {
                prevValue[actualItem.id] = undefined;
            }

            console.log(prevValue)

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

            if (choices[actualItem.id] === undefined) {
                choices[actualItem.id] = {
                    options: {},
                    value: 0
                }
                const selectedItems = document.querySelectorAll(".active-option");
                selectedItems.forEach((item) => {
                    item.classList.remove("active-option")
                })
                setActualItem(items[actualItem.id+1])
                if (actualItem.id !== 0 && actualItem.id !== 1 && actualItem.id !== 5) {
                    setZeroTimes(prevValue => prevValue +1)
                }

            } else {
            const choicesArray = Array.from(choices[actualItem.id]);
            const answersArray = actualItem.options;

            if (actualItem.id === 23) {



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
                        choices[actualItem.id] = {
                            options: choices[actualItem.id],
                            value: 1
                        }
                    } else {
                    //tenemos que calificar con 0 y mostrar las opciones
                        choices[actualItem.id] = {
                            options: choices[actualItem.id],
                            value: 0,
                        }
                    }

                    if (zeroText === 'Revertir') {
                        setZeroTimes(prevValue => prevValue+1);
                    } else{
                        setZeroTimes(prevValue => prevValue+1);
                    }
  
                }

                Swal.fire({
                    icon: 'info',
                    title: "Test finalizado",
                    showCancelButton: false,
                    allowOutsideClick:false,
                    showConfirmButton: true,
                    confirmButtonText: 'Guardar test',
                    showLoaderOnConfirm: true,
                  preConfirm: async () => {
                    return saveAndExit(choices)
                      .then(response => {
                        if (response !== true) {
                          throw new Error(response.statusText)
                        }
                        return response
                      })
                      .catch(error => {
                        Swal.showValidationMessage(
                          `Ha ocurrido un error en el envío de datos desde el dispositivo`
                        )
                      })
                  },

                })
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            allowOutsideClick:false,
                            icon:"success",
                            title:"El test ha sido guardado",
                            confirmButtonText: 'Finalizar test y salir',
                          }).then(_ => {
                              setTimeout(() => {
                                window.location.pathname = '/'
                              }, 3000)
                          })
          
                    }
                })
            } else if (actualItem.id === 0 || actualItem.id === 1 || actualItem.id === 5){
                choices[actualItem.id] = {
                    options: choices[actualItem.id],
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
                        choices[actualItem.id] = {
                            options: choices[actualItem.id],
                            value: 1
                        }
                    } else {
                    //tenemos que calificar con 0 y mostrar las opciones
                        choices[actualItem.id] = {
                            options: choices[actualItem.id],
                            value: 0,
                        }
                    }

                    if (zeroText === 'Revertir') {
                        setZeroTimes(prevValue => prevValue+1);
                    } else{
                        setZeroTimes(prevValue => prevValue+1);
                    }
  
                }
                //quitandole estilos a botones activos
                const selectedItems = document.querySelectorAll(".active-option");
                selectedItems.forEach((item) => {
                    item.classList.remove("active-option")
                })
                setActualItem(items[actualItem.id+1])
            }
    
            }
            

        }


    }, [choices, actualItem, zeroText])

    const saveAndExit = useCallback(async () => {

        const saveResponse = await saveTest(choices);

        return saveResponse;

    }, [choices, setChoices])


    useEffect(() => {
        if (zeroTimes >= 3 && choices) {
            Swal.fire({
                icon: 'info',
                title: "Test finalizado",
                showCancelButton:false,
                allowOutsideClick:false,
                confirmButtonColor: '#3085d6',
                showConfirmButton: true,
                confirmButtonText: 'Guardar test',
                showLoaderOnConfirm: true,
              preConfirm: async () => {
                return saveAndExit(choices)
                  .then(response => {
                    if (response !== true) {
                      throw new Error(response.statusText)
                    }
                    return response
                  })
                  .catch(error => {
                    Swal.showValidationMessage(
                      `Ha ocurrido un error en el envío de datos desde el dispositivo`
                    )
                  })
              },
            })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        allowOutsideClick:false,
                        icon:"success",
                        title:"El test ha sido guardado",
                        confirmButtonText: 'Finalizar test y salir',
                      }).then(_ => {
                          setTimeout(() => {
                            window.location.pathname = '/'
                          }, 3000)
                      })
      
                }
            })
        }
    }, [zeroTimes, choices])

    useEffect(() => {
        if (actualItem.id === 0 && zeroTimes < 3) {
            Swal.fire({
                icon:"warning",
                title:"Voy a decir el nombre de ciertas cosas, como animales o comidas y algunos números",
                allowOutsideClick:false,
                html:"Una vez que los diga, debes decirme las palabras en el mismo orden en que yo las dije. Después, debes decirme los números en el mismo orden en que yo los dije. Vamos a comenzar con un número y una palabra. Repite primero la palabra seguida del número"
            })
        }else if (actualItem.id === 1 && zeroTimes < 3) {
            Swal.fire({
                icon:"warning",
                allowOutsideClick:false,
                title:"Ahora vas a escuchar las palabras y los números de la grabación.",
                html:"Recuerda que debes decir primero la palabra y luego el número"
            })
        } else if (actualItem.id === 5 && zeroTimes < 3) {
            Swal.fire({
                icon: "warning",
                allowOutsideClick:false,
                title: "Ahora vas a escuchar otras palabras y otros números.",
                html:"Siempre dime las palabras en el mismo orden, luego dime los numeros en el mismo orden. Si la  tarea se te hace muy dificil dime simplemente lo que puedes recordar"
            })

        }
    }, [actualItem])

    const playInstruction = useCallback(() => {
        if (actualItem.id !== 0) {
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
        }


    }, [actualItem, audioPlaying, setAudioPlaying])


    useEffect(() => {
        if (actualItem.audioDescription && actualItem.options) {
            var miCadena = actualItem.audioDescription;
            var expresionRegular = /,/g;
            var nuevaCadena = miCadena.replace(expresionRegular, "-");
            setActualDescription(nuevaCadena)

            const options = actualItem.options;
            const strOptions = options.join(' -')
            setActualOptions(strOptions)
            setZeroText("Evaluar con 0")


        }
    }, [actualItem, setActualDescription, setActualOptions, setZeroText])

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
        window.history.go(1);
        }
    }, [])

    return (
        <div style={{overflow:"hidden", height:"100%", paddingTop:"1.5rem"}}>
        <Fragment>
            {
                !startGame &&
                    <Fragment>
                        <h1 style={{textAlign:"center", marginTop:"3rem"}}>Seleccione un punto de partida</h1>
                        <div style={{ display:"flex", width: "90%", margin:"0 auto", justifyContent:"center", alignItems:"center", alignContent:"center", height:"300px", gap:"2rem"}}>
                            <div onClick={startGameA} class="btn btn-success">Ejemplo A</div>
                            <div onClick={startGameB} class="btn btn-success">Ejemplo B</div>
                            <div onClick={startGameC}class="btn btn-success">Ejemplo C</div>
                        </div>
                    </Fragment>
            }

            {
                startGame && 
                <Fragment>

                <div style={{textAlign:"center", marginTop:"1rem", width: "90%", margin:"1rem auto"}}>
                    <h3>{actualItem.title}</h3>
          

                </div>
                <div style={{ boxSizing:"border-box", display:"flex", width: "90%", margin:"0 auto", justifyContent:"center", alignItems:"flex-start", alignContent:"center", height:"300px", gap:"2rem"}}>
                    <div style={{width:"48%", display:"flex", flexDirection:"column"}}>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", border:"1px solid #ddd", padding:".8rem", borderRadius:".5rem"}}>
                        <p style={{ fontSize:".9rem"}}>{description}</p>
                    
                        <button disabled={audioPlaying ? true : false}onClick={() => {   
                            
                            
                            if (zeroText === 'Evaluar con 0') {
                                setZeroText("Revertir")
                            } else {
                                setZeroText("Evaluar con 0")
                            }
                   
                        }}className='btn btn-danger' style={{width:"150px", margin:".4rem 0 .2rem 0"}}>{zeroText}</button>
                    </div>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center", padding:"1rem 0 1rem 0"}}>
                            <div className="play-button" onClick={playInstruction}>
                            <img  src="/images/play-button.png" alt="play" style={{width:"150px"}} />
                            </div>
                        </div>
                        <div>
                        <div style={{marginBottom:".6rem", padding:".3rem" ,borderRadius:".4rem"}}>
                                <h5 className="title-answers">Descripción del audio</h5>
                                <img src="/images/audio-headset.png" style={{width:"30px", marginRight:".5rem"}} alt="" />
                                <p style={{display:"inline"}}>{actualDescription}</p>
                            </div>
                            <div style={{padding:".3rem" ,borderRadius:".4rem"}}>
                                <h5 className="title-answers">Respuestas correctas</h5>
                                <img src="/images/check.png" style={{width:"30px", marginRight:".5rem"}} alt="" />
                                <p style={{display:"inline"}}>{actualOptions}</p>
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
                <div className="go-btn">
                <button disabled={audioPlaying ? true : false}className='btn btn-primary' style={{textAlign: "center", width:"150px" }} onClick={nextItem}>Avanzar</button>

                </div>
            </Fragment>
            }

        </Fragment>
        <p style={{zIndex: "100",position:"absolute", textAlign:"start", left:"1rem", bottom:"-4rem", color:"#aaa"}}>Estudiante: {studentName && studentName} </p>

        </div>
    )
}