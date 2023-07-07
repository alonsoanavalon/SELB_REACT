import { useState, Fragment, useCallback, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';
export default function Desarrollo(){

const [droppables, setDroppables] = useState([
    { id: '0', items: ['Item 1', 'Item 2', 'Item 3'] }, { id: '1', items: [] }, { id: '2', items: [] }
]);

const [firstDroppable, setFirstDroppable] =  useState({ id: '0', items: ['Item 1', 'Item 2', 'Item 3'] })
const [secondDroppable, setSecondDroppable] = useState({ id: '1', items: [] })
const [thirdDroppable, setThirdDroppable] = useState({ id: '2', items: [] })

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

//tendre que cambiar las destinaciones por id, ya no se sacaran directamente desde droppables
// sino que tendrá que haber una validacion, si la destinacion id = 0 seria fist stick id = 1 seria 2ndo stick
// ya que la idea es separar en estados diferentes los stick

const STICKS = {
  FIRST_STICK: 0,
  SECOND_STICK: 1,
  THIRD_STICK: 2
}

const removeItemFromDroppable = (draggableItem, sourceId, droppables) => {
  debugger;
    if (sourceId == STICKS.FIRST_STICK) {
      const droppableItems = firstDroppable.items;
      const selectedItemId = droppableItems.indexOf(draggableItem);
      const updatedValue = firstDroppable.items.splice(selectedItemId, 1)
      setFirstDroppable(prevValue => prevValue.items.splice(selectedItemId, 1));
      return [updatedValue, secondDroppable, thirdDroppable];
    } 

    if (sourceId == STICKS.SECOND_STICK) {
      const droppableItems = secondDroppable.items;
      const selectedItemId = droppableItems.indexOf(draggableItem);
      const updatedValue = secondDroppable.items.splice(selectedItemId, 1)
      setSecondDroppable(prevValue => prevValue.items.splice(selectedItemId, 1));
      return [firstDroppable, updatedValue, thirdDroppable];
    }

    if (sourceId == STICKS.THIRD_STICK) {
      const droppableItems = thirdDroppable.items;
      const selectedItemId = droppableItems.indexOf(draggableItem);
      const updatedValue = thirdDroppable.items.splice(selectedItemId, 1);
      setThirdDroppable(prevValue => prevValue.items.splice(selectedItemId, 1));
      return [firstDroppable, secondDroppable, updatedValue];
    }

}

const addItemToDroppable = (draggableItem, destinationId, droppables) => {

debugger;
    if (destinationId == STICKS.FIRST_STICK) {
      const updatedDroppable = firstDroppable.items.unshift(draggableItem)
      setFirstDroppable(prevValue => prevValue.items.unshift(draggableItem));
      return [updatedDroppable, secondDroppable, thirdDroppable]
    } 

    if (destinationId == STICKS.SECOND_STICK) {
      const updatedDroppable = secondDroppable.items.unshift(draggableItem)
      setSecondDroppable(prevValue => prevValue.items.unshift(draggableItem));
      return [firstDroppable, updatedDroppable, thirdDroppable]
    }

    if (destinationId == STICKS.THIRD_STICK) {
      const updatedDroppable = thirdDroppable.items.unshift(draggableItem)
      setThirdDroppable(prevValue => prevValue.items.unshift(draggableItem));
      return [firstDroppable, secondDroppable, updatedDroppable]
    }
}

const updateDroppables = (draggableItem, sourceId, destinationId, droppables) => {
    removeItemFromDroppable(draggableItem, sourceId, droppables);
    addItemToDroppable(draggableItem, destinationId, droppables);
    return droppables;
}

const freezeInactiveDraggablesWhileDragging = (draggables, selectedDraggable) => {
  draggables.forEach((draggable) => {
    if (draggable.innerHTML !== selectedDraggable) {
      draggable.setAttribute('id', 'notDraggingElement')
    } else {
      draggable.setAttribute('id', 'draggingElement')
    }
  })
}


const onDragEnd = (result, droppables) => {
    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const itemId = result.draggableId;
    const updatedDroppables = updateDroppables(itemId, sourceId, destinationId, droppables)
    setDroppables(updatedDroppables);
};


const onDragStart = (result, droppables) => {
  const draggables = document.querySelectorAll('div[data-rbd-draggable-context-id]');
  freezeInactiveDraggablesWhileDragging(draggables, result.draggableId);
  const sourceId = result.source.droppableId;
}

    return(
        <Fragment>

        {
            droppables.length > 0 && 
            <div style={{transform: "none!important", zIndex:1000, backgroundColor:"#fff", border:"1px solid red", position:"absolute", top:"0", height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}> <DragDropContext  onDragStart={result => onDragStart(result, droppables)} onDragEnd={result => onDragEnd(result, droppables)} >
              <div style={{ display: 'flex', borderBottom:"1.5rem solid black", width:"90%", margin:"0 auto", justifyContent: "space-evenly" }}>
                <div key={droppables[0]} style={{ width:"100px", margin: '8px' , display:"flex", justifyContent:"space-around"}}>
                            <Droppable  droppableId={droppables[0].id}  verticalAlignment='bottom'  isDropAnimating={false} reta={true} ignoreContainerClipping >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  style={{
                                    height:"280px",
                                    width:"50px",
                                    margin:"0 auto",
                                    paddingTop: droppables[0].items.length == 1 ? `calc(66px * 2)`: droppables[0].items.length === 2 ? `calc(66px * 1)` : droppables[0].items.length == 3 ? `0` : 0, 
                                    marginBottom:"-0.3rem",
                                    display:"flex",
                                    flexDirection:"column",
                                    justifyContent:"end",
                  
                                  }}
                                  className={'firstStick'}
                                  {...provided.droppableProps}
                                >
                                  <div style={{ transition: 'none !important' }}>
                                  {droppables[0].items.map((item, index) => (
                                    <Draggable key={item} draggableId={item} index={index} isDragDisabled={index === 0 ? false : true} shouldRespectForcePress={true}>
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
                <div key={droppables[1]} style={{ width:"100px", margin: '8px' , display:"flex", justifyContent:"space-around"}}>
                            <Droppable  droppableId={droppables[1].id}  verticalAlignment='bottom'  isDropAnimating={false} reta={true} ignoreContainerClipping >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  style={{
                                    height:"280px",
                                    width:"50px",
                                    margin:"0 auto",
                                    paddingTop: droppables[1].items.length == 1 ? `calc(66px * 2)`: droppables[1].items.length === 2 ? `calc(66px * 1)` : droppables[1].items.length == 3 ? `0` : 0, 
                                    marginBottom:"-0.3rem",
                                    display:"flex",
                                    flexDirection:"column",
                                    justifyContent:"end",
                  
                                  }}
                                  className={'secondStick'}
                                  {...provided.droppableProps}
                                >
                                  <div style={{ transition: 'none !important' }}>
                                  {droppables[1].items.map((item, index) => (
                                    <Draggable key={item} draggableId={item} index={index} isDragDisabled={index === 0 ? false : true} shouldRespectForcePress={true}>
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
                <div key={droppables[2]} style={{ width:"100px", margin: '8px' , display:"flex", justifyContent:"space-around"}}>
                            <Droppable max={1}droppableId={droppables[2].id}  verticalAlignment='bottom'  isDropAnimating={false} reta={true} ignoreContainerClipping >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  style={{
                                    height:"280px",
                                    width:"50px",
                                    margin:"0 auto",
                                    paddingTop: droppables[2].items.length == 1 ? `calc(66px * 2)`: droppables[2].items.length === 2 ? `calc(66px * 1)` : droppables[2].items.length == 3 ? `0` : 0, 
                                    marginBottom:"-0.3rem",
                                    display:"flex",
                                    flexDirection:"column",
                                    justifyContent:"end",
                  
                                  }}
                                  className={'thirdStick'}
                                  {...provided.droppableProps}
                                >
                                  <div style={{ transition: 'none !important' }}>
                                  {droppables[2].items.map((item, index) => (
                                    <Draggable key={item} draggableId={item} index={index} isDragDisabled={index === 0 ? false : true} shouldRespectForcePress={true}>
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
              </div>
          </DragDropContext>
          </div>
        }


        </Fragment>
    );

}