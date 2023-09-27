import React, {Fragment, useEffect, useState} from 'react';
import Swal from 'sweetalert2'
import { ReportPanelContainer, ReportButton, OtherButton, Container } from './style.js';
import { get, set, del } from 'idb-keyval';
import axios from 'axios';
import { ROLES } from '../components/constants.js';
export default function ReportPanel () {

    const [role, setUserRole] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [listParents, setListParents] = useState(null)

    const openReports = () => {
        if (role === ROLES.ADMIN || role === ROLES.TEACHER) {
            window.location.href = '/school-selector'
        } else if (role === ROLES.PARENT) {
            debugger
            //aca tambien ver el tema de multiples niños
            window.location.href = `/charts/${listParents[0].rut}`
        }
    }

    function getData(data) {
      let firstTime = true;
  
      if (navigator.onLine && firstTime) {
        firstTime = false;
        del(data)
        let url =  /*`http://localhost:3500/${data}` ||*/  `https://selb.bond/${data}`
        axios(url)
          .then(res => {
            set(data, res.data)
          })
      }
    }

    function getDataParents(data) {
        let firstTime = true;
    
        if (navigator.onLine && firstTime) {
          firstTime = false;
          del(data)
          let url =  /*`http://localhost:3500/${data}` ||*/  `https://selb.bond/${data}`
          axios(url)
            .then(res => {
                //aca cambiar cuando sea mas de un estudiante por apoderado
                if (res.data.length > 0) {
                    setListParents(res.data)
                    set('listparents',res.data)

                } else {
                    set('listparents',[])
                }

            })
        }
      }

    useEffect(async () => {
        const role = await get('userRole')
        if (role) {
            setUserRole(role);
        }
    }, [])

    useEffect(async () => {
        const userData = await get('userData')
        if (userData) {
            
            getDataParents(`listparents/${userData.email}`)
        }
    }, [])



    useEffect(async () => {
        getData('instruments')
        getData('moments')
        getData('schools')
        getData('students')
        getData('instrument/1')
        getData('instrument/2')
        getData('instrument/4')
        getData('instrument/5')
        getData('studies')
        getData('courses')
        getData('sdq')
        getData('studies/active')

    
    }, [])

    return (
        <Fragment>
            <Container>
    
            <ReportPanelContainer style={{cursor:"pointer"}}>
                <ReportButton onClick={openReports}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                    <h3>Información y datos</h3>
                    <p style={{fontSize:".9rem"}}>En esta sección encontrarás reportes e información sobre las habilidades evaluadas</p>
                    </div>
  
                </ReportButton>
                <OtherButton>
                <div style={{display:"flex", flexDirection:"column", padding:"1rem"}}>
                    <h3>Tutorial</h3>
                    <p style={{fontSize:".9rem"}}>Aquí encontrarás un tutorial para familiarizarte con la app</p>
                    </div>
                </OtherButton>
                <OtherButton>
                <div style={{display:"flex", flexDirection:"column", padding:"1rem"}}>
                    <h3>Novedades</h3>
                    <p style={{fontSize:".9rem"}}>Entérate de información relevante sobre el proyecto</p>
                    </div>
                </OtherButton>
                <OtherButton>
                <div style={{display:"flex", flexDirection:"column", padding:"1rem"}}>
                    <h3>Recursos</h3>
                    <p style={{fontSize:".9rem"}}>Revisa los recursos mas importantes de nuestra investigación</p>
                    </div>
                </OtherButton>
            </ReportPanelContainer>

            </Container>


        </Fragment>
    )
}