import {useState, useEffect, Fragment} from 'react'
import './App.css';
import './css/styles.css'
import Users from './Users'
import HomePage from './pages/HomePage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import Aside from './components/Aside'
import UserPage from './pages/UserPage.js'
import { del, get, set } from 'idb-keyval';
import Cookies from 'universal-cookie'
import Login from './pages/Login';
import Navbar from './components/Navbar'
import StudentList from './pages/StudentList'
import axios from 'axios'

const cookies = new Cookies();

function App() {

  if (!cookies.get('id') && (window.location.pathname !== "/login")) {
    window.location.href='/login'
  }

  function getUsers () {
    let firstTime = true;

    if (navigator.onLine && firstTime) {
      firstTime = false;
      del('students')
      
      let url = "http://localhost:3500/getstudents" || "https://selb.bond/getstudents"
      axios(url)
      .then(res => {
        console.log("Esto nos llego: ")
        set('students', res.data)
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
      console.log("Ahora no vamos a guardar los datos, navegador offline  ")
    }
  }

  function getSchools () {

    let firstTime = true;

    if (navigator.onLine && firstTime) {
      firstTime = false;
      del('schools')
      
      let url = "http://localhost:3500/getschools" || "https://selb.bond/getschools"
      axios(url)
      .then(res => {
        console.log("Esto nos llego: ")
        set('schools', res.data)
      })
    }
  }


  useEffect(() => { 

    getUsers()
    postDataInDatabase()
    getSchools()
  
  }, [])


  return (

    <Fragment>
          
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/hamburgers/1.1.3/hamburgers.min.css" integrity="sha512-+mlclc5Q/eHs49oIOCxnnENudJWuNqX5AogCiqRBgKnpoplPzETg2fkgBFVC6WYUVxYYljuxPNG8RE7yBy1K+g==" crossOrigin="anonymous" referrerPolicy="no-referrer"/>
          <BrowserRouter>
          <Navbar/>
         <Aside/>
        <Routes>         
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/students" element={<StudentList/>}></Route>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/users/:id" element={<UserPage/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      
      </BrowserRouter>


    </Fragment>




  );
}

export default App;
