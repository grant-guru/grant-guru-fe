import React from "react";
import './Form.css';
import {Link} from 'react-router-dom';

const Form = () => {
    return (
        <>
            <form>
                <Link to={'/scholarships'}><button>Form submit for demographics</button>
                </Link>
            </form>

        </>

    )
}

export default Form