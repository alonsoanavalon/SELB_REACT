import React, { Fragment, useEffect, useState } from 'react';

export default function Quantification (props) {

    const [pieces, setPieces] = useState(0)
    const [selectedPieces, setSelectedPieces] = useState([])
    

    useEffect(() => {
        setPieces(props.quantity)


        let $landingArea = document.querySelectorAll(".landing-area")[props.num]
        let $pieces = document.querySelectorAll(".pieces-container")[props.num].children
        let $piecesArray = [...$pieces]


        if (props.repeat === true) {
            let $secondLandingArea = document.querySelectorAll(".landing-area")[props.num + 1]
            let $secondPiecesContainer = document.querySelectorAll(".pieces-container")[props.num + 1]
            $secondPiecesContainer.style.visibility = "hidden"
            $secondPiecesContainer.style.display = "none"
            $secondPiecesContainer.style.zIndex = 0;
            addListenersToPiecesTest($piecesArray, $landingArea, $secondLandingArea)
        } else {
            addListenersToPiecesTest($piecesArray, $landingArea)
        }
    }, [pieces])

    function insertNewPieceTest () {

        const landingArea = document.querySelectorAll(".pieces-container")[props.num]
        landingArea.insertAdjacentHTML("beforeend", "<div class='piece'></div>")
        let pieces = landingArea.children;
        let piecesArray = [...pieces]
        
        let selectedPieceArray = Array.from(document.querySelectorAll(".landing-area")[props.num+1].children)
        selectedPieceArray.slice(selectedPieceArray.length -1)[0].remove()
        
        selectedPieceArray.splice(-1, 1)
        addListenersToPiecesTest(piecesArray)

    }

    function addListenersToSelectedPiecesTest (piece) {

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
                if (x > 160 && x < 530 && y > 94 && y < 590) {
                    insertNewPieceTest()
                }

                if (x < 140 || x > 530) {
              
                    piece.style.left = `${baseX}px`
                    piece.style.top= `${baseY}px`
                    piece.style.position = 'static'
                    
                }
                else if (y < 10 || y > 590){
                    
                    piece.style.left = `${baseX}px`
                    piece.style.top= `${baseY}px`
                    piece.style.position = 'static'
                    

                } else {    
                    
                    const landingArea = document.querySelectorAll(".pieces-container")[props.num]
                    landingArea.insertAdjacentElement("beforeend", piece)
                }

            })
        
    }

    function addListenersToPiecesTest (pieces) {

        let $secondLandingArea = document.querySelectorAll(".landing-area")[props.num+1]

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

                let newPiece = <div class='piece-inside'/>

                if (y > 2 && y < 500 && x > 461 && x < 940) {    
           
                        piece.style.display = 'none'    
                        setSelectedPieces(oldArray => [...oldArray, newPiece])
                        let newPieces = document.querySelectorAll(".piece-inside")
                        newPieces = Array.from(newPieces)
                        addListenersToSelectedPiecesTest(newPieces.slice(-1)[0])
                        $secondLandingArea.insertAdjacentHTML("beforeend", "<div class='piece-inside-countable'></div>")

            
                }

                if (x < 140 || x > 460) {
                    piece.style.left = `${baseX}px`
                    piece.style.top= `${baseY}px`

                }

                if (y < 10 || y > 0){
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
            <h5 className="game-title">{props.title}</h5>
            <div className='containerBox'>


            <div className='pieces-container'>
                {
            
                    renderPieces()
                     
                }
            </div>

            <div className="landing-area">
                {selectedPieces}
            </div>

        </div>
{/*             <button
                className="button restart-button"
                onClick={restartGame}
            >Restart</button> */}
        </Fragment>
    )

}