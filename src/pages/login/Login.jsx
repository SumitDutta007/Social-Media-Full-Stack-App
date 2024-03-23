import React, { useRef, useContext } from 'react'
import './login.css'
import { loginCall } from '../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Login() {

    const username = useRef();
    const password = useRef();
    const {user,isFetching,error,dispatch} = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault()
        loginCall({ username: username.current.value, password: password.current.value }, dispatch)
    }

  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SociaMed</h3>
                <span className="loginDesc">Connect with friends and the World around you on Sociamed</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input type="text" placeholder='username' className="loginInput" required ref={username}/>
                    <input type="password" placeholder='Password' className="loginInput" required ref={password}/>
                    <button className="loginButton" type='submit' disabled={isFetching}>{isFetching?<CircularProgress color='inherit' size="30px"/>:"Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton">{isFetching?<CircularProgress color='inherit' size="30px"/>:"Create new account"}</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login