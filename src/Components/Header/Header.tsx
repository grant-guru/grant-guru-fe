import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setUser } from "../../slices/userSlice";


const Header: React.FC = () => {
    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    if (user.data === undefined && localStorage.user !== undefined) {
        dispatch(setUser(localStorage.user))
    }

    return (
        <div className='header'>
            <div className='user'>
                <img src={user.data.attributes.image_url}/>
                <h1>Welcome {user.data.attributes.first_name}!</h1>
            </div>
            <nav>
                  <Link to='/form'>Form</Link>
                  <Link className="saves" to='/saved'>Saves</Link>
                  <Link to='/scholarships'>Scholarships</Link>
                  <Link to='/'>LogOut</Link>
            </nav>
         </div>
    );
};

export default Header;