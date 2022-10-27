import React, { Fragment, useEffect, useState } from 'react';
import {get, del, set} from 'idb-keyval'
import { useAlert } from 'react-alert'
import axios from 'axios';
import Swal from 'sweetalert2'
import {isEqual} from 'underscore';

export default function Corsi () {

    const [firstExampleAnswer, setFirstExampleAnswer] = useState([])
    const [secondExampleAnswer, setSecondExampleAnswer] = useState([])
    const [errorCounter, setErrorCounter] = useState(0)
    const [globalError, setGlobalError] = useState(0)

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
        const selectedBox = e.target.classList[1].slice(-1);
        callback(prevValue => [...prevValue, selectedBox]) //tengo ue cambiar esto no me sirve para la segunda vuelta
        setTimeout(() => {
            e.target.classList.add("switch-on")
        }, 0)
        setTimeout(() => {
            e.target.classList.remove("switch-on")
        }, 1000)
    }



    const primeraSecuencia = async (box1, box2, callback) => {
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

    const corsiExample = () => {
        
        let expectedResults = []

/*         do { */
            primeraSecuencia(6,4, setFirstExampleAnswer);
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
        // 2 de 4
        // 2 DE 5
        // 2 DE 6
    }

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
                corsiExample();
            }
          })



        
    }
    
    function resetBoxes () {
        const old_element = document.querySelector(".game-box");
        const new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
    }

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
        const secondCorrectAnswer = ['2','9'];
        const firstCorrectAnswer = ['7','5'];
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
                            window.alert("juego de verdad")
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
                        window.alert("juego de verdad")
                    }
                  })
            }
        }
    }, [errorCounter])
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
                        <button className="btn btn-primary corsi-start" onClick={startGame}>Comenzar</button>
                    </div>
                </div>
            

        </Fragment>
    )
}