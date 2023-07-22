import { useState, Fragment, useEffect, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2';
import './style.css';
import { CORRECT_ANSWERS, TIME_LIMIT_IN_SECONDS } from './constants';
import {get, update, getMany, set} from 'idb-keyval'

export default function Esc() {

 
  return (
    <>
    <Fragment>
        ESC
    </Fragment>
            </>

  );

}