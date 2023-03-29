import React from "react";
import './Form.css';
import {Link} from 'react-router-dom';
import Header from '../Header/Header';

const Form = () => {
    return (
        <>
        <Header />
            <form>
                <Link to={'/scholarships'}><button>Form submit for demographics</button>
                </Link>
            </form>

        </>

    )
}

export default Form