import {useState, useEffect, Fragment} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
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
import StudentList from './pages/StudentList'
import TejasLee from './pages/TejasLee';
import Calculo from './pages/Calculo';
import Excel from './pages/Excel';
import Respaldo from './pages/Respaldo'
import Parents from './pages/Parents';
import ParentsForm from './pages/ParentsForm';
import Aces from './pages/Aces';
import Wally from './pages/Wally';



const cookies = new Cookies();

function App() {

  const [userId, setUserId] = useState()
  const [isLogged, setIsLogged] = useState(false)

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
              

              axios({
                method: 'get',
                url:/* `http://localhost:3500/instrumentlist` || */ `https://selb.bond/instrumentlist`,
                params: {
                    instrument:4,
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
                instrument:5,
                user: userId
            }
          })
          .then(
                
               res => {
                  set('wallyLength', res.data[0]['COUNT(*)'])
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
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/tejaslee" element={<TejasLee/>}></Route>
          <Route path="/calculo" element={<Calculo/>}></Route>
          <Route path="/excel" element={<Excel/>}></Route>
          <Route path="/respaldo" element={<Respaldo/>}></Route>
          <Route path="/parents" element={<Parents/>}></Route>
          <Route path="/sdq" element={<ParentsForm/>}></Route>
          <Route path="/aces" element={<Aces/>}></Route>
          <Route path="/wally" element={<Wally/>}></Route>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      
      </BrowserRouter>


    </Fragment>




  );
}

export default App;
