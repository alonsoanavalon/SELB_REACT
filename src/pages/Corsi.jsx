import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import {isEqual} from 'underscore';
import {get, update, getMany, set} from 'idb-keyval'

export default function Corsi () {

    const [firstExampleAnswer, setFirstExampleAnswer] = useState([]);
    const [secondExampleAnswer, setSecondExampleAnswer] = useState([]);
    const [errorCounter, setErrorCounter] = useState(0);
    const [errorCounterReverse, setErrorCounterReverse] = useState(0);
    const [globalError, setGlobalError] = useState(0);
    const [globalErrorReverse, setGlobalErrorReverse] = useState(0);
    const [firstTestFirstAnswer, setFirstTestFirstAnswer] = useState([]);
    const [firstTestSecondAnswer, setFirstTestSecondAnswer] = useState([]);
    const [secondTestFirstAnswer, setSecondTestFirstAnswer] = useState([]);
    const [secondTestSecondAnswer, setSecondTestSecondAnswer] = useState([]);
    const [thirdTestFirstAnswer, setThirdTestFirstAnswer] = useState([]);
    const [thirdTestSecondAnswer, setThirdTestSecondAnswer] = useState([]);
    const [fourthTestFirstAnswer, setFourthTestFirstAnswer] = useState([]);
    const [fourthTestSecondAnswer, setFourthTestSecondAnswer] = useState([]);
    const [fifthTestFirstAnswer, setFifthTestFirstAnswer] = useState([]);


    const [reverseFirstExampleAnswer, setReverseFirstExampleAnswer] = useState([]);
    const [reverseSecondExampleAnswer, setReverseSecondExampleAnswer] = useState([]);
    const [reverseFirstTestFirstAnswer, setReverseFirstTestFirstAnswer] = useState([]);
    const [reverseFirstTestSecondAnswer, setReverseFirstTestSecondAnswer] = useState([]);
    const [reverseSecondTestFirstAnswer, setReverseSecondTestFirstAnswer] = useState([]);
    const [reverseSecondTestSecondAnswer, setReverseSecondTestSecondAnswer] = useState([]);
    const [reverseThirdTestFirstAnswer, setReverseThirdTestFirstAnswer] = useState([]);
    const [reverseThirdTestSecondAnswer, setReverseThirdTestSecondAnswer] = useState([]);
    const [reverseFourthTestFirstAnswer, setReverseFourthTestFirstAnswer] = useState([]);
    const [reverseFourthTestSecondAnswer, setReverseFourthTestSecondAnswer] = useState([]);
    const [reverseFifthTestFirstAnswer, setReverseFifthTestFirstAnswer] = useState([]);
    const [orderedTries, setOrderedTries] = useState(1);
    const [reversedTries, setReversedTries] = useState(0);

    const [allAnswers, setAllAnswers] = useState({});
    const [isArray, setIsArray] = useState(false)

    const [studentName, setStudentName] = useState("")
    useEffect(() => {

        get('selectedStudentName')
        .then(studentName => setStudentName(studentName))

    }, [])


    const blink = (num) => {
        const boxes = document.querySelectorAll(".corsi-box");
        setTimeout(() => {
            boxes[num].classList.add("switch-on")
        }, 1000)
        setTimeout(() => {
            boxes[num].classList.remove("switch-on")
        }, 2000)
    }


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

    async function saveCorsi(answers) {

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

        instrumentInfo['instrument'] = 6

        choicesArray.push(answers) // estas deben ser las respuestas

        //Luego viene toda la logica de si se repite o si se guarda en el backup etc.
        ;
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
        }  catch (err) {
            console.error(err);
            Swal.fire({icon:"error", title:"Ha ocurrido un error en el guardado"})
            return false
        }
    }


    const saveTest = async () => {
        //guardartest

        const respuestas = [orderedTries, firstExampleAnswer, secondExampleAnswer, firstTestFirstAnswer, firstTestSecondAnswer, secondTestFirstAnswer, secondTestSecondAnswer, thirdTestFirstAnswer, thirdTestSecondAnswer, fourthTestFirstAnswer, fourthTestSecondAnswer, fifthTestFirstAnswer];
        const respuestasReversas = [reversedTries, reverseFirstExampleAnswer, reverseSecondExampleAnswer, reverseFirstTestFirstAnswer, reverseFirstTestSecondAnswer, reverseSecondTestFirstAnswer, reverseSecondTestSecondAnswer, reverseThirdTestFirstAnswer, reverseThirdTestSecondAnswer, reverseFourthTestFirstAnswer, reverseFourthTestSecondAnswer, reverseFifthTestFirstAnswer];
        const everyAnswer = [...respuestas, ...respuestasReversas];
        let firstItemId = 230;
        const answersObject = {};
        
        everyAnswer.forEach((respuesta) => {
            if (typeof(respuesta) === 'number') {
                if (respuesta.toString().length === 1){
                    answersObject[firstItemId] = respuesta.toString();
                }
            }
            else if (respuesta.length > 1) {
                answersObject[firstItemId] = respuesta.join('-');
            } 
            else {
                answersObject[firstItemId] = "";
            }
            firstItemId++
            //aca tengo que iterar las respuestas e ir asignandoles llave valor y metiendolo en los objetos
            //una vez dentro tendré que mixear ambos en todas las answers, y eso meterlo luego en la funcion de guardarCorsi()
            //donde primero ira la metadata y luego los datos de los test.
        })

        saveCorsi(answersObject)

        




        Swal.fire({
            icon: 'success',
            html: `El test ha finalizado`,
            showCancelButton: false,
            allowOutsideClick: false,
            width:"50em",
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Guardar Test',
            preConfirm: async () => {
                return saveCorsi(answersObject)
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


    }

    useEffect(() => {
        if (allAnswers.length > 0) {
            console.log(allAnswers)
        }
    }, [allAnswers, ])

    function touchableBoxes (e, callback) {
        let selectedBox = e.target.classList[1].slice(-1);
        if (selectedBox === '0') {
            selectedBox = '10';
        }

        switch (selectedBox) {
            case '1':
            selectedBox = '1';
            break;
            case '6': 
            selectedBox = '2';
            break;
            case '2': 
            selectedBox = '3';
            break;
            case '7': 
            selectedBox = '4';
            break;
            case '3': 
            selectedBox = '5';
            break;
            case '8': 
            selectedBox = '6';
            break;
            case '4': 
            selectedBox = '7';
            break;
            case '9': 
            selectedBox = '8';
            break;
            case '5': 
            selectedBox = '9';
            break;
            case '10': 
            selectedBox = '10';
            break;

            default:
            selectedBox = '';
        }

        callback(prevValue => [...prevValue, selectedBox]) //tengo ue cambiar esto no me sirve para la segunda vuelta
        setTimeout(() => {
            e.target.classList.add("switch-on")
        }, 0)
        setTimeout(() => {
            e.target.classList.remove("switch-on")
        }, 1000)
    }



    const primeraSecuencia = async (box1, box2, callback) => {
        resetBoxes()
        const boxes = document.querySelectorAll(".corsi-box");

        blink(box1)
        setTimeout(() => {
            blink(box2)
        }, 2000)

        setTimeout(() => {
            //Ahora va el sonido "Ahora"
            boxes.forEach((box) => {
                
                box.addEventListener(("click"), (e) => touchableBoxes(e, callback))
                box.addEventListener(("touch"), (e) => touchableBoxes(e, callback))
            })

            var audio = new Audio('./sounds/go.mp3');
            audio.play();



        }, 4000)
        
    }

    const secuenciaDeTres = async (box1, box2, box3, callback) => {

        const boxes = document.querySelectorAll(".corsi-box");

        blink(box1)
        setTimeout(() => {
            blink(box2)
        }, 2000)
        setTimeout(() => {
            blink(box3)
        }, 4000)

        setTimeout(() => {
            //Ahora va el sonido "Ahora"
            boxes.forEach((box) => {
                box.addEventListener(("click"), (e) => touchableBoxes(e, callback))
                box.addEventListener(("touch"), (e) => touchableBoxes(e, callback))
            })

            var audio = new Audio('./sounds/go.mp3');
            audio.play();
        }, 6000)
    }


    const secuenciaDeCuatro = async (box1, box2, box3, box4, callback) => {
      
        const boxes = document.querySelectorAll(".corsi-box");

        blink(box1)
        setTimeout(() => {
            blink(box2)
        }, 2000)
        setTimeout(() => {
            blink(box3)
        }, 4000)
        setTimeout(() => {
            blink(box4)
        }, 6000)


        setTimeout(() => {
            //Ahora va el sonido "Ahora"
            boxes.forEach((box) => {
                
                box.addEventListener(("click"), (e) => touchableBoxes(e, callback))
                box.addEventListener(("touch"), (e) => touchableBoxes(e, callback))
            })
            var audio = new Audio('./sounds/go.mp3');
            audio.play();
        }, 8000)
    }

    
    const secuenciaDeCinco = async (box1, box2, box3, box4, box5, callback) => {
      
        const boxes = document.querySelectorAll(".corsi-box");

        blink(box1)
        setTimeout(() => {
            blink(box2)
        }, 2000)
        setTimeout(() => {
            blink(box3)
        }, 4000)
        setTimeout(() => {
            blink(box4)
        }, 6000)
        setTimeout(() => {
            blink(box5)
        }, 8000)


        setTimeout(() => {
            //Ahora va el sonido "Ahora"
            boxes.forEach((box) => {
                
                box.addEventListener(("click"), (e) => touchableBoxes(e, callback))
                box.addEventListener(("touch"), (e) => touchableBoxes(e, callback))
            })
            var audio = new Audio('./sounds/go.mp3');
            audio.play();
        }, 10000)
    }


    
    const secuenciaDeSeis = async (box1, box2, box3, box4, box5, box6, callback) => {
      
        const boxes = document.querySelectorAll(".corsi-box");

        blink(box1)
        setTimeout(() => {
            blink(box2)
        }, 2000)
        setTimeout(() => {
            blink(box3)
        }, 4000)
        setTimeout(() => {
            blink(box4)
        }, 6000)
        setTimeout(() => {
            blink(box5)
        }, 8000)
        setTimeout(() => {
            blink(box6)
        }, 10000)


        setTimeout(() => {
            //Ahora va el sonido "Ahora"
            boxes.forEach((box) => {
                
                box.addEventListener(("click"), (e) => touchableBoxes(e, callback))
                box.addEventListener(("touch"), (e) => touchableBoxes(e, callback))
            })
            var audio = new Audio('./sounds/go.mp3');
            audio.play();
        }, 12000)
    }

    const secuenciaDeSiete = async (box1, box2, box3, box4, box5, box6, box7, callback) => {
      
        const boxes = document.querySelectorAll(".corsi-box");

        blink(box1)
        setTimeout(() => {
            blink(box2)
        }, 2000)
        setTimeout(() => {
            blink(box3)
        }, 4000)
        setTimeout(() => {
            blink(box4)
        }, 6000)
        setTimeout(() => {
            blink(box5)
        }, 8000)
        setTimeout(() => {
            blink(box6)
        }, 10000)
        setTimeout(() => {
            blink(box7)
        }, 12000)


        setTimeout(() => {
            //Ahora va el sonido "Ahora"
            boxes.forEach((box) => {
                
                box.addEventListener(("click"), (e) => touchableBoxes(e, callback))
                box.addEventListener(("touch"), (e) => touchableBoxes(e, callback))
            })
            var audio = new Audio('./sounds/go.mp3');
            audio.play();
        }, 14000)
    }

    const corsiExample = () => {

            setTimeout(() => {

                resetBoxes();
                primeraSecuencia(7,4, setFirstExampleAnswer);
            }, 1000)

    }
    
    //Luego una pantalla

    const corsiTestReverse = () => {
        setTimeout(() => {
            resetBoxes();
            secuenciaDeTres(2,6,1, setReverseFirstTestFirstAnswer)
        }, 1000)
    }

    const corsiTest = () => {
        setTimeout(() => {
            resetBoxes();
            secuenciaDeTres(5,3,7, setFirstTestFirstAnswer)
        }, 1000)
    }

    const corsiExampleReverse = () => {
        setTimeout(() => {
            resetBoxes();
            primeraSecuencia(1,8, setReverseFirstExampleAnswer)
        }, 1000)
    }


                                    // Primer test

    //segunda secuencia cuando primera secuencia termina
    useEffect(() => {
        console.log(firstTestFirstAnswer)
        if (firstTestFirstAnswer.length === 3) {
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeTres(2,6,1, setFirstTestSecondAnswer)
                }, 1000)
        }

    }, [firstTestFirstAnswer])
    


    //verificacion de secuencias y paso a siguiente o salida
    useEffect(() => {
        console.log(firstTestSecondAnswer)
        const firstCorrectAnswers = ['2','7','6'];
        const secondCorrectAnswers = ['5','4','3'];
        if (firstTestSecondAnswer.length === 3) {
            if (!isEqual(secondCorrectAnswers, firstTestSecondAnswer) && !isEqual(firstCorrectAnswers, firstTestFirstAnswer)) {
                document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    saveTest()
                }, 1000)
                
            } else {
                //aca va el siguiente test
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeCuatro(8,5,3,0, setSecondTestFirstAnswer)
                }, 1000)
            }
        }
    }, [firstTestSecondAnswer])

                                    // segundo test
    //segunda secuencia cuando primera secuencia termina
    useEffect(() => {
        console.log(secondTestFirstAnswer)
        if (secondTestFirstAnswer.length === 4) {
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeCuatro(4,0,6,1, setSecondTestSecondAnswer)
                }, 1000)
        }
    }, [secondTestFirstAnswer])


    //verificacion de secuencias y paso a siguiente o salida
    useEffect(() => {
        console.log(secondTestSecondAnswer)
        const secondCorrectAnswers = ['9','1','4','3'];
        const firstCorrectAnswers = ['8','2','7','1'];
        if (secondTestSecondAnswer.length === 4) {
            if (!isEqual(secondCorrectAnswers, secondTestSecondAnswer) && !isEqual(firstCorrectAnswers, secondTestFirstAnswer)) {
                document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    saveTest()
                }, 1000)
            } else {
                //aca va el siguiente test
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeCinco(0,9,5,8,2, setThirdTestFirstAnswer)
                }, 1000)
            }
        }
    }, [secondTestSecondAnswer])

                                // cuarto test


                                    //segunda secuencia cuando primera secuencia termina
    useEffect(() => {
        console.log(thirdTestFirstAnswer)
        if (thirdTestFirstAnswer.length === 5) {
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeCinco(9,1,3,2,6, setThirdTestSecondAnswer)
                }, 1000)
        }
    }, [thirdTestFirstAnswer])


    //verificacion de secuencias y paso a siguiente o salida
    useEffect(() => {
        console.log(thirdTestSecondAnswer);
        const firstCorrectAnswers = ['1','10','2','8','5'];
        const secondCorrectAnswers = ['10','3','7','5','4'];
        if (thirdTestSecondAnswer.length === 5) {

            if (!isEqual(secondCorrectAnswers, thirdTestSecondAnswer) && !isEqual(firstCorrectAnswers, thirdTestFirstAnswer)) {
                document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    saveTest()
                }, 1000)
            } else {
                //aca va el siguiente test
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeSeis(8,5,3,7,2,4, setFourthTestFirstAnswer)
                }, 1000)
            }
        }
    }, [thirdTestSecondAnswer])

                                
                                // quinto test

    useEffect(() => {
        console.log(fourthTestFirstAnswer)
        if (fourthTestFirstAnswer.length === 6) {
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
            setTimeout(() => {
                resetBoxes();
                secuenciaDeSeis(3,6,0,1,7,9, setFourthTestSecondAnswer)
            }, 1000)

        }
    }, [fourthTestFirstAnswer])


    //verificacion de secuencias y paso a siguiente o salida
    useEffect(() => {
        console.log(fourthTestSecondAnswer)
        const firstCorrectAnswers = ['8','2','7','6','5','9'];
        const secondCorrectAnswers = ['7','4','1','3','6','10'];
        if (fourthTestSecondAnswer.length === 6) {

            if (!isEqual(secondCorrectAnswers, fourthTestSecondAnswer) && !isEqual(firstCorrectAnswers, fourthTestFirstAnswer)) {
                document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    saveTest()
                }, 1000)
            } else {
                //aca va el siguiente test
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeSiete(4,5,0,8,2,9,1, setFifthTestFirstAnswer)
                }, 1000)
            }
        }
    }, [fourthTestSecondAnswer])


                                //sexto test comprobacion

    useEffect(() => {
        console.log(fifthTestFirstAnswer)
        if (fifthTestFirstAnswer.length === 7) {

            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
            setTimeout(() => {
                resetBoxes();
                //Aca tengo que tirar un swal con alguna instruccion y luego tirar el ejemplo me imagino
                Swal.fire({
                    html:'A continuación van a aparecer 10 cuadrados en la pantalla. De todos ellos, algunos se van a encender en un determinado orden. Una vez que escuches la palabra "ahora", tú tendras que tocar los cuadrados en el orden contrario en el que se encendieron ¿Lo has entendido? (espere la respuesta del niño). Comencemos',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false,
                    confirmButtonText: 'Confirmar',
                    customClass: {
                        container: 'rotate-container'
                    }
                  }).then((result) => {
                    if (result.isConfirmed) {
                        setErrorCounter(0)
                        /* Esto fue lo ultimo que hicimos, para poder ir contando los errores en los otros test */
                        setTimeout(() => {
                            resetBoxes();
                            setReversedTries(prevValue => prevValue+1)
                            corsiExampleReverse()
                        }, 1000)
                    }
                  })
    
            }, 1000)
        } 
    }, [fifthTestFirstAnswer])

                                // example

    useEffect(() => {
        console.log(reverseFirstExampleAnswer)
        if (reverseFirstExampleAnswer.length === 2) {
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
            setTimeout(() => {
                resetBoxes();
                primeraSecuencia(7,4, setReverseSecondExampleAnswer)
            }, 1000)
        }

        

    }, [reverseFirstExampleAnswer])

                                // 2ndo de ejemplo
    useEffect(() => {
        const firstCorrectAnswer = ['8', '3'];
        const secondCorrectAnswer = ['9', '6']

        if (reverseSecondExampleAnswer.length === 2 && errorCounterReverse < 2) {
            if (isEqual(reverseSecondExampleAnswer, secondCorrectAnswer) && isEqual(reverseFirstExampleAnswer, firstCorrectAnswer)) {
                document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    Swal.fire({
                        title: 'Recuerda, ese fue el ensayo, ¿Lo has entendido?... (espere la respuesta del niño) ... Comencemos.',
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Confirmar',
                        allowOutsideClick: false,
                        customClass: {
                            container: 'rotate-container'
                        }
                      }).then((result) => {
                        if (result.isConfirmed) {
                            setErrorCounterReverse(0)
                            setGlobalError(0)
                            /* Esto fue lo ultimo que hicimos, para poder ir contando los errores en los otros test */
                            corsiTestReverse();
                        }
                      })
           
                }, 1000)
                    
            } else {
                document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    setReverseFirstExampleAnswer([])
                    setReverseSecondExampleAnswer([])
                    setErrorCounterReverse(prevValue => prevValue + 1)
                    //hizo 2 pero estan malas, sumar a contador de malas en caso de que esto no sea infinito
                }, 1000)

            }
        } else if (reverseSecondExampleAnswer.length === 2 && errorCounterReverse === 2) {
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
            setTimeout(() => {
                resetBoxes();
                setErrorCounterReverse(prevValue => prevValue + 1)
            }, 1000)

        }
        

    }, [reverseSecondExampleAnswer])

    //Secuencia de 3 reverse

    useEffect(() => {
        console.log(reverseFirstTestFirstAnswer)
        if (reverseFirstTestFirstAnswer.length === 3) {
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
            setTimeout(() => {
                resetBoxes();
                secuenciaDeTres(5,3,7, setReverseFirstTestSecondAnswer)
            }, 1000)

        }
    }, [reverseFirstTestFirstAnswer])

    useEffect(() => {
        console.log(reverseFirstTestSecondAnswer)
        const firstCorrectAnswers = ['3','4','5'];
        const secondCorrectAnswers = ['6','7','2'];

        if (reverseFirstTestSecondAnswer.length === 3) {
            if (!isEqual(secondCorrectAnswers, reverseFirstTestSecondAnswer) && !isEqual(firstCorrectAnswers, reverseFirstTestFirstAnswer)) {
                document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    saveTest()
                }, 1000)
            } else {
                //aca va el siguiente test
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeCuatro(4,0,6,1, setReverseSecondTestFirstAnswer);
                }, 1000)
            }
        }


    }, [reverseFirstTestSecondAnswer])

    //secuencia de 4 reverse


    useEffect(() => {
        console.log(reverseSecondTestFirstAnswer)
        if (reverseSecondTestFirstAnswer.length === 4) {
                document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeCuatro(8,5,3,0, setReverseSecondTestSecondAnswer);
                }, 1000)

            }
    }, [reverseSecondTestFirstAnswer])

    useEffect(() => {

        console.log(reverseSecondTestSecondAnswer)
        const firstCorrectAnswers = ['3','4','1','9'];
        const secondCorrectAnswers = ['1','7','2','8'];

        if (reverseSecondTestSecondAnswer.length === 4) {
            if (!isEqual(secondCorrectAnswers, reverseSecondTestSecondAnswer) && !isEqual(firstCorrectAnswers, reverseSecondTestFirstAnswer)) {
                document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    saveTest()
                }, 1000)
            } else {
                //aca va el siguiente test
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeCinco(9,1,3,2,6, setReverseThirdTestFirstAnswer);
                }, 1000)
            }
        }
    }, [reverseSecondTestSecondAnswer])

    useEffect(() => {
        console.log(reverseThirdTestFirstAnswer)
        if (reverseThirdTestFirstAnswer.length === 5) {
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
            setTimeout(() => {
                resetBoxes();
                secuenciaDeCinco(0,9,5,8,2, setReverseThirdTestSecondAnswer);
            }, 1000)
        }
    }, [reverseThirdTestFirstAnswer])


    useEffect(() => {
        console.log(reverseThirdTestSecondAnswer)
        const firstCorrectAnswers = ['4','5','7','3','10'];
        const secondCorrectAnswers = ['5','8','2','10','1'];
        
        if (reverseThirdTestSecondAnswer.length === 5) {
            if (!isEqual(secondCorrectAnswers, reverseThirdTestSecondAnswer) && !isEqual(firstCorrectAnswers, reverseThirdTestFirstAnswer)) {
                document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    saveTest()
                }, 1000)
            } else {
                //aca va el siguiente test
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeSeis(3,6,0,1,7,9, setReverseFourthTestFirstAnswer);
                }, 1000)
            }
        }
    }, [reverseThirdTestSecondAnswer])



    useEffect(() => {
        console.log(reverseFourthTestFirstAnswer)
        if (reverseFourthTestFirstAnswer.length === 6) {
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
            setTimeout(() => {
                resetBoxes();
                secuenciaDeSeis(8,5,3,7,2,4, setReverseFourthTestSecondAnswer);
            }, 1000)

        }
    }, [reverseFourthTestFirstAnswer])

    useEffect(() => {
        console.log(reverseFourthTestSecondAnswer)
        const firstCorrectAnswers = ['10','6','3','1','4','7'];
        const secondCorrectAnswers = ['9','5','6','7','2','8'];
        
        if (reverseFourthTestSecondAnswer.length === 6) {
            if (!isEqual(secondCorrectAnswers, reverseFourthTestSecondAnswer) && !isEqual(firstCorrectAnswers, reverseFourthTestFirstAnswer)) {
                document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    saveTest()
                }, 1000)
            } else {
                //aca va el siguiente test
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeSiete(6,0,7,2,6,4,5, setReverseFifthTestFirstAnswer);
                }, 1000)
            }
        }
    }, [reverseFourthTestSecondAnswer])

    useEffect(() => {

        console.log(reverseFifthTestFirstAnswer)
        if (reverseFifthTestFirstAnswer.length === 7) {
            saveTest();
        }
    }, [reverseFifthTestFirstAnswer])



    

    const startGame = (e) => {
        Swal.fire({
            title: '¿Deseas comenzar el juego?',
            html: `A continuación van a aparecer 10 cuadrados en la pantalla. De todos ellos, algunos se van a encender en un determinado orden. Una vez que escuches la palabra "Ahora", tú tendrás que tocar los cuadrados en el mismo orden en que se encendieron. Los dos primeros son de práctica y a medida que avance el juego se encenderán mas cuadrados. ¿Lo has entendido? (espere la respuesta del niño). Comencemos`,
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            confirmButtonText: 'Confirmar',
            customClass: {
                container: 'rotate-container'
            }
          }).then((result) => {
            if (result.isConfirmed) {
                // e.target.innerHTML = "Avanzar"
                // e.target.disabled = true;
                //corsiExampleReverse()
                corsiExample();

                
            }
          })



        
    }
    
    function resetBoxes () {
        const old_element = document.querySelector(".game-box");
        const new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        // si hay separador lo removemos.
        if (document.querySelector("#root > div.corsi-container").firstChild.classList.contains("separator")) {
            document.querySelector("#root > div.corsi-container").removeChild(document.querySelector("#root > div.corsi-container").firstChild)
        }


    }

                    //TEST

    useEffect(() => {
        console.log(firstExampleAnswer)
        if (firstExampleAnswer.length === 2) {

            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    primeraSecuencia(1, 8, setSecondExampleAnswer)
                }, 1000)
        } 
    }, [firstExampleAnswer])
    

    useEffect(() => {
        console.log(secondExampleAnswer)
        const firstCorrectAnswer = ['6','9'];
        const secondCorrectAnswer = ['3','8'];
        if (secondExampleAnswer.length === 2 && errorCounter < 2) {

            if (isEqual(secondExampleAnswer, secondCorrectAnswer) && isEqual(firstExampleAnswer, firstCorrectAnswer)) {
            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
                setTimeout(() => {
                    resetBoxes();
                    Swal.fire({
                        title: 'Recuerda, ese fue el ensayo, ¿Lo has entendido?... (espere la respuesta del niño) ... Comencemos.',
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Confirmar',
                        allowOutsideClick: false,
                        customClass: {
                            container: 'rotate-container'
                        }
                      }).then((result) => {
                        if (result.isConfirmed) {
                            setErrorCounter(0)
                            setGlobalError(0)
                            /* Esto fue lo ultimo que hicimos, para poder ir contando los errores en los otros test */
                            corsiTest()
                        }
                      })
                }, 1000)
            } else {


            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
            setTimeout(() => {
                resetBoxes();
                setSecondExampleAnswer([])
                setFirstExampleAnswer([])
                setErrorCounter(prevValue => prevValue + 1)
                //hizo 2 pero estan malas, sumar a contador de malas en caso de que esto no sea infinito
            }, 1000)

            }
        } else if (secondExampleAnswer.length === 2 && errorCounter === 2) {

            document.querySelector("#root > div.corsi-container").insertAdjacentHTML("afterBegin", "<div class='separator'></div>")            
            setTimeout(() => {
                resetBoxes();
                setErrorCounter(prevValue => prevValue + 1)
            }, 1000)

        }
    }, [secondExampleAnswer])


    useEffect(() => {
        console.log(errorCounter)
        if (errorCounter > 0) {
            setGlobalError(prevValue => prevValue + 1)
            console.log("global", globalError )
            if (globalError < 2) {
                setOrderedTries(prevValue => prevValue+1)
                setTimeout(() => {
                    resetBoxes();
                    Swal.fire({
                        title: 'Vamos a intentarlo una vez más... Comencemos',
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        allowOutsideClick: false,
                        confirmButtonText: 'Confirmar',
                        customClass: {
                            container: 'rotate-container'
                        }
                      }).then((result) => {
                        if (result.isConfirmed) {
                     
                            corsiExample();
     
                        }
                      })
                }, 2000)


            } else {
                Swal.fire({
                    title: 'Recuerda, ese fue el ensayo, ¿Lo has entendido?... (espere la respuesta del niño) ... Comencemos.',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false,
                    confirmButtonText: 'Confirmar',
                    customClass: {
                        container: 'rotate-container'
                    }
                  }).then((result) => {
                    if (result.isConfirmed) {
                        setErrorCounter(0)
                        setGlobalError(0)
                        corsiTest()
                    }
                  })
            }
        }
    }, [errorCounter])

    useEffect(() => {
        startGame();
    }, [])


    useEffect(() => {
        if (errorCounterReverse > 0) {
            setGlobalErrorReverse(prevValue => prevValue + 1)
            if (globalErrorReverse < 2) {
                setReversedTries(prevValue => prevValue+1)
                setTimeout(() => {
                    resetBoxes();
                    Swal.fire({
                        title: 'Vamos a intentarlo una vez más... Comencemos',
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        allowOutsideClick: false,
                        confirmButtonText: 'Confirmar',
                        customClass: {
                            container: 'rotate-container'
                        }
                      }).then((result) => {
                        if (result.isConfirmed) {
                     
                            corsiExampleReverse();
     
                        }
                      })
                }, 2000)


            } else {
                Swal.fire({
                    title: 'Recuerda, ese fue el ensayo, ¿Lo has entendido?... (espere la respuesta del niño) ... Comencemos.',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false,
                    confirmButtonText: 'Confirmar',
                    customClass: {
                        container: 'rotate-container'
                    }
                  }).then((result) => {
                    if (result.isConfirmed) {
                        setErrorCounterReverse(0)
                        setGlobalErrorReverse(0)
                        corsiTestReverse()
                    }
                  })
            }
        }
    
    }, [errorCounterReverse])
    
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    }, [])
    return (
        
        <Fragment>
                
                <div className="corsi-container">

                    <div className="game-box">
                        
                        <div className="corsi-box box-1"></div>
                        <div className="corsi-box box-2"></div>
                        <div className="corsi-box box-3"></div>
                        <div className="corsi-box box-4"></div>
                        <div className="corsi-box box-5"></div>
                        <div className="corsi-box box-6"></div>
                        <div className="corsi-box box-7"></div>
                        <div className="corsi-box box-8"></div>
                        <div className="corsi-box box-9"></div>
                        <div className="corsi-box box-10"></div>
                    </div>

                </div>
                <div>
                <p style={{textAlign:"start", paddingLeft:"1rem", paddingTop:"2.3rem",color:"#aaa", backgroundColor:"#333"}}>Estudiante: {studentName && studentName} </p>
                </div>
         
        </Fragment>
    )
}