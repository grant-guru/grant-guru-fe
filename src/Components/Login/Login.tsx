import React from "react";
import './Login.css';
import { useHistory } from 'react-router-dom';



const Login = () => {
    const history = useHistory()
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('clicked')
        fetch('https://college-fund-mock-data-api.herokuapp.com/user')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            history.push('/form')
        })
        .catch(error => console.log(error))
    }
    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Submit</button>
            </form >
        </>
    )
}

export default Login