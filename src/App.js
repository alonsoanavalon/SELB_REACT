import { useState, useEffect, Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { del, get, set } from 'idb-keyval';
import Cookies from 'universal-cookie';
/* Styles */
import './App.css';
import './css/styles.css';
/* Components */
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Aside from './components/Aside'
import Login from './pages/Login';
import Navbar from './components/Navbar'
import NavBarJapi from './components/NavbarJapi';
import StudentList from './pages/StudentList'
import TejasLee from './pages/TejasLee';
import Calculo from './pages/Calculo';
import Excel from './pages/Excel';
import Respaldo from './pages/Respaldo'
import Parents from './pages/Parents';
import ParentsForm from './pages/ParentsForm';
import Aces from './pages/Aces';
import Fonologico from './pages/Fonologico';
import Wally from './pages/Wally';
import Corsi from './pages/Corsi'
import Moments from './pages/Moments'
import Desarrollo from './components/Desarrollo';
import HNF from './pages/Hnf';
import Torre from './components/Torre';
import Esc from './components/Esc'; import ReportPanel from './pages/ReportPanel'
import SchoolSelector from './pages/SchoolSelector';
import Charts from './pages/charts/Charts';
import StudentSelector from './pages/StudentSelector';
import SessionsByCourse from './pages/SessionsByCourse';
import ActivitiesBySessionAndCourse from './pages/ActivitiesBySessionAndCourse'
import ExercisesByStudentActivity from './pages/ExercisesByStudentActivity';
import ActivitiesBySessionAndStudent from './pages/ActivitiesBySessionAndStudent';
import { ROLES } from './components/constants';
import AsideJapi from './components/AsideJapi';


const cookies = new Cookies();

function App() {

  const [userId, setUserId] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState();


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

  useEffect(async () => {

    const user = await get('userData')

    if (user) {
      setUserId(user.id)
      setUserRole(user.role)
      set('userRole', user.role)
    }

  }, [])

  useEffect(() => {
    get('schools').then((
      val => window.localStorage.setItem('schools', JSON.stringify(val))
    ))
    get('courses').then((
      val => window.localStorage.setItem('courses', JSON.stringify(val))
    ))
    get('students').then((
      val => window.localStorage.setItem('students', JSON.stringify(val))
    ))
    get('instruments').then((
      val => window.localStorage.setItem('instruments', JSON.stringify(val))
    ))
    
  }, [])

  useEffect(() => {

    if (!cookies.get('id') && (window.location.pathname !== "/login")) {
      window.location.href = '/login'
      setIsLogged(false)
    } else if (cookies.get('id')) {
      setIsLogged(true)
    }

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


    /* Arreglar esto */

    if (navigator.onLine) {
      if (userId !== undefined) {

        axios({
          method: 'get',
          url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
          params: {
            instrument: 1,
            user: userId
          }
        })
          .then(

            res => {

              set('tejasLength', res.data[0]['COUNT(*)'])
            }
          )
        axios({
          method: 'get',
          url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
          params: {
            instrument: 2,
            user: userId
          }
        })
          .then(

            res => {
              set('calculoLength', res.data[0]['COUNT(*)'])
            }
          )


        axios({
          method: 'get',
          url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
          params: {
            instrument: 3,
            user: userId
          }
        })
          .then(

            res => {
              set('sdqLength', res.data[0]['COUNT(*)'])
            }
          )


        axios({
          method: 'get',
          url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
          params: {
            instrument: 4,
            user: userId
          }
        })
          .then(

            res => {
              set('acesLength', res.data[0]['COUNT(*)'])
            }
          )


        axios({
          method: 'get',
          url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
          params: {
            instrument: 5,
            user: userId
          }
        })
          .then(

            res => {
              set('wallyLength', res.data[0]['COUNT(*)'])
            }
          )

        axios({
          method: 'get',
          url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
          params: {
            instrument: 6,
            user: userId
          }
        })
          .then(

            res => {
              set('corsiLength', res.data[0]['COUNT(*)'])
            }
          )
        axios({
          method: 'get',
          url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
          params: {
            instrument: 7,
            user: userId
          }
        })

          .then(

            res => {
              set('corsiLength', res.data[0]['COUNT(*)'])
            }
          )


        axios({
          method: 'get',
          url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
          params: {
            instrument: 8,
            user: userId
          }
        })
          .then(

            res => {
              set('fonoLength', res.data[0]['COUNT(*)'])
            }
          )




        axios({
          method: 'get',
          url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
          params: {
            instrument: 9,
            user: userId
          }
        })
          .then(

            res => {
              set('torreLength', res.data[0]['COUNT(*)'])
            }
          )


        axios({
          method: 'get',
          url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
          params: {
            instrument: 10,
            user: userId
          }
        })
          .then(

            res => {
              set('escLength', res.data[0]['COUNT(*)'])
            }
          )


          axios({
            method: 'get',
            url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
            params: {
              instrument: 7,
              user: userId
            }
          })
            .then(
  
              res => {
                set('hnfLength', res.data[0]['COUNT(*)'])
              }
            )
      }
    }

    get('completedTests')
      .then(res => {
        if (res === undefined) {
          set('completedTests', [

          ])
        }
      })




  }, [userId])

  useEffect(() => {
    if (isLogged) {
      if (navigator.onLine) {
        window.localStorage.setItem('school-assignation', JSON.stringify([]));
        let url = /* `http://localhost:3500/api/school-assignation/${userId}` ||*/ `https://selb.bond/${userId}`
        axios(url)
          .then(res => {
            window.localStorage.setItem('school-assignation', JSON.stringify(res.data));
          })
      }
    }
  }, [isLogged, userId])




  return (


    <Fragment>

      {
        userRole ? <>
          {(isLogged && userRole === ROLES.ADMIN)
            ?
            <>
              <BrowserRouter>
                <Fragment>
                  <Navbar />

                  <Aside />
                </Fragment>
                <Routes>

                  <Route path="/" element={<HomePage />}></Route>
                  <Route path="/students" element={<StudentList />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/tejaslee" element={<TejasLee />}></Route>
                  <Route path="/calculo" element={<Calculo />}></Route>
                  <Route path="/excel" element={<Excel />}></Route>
                  <Route path="/moments" element={<Moments />}></Route>
                  <Route path="/respaldo" element={<Respaldo />}></Route>
                  <Route path="/parents" element={<Parents />}></Route>
                  <Route path="/report-panel" element={<ReportPanel />}></Route>
                  <Route path="/school-selector" element={<SchoolSelector />}></Route>
                  <Route path="/desarrollo" element={<Desarrollo />}></Route>
                  <Route path="/sdq" element={<ParentsForm />}></Route>
                  <Route path="/charts/:studentRut" element={<Charts />}></Route>
                  <Route path="/student-selector" element={<StudentSelector />}></Route>
                  <Route path="/aces" element={<Aces />}></Route>
                  <Route path="/corsi" element={<Corsi />}></Route>
                  <Route path="/hnf" element={<HNF />}></Route>
                  <Route path="/fonologico" element={<Fonologico />}></Route>
                  <Route path="/torre" element={<Torre />}></Route>
                  <Route path="/esc" element={<Esc />}></Route>
                  <Route path="/wally" element={<Wally />}></Route>
                  <Route path="/sessions/course/:id" element={<SessionsByCourse />} />
                  <Route path="/session/:sessionId/course/:courseId/activities" element={<ActivitiesBySessionAndCourse />} />
                  <Route path="/session/course/:courseId/session/:sessionId/activity/:activityId/student/:studentId" element={<ExercisesByStudentActivity />} />
                  <Route path="/session/:sessionId/course/:courseId/student/:studentId" element={<ActivitiesBySessionAndStudent />} />

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>

              </BrowserRouter>
            </>
            : (isLogged && userRole === ROLES.TEACHER) 
            
            ? <>
              <BrowserRouter>
                <Fragment>
                  <NavBarJapi />

                  <AsideJapi />
                </Fragment>
                <Routes>

                  <Route path="/" element={<ReportPanel />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/report-panel" element={<ReportPanel />}></Route>
                  <Route path="/school-selector" element={<SchoolSelector />}></Route>
                  <Route path="/charts/:studentRut" element={<Charts />}></Route>
                  <Route path="/student-selector" element={<StudentSelector />}></Route>
                  <Route path="/sessions/course/:id" element={<SessionsByCourse />} />
                  <Route path="/session/:sessionId/course/:courseId/activities" element={<ActivitiesBySessionAndCourse />} />
                  <Route path="/session/course/:courseId/session/:sessionId/activity/:activityId/student/:studentId" element={<ExercisesByStudentActivity />} />
                  <Route path="/session/:sessionId/course/:courseId/student/:studentId" element={<ActivitiesBySessionAndStudent />} />

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>

              </BrowserRouter>

              <></>
            </>

            : (isLogged && userRole === ROLES.PARENT) 
            
            ? <>
            <BrowserRouter>
              <Fragment>
                <NavBarJapi />

                <AsideJapi />
              </Fragment>
              <Routes>

                <Route path="/" element={<ReportPanel />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/report-panel" element={<ReportPanel />}></Route>
                <Route path="/school-selector" element={<SchoolSelector />}></Route>
                <Route path="/charts/:studentRut" element={<Charts />}></Route>
                <Route path="/student-selector" element={<StudentSelector />}></Route>
                <Route path="/sessions/course/:id" element={<SessionsByCourse />} />
                <Route path="/session/:sessionId/course/:courseId/activities" element={<ActivitiesBySessionAndCourse />} />
                <Route path="/session/course/:courseId/session/:sessionId/activity/:activityId/student/:studentId" element={<ExercisesByStudentActivity />} />
                <Route path="/session/:sessionId/course/:courseId/student/:studentId" element={<ActivitiesBySessionAndStudent />} />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>

            </BrowserRouter>

            <></>
          </>
            : <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
          }


        </>

          :

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
      }




    </Fragment>




  );
}

export default App;
