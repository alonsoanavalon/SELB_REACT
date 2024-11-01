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
import StudentParentSelector from './pages/StudentParentSelector';

import EML from './pages/EML';
import Japi from './pages/Japi';
import StroopNum from './pages/StroopNum';
import StroopCol from './pages/StroopCol';
import Autoconcepto from './pages/Autoconcepto';
import ActMat from './pages/ActMat';
import Cmasr from './pages/Cmasr';
import Clpt from './pages/Clpt';
import ListeningSpan from './pages/ListeningSpan';
import DigitSpan from './pages/DigitSpan';
import RegEmocional from './pages/RegEmocional';
import ActCiencias from './pages/ActCiencias';
import AnsMat from './pages/AnsMat';
import CountSpan from './pages/CountSpan';
import useCheckSession from './hooks/useCheckSession';


const cookies = new Cookies();

function App() {

  const [userId, setUserId] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState();

  useCheckSession({isLogged, userId})

  function getData(data) {
    let firstTime = true;

    if (navigator.onLine && firstTime) {
      firstTime = false;
      del(data)
      let url = `${process.env.REACT_APP_API_URL}/${data}`  

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
          url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
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
          url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
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
          url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
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
          url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
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
          url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
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
              url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
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
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
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
            
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
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
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
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
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
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
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                instrument: 11,
                user: userId
                }
            })
                .then(
    
                res => {
                    set('emlLength', res.data[0]['COUNT(*)'])
                }
                )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                instrument: 12,
                user: userId
                }
            })
                .then(
    
                res => {
                    set('japiLength', res.data[0]['COUNT(*)'])
                }
                )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                    instrument: 13,
                    user: userId
                }
            })
            .then(
                
                res => {
                    set('stroopnumLength', res.data[0]['COUNT(*)'])
                }
            )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                    instrument: 14,
                    user: userId
                }
            })
            .then(
                
                res => {
                    set('stroopcolLength', res.data[0]['COUNT(*)'])
                }
            )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                    instrument: 15,
                    user: userId
                }
            })
            .then(
                
                res => {
                    set('autoconceptoLength', res.data[0]['COUNT(*)'])
                }
            )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                    instrument: 16,
                    user: userId
                }
            })
            .then(
                
                res => {
                    set('actMatLength', res.data[0]['COUNT(*)'])
                }
            )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                    instrument: 17,
                    user: userId
                }
            })
            .then(
                
                res => {
                    set('cmasrLength', res.data[0]['COUNT(*)'])
                }
            )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                    instrument: 20,
                    user: userId
                }
            })
            .then(
                
                res => {
                    set('clptLength', res.data[0]['COUNT(*)'])
                }
            )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                    instrument: 21,
                    user: userId
                }
            })
            .then(
                
                res => {
                    set('listeningSpanLength', res.data[0]['COUNT(*)'])
                }
            )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                    instrument: 22,
                    user: userId
                }
            })
            .then(
                
                res => {
                    set('digitSpanLength', res.data[0]['COUNT(*)'])
                }
            )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                    instrument: 23,
                    user: userId
                }
            })
            .then(
                
                res => {
                    set('regEmocionalLength', res.data[0]['COUNT(*)'])
                }
            )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                    instrument: 24,
                    user: userId
                }
            })
            .then(
                
                res => {
                    set('actCienciasLength', res.data[0]['COUNT(*)'])
                }
            )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                    instrument: 25,
                    user: userId
                }
            })
            .then(
                
                res => {
                    set('ansMatLength', res.data[0]['COUNT(*)'])
                }
            )
            
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_URL}/instrumentlist`,
                params: {
                    instrument: 26,
                    user: userId
                }
            })
            .then(
                
                res => {
                    set('countSpanLength', res.data[0]['COUNT(*)'])
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
    if (isLogged && userId) {
      if (navigator.onLine) {
        window.localStorage.setItem('school-assignation', JSON.stringify([]));
        let url = `${process.env.REACT_APP_API_URL}/api/school-assignation/${userId}`

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
                  <Route path="/eml" element={<EML />}></Route>
                  <Route path="/japi" element={<Japi />}></Route>
                  <Route path="/stroopnum" element={<StroopNum />}></Route>
                  <Route path="/stroopcol" element={<StroopCol />}></Route>
                  <Route path="/autoconcepto" element={<Autoconcepto />}></Route>
                  <Route path="/actMat" element={<ActMat />}></Route>
                  <Route path="/cmasr" element={<Cmasr />}></Route>
                  <Route path="/clpt" element={<Clpt />}></Route>
                  <Route path="/listeningSpan" element={<ListeningSpan />}></Route>
                  <Route path="/digitSpan" element={<DigitSpan />}></Route>
                  <Route path="/regEmocional" element={<RegEmocional />}></Route>
                  <Route path="/actCiencias" element={<ActCiencias />}></Route>
                  <Route path="/ansMat" element={<AnsMat />}></Route>
                  <Route path="/countSpan" element={<CountSpan />}></Route>
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
                <Route path="/student-parent-selector" element={<StudentParentSelector />}></Route>
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
