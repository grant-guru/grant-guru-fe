import React, { useState } from "react";
import './Login.css';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../slices/userSlice";

const Login = () => {
    const history = useHistory()
    const dispatch = useAppDispatch()

    const [username, setUsername] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('clicked')

        fetch('https://college-fund-mock-data-api.herokuapp.com/user')
        .then(response => response.json())
        .then(data => {
            dispatch(setUser(data))
            console.log("this is the fetch data",data)
            console.log("this is the username",username)
            history.push('/form')
        })
        .catch(error => console.log(error))
    }
    const handleInputChange = (e: any) => {
        setUsername(e.target.value)
    }

    return(
        <div className="login-form-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    value={username}
                    onChange={handleInputChange}
                />
                <br />
                <button type="submit">Submit</button>
            </form >
        </div>
    )
}

export default Login