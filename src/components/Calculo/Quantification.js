import React, { Fragment, useEffect, useState } from 'react';
import {get,set,update} from 'idb-keyval'

export default function Quantification (props) {

    const [pieces, setPieces] = useState(0)
    const [selectedPieces, setSelectedPieces] = useState(0)

    useEffect(() => {
        setPieces(props.quantity)
        setSelectedPieces(20 - pieces)

        let $landingArea = document.querySelectorAll(".landing-area")[props.num]
        let $pieces = document.querySelectorAll(".pieces-container")[props.num].children
        let $piecesArray = [...$pieces]


        if (props.repeat === true) {
            let $secondLandingArea = document.querySelectorAll(".landing-area")[props.num + 1]
            addListenersToPieces($piecesArray, $landingArea, $secondLandingArea)
        } else {
            addListenersToPieces($piecesArray, $landingArea)
        }
    }, [pieces])

    function addListenersToPieces (pieces, landingArea, secondLandingArea = undefined) {

        pieces.forEach(piece => {

            let baseX = piece.offsetLeft
            let baseY = piece.offsetTop;




            piece.addEventListener("touchstart", e => {
                piece.style.position = 'absolute';

            })
    
            
             piece.addEventListener('touchmove', function(e) {
                // grab the location of touch
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

                let newPiece = `<div class='piece-inside'><div/>`

                if (y > 2 && y < 500 && x > 540 && x < 940) {

                    if (secondLandingArea === undefined) {

                        piece.style.display = 'none'
                        console.log(newPiece)
                        landingArea.insertAdjacentHTML("afterbegin", newPiece)
    
/*                         let $landingArea = document.querySelectorAll(".landing-area")[props.num].children
                        let $piecesArray = [...$landingArea]
    
    
                        setSelectedPieces($piecesArray.length) */
                    } else {
                        piece.style.display = 'none'
                        landingArea.insertAdjacentHTML("afterbegin", newPiece)
                        secondLandingArea.insertAdjacentHTML("afterbegin", newPiece)
    
                        let $landingArea = document.querySelectorAll(".landing-area")[props.num].children
                        let $piecesArray = [...$landingArea]
    
    
                        setSelectedPieces($piecesArray.length)
                    }

                    
/*                     get('quantification-pieces')
                    .then(
                        res => {
                            res[1] = $piecesArray.length
                            set('quantification-pieces', res)
                        }
                    ) */
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


    const renderPieces = () => {
        let $pieces = []

        for(let i = 0; i < pieces; i++) {
            let element = <div className='piece'></div>
            $pieces.push(element)
        }

        return $pieces
    }


    return (
        <Fragment>
            <h5 class="game-title">{props.title}</h5>
            <div className='containerBox'>


            <div className='pieces-container'>
                {
            
                    renderPieces()
                     
                }
            </div>

            <div className="landing-area">

            </div>

        </div>
{/*             <button
                className="button restart-button"
                onClick={restartGame}
            >Restart</button> */}
        </Fragment>
    )

}