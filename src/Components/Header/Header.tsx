import React, { useEffect } from "react";
import './Header.css';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setUser } from "../../slices/userSlice";

const Header: React.FC = () => {

    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('user') !== null && user.id === "") {
            const storedUser = JSON.parse(localStorage.getItem('user') as string);
            dispatch(setUser(storedUser));
        }
    }, []);
    
    return (
        <div className='header'>
            <div className='user'>
                <img src={user.attributes.image_url} />
                <h1>Welcome {user.attributes.first_name}!</h1>
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
