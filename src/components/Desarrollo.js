import { useState, Fragment, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2';
import './style.css';

export default function Desarrollo() {


  //Aca quede en que voy sumando mas etapas, tengo la duda de cual es la posicion inicial de cada etapa, o es siempre la misma?
  //Validar si tema imagenes esta bien en lugar de que evaluador haga la prueba (considerando que hay item de ensayo), pedir feedback
  //Agregar todos los items faltantes, sus imagenes, instrucciones y alertas.
  //Definir en cada objeto la cantidad maxima de tiempo, ya que si bien debemos registrar los movimientos
  //El juego no se ve limitado por los movimientos, solo por el tiempo.
  //Dejar registradas las respuestas
  //Finalizar y guardar

  const [droppables, setDroppables] = useState([]);
  const [selectedInstruction, setSelectedInstruction] = useState();
  const [visibleInstruction, setVisibleInstruction] = useState(true);
  // {
  //     options: {
  //         firstStick: ['AZ','AM'],
  //         secondStick: ['R'],
  //         thirdStick: [],
  //         time: '18,2',
  //         movements: '5'
  //     },
  //     value: 0
  // }
  const [results, setResults] = useState([])
  const [step, setStep] = useState(0)

  const STICKS = {
    FIRST_STICK: 0,
    SECOND_STICK: 1,
    THIRD_STICK: 2
  }
  const STICKS_BY_STEP = {
    0: {
      id: 0,
      droppables: [
        { id: '0', items: ['R'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: ['AM'] }
      ],
      instructions: [
        {
          num: 0,
          description: "Indicar la primera pelota y decir: ¿De qué color es esta pelota?. Luego mostrar las siguientes y decir: y esta?, y esta?"
        },
        {
          num: 1,
          description: "Las pelotas se pueden mover de una vara a otra, así. Levantar una pelota y cambiarla de vara. Luego devolverla"
        },
        {
          num: 2,
          description: "Te voy a decir las reglas del juego: En la primera vara cabe una pelota, en la segunda dos y en la tercera tres"
        },
        {
          num: 3,
          description: "Las pelotas solo pueden ser movidas una a la vez, así (mover una pelota de una vara a otra)"
        },
        {
          num: 4,
          description: "Las pelotas tienen siempre colocarse en las varas, no dejarlas afuera"
        }
      ]
    },
    1: {
      id: 1,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 1 movimiento"
        }
      ],
      alert: `
        <p>Tienes que copiar el orden en que están las pelotas en la imagen
        Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
        <img style="width:90%"src="/images/example-0.png">
      `

    },
    2: {
      id: 2,
      exerciseNumber: 1,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 2 movimientos"
        }
      ],
      alert: `
        <p>Tienes que copiar el orden en que están las pelotas en la imagen
        Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
        <img style="width:90%"src="/images/exercise-1.png">
      `
    },
    3: {
      id: 3,
      exerciseNumber: 2,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 2 movimientos"
        }
      ],
      alert: `
            <p>Tienes que copiar el orden en que están las pelotas en la imagen
            Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
            <img style="width:90%"src="/images/exercise-2.png">
          `
    },
    4: {
      id: 4,
      exerciseNumber: 3,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 3 movimientos"
        }
      ],
      alert: `
            <p>Tienes que copiar el orden en que están las pelotas en la imagen
            Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
            <img style="width:90%"src="/images/exercise-3.png">
          `
    },
    5: {
      id: 5,
      exerciseNumber: 4,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 3 movimientos"
        }
      ],
      alert: `
          <p>Tienes que copiar el orden en que están las pelotas en la imagen
          Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
          <img style="width:90%"src="/images/exercise-4.png">
        `
    },
    6: {
      id: 6,
      exerciseNumber: 5,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 4 movimientos"
        }
      ],
      alert: `
        <p>Tienes que copiar el orden en que están las pelotas en la imagen
        Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
        <img style="width:90%"src="/images/exercise-5.png">
      `
    },
    7: {
      id: 7,
      exerciseNumber: 6,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 4 movimientos"
        }
      ],
      alert: `
      <p>Tienes que copiar el orden en que están las pelotas en la imagen
      Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
      <img style="width:90%"src="/images/exercise-6.png">
    `
    },
    8: {
      id: 8,
      exerciseNumber: 7,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 4 movimientos"
        }
      ],
      alert: `
      <p>Tienes que copiar el orden en que están las pelotas en la imagen
      Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
      <img style="width:90%"src="/images/exercise-7.png">
    `
    },
    9: {
      id: 9,
      exerciseNumber: 8,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 4 movimientos"
        }
      ],
      alert: `
      <p>Tienes que copiar el orden en que están las pelotas en la imagen
      Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
      <img style="width:90%"src="/images/exercise-8.png">
    `
    },
    10: {
      id: 10,
      exerciseNumber: 9,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 4 movimientos"
        }
      ],
      alert: `
      <p>Tienes que copiar el orden en que están las pelotas en la imagen
      Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
      <img style="width:90%"src="/images/exercise-9.png">
    `
    },
    11: {
      id: 11,
      exerciseNumber: 10,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 5 movimientos"
        }
      ],
      alert: `
      <p>Tienes que copiar el orden en que están las pelotas en la imagen
      Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
      <img style="width:90%"src="/images/exercise-10.png">
    `
    },
    12: {
      id: 12,
      exerciseNumber: 11,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 5 movimientos"
        }
      ],
      alert: `
      <p>Tienes que copiar el orden en que están las pelotas en la imagen
      Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
      <img style="width:90%"src="/images/exercise-11.png">
    `
    },
    13: {
      id: 13,
      exerciseNumber: 12,
      droppables: [
        { id: '0', items: ['R', 'AM'] },
        { id: '1', items: ['AZ'] },
        { id: '2', items: [] }
      ],
      instructions: [
        {
          num: 0,
          description: "En este caso tienes que realizar 5 movimientos"
        }
      ],
      alert: `
      <p>Tienes que copiar el orden en que están las pelotas en la imagen
      Esta es la figura a la que debes llegar y tu debes repetirla en el tuyo, practiquemos.</p>
      <img style="width:90%"src="/images/exercise-12.png">
    `
    },

  }

  useEffect(() => {
    setDroppables(STICKS_BY_STEP[step].droppables)
    if (STICKS_BY_STEP[step].instructions) {
      setSelectedInstruction(STICKS_BY_STEP[step].instructions[0])

    } else {
      setSelectedInstruction(null)
    }

  }, [step])

  function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      transitionDuration: `1000s`,
      transform: "none !important",

    };
  }

  const removeItemFromDroppable = (sourceId, droppables) => {
    droppables[sourceId].items.splice(0, 1)
    return droppables;
  }

  const addItemToDroppable = (draggableItem, destinationId, droppables) => {
    droppables[destinationId].items.unshift(draggableItem)
    return droppables;
  }

  const exchangeDroppables = (draggableItem, sourceId, destinationId, droppables) => {
    const destinationItem = droppables[destinationId].items[0];
    const sourceItem = draggableItem;

    removeItemFromDroppable(sourceId, droppables)
    removeItemFromDroppable(destinationId, droppables)
    addItemToDroppable(sourceItem, destinationId, droppables)
    if (destinationItem !== undefined) {
      //Si no existe un item en el droppable de destino no lo agregaremos en el de origen
      //si no se agregaba un circulo blanco por el undefined
      addItemToDroppable(destinationItem, sourceId, droppables)
    }
    return droppables;
  }

  const updateDroppables = (draggableItem, sourceId, destinationId, droppables) => {
    if (sourceId === destinationId) {
      return droppables;
    }

    if (destinationId == STICKS.THIRD_STICK && droppables[STICKS.THIRD_STICK].items.length > 0) {
      return droppables;
      //se intarcambian o no pasa nada? creo que no pasa nada porque ahi se mueven 2 por 1 movimiento //preguntar.
      //return exchangeDroppables(draggableItem, sourceId, destinationId, droppables)
    }
    if (destinationId == STICKS.SECOND_STICK && droppables[STICKS.SECOND_STICK].items.length >= 2) {
      return droppables;
      //return exchangeDroppables(draggableItem, sourceId, destinationId, droppables)
    }
    removeItemFromDroppable(sourceId, droppables);
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
    //aca tengo que capturar el intento, indepediente de que lo suelte en un droppable, cuenta el intento
    if (result.destination?.droppableId) {
      const sourceId = result.source.droppableId;
      const destinationId = result.destination.droppableId;
      const itemId = result.draggableId;
      const updatedDroppables = updateDroppables(itemId, sourceId, destinationId, droppables)
      setDroppables(updatedDroppables);
    }

  };

  const onDragStart = (result) => {
    const draggables = document.querySelectorAll('div[data-rbd-draggable-context-id]');
    freezeInactiveDraggablesWhileDragging(draggables, result.draggableId);
  }

  function resetStep() {
    if (STICKS_BY_STEP) {
      setDroppables(STICKS_BY_STEP[step].droppables)
    }
  }

  function showExample(html, exerciseNumber) {
    if (exerciseNumber) {
      Swal.fire({
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        html,
        icon: "info",
        title: `Ejercicio ${exerciseNumber}`,
        confirmButtonText: 'Continuar',
      })
    } else {
      Swal.fire({
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        html,
        icon: "info",
        title: "Ensayo",
        confirmButtonText: 'Continuar',
      })
    }

  }

  function nextStep() {
    setStep(step => step + 1)
    if (STICKS_BY_STEP[step + 1].instructions) {
      setSelectedInstruction(STICKS_BY_STEP[step + 1].instructions[0])

    }
    if (step >= 0) {
      const html = STICKS_BY_STEP[step + 1].alert;
      if (STICKS_BY_STEP[step + 1].exerciseNumber) {
        showExample(html, STICKS_BY_STEP[step + 1].exerciseNumber);
      } else {
        showExample(html, null);
      }
    }
  }

  function nextInstruction() {
    const instructionsLength = STICKS_BY_STEP[step].instructions.length;
    if (selectedInstruction.num < instructionsLength - 1) {
      setSelectedInstruction(STICKS_BY_STEP[step].instructions[selectedInstruction.num + 1])
    }
  }
  function previousInstruction() {
    if (selectedInstruction.num > 0) {
      setSelectedInstruction(STICKS_BY_STEP[step].instructions[selectedInstruction.num - 1])
    }
  }

  return (
    <Fragment>
      {
        droppables.length > 0 &&
        <div style={{ transform: "none!important", zIndex: 1000, backgroundColor: "#fff", position: "absolute", top: "0", height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}> <DragDropContext onDragStart={result => onDragStart(result, droppables)} onDragEnd={result => onDragEnd(result, droppables)} >
          <div style={{ width: "100%", position: "relative", padding: "4rem 3rem 0" }}>

          <div style={{visibility: !visibleInstruction && 'hidden'}}>
          <button
              style={{
                position: "absolute",
                top: "0",
                right: "1rem",
                borderRadius: "50%",
                height: "50px",
                width: "50px",
                border: "none",
                color: "#fff",
                background: "#f3f3f7"
              }}
              onClick={
                (e) => {
                  e.preventDefault();
                  resetStep()
                }
              }>Reset</button>

            <button
              style={{
                position: "absolute",
                top: "0",
                right: "6rem",
                borderRadius: ".5rem",
                height: "50px",
                padding: "0 1rem",
                border: "none",
                color: "#fff",
                background: "green"
              }}
              onClick={
                (e) => {
                  e.preventDefault();
                  nextStep()
                }
              }>Siguiente</button>


            <button style={{
              position: "absolute",
              top: "0",
              right: "13rem",
              borderRadius: ".5rem",
              height: "50px",
              padding: "0 1rem",
              border: "none",
              color: "#fff",
              background: "green"
            }} onClick={(e) => {
              e.preventDefault()
              const html = STICKS_BY_STEP[step].alert;
              if (STICKS_BY_STEP[step].exerciseNumber) {
                showExample(html, STICKS_BY_STEP[step].exerciseNumber);
              } else {
                showExample(html, null);
              }
            }}>Ejemplo</button>

          </div>




                <div style={{
                  position: "absolute",
                  top: "0",
                  left: "1rem",
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  gap: "1rem"

                }}>

                  <button
                    style={{
                      height: "60px",
                      width: "60px",
                      border: "none",
                      borderRadius: "50%",
                      color: "#fff"

                    }}
                    onClick={
                      (e) => {
                        e.preventDefault();
                        setVisibleInstruction(prevValue => !prevValue)
                      }
                    }>Ocultar</button>

                    {
                      STICKS_BY_STEP[step].instructions && 
                      STICKS_BY_STEP[step].instructions.length > 1 && 
                      <div>
                        <button style={{ margin: "0 .5rem", border: "none", background: "transparent", visibility: !visibleInstruction && 'hidden'}} onClick={
                          (e) => {
                            e.preventDefault();
                            previousInstruction();
                          }
                        } ><img src="/images/arrow-previous.png"/></button>

                        <button style={{ border: "none", background: "transparent", visibility: !visibleInstruction && 'hidden' }} onClick={
                          (e) => {
                            e.preventDefault();
                            nextInstruction();
                          }
                        }><img src="/images/arrow-next.png"/></button>
                      </div>
                    }
                    
      
                </div>




            {
              selectedInstruction && <h6
                style={{
                  height: "60px",
                  border: "1px solid #ccc",
                  borderRadius: ".5rem",
                  padding: ".7rem",
                  margin: "1rem",
                  color: "#444",
                  visibility: !visibleInstruction && 'hidden'
                }}
              >
                {selectedInstruction.description}
              </h6>
            }

            <div style={{ display: 'flex', borderBottom: "2.5rem solid black", width: "80%", margin: "0 auto", justifyContent: "space-evenly" }}>
              <div style={{ width: "100px", margin: '8px', display: "flex", justifyContent: "space-around" }}>
                <Droppable droppableId={droppables[0].id} verticalAlignment='bottom' isDropAnimating={false} reta={true} ignoreContainerClipping >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        height: "280px",
                        width: "50px",
                        margin: "0 auto",
                        paddingTop: droppables[0].items.length == 1 ? `calc(66px * 2)` : droppables[0].items.length === 2 ? `calc(66px * 1)` : droppables[0].items.length == 3 ? `0` : 0,
                        marginBottom: "-0.3rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "end",
                        position: "relative",

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
                                  height: '50px',
                                  width: '50px',
                                  borderRadius: '50%',
                                  margin: '1rem auto',
                                  background: item === "AZ" ? '#3e98eb' : item === "R" ? '#f34a4a' : item === 'AM' ? '#f0f019' : 'white',
                                  color: "transparent",
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
                      <h3 className='stick-number'>3</h3>
                    </div>
                  )}
                </Droppable>
              </div>
              <div style={{ width: "100px", margin: '8px', display: "flex", justifyContent: "space-around" }}>
                <Droppable droppableId={droppables[1].id} verticalAlignment='bottom' isDropAnimating={false} reta={true} ignoreContainerClipping >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        height: "280px",
                        width: "50px",
                        margin: "0 auto",
                        paddingTop: droppables[1].items.length == 1 ? `calc(66px * 2)` : droppables[1].items.length === 2 ? `calc(66px * 1)` : droppables[1].items.length == 3 ? `0` : 0,
                        marginBottom: "-0.3rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "end",
                        position: "relative",
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
                                  height: '50px',
                                  width: '50px',
                                  borderRadius: '50%',
                                  margin: '1rem auto',
                                  background: item === "AZ" ? '#3e98eb' : item === "R" ? '#f34a4a' : item === 'AM' ? '#f0f019' : 'white',
                                  color: "transparent",
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
                      <h3 className='stick-number'>2</h3>
                    </div>
                  )}

                </Droppable>
              </div>
              <div style={{ width: "100px", margin: '8px', display: "flex", justifyContent: "space-around" }}>
                <Droppable max={1} droppableId={droppables[2].id} verticalAlignment='bottom' isDropAnimating={false} reta={true} ignoreContainerClipping >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        height: "280px",
                        width: "50px",
                        margin: "0 auto",
                        paddingTop: droppables[2].items.length == 1 ? `calc(66px * 2)` : droppables[2].items.length === 2 ? `calc(66px * 1)` : droppables[2].items.length == 3 ? `0` : 0,
                        marginBottom: "-0.3rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "end",
                        position: "relative",
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
                                  height: '50px',
                                  width: '50px',
                                  borderRadius: '50%',
                                  margin: '1rem auto',
                                  background: item === "AZ" ? '#3e98eb' : item === "R" ? '#f34a4a' : item === 'AM' ? '#f0f019' : 'white',
                                  color: "transparent",
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
                      <h3 className='stick-number'>1</h3>
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        </DragDropContext>

{/* 
          <div>


            <button onClick={
              (e) => {
                e.preventDefault();
                if (step > 0) {
                  setStep(step => step - 1)
                }

              }
            }>-</button>
            {step}
            <button
              onClick={
                (e) => {
                  e.preventDefault();
                  nextStep()
                }
              }>+</button>

          </div> */}


        </div>

      }
    </Fragment>
  );

}