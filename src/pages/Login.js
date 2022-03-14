import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import md5 from 'md5'
import { Link, Navigate, Redirect, useNavigate } from 'react-router-dom'
import { render } from 'react-dom'
import { set } from 'idb-keyval'

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
              surname: data.surname
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