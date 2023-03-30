import React from "react";
import './Header.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <div className='header'>
            <h1>Welcome User!</h1>
            <nav>
                  <Link to='/form'>Form</Link>
                  <Link to='/scholarships'>Saves</Link>
                  <Link to='/saved'>Scholarships</Link>
            </nav>
         </div>
    );
};

export default Header;