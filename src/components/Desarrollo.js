import { useState, Fragment, useCallback, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
      transitionDuration: `0.001s`,
    };
  }

const removeItemFromDroppable = (draggableItem, sourceId, droppables) => {
    const selectedItemId = droppables[sourceId].items.indexOf(draggableItem)
    droppables[sourceId].items.splice(selectedItemId , 1)
    return droppables;
}

const addItemToDroppable = (draggableItem, destinationId, droppables) => {
    droppables[destinationId].items.push(draggableItem)
    return droppables;
}

const updateDroppables = (draggableItem, sourceId, destinationId, droppables) => {
    removeItemFromDroppable(draggableItem, sourceId, droppables);
    addItemToDroppable(draggableItem, destinationId, droppables);
    return droppables;
}


const onDragEnd  = (result, droppables) => {
    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const itemId = result.draggableId;
    const updatedDroppables = updateDroppables(itemId, sourceId, destinationId, droppables)
    setDroppables(updatedDroppables);
};

    return(
        <Fragment>
            <h3 style={{ margin: "2rem"}}>Test en etapa de prueba</h3>
            <ul>
                <li>
                    <a className="btn btn-success" href="/corsi">Corsi</a>
                </li>
                <li>
                    <a className="btn btn-success" href="/hnf">HNF</a>
                </li>
                <li>
                    <a className="btn btn-success" href="/fonologico">Fonologico</a>
                </li>


        {
            droppables.length > 0 &&  <DragDropContext onDragEnd={result => onDragEnd(result, droppables)}>
            <div style={{ display: 'flex', borderTop:"4rem solid black", width:"90%", margin:"0 auto" }}>
              {droppables.map(droppable => (
                <div key={droppable.id} style={{ flex: 1, margin: '8px' }}>
                  <Droppable droppableId={droppable.id} direction='vertical' verticalAlignment='bottom'>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={{
                          padding: '8px',
                          minHeight:"300px",
                          width:"100px",
                          margin:"0 auto",
                          marginTop:"-.8rem"

        
                        }}
                        className='firstStick'
                        {...provided.droppableProps}
                      >
                        <div style={{ transition: 'none !important' }}>
                        {droppable.items.map((item, index) => (
                          <Draggable key={item} draggableId={item} index={index}>
                            {(provided, snapshot, key) => (
                              <div
                              
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                
                                style={{
                                  userSelect: 'none',
                                  padding: '8px',
                                  height:'50px',
                                  width:'50px',
                                  borderRadius:'50%',
                                  margin:'.8rem auto',
                                  background: item === "Item 1" ? 'blue' : item === "Item 2" ? 'red': item === 'Item 3' ? 'green' : 'white',
                                  color:"transparent",

                                  
                                  ...provided.draggableProps.style
                                  
                                }}
                              >
                                {item}
                              </div>
                            )}
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
        }

 
                
                
            </ul>
        </Fragment>
    );

}