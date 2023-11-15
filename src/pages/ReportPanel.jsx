import React, {Fragment, useEffect, useState} from 'react';
import Swal from 'sweetalert2'
import { ReportPanelContainer, ReportButton, OtherButton, Container } from './style.js';
import { get, set, del } from 'idb-keyval';
import axios from 'axios';
import { ROLES } from '../components/constants.js';
import Cookies from 'universal-cookie'


export default function ReportPanel () {

    const [role, setUserRole] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [dataParentsLoaded, setDataParentsLoaded] = useState(false)
    const cookies = new Cookies()

    function logout() {
        cookies.remove('id',{path:'/'})
        cookies.remove('email', {path:'/'})
        window.localStorage.clear()
        window.location.pathname = '/login'
    }

    const openReports = () => {
        debugger
        if (role === ROLES.ADMIN || role === ROLES.TEACHER) {
            window.location.href = '/school-selector'
        } else if (role === ROLES.PARENT) {
            debugger
            const listParents = JSON.parse(window.localStorage.getItem('listparents'))
            debugger;
            if (listParents?.length > 0) {
                if (listParents.length == 1) {
                    window.location.href = `/charts/${listParents[0].rut}`
                } else {
                    window.location.href = '/student-parent-selector'
                }
            } else {
                Swal.fire({
                    title: 'No hay estudiantes asociados a tu cuenta',
                    text: 'Por favor contacta a tu colegio para que te asocie a un estudiante',
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        logout();
                    }
                })
            }
            //aca tambien ver el tema de multiples niños

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
                debugger;
                //aca cambiar cuando sea mas de un estudiante por apoderado
                if (res.data.length > 0) {
                    window.localStorage.setItem('listparents', JSON.stringify(res.data))
                    setDataParentsLoaded(true)

                } else {

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

        setDataLoaded(true)
        

    
    }, [])

    useEffect(() => {

        if (dataLoaded && role){
            debugger
            if (role === ROLES.PARENT && dataParentsLoaded) {

                    openReports()
 
            } else {
                openReports()

            }
        }
    }, [dataLoaded, role, dataParentsLoaded])

    return (
        <Fragment>
            {/* <Container>
    
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

            </Container> */}


        </Fragment>
    )
}