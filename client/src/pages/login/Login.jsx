import './login.css'
import { useContext, useRef } from "react";
import { loginCall } from "../../utils/apiCalls"
import { AuthContext } from '../../context/AuthContext';

import { CircularProgress } from '@mui/material';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
    };

    console.log(user) 
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social Media</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on  Social Media.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            placeholder="Email"
                            className="loginInput"
                            type='email'
                            ref={email} />
                        <input
                            placeholder="Password"
                            className="loginInput"
                            type='password'
                            minLength="6"
                            ref={password} />
                        <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress /> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password</span>
                        <button className="loginRegisterButton">Create new account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login