import React, { useEffect } from "react";
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    // useEffect(() => {
    //     fetch('https://college-fund-mock-data-api.herokuapp.com/user')})
    
    return(
        <>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <Link to={'/Form'}>
                    <button type="submit">Login</button>
                </Link>
            </form>
        </>
    )
}

export default Login