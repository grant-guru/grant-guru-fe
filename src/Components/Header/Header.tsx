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
                <Link to='/form'>
                    <img src={user.attributes.image_url} alt="user picture"/>
                    <h2>Welcome {user.attributes.first_name}!</h2>
                </Link>
            </div>
            <h1>Grant Guru</h1>
            <nav>
                <Link className="form-link" to='/form'>Form</Link>
                <Link className="saved" to='/saved'>Saved</Link>
                <Link className="scholarships-link" to='/scholarships'>Scholarships</Link>
                <Link className="logout-link" to='/'>LogOut</Link>
            </nav>
        </div>
    );
};

export default Header;
