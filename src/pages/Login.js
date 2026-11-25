import React, {useState} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { set } from 'idb-keyval'
import { WelcomeMessage } from './style.js'
import { saveSessionToken } from '../services/session'
import { errorCodeFrom } from '../services/passwordRules'
import PasswordForm from '../components/PasswordForm'

const cookies = new Cookies();


export default function Login () {



    const [isLogin, setIsLogin] = useState('')
    // Set when the account must create a new password before entering (SEC-006).
    const [changeToken, setChangeToken] = useState(null)
    const [loginEmail, setLoginEmail] = useState('')


    async function completeLogin (data) {
      await set('userData', {
        id : data.id,
        name: data.name,
        surname: data.surname,
        role: data.role,
        email: data.email
      })
      saveSessionToken(data.token)
      cookies.set('id', data.id, {path:"/", sameSite: 'lax', maxAge: 31536000 })
      cookies.set('email', data.email, {path:"/" ,sameSite: 'lax', maxAge: 31536000 })
      setIsLogin(true)
      window.location.href = "/"
    }

    async function createRequiredPassword ({ newPassword }) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/password/required`, {
          changeToken,
          newPassword
        }, { withCredentials: true })
        await completeLogin(response.data)
        return null
      } catch (error) {
        const code = errorCodeFrom(error)
        if (code === 'CHANGE_PERMIT_INVALID') {
          setIsLogin('expired')
          setChangeToken(null)
        }
        return code || 'UNKNOWN'
      }
    }

      function validateLogin (e) {
        e.preventDefault()
        let loginForm = document.querySelector("#loginForm")
        let loginFormData = new FormData(loginForm)

        let user = {
            username: loginFormData.get('username'),
            password: loginFormData.get('password')
        }

        let url = `${process.env.REACT_APP_API_URL}/login`

        // The typed password goes over HTTPS; the API verifies it (SEC-006 S1).
        axios.post(url, {
            email:user.username,
            password:user.password
        }, {
          withCredentials: true
        })
        .then(response => {


          return response.data
        })
        .then(data => {
          if (data.passwordChangeRequired) {
            setLoginEmail(user.username || '')
            setChangeToken(data.changeToken)
          } else if (!data.status) {

            setIsLogin(false)
          } else {
            return completeLogin(data)
          }
        })
        .catch(error => {
          setIsLogin(error.response && error.response.status === 429 ? 'blocked' : false)
        })

/*         if (user.username == "admin" && user.password == "admin") {
            setIsLogin(true)
            navigate('/')
        } else {
            setIsLogin(false)
        } */

      }


      if (changeToken) {
        return (
          <div className="signin">
            <div className="signin-form">
              <img src="/logo.png" alt="logo"/>
              <h2 className="signin-title">Crea tu nueva contraseña</h2>
              <p>Por seguridad, debes crear una contraseña nueva antes de continuar.</p>
              <PasswordForm email={loginEmail} submitLabel="Guardar y entrar" onSubmit={createRequiredPassword} />
            </div>
          </div>
        )
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
              {
                isLogin === 'expired' &&
                <div className="alert alert-warning" role="alert">El tiempo para crear la contraseña expiró. Vuelve a iniciar sesión.</div>
              }
              {
                isLogin === 'blocked' &&
                <div className="alert alert-warning" role="alert">Demasiados intentos fallidos. Espera 15 minutos e intenta de nuevo.</div>
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