import React, {Fragment, useEffect, useState} from 'react';
import {get, del, set} from 'idb-keyval'
import { useAlert } from 'react-alert'
import axios from 'axios';
import Swal from 'sweetalert2'
export default function Excel () {

    const [moments, setMoments] = useState([]);

    function getData (data) {

        return new Promise((resolve, reject) => {
            let firstTime = true;
    
            if (navigator.onLine && firstTime) {
              del(data)
              let url = /* `http://localhost:3500/${data}` || */ `https://selb.bond/${data}`
              axios(url)
              .then(res => {
                set(data, res.data)
                resolve(true);
              })
            }
        })

      }

    useEffect(() => {
        get('moments').then(data => setMoments(data));
    }, [])

    const generateNewMoment = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Deseas crear un nuevo periodo de evaluacion?',
            html:`<h5 style="padding:1rem">Recuerda: </h5>
            <p>Esto debe realizarse al terminar el actual periodo de evaluación</p>
                <ul>
                    <li style="text-align:start; font-size:.95rem">Asegurate de tener internet</li>
                    <li style="text-align:start; font-size:.95rem">El nuevo periodo de evaluación iniciará el día de mañana</li>
                </ul>
                <b>El periodo de evaluación actual se dará por finalizado y se creará uno nuevo</b>
                <p style="margin-top:.8rem; border-radius:.4rem; padding:.5rem; background-color:#ddd; font-size:.8rem; color:#333;">Al darse por finalizado el periodo de evaluación actual, las próximas evaluaciones se guardarán en el nuevo periodo de evaluación</p>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
                 axios({
                    method: 'post',
                    url:  /* 'http://localhost:3500/admin/moments' || */ 'https://selb.bond/admin/moments',
                    data: {
                        "moments":moments
                    }
                })
                .then(
                    async (res) => {
                        if (res.status === 200) {
                            debugger;
                            const updateMoments = await getData('moments');
                            if (updateMoments) {
                                window.location.reload();
                            }
                            
                        }
                    }
                ) 
            }
          })
    }

    return (
        <Fragment>
    
            { moments.length > 0 &&
             <table class="table table-moments">
             <thead class="thead-dark">
             <h2>Momentos</h2>
                 <tr>
      
                 <th scope="col">Desde</th>
                 <th scope="col">Hasta</th>
                 </tr>
             </thead>
             <tbody>
                { moments.map((moment) =>
                <tr>
                
                    <td>{moment.begin.slice(0, 10)}</td>
                    <td>{moment.until.slice(0,10)}</td>

                </tr>
                 )}

             </tbody>
             <input class="btn btn-primary mt-" id="moment-btn" onClick={generateNewMoment} type="submit" value="Crear momento" />
         </table> 
         }
           
        </Fragment>
    )
}