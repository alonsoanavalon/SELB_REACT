import {useState, useEffect, Fragment} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import axios from 'axios'
import { del, get, set, update, getMany} from 'idb-keyval';
import Cookies from 'universal-cookie'
/* Styles */
import './App.css';
import './css/styles.css'
/* Components */
import Users from './Users'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import Aside from './components/Aside'
import UserPage from './pages/UserPage.js'
import Login from './pages/Login';
import Navbar from './components/Navbar'
import StudentList from './pages/StudentList'
import TejasLee from './pages/TejasLee';
import Calculo from './pages/Calculo';
import Excel from './pages/Excel';
import Parents from './pages/Parents';
import ParentsForm from './pages/ParentsForm';

const cookies = new Cookies();

function App() {

  const [userId, setUserId] = useState()
  const [isLogged, setIsLogged] = useState(false)
  const [isArray, setIsArray] = useState()

  function getData (data) {
    let firstTime = true;

    if (navigator.onLine && firstTime) {
      firstTime = false;
      del(data)
      let url = /* `http://localhost:3500/${data}` || */ `https://selb.bond/${data}`
      axios(url)
      .then(res => {
        set(data, res.data)
      })
    }
  }

  function postDataInDatabase () {
    if(navigator.onLine) {
      console.log("Ahora vamos a guardar los datos")
      get('newUsers')
      .then(users => {
      
        if (users) {
          console.log("guardando")
          fetch("https://selb.bond/test", {
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body: JSON.stringify(users) 
          })
          del('newUsers')
        } else {
          console.log("no hay nada q guardar")
        }

      })
      .then(res => console.log(res))
      .catch(err => console.log(err))

    } else {
      console.log("Ahora no vamos a guardar los datos, navegador offline")
    }
  }



  useEffect(() => { 



    
    


    if (!cookies.get('id') && (window.location.pathname !== "/login")) {
      window.location.href='/login'
      setIsLogged(false)
    } else if (cookies.get('id')) {
      setIsLogged(true)
    }

    postDataInDatabase()
    getData('instruments')
    getData('schools')
    getData('students')
    getData('instrument/1')
    getData('instrument/2')
    getData('studies')
    getData('courses')
    getData('sdq')

    get('userData').then(res => {
      setUserId(res.id)

  })

  /* Arreglar esto */

    if (navigator.onLine) {
      if (userId !== undefined) {

        axios({
            method: 'get',
            url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
            params: {
                instrument:1,
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
                  instrument:2,
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
                instrument:3,
                user: userId
            }
          })
          .then(
                
               res => {
                  set('sdqLength', res.data[0]['COUNT(*)'])
              }
              )
      }
        }      



    get('completedTests')
    .then(res => {
      if (res === undefined) {
        set('completedTests', [])
      }
    })


/*     window.onpopstate = e => {
      
      const message =
        "Are you sure you want to leave? All provided data will be lost.";
      e.returnValue = message;
      let exitConfirm = window.confirm("Desea salir?")
      exitConfirm && e.preventDefault();
      return message;
    } */

    function saveInstrumentOnline() {
      let choices = {}
      let instrumentInfo = {}
      let choicesArray = []

      let testDataArray = ['selectedStudent', 'userData']

      getMany(testDataArray).then(([firstVal, secondVal]) =>  {
          instrumentInfo['user_id'] = parseInt(secondVal['id'])
          instrumentInfo['student_id'] = parseInt(firstVal)
          instrumentInfo['date'] = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
      }
      );

      choicesArray.push(instrumentInfo)

      let allInstruments = document.querySelectorAll('.instrument-form')
      allInstruments.forEach(instrument => {
          let key;
          let value;
          if (instrument['Precalculo']) {
              key = instrument['key'].value
              value= instrument['Precalculo'].value
              choices[key] =  value
          } else if (instrument['Precalculo-selected']) {
              key = instrument['key'].value
              value= instrument['Precalculo-selected'].value
              choices[key] =  value
          } else if (instrument['Precalculo-counted']) {
              key = instrument['key'].value
              value= instrument['Precalculo-counted'].value
              choices[key] =  value
          } else if (instrument['Precalculo-cardinal']) {
              key = instrument['key'].value
              value= instrument['Precalculo-cardinal'].value
              choices[key] =  value
          }

          if (instrument['TejasLee']) {
              let key = instrument['key'].value
              let value = instrument['TejasLee'].value
              choices[key] =  value
          }

          if (instrument['SDQ']) {
              let key = instrument['key'].value
              let value = instrument['SDQ'].value
              choices[key] = value
          }

          
      })

      instrumentInfo['instrument'] = parseInt(allInstruments[0]['instrument'].value)

      choicesArray.push(choices)

      console.log(choicesArray)

      get('completedTests')
      .then(response => {

          if (!isArray) {
              if (response.length === undefined) {
                  update('completedTests', (val) => 
                  [response , choicesArray])         
                  setIsArray(true)
              } else if (response.length === 0) {
                  set('completedTests', [choicesArray])
              } else {
                  console.log(response, "Actualizando1")
                  let arrayCounter = 0;
                  response.forEach(array => {
                      
                      if (array[0]['student_id'] === instrumentInfo['student_id'] && array[0]['instrument'] == instrumentInfo['instrument']) {
                          console.log(response, arrayCounter)
                          response.splice(arrayCounter, 1)
                          
              
                      }
                      arrayCounter+= 1

                  })

                  update('completedTests', val => [...response, choicesArray])

                  
              }
          } else {
              console.log(response, "Actualizando2")
              update('completedTests', val => [...response, choicesArray])

          }


      })   
  }








  }, [userId])




  return (

    <Fragment>

          { isLogged && <Fragment>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/hamburgers/1.1.3/hamburgers.min.css" integrity="sha512-+mlclc5Q/eHs49oIOCxnnENudJWuNqX5AogCiqRBgKnpoplPzETg2fkgBFVC6WYUVxYYljuxPNG8RE7yBy1K+g==" crossOrigin="anonymous" referrerPolicy="no-referrer"/>
            </Fragment>/* {/* } */} 

          <BrowserRouter>
          { isLogged && <Fragment>
            <Navbar/>

         <Aside/>
         </Fragment>}
        <Routes>       
          { isLogged 
          ?  <Route path="/" element={<HomePage/>}></Route>
          : <Route path="/" element={<Login/>}></Route>}  
          
          <Route path="/students" element={<StudentList/>}></Route>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/users/:id" element={<UserPage/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/tejaslee_v1" element={<TejasLee/>}></Route>
          <Route path="/calculo_v1" element={<Calculo/>}></Route>
          <Route path="/excel" element={<Excel/>}></Route>
          <Route path="/parents" element={<Parents/>}></Route>
          <Route path="/sdq_v1" element={<ParentsForm/>}></Route>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      
      </BrowserRouter>


    </Fragment>




  );
}

export default App;
