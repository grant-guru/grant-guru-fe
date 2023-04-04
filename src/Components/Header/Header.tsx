import React from "react";
import './Header.css';
// import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks'


const Header: React.FC = () => {
        
    const profile = JSON.parse(localStorage.user)

    // console.log('profile', profile)

    return (
        <div className='header'>
            <div className='user'>
                <img src={profile.attributes.image_url}/>
                <h1>Welcome {profile.attributes.first_name}!</h1>
            </div>
            <nav>
                  <Link to='/form'>Form</Link>
                  <Link to='/saved'>Saves</Link>
                  <Link to='/scholarships'>Scholarships</Link>
                  <Link to='/'>LogOut</Link>
            </nav>
         </div>
    );
};

export default Header;