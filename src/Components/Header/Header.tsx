import React, { useState, useEffect } from "react";
import './Header.css';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setUser } from "../../slices/userSlice";
import { resetScholarships } from "../../slices/scholarshipsSlice";

const Header: React.FC = () => {

    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user') !== null && user.id === "") {
            const storedUser = JSON.parse(localStorage.getItem('user') as string);
            dispatch(setUser(storedUser));
        }
    }, [dispatch, user.id]);

    const logOut = () => {
        dispatch(resetScholarships())
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className='header'>
            <div className='user'>
                <Link to='/form'>
                    <img src={user.attributes.image_url} alt="user" />
                    <h2>Welcome {user.attributes.first_name}!</h2>
                </Link>
            </div>
            <h1>Grant Guru</h1>
            <div className="hamburger-container">
                <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <Link className="form-link" to='/form' onClick={toggleMenu}>Form</Link>
                    <Link className="saved" to='/saved' onClick={toggleMenu}>Saved</Link>
                    <Link className="scholarships-link" to='/scholarships' onClick={toggleMenu}>Scholarships</Link>
                    <Link className="logout-link" to='/' onClick={() => { logOut(); toggleMenu(); }}>LogOut</Link>
                </nav>
            </div>

        </div>
    );
};

export default Header;
