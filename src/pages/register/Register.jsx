import React, { useRef, useContext } from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom';
import { registerCall } from '../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

function Register() {

    const navigate = useNavigate();
    const { isFetching, dispatch } = useContext(AuthContext);

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const handleClick = async (e) => {
        e.preventDefault();
        if(password.current.value !== passwordAgain.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!");
            alert("Passwords don't match!");
        }
        else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };
            try{
                // Use registerCall which handles token storage
                await registerCall(user, dispatch);
                
                // Navigate to home page after successful registration
                navigate('/');
            }
            catch(err){
                console.log(err);
                const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
                alert(errorMessage);
            }
        }
    };

  return (
    <div className='register'>
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">SociaMed</h3>
                <span className="registerDesc">Connect with friends and the World around you on Sociamed</span>
            </div>
            <div className="registerRight">
                <form className="registerBox" onSubmit={handleClick}>
                    <input type="text" placeholder='username' className="registerInput" required ref={username} />
                    <input type="email" placeholder='Email' className="registerInput" required ref={email}/>
                    <input type="password" placeholder='Password' className="registerInput" minLength={6} required ref={password}/>
                    <input type="password" placeholder='Password again' className="registerInput" required ref={passwordAgain}/>
                    <button className="registerButton" type='submit' disabled={isFetching}>
                        {isFetching ? <CircularProgress color='inherit' size="30px"/> : "Sign Up"}
                    </button>
                    <Link to='/login' style={{textDecoration: 'none',alignSelf:"center"}}>
                        <button className="registerRegisterButton" disabled={isFetching}>Log Into Account</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register
