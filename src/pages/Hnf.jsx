import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import {get, update, getMany, set} from 'idb-keyval'

export default function HNF() {
    const [startTimeHearts, setStartTimeHearts] = useState();
    const [startTimeFlowers, setStartTimeFlowers] = useState();
    const [startTimeHeartAndFlowers, setStartTimeHeartAndFlowers] = useState();
    const [firstBoxClass, setFirstBoxClass] = useState("hnf-box");
    const [secondBoxClass, setSecondBoxClass] = useState("hnf-box");
    const [cycle, setCycle] = useState(0);
    const [isArray, setIsArray] = useState(false)

    const [studentName, setStudentName] = useState("")
    useEffect(() => {

        get('selectedStudentName')
        .then(studentName => setStudentName(studentName))

    }, [])
    

    const [answers] = useState({
        // Del 0 al 5 son en los que tiene que hacer click en el correcto o no pasa, son los de ejemplo.
        // 6 a 17  -- [6-18?] son el primero de corazones, es con tiempo
        // 18 a 23   - [19-24?]es el test de flores ( que hay que apretar el contrario, estos serian las respuestas correctas en relacion a botones, no a donde aparece la flor sino que al contrario)
        // 24 a 35 son el flores
        // 36 al final es una bomba de combinaciones pero estoy siempre guardando el boton correcto

        0: 1,
        1: 0,
        2: 1,
        3: 1,
        4: 0,
        5: 0,
        6: 1,
        7: 0,
        8: 0,
        9: 1,
        10: 1,
        11: 0,
        12: 1,
        13: 1,
        14: 0,
        15: 0,
        16: 0,
        17: 1,
        18: 0,
        19: 1,
        20: 0,
        21: 1,
        22: 0,
        23: 0,
        24: 0,
        25: 1,
        26: 1,
        27: 0,
        28: 0,
        29: 1,
        30: 0,
        31: 0,
        32: 1,
        33: 1,
        34: 0,
        35: 1,
        36: 0,
        37: 1,
        38: 1,
        39: 0,
        40: 0,
        41: 1,
        42: 1,
        43: 0,
        44: 0,
        45: 0,
        46: 1,
        47: 0,
        48: 0,
        49: 0,
        50: 1,
        51: 0,
        52: 1,
        53: 1,
        54: 0,
        55: 1,
        56: 1,
        57: 1,
        58: 0,
        59: 0,
        60: 0,
        61: 1,
        62: 0,
        63: 0,
        64: 1,
        65: 1,
        66: 1,
        67: 0,
        68: 0

    })
    const [choices, setChoices] = useState({})

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

    async function saveTest(testAnswers) {

        const parsedHNFAnswers = Object.entries(answers);
        const parsedHNFChoices = Object.entries(testAnswers);
        const parsedHNFResults = {};

        parsedHNFChoices.forEach((hnfChoice) => {
            const id = hnfChoice[0]
            //Estamos comprobando si la respuesta es correcta, por eso preguntamos si la respuesta guardada al nivel del id de la respuesta dada es igual a la respuesta que esta en las respuestas correctas, si es correcto devuelve 1 sino 0.
            if (hnfChoice[1].choice == parsedHNFAnswers[id][1]) {
                parsedHNFResults[id] = {
                    choice: 1,
                    time: hnfChoice[1].time
                }
            } else {
                parsedHNFResults[id] = {
                    choice: 0,
                    time: hnfChoice[1].time
                } 
            }
        })

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
        instrumentInfo['instrument'] = 7;
        const answersArray = Object.entries(parsedHNFResults);
        const parsedAnswers = answersArray.map((answer) => {
            const id = parseInt(answer[0])+254;
            return [
                id,
                answer[1],
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


    const startFirstTest = () => {

        // Ahora tengo que comenzar la secuencia de evaluacion, pero que es lo que va a contener este algoritmo?
        // Primero deberia tener el numero de cada paso, para poder realizar cierta logica
        // Debo hacer otra funcion para encargarse de pintar y despintar, es todo lo que hará, se le pasará el que debe estar activo (0 - 1)    
        // La funcion tiene que guardar en un estado las respuestas, dependiendo del paso en el que estemos

        setOption(1, 'heart');

    }

    const setOption = (position, option) => {
      
            if (option === 'heart') {
                if (position === 0) {
                    setFirstBoxClass("hnf-box")
                    setSecondBoxClass("hnf-box")
                    setTimeout(() => {
                        setFirstBoxClass("hnf-box hnf-heart")
                    }, 200)

                } else {
                    setFirstBoxClass("hnf-box")
                    setSecondBoxClass("hnf-box")
                    setTimeout(() => {
                        setSecondBoxClass("hnf-box hnf-heart")
                    }, 200)
                }
            } else {
                if (position === 1) {
                    setSecondBoxClass("hnf-box")
                    setFirstBoxClass("hnf-box")
                    setTimeout(() => {
                        setFirstBoxClass("hnf-box hnf-flower")
                    }, 200)

                } else {
                    setFirstBoxClass("hnf-box")
                    setSecondBoxClass("hnf-box")
                    setTimeout(() => {
                        setSecondBoxClass("hnf-box hnf-flower")
                    }, 200)
                }
            }


            const button0 = document.querySelector("#hnf-button-0");
            const button1 = document.querySelector("#hnf-button-1");
    
            button0.disabled = false;
            button1.disabled = false;

    }

    const exampleTest = (choice, option) => {

        if (answers[cycle] === choice) {
            const newPosition = answers[cycle + 1];
            setOption(newPosition, option);
            return true;
        } else { 
            return false;
        }
        
    }

    const flowerTest = () => {



        setOption(0, 'flower');
        setCycle(24);
        setStartTimeFlowers(new Date().getTime());

        setTimeout(() => {
            setOption(1, 'flower');
            setCycle(25);
            setStartTimeFlowers(new Date().getTime());
        }, 2000)
        setTimeout(() => {
            setOption(1, 'flower');
            setCycle(26);
            setStartTimeFlowers(new Date().getTime());
        }, 4000)
        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(27);
            setStartTimeFlowers(new Date().getTime());
        }, 6000)
        setTimeout(() => {
            setOption(0, 'flower'); 
            setCycle(28);
            setStartTimeFlowers(new Date().getTime());
        }, 8000)
        setTimeout(() => {
            setOption(1, 'flower');
            setCycle(29);
            setStartTimeFlowers(new Date().getTime());
        }, 10000)
        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(30);
            setStartTimeFlowers(new Date().getTime());
        }, 12000)
        setTimeout(() => {
            setOption(0, 'flower'); 
            setCycle(31);
            setStartTimeFlowers(new Date().getTime());
        }, 14000)
        setTimeout(() => {
            setOption(1, 'flower');
            setCycle(32);
            setStartTimeFlowers(new Date().getTime());
        }, 16000)
        setTimeout(() => {
            setOption(1, 'flower');
            setCycle(33);
            setStartTimeFlowers(new Date().getTime());
        }, 18000)
        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(34);
            setStartTimeFlowers(new Date().getTime());
        }, 20000)
        setTimeout(() => {
            setOption(1, 'flower');
            setCycle(35);
            setStartTimeFlowers(new Date().getTime());
        }, 22000)

    }


    const heartTest = () => {

        setStartTimeHearts(new Date().getTime());

        setTimeout(() => {
            setOption(1, 'heart');
            setCycle(6);

            setStartTimeHearts(new Date().getTime());
        }, 2000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(7);

            setStartTimeHearts(new Date().getTime());
        }, 4000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(8);

            setStartTimeHearts(new Date().getTime());
        }, 6000)
        setTimeout(() => {
            setOption(1, 'heart'); 
            setCycle(9);

            setStartTimeHearts(new Date().getTime());
        }, 8000)
        setTimeout(() => {
            setOption(1, 'heart');
            setCycle(10);
            setStartTimeHearts(new Date().getTime());
        }, 10000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(11);
            setStartTimeHearts(new Date().getTime());
        }, 12000)
        setTimeout(() => {
            setOption(1, 'heart'); 
            setCycle(12);
            setStartTimeHearts(new Date().getTime());
        }, 14000)
        setTimeout(() => {
            setOption(1, 'heart');
            setCycle(13);
            setStartTimeHearts(new Date().getTime());
        }, 16000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(14);
            setStartTimeHearts(new Date().getTime());
        }, 18000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(15);
            setStartTimeHearts(new Date().getTime());
        }, 20000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(16);
            setStartTimeHearts(new Date().getTime());
        }, 22000)
        setTimeout(() => {
            setOption(1, 'heart');
            setCycle(17);
            setStartTimeHearts(new Date().getTime());
        }, 24000)
    }


    const heartAndFlowerTest = () => {


        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(36);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 2000)
        setTimeout(() => {
            setOption(1, 'heart');
            setCycle(37);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 4000)
        setTimeout(() => {
            setOption(1, 'heart');
            setCycle(38);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 6000)
        setTimeout(() => {
            setOption(0, 'heart'); 
            setCycle(39);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 8000)
        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(40);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 10000)
        setTimeout(() => {
            setOption(1, 'flower');
            setCycle(41);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 12000)
        setTimeout(() => {
            setOption(1, 'flower');  
            setCycle(42);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 14000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(43);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 16000)
        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(44);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 18000)
        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(45);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 20000)
        setTimeout(() => {
            setOption(1, 'heart');
            setCycle(46);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 22000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(47);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 24000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(48);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 26000)
        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(49);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 28000)
        setTimeout(() => {
            setOption(1, 'heart');
            setCycle(50);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 30000)
        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(51);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 32000)
        setTimeout(() => {
            setOption(1, 'flower');
            setCycle(52);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 34000)
        setTimeout(() => {
            setOption(1, 'flower');
            setCycle(53);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 36000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(54);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 38000)
        setTimeout(() => {
            setOption(1, 'heart');
            setCycle(55);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 40000)
        setTimeout(() => {
            setOption(1, 'flower');
            setCycle(56);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 42000)
        setTimeout(() => {
            setOption(1, 'heart');
            setCycle(57);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 44000)
        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(58);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 46000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(59);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 48000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(60);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 50000)
        setTimeout(() => {
            setOption(1, 'flower');
            setCycle(61);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 52000)
        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(62);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 54000)
        setTimeout(() => {
            setOption(0, 'heart');
            setCycle(63);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 56000)
        setTimeout(() => {
            setOption(1, 'heart');
            setCycle(64);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 58000)
        setTimeout(() => {
            setOption(1, 'heart');
            setCycle(65);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 60000)
        setTimeout(() => {
            setOption(1, 'flower');
            setCycle(66);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 62000)
        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(67);
            setStartTimeHeartAndFlowers(new Date().getTime())
        }, 64000)
        setTimeout(() => {
            setOption(0, 'flower');
            setCycle(68);
                    setStartTimeHeartAndFlowers(new Date().getTime())
        }, 66000)

    }

    const setChoice = (evt) => {
        const choice = JSON.parse(evt.target.dataset.id);

        if (cycle <= 5) {
            //test de ejemplo corazones
            const isCorrect = exampleTest(choice, 'heart');
            if (isCorrect) {
                setChoices(prevValue => {
                    let newValue = prevValue;
                    newValue[cycle] = {
                        choice,
                        time: null
                    };

                    setFirstBoxClass("hnf-box");
                    setSecondBoxClass("hnf-box");
                    return newValue;
                })
                setCycle(prevValue => prevValue + 1);
            }

            
        } else if (cycle <= 17) {
            //test corazones
            setChoices(prevValue => {
                const itemTime = (new Date().getTime() - startTimeHearts)/1000;
                let newValue = prevValue;
                newValue[cycle] = {
                    choice,
                    time: itemTime
                };

                setFirstBoxClass("hnf-box");
                setSecondBoxClass("hnf-box");
     
                return newValue;
            })

        } else if (cycle >= 18 && cycle <= 23) {
            //test de ejemplo flores

            const isCorrect = exampleTest(choice, 'flower');
            if (isCorrect) {
                setChoices(prevValue => {
    
                    let newValue = prevValue;
                    newValue[cycle] = {
                        choice,
                        time: null
                    };
                    setFirstBoxClass("hnf-box");
                    setSecondBoxClass("hnf-box");
                    return newValue;
                })
                setCycle(prevValue => prevValue + 1);
            }

        } else if (cycle <= 35) {

            setChoices(prevValue => {
                const itemTime = (new Date().getTime() - startTimeFlowers)/1000;
                let newValue = prevValue;
                newValue[cycle] = {
                    choice,
                    time: itemTime
                };


                setFirstBoxClass("hnf-box");
                setSecondBoxClass("hnf-box");
                return newValue;
            })
            //test flores
        } else {
            setChoices(prevValue => {
                const itemTime = (new Date().getTime() - startTimeHeartAndFlowers)/1000;
                let newValue = prevValue;
                newValue[cycle] = {
                    choice,
                    time: itemTime
                };


                setFirstBoxClass("hnf-box");
                setSecondBoxClass("hnf-box");
                return newValue;
            })
        }

    }

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
        window.history.go(1);
        }
    }, [])

    useEffect(() => {

        if (cycle === 0) {
            Swal.fire({
                icon: 'warning',
                customClass: {
                    popup: 'container-hnf'
                },
                html: `<p>Bienvenido a la prueba de CORAZONES, es bastante simple. Cada vez que aparece un corazón, debes presionar el botón que está en el mismo lado que el corazón. (Entonces si aparece acá, presionas este. Y si aparece acá, presionas este botón). El que viene a continuación es un ensayo. ¿Lo has entendido? ... (espere la respuesta del niño) ... Comencemos.</p>
                <div style="display: flex;">
                <img style="width:48%"src="/images/corazon-1.png">
                <img style="width:48%"src="/images/corazon-2.png">
                </div>
     `,
                showCancelButton: true,
                allowOutsideClick: false,
                width:"50em",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar',
                showCancelButton: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    startFirstTest();
                }
            })
        }

    }, [cycle])


    useEffect(() => {

        

            if (cycle === 6) {

            setFirstBoxClass("hnf-box");
            setSecondBoxClass("hnf-box");
                Swal.fire({
                    customClass: {
                        popup: 'container-hnf'
                    },
                    icon: 'warning',
                    html: `<p>Ahora iniciarás la prueba de CORAZONES pero contra el tiempo. Recuerda que debes presionar el boton que está en el MISMO LADO ¡Mucha Suerte! ... Comencemos</p>
         `,
         
                    showCancelButton: true,
                    allowOutsideClick: false,
                    width:"50em",
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Confirmar',
                    showCancelButton: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        heartTest();
                    }
                })
            }
        

    }, [cycle])


    useEffect(() => {

        

        if (cycle === 17) {

        setTimeout(() => {
            setChoices(prevValue => {
                return prevValue;
            })
        setFirstBoxClass("hnf-box");
        setSecondBoxClass("hnf-box");
            Swal.fire({
                icon: 'warning',
                customClass: {
                    popup: 'container-hnf'
                },
                html: `<p>Bienvenido a la prueba de FLORES, es bastante simple. Cada vez que aparece una flor, debes presionar el botón que está al LADO CONTRARIO de la flor (Entonces si aparece acá, presionas este. Y si aparece acá, presionas este botón). El que viene a continuación es un ensayo. ¿Lo has entendido? ... (espere la respuesta del niño) ... Comencemos.</p>
                <div style="display: flex;">
                <img style="width:48%"src="/images/flowers-1.png">
                <img style="width:48%"src="/images/flowers-2.png">
                </div>
     `,
                showCancelButton: true,
                allowOutsideClick: false,
                width:"50em",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar',
                showCancelButton: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    setFirstBoxClass("hnf-box");
                    setSecondBoxClass("hnf-box");
                    setCycle(18)
                    setOption(0, 'flower')
                }
            })
        }, 3000)
            
        }
    

}, [cycle, choices])


useEffect(() => {

        

    if (cycle === 23) {
        setTimeout(() => {
            setChoices(prevValue => {
                return prevValue;
            })
        setFirstBoxClass("hnf-box");
        setSecondBoxClass("hnf-box");
            Swal.fire({
                icon: 'warning',
                customClass: {
                    popup: 'container-hnf'
                },
                html: `<p>Ahora iniciarás la prueba de FLORES pero contra el tiempo. Recuerda, cada vez que aparece una flor debes presionar el botón que está en el LADO CONTRARIO. ¡Mucha suerte! ... Comencemos.</p>
     `,
                showCancelButton: true,
                allowOutsideClick: false,
                width:"50em",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar',
                showCancelButton: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    flowerTest();
                }
            })
        }, 2000)
        
    }


}, [cycle, choices])


useEffect(() => {

        

    if (cycle === 35) {
        setTimeout(() => {
            setChoices(prevValue => {
                return prevValue;
            })
        setFirstBoxClass("hnf-box");
        setSecondBoxClass("hnf-box");
            Swal.fire({
                icon: 'warning',
                customClass: {
                    popup: 'container-hnf'
                },
                html: `<p>En esta prueba aparecerán CORAZONES y FLORES. Recuerda: CORAZONES al MISMO LADO y FLORES al LADO CONTRARIO. Tendrás que hacerlo contra el tiempo. ¡Mucha suerte! ... Comencemos</p>
     `,
                showCancelButton: true,
                allowOutsideClick: false,
                width:"50em",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar',
                showCancelButton: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    heartAndFlowerTest();
                }
            })
        }, 2000)
        
    }


}, [cycle, choices])




    
useEffect(() => {

        

    if (cycle === 68) {

    setTimeout(() => {
        setChoices(prevValue => {
            return prevValue;
        })
    setFirstBoxClass("hnf-box");
    setSecondBoxClass("hnf-box");
        Swal.fire({
            icon: 'success',
            html: `El test ha finalizado`,
            showCancelButton: false,
            allowOutsideClick: false,
            width:"50em",
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Guardar Test',
            preConfirm: async () => {
                return saveTest(choices)
                  .then(response => {
                    if (response !== true) {
                        Swal.fire("Ha ocurrido un error en el guardado de datos")
                    }
                    return response
                  })
                  .catch(error => {
                    Swal.fire("Ha ocurrido un error en el guardado de datos")

                  })
              },
            })
       .then( async (result) => {
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
    }, 3000)
        
    }


}, [cycle, choices])



    return (
        <div style={{overflow:"hidden", height:"100%", paddingTop:"1.5rem"}}>
        <Fragment>
            <div className="hnf-container">

            
                <div className="hnf-option-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg" style={{zIndex: "1", width:"150px", position:"absolute", top:0, left:0, bottom:0,right:0, margin:"auto"}} alt="" />

                    <div className={firstBoxClass} data-id="0"></div>
                    <div className="plusOverlay"></div>
                    <div className="hnf-box hidden-container"></div>
                    <div className="plusOverlay"></div>
                    <div className={secondBoxClass} data-id="1"></div>
      
                </div>


      
                <div className="hnf-button-container">
                    <button id="hnf-button-0" style={{zIndex: 3}}onClick={(e) => setChoice(e)} data-id="0" className="hnf-button"></button>

                    <button id="hnf-button-1" style={{zIndex: 4}}onClick={(e) => setChoice(e)} data-id="1" className="hnf-button"></button>
                </div>
                <div className='overlay'>
              </div>
  

                

 
            </div>
        </Fragment>
        <p style={{margin:"2rem auto 0 auto", width:"100%", textAlign:"start", padding:"0 1rem", color:"#aaa"}}>Estudiante: {studentName && studentName} </p>

        </div>
    )
}