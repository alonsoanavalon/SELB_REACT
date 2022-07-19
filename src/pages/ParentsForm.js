import { get } from 'idb-keyval';
import React, {Fragment, useState, useEffect} from 'react';
import QuizRadio from '../components/QuizRadio';
import QuizOpen from '../components/QuizOpen';
import MultipleChoices from '../components/MultipleChoices';
import Instruction from '../components/Instruction';

export default function ParentsForm() {

    const [firstItemQuestions, setFirstItemQuestions] = useState([])
    const [openQuestion, setOpenQuestion] = useState([])
    const [secondItemQuestions, setSecondItemQuestions] = useState([])
    const [multipleQuestions, setMultipleQuestions] = useState([])
    const [lastQuestion, setLastQuestion] = useState([])


    useEffect(() => {

        get('sdq')
        .then(
            items => {
                setFirstItemQuestions(items.filter(item => item.num <= 25))
                setOpenQuestion(items.filter(item => item.num === 26))
                setSecondItemQuestions(items.filter(item => item.num >= 27 && item.num <= 29))
                setMultipleQuestions(items.filter(item => item.num === 30))
                setLastQuestion(items.filter(item => item.num === 31))
            }
        )

        
        
        
        
    }, [])
    
    
    return (
        <Fragment>
        <div className='sdq-wrapper'>
            <div className='sdq-header'>
                <img alt="facultad-logo" src='/images/uandes.png'/>
                <img alt="facultad-logo" src='/images/facultad.png'/>
            </div>

            <h2 className='h2 text-center'>“Cuestionario de capacidad y dificultades (SDQ-Cas)”</h2>   

            <div className='sdq-instructions'>

                <h6 className='h6'>Cuestionario:</h6>

                <p>
                Por favor, marque el cuadro que usted cree que mejor responde a cada pregunta: Falso, Medianamente verdadero, o Muy verdadero. Nos sería de gran ayuda si responde a todas las preguntas lo mejor que pueda aunque no esté completamente seguro/a de la respuesta o le parezca una pregunta extraña. Por favor, responda basándose en el comportamiento de su hijo/a durante los últimos seis meses o durante el presente año escolar.</p>

            </div>


            {
                firstItemQuestions.map(item => 
                    <QuizRadio 
                        title = {item.title}       
                        instrumentId = {item.instrumentId}
                        instrumentName = {item.instrumentName}          
                        num = {item.num}     
                        itemId = {item.itemId} 
                        choices = {3}
                
                />)
            }

            {
              openQuestion.map(item => 
              <QuizOpen
                title = {item.title}       
                instrumentId = {item.instrumentId}
                instrumentName = {item.instrumentName}          
                num = {item.num}     
                itemId = {item.itemId} 
              /> )
            }




            {
            secondItemQuestions[0] &&
                <QuizRadio
                
                  title = {secondItemQuestions[0]['title']}       
                  instrumentId = {secondItemQuestions[0]['instrumentId']}
                  instrumentName = {secondItemQuestions[0]['instrumentName']}          
                  num = {secondItemQuestions[0]['num']}     
                  itemId = {secondItemQuestions[0]['itemId']} 
                  choices = {4}
                />
            }

<div className='sdq-instructions'>
    <p>
        <b>Si ha contestado que "Si", porfavor responda las siguientes preguntas sobre estas dificultades</b>
    </p>
</div>


{
            secondItemQuestions[1] &&
                <QuizRadio
                
                  title = {secondItemQuestions[1]['title']}       
                  instrumentId = {secondItemQuestions[1]['instrumentId']}
                  instrumentName = {secondItemQuestions[1]['instrumentName']}          
                  num = {secondItemQuestions[1]['num']}     
                  itemId = {secondItemQuestions[1]['itemId']} 
                  choices = {4.1}
                />
            }

            {
            secondItemQuestions[2] &&
                <QuizRadio
                
                  title = {secondItemQuestions[2]['title']}       
                  instrumentId = {secondItemQuestions[2]['instrumentId']}
                  instrumentName = {secondItemQuestions[2]['instrumentName']}          
                  num = {secondItemQuestions[2]['num']}     
                  itemId = {secondItemQuestions[2]['itemId']} 
                  choices = {4.2}
                />
            }

            <div className='multipleChoicesWrapper'>

                <div className="instrument-sdq__open">
                                
                <h6 className='h6 text-start sdq-title'>30. ¿Intervienen estas dificultades en la vida diaria de su hijo/a en las siguientes áreas?</h6>
                
    
                </div>

            {
                multipleQuestions.map(item => 
                    <MultipleChoices
                    title = {item.title}       
                    instrumentId = {item.instrumentId}
                    instrumentName = {item.instrumentName}          
                    num = {item.num}     
                    itemId = {item.itemId} 
                    />)
            }

</div>

            {
                lastQuestion[0] &&
                    <QuizRadio
                    title = {lastQuestion[0]['title']}       
                    instrumentId = {lastQuestion[0]['instrumentId']}
                    instrumentName = {lastQuestion[0]['instrumentName']}          
                    num = {lastQuestion[0]['num']}     
                    itemId = {lastQuestion[0]['itemId']} 
                    choices = {4.2}
                    />
            }

            



            <Instruction checkpoint={true} instruction="Muchas gracias, lo hiciste muy bien"/>


        </div>



        </Fragment>
    )
}