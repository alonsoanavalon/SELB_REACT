import {useState, useEffect} from 'react'
import './App.css';
import './css/styles.css'
import About from './About'
import Users from './Users'
import HomePage from './pages/HomePage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import NavBar from './components/Navbar'
import UserPage from './pages/UserPage.js'
import { del, get } from 'idb-keyval';
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'universal-cookie'
import Login from './pages/Login';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

function App() {

  console.log(window.location.pathname == "/login", "ES ?")

    if (!cookies.get('id') && (window.location.pathname !== "/login")) {
    window.location.href='/login'
  }


  useEffect(() => { 

    if(navigator.onLine) {
      console.log("Ahora vamos a guardar los datos")
      get('newUsers')
      .then(users => {
      
        if (users) {
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



  }, [])



  

  return (

      <BrowserRouter>
         <NavBar/>
        <Routes>
          
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/users/:id" element={<UserPage/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      
      </BrowserRouter>


  );
}

export default App;
