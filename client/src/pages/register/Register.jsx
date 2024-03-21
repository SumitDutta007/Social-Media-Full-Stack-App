import React, { useRef } from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

    const navigate = useNavigate();

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const handleClick = async (e) => {
        e.preventDefault();
        if(password.current.value !== passwordAgain.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        }
        else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };
            try{
                await axios.post("/auth/register",user);
                navigate('/login');
            }
            catch(err){
                console.log(err);
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
                    <button className="registerButton" type='submit'>Sign Up</button>
                    <Link to='/login' style={{textDecoration: 'none',alignSelf:"center"}}>
                        <button className="registerRegisterButton">Log Into Account</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register