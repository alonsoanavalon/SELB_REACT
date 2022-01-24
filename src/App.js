import {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import './css/styles.css'
import {Navbar, Nav, Container} from 'react-bootstrap';
import Test from './components/Test';
import Home from './Home'
import About from './About'
import Users from './Users'
import HomePage from './pages/HomePage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import NavBar from './components/Navbar'
import UserPage from './pages/UserPage.js'
import { del, get } from 'idb-keyval';


function App() {


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
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      
      </BrowserRouter>


  );
}

export default App;
