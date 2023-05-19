import { useState, Fragment, useCallback, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';
export default function Desarrollo(){

const [droppables, setDroppables] = useState([
    { id: '0', items: ['Item 1', 'Item 2', 'Item 3'] }, { id: '1', items: [] }, { id: '2', items: [] }
]);

function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `1000s`,
    transform: "none !important",
 
  };
}


const removeItemFromDroppable = (draggableItem, sourceId, droppables) => {
    const selectedItemId = droppables[sourceId].items.indexOf(draggableItem)
    droppables[sourceId].items.splice(selectedItemId , 1)
    return droppables;
}

const addItemToDroppable = (draggableItem, destinationId, droppables) => {
    droppables[destinationId].items.unshift(draggableItem)
    return droppables;
}

const updateDroppables = (draggableItem, sourceId, destinationId, droppables) => {
    removeItemFromDroppable(draggableItem, sourceId, droppables);
    addItemToDroppable(draggableItem, destinationId, droppables);
    return droppables;
}

const freezeDraggables = (draggables, selectedDraggable) => {
  
  draggables.forEach((draggable) => {
    if (draggable.innerHTML !== selectedDraggable) {
      draggable.setAttribute('id', 'notDraggingElement')
    } else {
      draggable.setAttribute('id', 'draggingElement')
    }
  })
}


const onDragEnd  = (result, droppables) => {
    const sourceId = result.source.droppableId;
    debugger;
    const destinationId = result.destination.droppableId;
    const itemId = result.draggableId;
    const updatedDroppables = updateDroppables(itemId, sourceId, destinationId, droppables)
    setDroppables(updatedDroppables);
    const draggables = document.querySelectorAll('div[data-rbd-draggable-context-id]');
    draggables.forEach((draggable) => {
      if (draggable.innerHTML == itemId) {
        draggable.setAttribute('id', 'droppingElement')
        debugger;
      }
    })
    debugger;
};


const onDragStart = (result, droppables) => {
  const draggables = document.querySelectorAll('div[data-rbd-draggable-context-id]');
  freezeDraggables(draggables, result.draggableId);
  const sourceId = result.source.droppableId;
}





    return(
        <Fragment>

        {
            droppables.length > 0 && <div style={{transform: "none!important", zIndex:1000, backgroundColor:"#fff", border:"1px solid red", position:"absolute", top:"0", height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}> <DragDropContext  onDragStart={result => onDragStart(result, droppables)} onDragEnd={result => onDragEnd(result, droppables)} >
            <div style={{ display: 'flex', borderBottom:"1.5rem solid black", width:"90%", margin:"0 auto", justifyContent: "space-evenly" }}>
              {droppables.map(droppable => (
                <div key={droppable.id} style={{ width:"100px", margin: '8px' , display:"flex", justifyContent:"space-around"}}>
                  <Droppable  droppableId={droppable.id}  verticalAlignment='bottom'  isDropAnimating={false} reta={true} ignoreContainerClipping >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={{
                          height:"280px",
                          width:"50px",
                          margin:"0 auto",
                          paddingTop: droppable.items.length == 1 ? `calc(66px * 2)`: droppable.items.length === 2 ? `calc(66px * 1)` : droppable.items.length == 3 ? `0` : 0, 
                      
                          marginBottom:"-0.3rem",
                          display:"flex",
                          flexDirection:"column",
                          justifyContent:"end",
        
                        }}
                        className={droppable.id == 0 ? 'firstStick' : droppable.id == 1 ? 'secondStick' : droppable.id == 2 ? 'thirdStick' : '' }
                        {...provided.droppableProps}
                      >
                        <div style={{ transition: 'none !important' }}>
                        {droppable.items.map((item, index) => (
                          <Draggable key={item} draggableId={item} index={index} isDragDisabled={index === 0 ? false : true} >
                            {(provided, snapshot, key) => {
                               const draggableStyle = getStyle(provided.draggableProps.style, snapshot);
                               return (<div
                               
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                
                                style={{
                                  ...draggableStyle,
                                  userSelect: 'none',
                                  padding: '8px',
                                  height:'50px',
                                  width:'50px',
                                  borderRadius:'50%',
                                  margin:'1rem auto',
                                  background: item === "Item 1" ? '#3e98eb' : item === "Item 2" ? '#f34a4a': item === 'Item 3' ? '#f0f019' : 'white',
                                  color:"transparent",
                                  transform: "none!important",
                                  
                                  

                                  
                                  ...provided.draggableProps.style
                                  
                                }}
                              >
                                {item}  
                              </div>)
                            }}
                          </Draggable>
                        ))}
                
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
          </div>
        }

 
      
        </Fragment>
    );

}