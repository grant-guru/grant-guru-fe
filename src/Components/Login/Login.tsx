import React from "react";
import './Login.css';
import UserCard from "../UserCard/UserCard";
import { users } from "../../data/data";

const Login = () => {

    const UserCards = users.map((user: any) => {
        return <UserCard key={user.id} id={user.id} type={user.type} attributes={user.attributes} />
    })

    return(
        <div className="login-container">
            <div className="welcome-login">
                <h1>Welcome to Grant Guru!</h1>
                <h2 className="p-tag">Choose Your Profile</h2>
            </div>
            <div className="user-cards-container">
                {UserCards}
            </div>
        </div>
    )
}

export default Login