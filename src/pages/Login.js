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
    
      const navigate = useNavigate()

      function validateLogin () {
        
        let loginForm = document.querySelector("#loginForm")
        let loginFormData = new FormData(loginForm)

        let user = {
            username: loginFormData.get('username'),
            password: loginFormData.get('password')
        }

        let url = "https://selb.bond/login"

        axios(url, {
            params: {
                email:user.username,
                clave:md5(user.password)
            }
        })
        .then(response => response.data)
        .then(data => {
          if (!data.status) {
            setIsLogin(false)
          } else {
            set('user', data.id)
            cookies.set('id', data.id, {path:"/"})
            cookies.set('email', data.email, {path:"/"})
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
          <Fragment>
              <form name="loginForm" id="loginForm">
                <input type="text" name="username" placeholder='Username'/>
                <input type="password" name="password" placeholder='Password'/>
              </form>

              {
                isLogin === false &&
                <div className="alert alert-warning" role="alert">Datos incorrectos</div>
              }

            <button
           className='btn btn-primary'
           onClick={validateLogin}
           > Login </button>
          </Fragment>

      )

}