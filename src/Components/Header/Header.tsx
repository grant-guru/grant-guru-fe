import React from "react";
import './Header.css';
import {Link} from 'react-router-dom';

const Header = () => {
    return(
        <>
            <Link to={'/saved'}>
                <button>saved</button>
            </Link >

            
        </>
    )
}

export default Header