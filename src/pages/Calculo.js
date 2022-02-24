import React, { useEffect, useState, Fragment } from 'react';
import Instruction from '../components/Instruction'
import { useAlert } from 'react-alert'

// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { get, set, getMany, update } from 'idb-keyval';
import Item from '../components/Item';
import Quantification from '../components/Calculo/Quantification';
import QuantificationQuiz from '../components/Calculo/QuantificationQuiz';

export default function Calculo () {

    const alert = useAlert()
    const [numbers, setNumbers] = useState([])
    const [quantification, setQuantification] = useState([])
    const [verbalCount, setVerbalCount] = useState([])
    const [problemsWithoutMedia, setProblemsWithoutMedia] = useState([])
    const [problems, setProblems] = useState([])
    const [isArray, setIsArray] = useState(false)
    const [selectedPieces, setSelectedPieces] = useState([])
    const [idWhithoutMedia, setIdWithoutMedia] = useState()

/* 
allInstruments.forEach(instrument => {if(instrument['Cálculo'] != undefined) {console.log(instrument['key'], instrument['Cálculo'].value)} else {console.log(instrument['key'], instrument['Cálculo-selected'].value)}})
 */

    useEffect(() => {
 
        get('instrument/2')
        .then(
            items => {
            setNumbers(items.filter(item => item.itemId >= 73 && item.itemId <= 89))
            setQuantification(items.filter(item => item.itemId >= 90 && item.itemId <= 110))
            setVerbalCount(items.filter(item => item.itemId === 111))
            setProblemsWithoutMedia(items.filter(item => item.itemId >= 112 && item.itemId <= 113))
            setProblems(items.filter(item => item.itemId >= 114 && item.itemId <= 145)) 
            setIdWithoutMedia([130, 132, 135, 138, 144 ,145])
        })

        /* var piece = document.querySelector(".piece") */
        var landingArea = document.querySelector(".landing-area")
        var pieces = document.querySelectorAll(".piece")
        addListenersToPieces(pieces, landingArea)
        
    
    }, [])


    function addListenersToSelectedPieces (piece) {

        
        console.log(piece, "PIOECES")

            let baseX = piece.offsetLeft
            let baseY = piece.offsetTop;

            piece.addEventListener("touchstart", e => {
                var touchLocation = e.targetTouches[0];
                piece.style.position = 'absolute';
                piece.style.left = touchLocation.pageX + 'px';
                piece.style.top = touchLocation.pageY + 'px';
                
            })

            piece.addEventListener('touchmove', function(e) {
    
                e.preventDefault()
                var touchLocation = e.targetTouches[0];
                // assign box new coordinates based on the touch.
                piece.style.left = touchLocation.pageX + 'px';
                piece.style.top = touchLocation.pageY + 'px';
            })          

            
            piece.addEventListener('touchend', function(e) {
  
                // current box position.
                var x = parseInt(piece.style.left);
                var y = parseInt(piece.style.top);

                // creating the new piece
                if (x > 160 && x < 560 && y > 94 && y < 590) {
                    insertNewPiece()
                }

                if (x < 140 || x > 530) {
              
                    piece.style.left = `${baseX}px`
                    piece.style.top= `${baseY}px`
                    piece.style.position = 'static'
                    

                }
                else if (y < 10 || y > 500){
                    
                    piece.style.left = `${baseX}px`
                    piece.style.top= `${baseY}px`
                    piece.style.position = 'static'
                    

                } else {    

                    var landingArea = document.querySelector(".pieces-container")
                    landingArea.insertAdjacentElement("beforeend", piece)

                }
  
                

            })
   
        
    }
    
    function addListenersToPieces (pieces) {

        pieces.forEach(piece => {

            let baseX = piece.offsetLeft
            let baseY = piece.offsetTop;

            piece.addEventListener("touchstart", e => {
                var touchLocation = e.targetTouches[0];
                piece.style.position = 'absolute';
                piece.style.left = touchLocation.pageX + 'px';
                piece.style.top = touchLocation.pageY + 'px';
                
            })

            piece.addEventListener('touchmove', function(e) {
    
                e.preventDefault()
                var touchLocation = e.targetTouches[0];
                piece.style.left = touchLocation.pageX + 'px';
                piece.style.top = touchLocation.pageY + 'px';
            })          

            piece.addEventListener('touchend', function(e) {
                // current box position.
                var x = parseInt(piece.style.left);
                var y = parseInt(piece.style.top);

                // creating the new piece
                let newPiece = <div onLoad={insertNewPiece} class='piece-inside'/>

                if (y > 2 && y < 500 && x > 540 && x < 940) {
                    // hidding selected piece and creating new
                
                    piece.style.display = 'none'
                    setSelectedPieces(oldArray => [...oldArray, newPiece])
                    let newPieces = document.querySelectorAll(".piece-inside")
                    newPieces = Array.from(newPieces)
                    addListenersToSelectedPieces(newPieces.slice(-1)[0])
                }
                if (x < 140 || x > 530) {

                    piece.style.left = `${baseX}px`
                    piece.style.top= `${baseY}px`

                }
                if (y < 10 || y > 500){

                    piece.style.left = `${baseX}px`
                    piece.style.top= `${baseY}px`

                }

            })
   
        })


    }



    function restartGame () {
        const $piecesContainer = document.querySelector(".pieces-container")
        const $landingArea = document.querySelector(".landing-area")
        
        let basePieces = "<div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div><div class='piece'></div>"
      
        $landingArea.innerHTML = ""
        $piecesContainer.innerHTML = basePieces
        var pieces = document.querySelectorAll(".piece")
        var landingArea = document.querySelector(".landing-area")
        addListenersToPieces(pieces, landingArea)
    }
                                        
    function insertNewPiece () {

        var landingArea = document.querySelector(".pieces-container")
        landingArea.insertAdjacentHTML("beforeend", "<div class='piece'></div>")
        let pieces = landingArea.children;
        let piecesArray = [...pieces]

        addListenersToPieces(piecesArray)

   

    }

    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={1}
            spaceBetween={50}
            navigation
            allowTouchMove={false}
            scrollbar={{ draggable: true }}
        >

        <SwiperSlide>
            <Instruction instruction="A continuación haremos algunas actividades con números, aquí no hay respuesta buenas ni malas. Si hay algo que no sabes está bien, haz lo mejor que puedas. Te voy a mostrar unos números, y te voy a pedir que me digas cómo se llaman. ¿Lo has entendido? Comencemos "/>
        </SwiperSlide>

        {
                numbers.map(item => 
                    <Fragment>                           
                    <SwiperSlide key={item.itemId+ "-media"}>
                        <Item
                            type={item.type}
                            picture={item.picture}
                            pictureName={item.pictureName}
                            title={item.title}
                        />
                    </SwiperSlide>
                    <SwiperSlide key={item.itemId}>
                        <Item
                            title = {item.title}       
                            type = "quiz"
                            other = {false}   
                            answer = {item.answer}
                            instrumentId = {item.instrumentId}
                            instrumentName = {item.instrumentName}          
                            num = {item.num}     
                            itemId = {item.itemId} 
                        />

                    </SwiperSlide>
                </Fragment>
                )
                }
        <SwiperSlide>
            <Instruction checkpoint={true} instruction="Vamos a hacer un juego. En esta pantalla aparecerán un montón de fichas rojas. Vas a mover aquí (señalar la tablet), el número de fichas que yo te diga. Vamos a hacer un ejemplo"/>
        </SwiperSlide>

        <SwiperSlide>
        <div className='containerBox'>

            <div className='pieces-container'>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
                <div className='piece'></div>
            </div>
            <div className="landing-area">
                {selectedPieces}
            </div>
        </div>
        <button
            className="button restart-button"
            onClick={restartGame}
        >Restart</button>
        </SwiperSlide>

        <SwiperSlide>
            <Instruction instruction="Muy bien, ahora te pediré que muevas el número de fichas que te voy a decir y las cuentes"/>
        </SwiperSlide>

        {
            quantification[0] != undefined &&

        <Fragment>

                
        <SwiperSlide key="1">
                <Quantification key={quantification[0].itemId} quantity={20} num={1} repeat={true} title={"Coloca tres fichas aquí"}/>
        </SwiperSlide>
        <SwiperSlide key="2">
                <Quantification key={quantification[0].itemId} quantity={20} num={2} title={"Ahora las vas a contar y me vas a decir cuantas tocaste"}/>
        </SwiperSlide>
        <SwiperSlide key="3">
                <QuantificationQuiz title={quantification[0].title} itemId={[quantification[0].itemId, quantification[1].itemId, quantification[2].itemId]} instrumentName={quantification[0].instrumentName} num={quantification[0].num}/>
        </SwiperSlide>
        <SwiperSlide key="4">
                <Quantification key={quantification[3].itemId} quantity={20} num={3} repeat={true} title={"Coloca cuatro fichas aquí"}/>
        </SwiperSlide>
        <SwiperSlide key="5">
                <Quantification key={quantification[3].itemId} quantity={20} num={4} title={"Ahora las vas a contar y me vas a decir cuantas tocaste"}/>
        </SwiperSlide>
        <SwiperSlide key="6">
                <QuantificationQuiz title={quantification[3].title} itemId={[quantification[3].itemId, quantification[4].itemId, quantification[5].itemId]} instrumentName={quantification[3].instrumentName} num={quantification[3].num}/>
        </SwiperSlide>
        <SwiperSlide key="7">
                <Quantification key={quantification[6].itemId} quantity={20} num={5} repeat={true} title={"Coloca seis fichas aquí"}/>
        </SwiperSlide>
        <SwiperSlide key="8">
                <Quantification key={quantification[6].itemId} quantity={20} num={6} title={"Ahora las vas a contar y me vas a decir cuantas tocaste"}/>
        </SwiperSlide>
        <SwiperSlide key="9">
                <QuantificationQuiz title={quantification[6].title} itemId={[quantification[6].itemId, quantification[7].itemId, quantification[8].itemId]} instrumentName={quantification[6].instrumentName} num={quantification[6].num}/>
        </SwiperSlide>
        <SwiperSlide key="10">
                <Quantification key={quantification[9].itemId} quantity={20} num={7} repeat={true} title={"Coloca ocho fichas aquí"}/>
        </SwiperSlide>
        <SwiperSlide key="11">
                <Quantification key={quantification[9].itemId} quantity={20} num={8} title={"Ahora las vas a contar y me vas a decir cuantas tocaste"}/>
        </SwiperSlide>
        <SwiperSlide key="12">
                <QuantificationQuiz title={quantification[9].title} itemId={[quantification[9].itemId, quantification[10].itemId, quantification[11].itemId]} instrumentName={quantification[9].instrumentName} num={quantification[9].num}/>
        </SwiperSlide>
        <SwiperSlide key="13">
                <Quantification key={quantification[12].itemId} quantity={20} num={9} repeat={true} title={"Coloca diez fichas aquí"}/>
        </SwiperSlide>
        <SwiperSlide key="14">
                <Quantification key={quantification[12].itemId} quantity={20} num={10} title={"Ahora las vas a contar y me vas a decir cuantas tocaste"}/>
        </SwiperSlide>
        <SwiperSlide key="15">
                <QuantificationQuiz title={quantification[12].title} itemId={[quantification[12].itemId, quantification[13].itemId, quantification[14].itemId]} instrumentName={quantification[12].instrumentName} num={quantification[12].num}/>
        </SwiperSlide>
        <SwiperSlide key="16">
                <Quantification key={quantification[15].itemId} quantity={20} num={11} repeat={true} title={"Coloca once fichas aquí"}/>
        </SwiperSlide> 
        <SwiperSlide key="17">
                <Quantification key={quantification[15].itemId} quantity={20} num={12} title={"Ahora las vas a contar y me vas a decir cuantas tocaste"}/>
        </SwiperSlide>
        <SwiperSlide key="18">
                <QuantificationQuiz title={quantification[15].title} itemId={[quantification[15].itemId, quantification[16].itemId, quantification[17].itemId]} instrumentName={quantification[15].instrumentName} num={quantification[15].num}/>
        </SwiperSlide>
        <SwiperSlide key="19">
                <Quantification key={quantification[18].itemId} quantity={20} num={13} repeat={true} title={"Coloca dieciseis fichas aquí"}/>
        </SwiperSlide>
        <SwiperSlide key="20">
                <Quantification key={quantification[18].itemId} quantity={20} num={14} title={"Ahora las vas a contar y me vas a decir cuantas tocaste"}/>
        </SwiperSlide>
        <SwiperSlide key="21">
                <QuantificationQuiz title={quantification[18].title} itemId={[quantification[18].itemId, quantification[19].itemId, quantification[20].itemId]} instrumentName={quantification[18].instrumentName} num={quantification[18].num}/>
        </SwiperSlide>

            </Fragment>
        }

        {
            verbalCount.map(
                item => 

                    <SwiperSlide>
                        <Item
                            title = {item.title}       
                            type = "quiz"
                            other = {false}   
                            answer = {item.answer}
                            instrumentId = {item.instrumentId}
                            instrumentName = {item.instrumentName}          
                            num = {item.num}     
                            itemId = {item.itemId} 
                        />
                    </SwiperSlide>
               
            )
        }

        <SwiperSlide>
            <Instruction  checkpoint={true} instruction="A continuación te haré algunas preguntas y te mostraré algunas imágenes"/>
        </SwiperSlide>

        {
            problemsWithoutMedia.map(
                item => 
                <SwiperSlide key={item.itemId}>
                    <Item
                        title = {item.title}       
                        type = "quiz"
                        other = {false}   
                        answer = {item.answer}
                        instrumentId = {item.instrumentId}
                        instrumentName = {item.instrumentName}          
                        num = {item.num}     
                        itemId = {item.itemId} 
                    />

                </SwiperSlide>
            )
        }

        {

            idWhithoutMedia != undefined &&
            problems.map(
                item => {

                    if (idWhithoutMedia.includes(item.itemId)) {
                        return <SwiperSlide key={item.itemId}>
                        <Item
                            title = {item.title}       
                            type = "quiz"
                            other = {false}   
                            answer = {item.answer}
                            instrumentId = {item.instrumentId}
                            instrumentName = {item.instrumentName}          
                            num = {item.num}     
                            itemId = {item.itemId} 
                        />
    
                    </SwiperSlide>
                    } else {
                        return  <Fragment>                           
                        <SwiperSlide key={item.itemId+ "-media"}>
                            <Item
                                type={item.type}
                                picture={item.picture}
                                pictureName={item.pictureName}
                                title={item.title}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={item.itemId}>
                            <Item
                                title = {item.title}       
                                type = "quiz"
                                other = {false}   
                                answer = {item.answer}
                                instrumentId = {item.instrumentId}
                                instrumentName = {item.instrumentName}          
                                num = {item.num}     
                                itemId = {item.itemId} 
                            />
        
                        </SwiperSlide>
                    </Fragment>
                    }

               
                }

                

               
            )
        }

<SwiperSlide>
                        <Instruction checkpoint={true} instruction="Muchas gracias, lo hiciste muy bien"/>

                    </SwiperSlide>

        </Swiper>
      );
}