import React, {useState} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import md5 from 'md5'
import { set } from 'idb-keyval'
import { WelcomeMessage } from './style.js'

const cookies = new Cookies();


export default function Login () {

  

    const [isLogin, setIsLogin] = useState('')


    

      function validateLogin (e) {
        e.preventDefault()
        let loginForm = document.querySelector("#loginForm")
        let loginFormData = new FormData(loginForm)

        let user = {
            username: loginFormData.get('username'),
            password: loginFormData.get('password')
        }

        let url = /* "http://localhost:3500/login" || */ "https://selb.bond/login"

        axios(url, {
            params: {
                email:user.username,
                password:md5(user.password)
            }
        })
        .then(response => {


          return response.data
        })
        .then(data => {
          if (!data.status) {

            setIsLogin(false)
          } else {

            set('userData', {
              id : data.id,
              name: data.name,
              surname: data.surname,
              role: data.role,
              email: data.email
            })
            cookies.set('id', data.id, {path:"/", sameSite: 'lax', maxAge: 31536000 })
            cookies.set('email', data.email, {path:"/" ,sameSite: 'lax', maxAge: 31536000 })
            setIsLogin(true)
            window.location.href = "/"
          }
        })

/*         if (user.username == "admin" && user.password == "admin") {
            setIsLogin(true)
            navigate('/')
        } else {
            setIsLogin(false)
        } */

      }


      return (

   

            <div className="signin">
              <form name="loginForm" id="loginForm" className="signin-form">
                <WelcomeMessage>
                <h2 style={{textAlign:"center"}}>El equipo de Japi le da la bienvenida
</h2>
<h4 style={{textAlign:"center"}}>Acceda a su cuenta completando sus credenciales</h4>
<br></br>
<h6>Al iniciar sesión encontrará:</h6>
  <h5 style={{color: "#fff", fontWeight:"bold"}}>Educadores</h5>

<ol>
  <li>Información de avance en Japi de su curso y de cada uno de los estudiantes</li>
  <li>Información del desarrollo de las habilidades que sus estudiantes han practicado
durante Japi</li>
<li>Resultados de la evaluación de habilidades medidas en los estudiantes</li>
</ol>


<h5 style={{color: "#fff", fontWeight:"bold"}}>Apoderados</h5>

<ol>
  <li>Información de avance en Japi de su hijo/a o pupilo/a</li>
  <li>Información del desarrollo de las habilidades que su hijo/a o pupilo/a ha practicado
durante Japi</li>
<li>Resultados de la evaluación de habilidades medidas en su hijo/a o pupilo/a</li>
</ol>


                </WelcomeMessage>
                <img src="/logo.png" alt="logo"/>
                <h2 className="signin-title">Ingreso</h2>
                <input type="text" name="username" placeholder='Username'/>
                <input type="password" name="password" placeholder='Password'/>
                              

              {
                isLogin === false &&
                <div className="alert alert-warning" role="alert">Datos incorrectos</div>
              }

                <button
              id="signin-button"
              className='btn btn-primary'
              onClick={validateLogin}
              > Ingresar </button>

              </form>


            </div>



      )

}