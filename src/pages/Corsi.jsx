import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import {isEqual} from 'underscore';

export default function Corsi () {

    const [firstExampleAnswer, setFirstExampleAnswer] = useState([])
    const [secondExampleAnswer, setSecondExampleAnswer] = useState([])
    const [errorCounter, setErrorCounter] = useState(0)
    const [globalError, setGlobalError] = useState(0)
    const [firstTestFirstAnswer, setFirstTestFirstAnswer] = useState([])
    const [firstTestSecondAnswer, setFirstTestSecondAnswer] = useState([])
    const [secondTestFirstAnswer, setSecondTestFirstAnswer] = useState([])
    const [secondTestSecondAnswer, setSecondTestSecondAnswer] = useState([])
    const [thirdTestFirstAnswer, setThirdTestFirstAnswer] = useState([])
    const [thirdTestSecondAnswer, setThirdTestSecondAnswer] = useState([])
    const [fourthTestFirstAnswer, setFourthTestFirstAnswer] = useState([])
    const [fourthTestSecondAnswer, setFourthTestSecondAnswer] = useState([])
    const [fifthTestFirstAnswer, setFifthTestFirstAnswer] = useState([])
    const [fifthTestSecondAnswer, setFifthTestSecondAnswer] = useState([])

    const [reverseFirstExampleAnswer, setReverseFirstExampleAnswer] = useState([])
    const [reverseSecondExampleAnswer, setReverseSecondExampleAnswer] = useState([])
    const [reverseFirstTestFirstAnswer, setReverseFirstTestFirstAnswer] = useState([])
    const [reverseFirstTestSecondAnswer, setReverseFirstTestSecondAnswer] = useState([])
    const [reverseSecondTestFirstAnswer, setReverseSecondTestFirstAnswer] = useState([])
    const [reverseSecondTestSecondAnswer, setReverseSecondTestSecondAnswer] = useState([])
    const [reverseThirdTestFirstAnswer, setReverseThirdTestFirstAnswer] = useState([])
    const [reverseThirdTestSecondAnswer, setReverseThirdTestSecondAnswer] = useState([])
    const [reverseFourthTestFirstAnswer, setReverseFourthTestFirstAnswer] = useState([])
    const [reverseFourthTestSecondAnswer, setReverseFourthTestSecondAnswer] = useState([])
    const [reverseFifthTestFirstAnswer, setReverseFifthTestFirstAnswer] = useState([])
    const [reverseFifthTestSecondAnswer, setReverseFifthTestSecondAnswer] = useState([])


    const blink = (num) => {
        const boxes = document.querySelectorAll(".corsi-box");
        setTimeout(() => {
            boxes[num].classList.add("switch-on")
        }, 1000)
        setTimeout(() => {
            boxes[num].classList.remove("switch-on")
        }, 2000)
    }

    function touchableBoxes (e, callback) {
        let selectedBox = e.target.classList[1].slice(-1);
        if (selectedBox === '0') {
            selectedBox = '10';
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
        }, 5000)
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
        }, 5000)
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
        }, 5000)
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
        }, 5000)
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
        }, 5000)
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
        }, 5000)
    }

    const corsiExample = () => {

/*         do { */
            primeraSecuencia(7,4, setFirstExampleAnswer);
/*         } while(results !== ) */
 

        //Este lo ejecuto cuando me den OK a la primera instruccion
        //Logica primer test de prueba
        //Son 2 secuencias de 2
        //Si ambas estan bien pasamos a la otra, sino repetimos creo que 3 veces y si no pa la casa.
    }
    
    //Luego una pantalla

    const corsiTest = () => {
        //Logica primer de juego
            //Secuencias
        // 2 de 3 
        setTimeout(() => {
            resetBoxes();
            secuenciaDeTres(5,3,7, setFirstTestFirstAnswer)
        }, 1000)

        

        // 2 de 4
        // 2 DE 5
        // 2 DE 6
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
        if (firstTestFirstAnswer.length === 3) {
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeTres(2,6,1, setFirstTestSecondAnswer)
                }, 1000)
        }

    }, [firstTestFirstAnswer])
    


    //verificacion de secuencias y paso a siguiente o salida
    useEffect(() => {
        const firstCorrectAnswers = ['6','4','8'];
        const secondCorrectAnswers = ['3','7','2'];
        if (firstTestSecondAnswer.length === 3) {
            if (!isEqual(secondCorrectAnswers, firstTestSecondAnswer) && !isEqual(firstCorrectAnswers, firstTestFirstAnswer)) {
                window.alert("te pateamos a la vrg")
            } else {
                //aca va el siguiente test
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeCuatro(8,3,5,0, setSecondTestFirstAnswer)
                }, 1000)
            }
        }
    }, [firstTestSecondAnswer])

                                    // segundo test
    //segunda secuencia cuando primera secuencia termina
    useEffect(() => {
        if (secondTestFirstAnswer.length === 4) {
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeCuatro(4,0,6,1, setSecondTestSecondAnswer)
                }, 1000)
        }
    }, [secondTestFirstAnswer])


    //verificacion de secuencias y paso a siguiente o salida
    useEffect(() => {
        const secondCorrectAnswers = ['5','1','7','2'];
        const firstCorrectAnswers = ['9','4','6','1'];
        if (secondTestSecondAnswer.length === 4) {
            if (!isEqual(secondCorrectAnswers, secondTestSecondAnswer) && !isEqual(firstCorrectAnswers, secondTestFirstAnswer)) {
                window.alert("te pateamos a la vrg")
            } else {
                //aca va el siguiente test
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
        if (thirdTestFirstAnswer.length === 5) {
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeCinco(9,1,3,2,6, setThirdTestSecondAnswer)
                }, 1000)
        }
    }, [thirdTestFirstAnswer])


    //verificacion de secuencias y paso a siguiente o salida
    useEffect(() => {
        const firstCorrectAnswers = ['1','10','6','9','3'];
        const secondCorrectAnswers = ['10','2','4','3','7'];
        if (thirdTestSecondAnswer.length === 5) {

            if (!isEqual(secondCorrectAnswers, thirdTestSecondAnswer) && !isEqual(firstCorrectAnswers, thirdTestFirstAnswer)) {

                window.alert("te pateamos a la vrg")
            } else {
                //aca va el siguiente test
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeSeis(8,5,3,7,2,4, setFourthTestFirstAnswer)
                }, 1000)
            }
        }
    }, [thirdTestSecondAnswer])

                                
                                // quinto test

    useEffect(() => {
        if (fourthTestFirstAnswer.length === 6) {
                    setTimeout(() => {
                        resetBoxes();
                        secuenciaDeSeis(3,6,0,1,7,9, setFourthTestSecondAnswer)
                    }, 1000)
        }
    }, [fourthTestFirstAnswer])


    //verificacion de secuencias y paso a siguiente o salida
    useEffect(() => {
        const firstCorrectAnswers = ['9','6','4','8','3', '5'];
        const secondCorrectAnswers = ['4','7','1','2','8','10'];
        if (fourthTestSecondAnswer.length === 6) {

            if (!isEqual(secondCorrectAnswers, fourthTestSecondAnswer) && !isEqual(firstCorrectAnswers, fourthTestFirstAnswer)) {
                window.alert("te pateamos a la vrg")
            } else {
                //aca va el siguiente test
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeSiete(4,5,0,8,2,9,1, setFifthTestFirstAnswer)
                }, 1000)
            }
        }
    }, [fourthTestSecondAnswer])


                                //sexto test comprobacion

    useEffect(() => {
        if (fifthTestFirstAnswer.length === 7) {
                    setTimeout(() => {
                        resetBoxes();
                        corsiExampleReverse()
                    }, 1000)
        } 
    }, [fifthTestFirstAnswer])

                                // example

    useEffect(() => {

        if (reverseFirstExampleAnswer.length === 2) {
            setTimeout(() => {
                resetBoxes();
                primeraSecuencia(7,4, setReverseSecondExampleAnswer)
            }, 1000)
        }

    }, [reverseFirstExampleAnswer])

                                // 2ndo de ejemplo
    useEffect(() => {
        const firstCorrectAnswer = ['9', '2'];
        const secondCorrectAnswer = ['5', '8']

        if (reverseSecondExampleAnswer.length === 2 && errorCounter < 2) {
            if (isEqual(reverseSecondExampleAnswer, secondCorrectAnswer) && isEqual(reverseFirstExampleAnswer, firstCorrectAnswer)) {
                setTimeout(() => {
                    resetBoxes();
                    Swal.fire({
                        title: 'Recuerda, ese fue el ensayo, ¿Lo has entendido?... (espere la respuesta del niño) ... Comencemos.',
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Confirmar',
                        customClass: {
                            container: 'rotate-container'
                        }
                      }).then((result) => {
                        if (result.isConfirmed) {
                            setErrorCounter(0)
                            setGlobalError(0)
                            /* Esto fue lo ultimo que hicimos, para poder ir contando los errores en los otros test */
                            secuenciaDeTres(2,6,1, setReverseFirstTestFirstAnswer)
                        }
                      })
                }, 1000)
            } else {
                window.alert("se suma uno al contador de amalas")
                resetBoxes();
                setReverseFirstExampleAnswer([])
                setReverseSecondExampleAnswer([])
                setErrorCounter(prevValue => prevValue + 1)
                //hizo 2 pero estan malas, sumar a contador de malas en caso de que esto no sea infinito
            }
        } else if (reverseSecondExampleAnswer.length === 2 && errorCounter === 2) {
            resetBoxes();
            setErrorCounter(prevValue => prevValue + 1)
        }
        

    }, [reverseSecondExampleAnswer])

    //Secuencia de 3 reverse

    useEffect(() => {
        if (reverseFirstTestFirstAnswer.length === 2) {
            setTimeout(() => {
                resetBoxes();
                secuenciaDeTres(5,3,7, setReverseFirstTestSecondAnswer)
            }, 1000)
        }
    }, [reverseFirstTestFirstAnswer])

    useEffect(() => {
        const firstCorrectAnswers = ['3','7','2'];
        const secondCorrectAnswers = ['6','4','8'];

        if (reverseFirstTestSecondAnswer.length === 3) {
            if (!isEqual(secondCorrectAnswers, reverseFirstTestSecondAnswer) && !isEqual(firstCorrectAnswers, reverseFirstTestFirstAnswer)) {
                window.alert("te pateamos a la vrg")
            } else {
                //aca va el siguiente test
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeCuatro(4,0,6,1, setReverseSecondTestFirstAnswer);
                }, 1000)
            }
        }


    }, [reverseFirstTestSecondAnswer])

    //secuencia de 4 reverse


    useEffect(() => {
        if (reverseSecondTestFirstAnswer.length === 4) {
            setTimeout(() => {
                resetBoxes();
                secuenciaDeCuatro(8,3,5,0, setReverseSecondTestSecondAnswer);
            }, 1000)
        }
    }, [reverseSecondTestFirstAnswer])

    useEffect(() => {

        const firstCorrectAnswers = ['5','1','7','2'];
        const secondCorrectAnswers = ['9','4','6','1'];

        if (reverseSecondTestSecondAnswer.length === 5) {
            if (!isEqual(secondCorrectAnswers, reverseSecondTestSecondAnswer) && !isEqual(firstCorrectAnswers, reverseSecondTestFirstAnswer)) {
                window.alert("te pateamos a la vrg")
            } else {
                //aca va el siguiente test
                setTimeout(() => {
                    resetBoxes();
                    secuenciaDeCuatro(4,0,6,1, setReverseSecondTestFirstAnswer);
                }, 1000)
            }
        }


    }, [reverseSecondTestSecondAnswer])



    

    const startGame = (e) => {
        Swal.fire({
            title: '¿Deseas comenzar el juego?',
            html: `A continuación van a aparecer 10 cuadrados en la pantalla. De todos ellos, algunos se van a encender en un determinado orden. Una vez que escuches la palabra "Ahora", tú tendrás que tocar los cuadrados en el mismo orden en que se encendieron. Los dos primeros son de práctica y a medida que avance el juego se encenderán mas cuadrados. ¿Lo has entendido? (espere la respuesta del niño). Comencemos`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
            customClass: {
                container: 'rotate-container'
            }
          }).then((result) => {
            if (result.isConfirmed) {
                e.target.innerHTML = "Avanzar"
                e.target.disabled = true;
                /* corsiExample(); */

                corsiExampleReverse();
            }
          })



        
    }
    
    function resetBoxes () {
        const old_element = document.querySelector(".game-box");
        const new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
    }

                    //TEST

    useEffect(() => {
        console.log(firstExampleAnswer)
        if (firstExampleAnswer.length === 2) {
                setTimeout(() => {
                    resetBoxes();
                    primeraSecuencia(1, 8, setSecondExampleAnswer)
                }, 1000)
        } 
    }, [firstExampleAnswer])
    

    useEffect(() => {
        console.log(secondExampleAnswer)
        const firstCorrectAnswer = ['8','5'];
        const secondCorrectAnswer = ['2','9'];
        if (secondExampleAnswer.length === 2 && errorCounter < 2) {

            if (isEqual(secondExampleAnswer, secondCorrectAnswer) && isEqual(firstExampleAnswer, firstCorrectAnswer)) {
                setTimeout(() => {
                    resetBoxes();
                    Swal.fire({
                        title: 'Recuerda, ese fue el ensayo, ¿Lo has entendido?... (espere la respuesta del niño) ... Comencemos.',
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Confirmar',
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
                resetBoxes();
                setSecondExampleAnswer([])
                setFirstExampleAnswer([])
                setErrorCounter(prevValue => prevValue + 1)
                //hizo 2 pero estan malas, sumar a contador de malas en caso de que esto no sea infinito
            }
        } else if (secondExampleAnswer.length === 2 && errorCounter === 2) {
            resetBoxes();
            setErrorCounter(prevValue => prevValue + 1)
        }
    }, [secondExampleAnswer])


    useEffect(() => {
        console.log(errorCounter)
        if (errorCounter > 0) {
            setGlobalError(prevValue => prevValue + 1)
            console.log("global", globalError )
            if (globalError < 2) {
                Swal.fire({
                    title: 'Vamos a intentarlo una vez más... Comencemos',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Confirmar',
                    customClass: {
                        container: 'rotate-container'
                    }
                  }).then((result) => {
                    if (result.isConfirmed) {
          
                        corsiExample();
 
                    }
                  })

            } else {
                Swal.fire({
                    title: 'Recuerda, ese fue el ensayo, ¿Lo has entendido?... (espere la respuesta del niño) ... Comencemos.',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
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
                        <button className="btn btn-primary corsi-start" onClick={startGame}>Comenzar</button>
                </div>
            

        </Fragment>
    )
}