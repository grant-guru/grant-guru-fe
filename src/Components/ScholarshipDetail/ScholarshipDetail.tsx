import React from "react";
import './Scholarship.css';
import Header from "../Header/Header";

const Scholarship = () => {
    return(
        <>
            <Header />
            <div className='scholarshipDetail'>
                <p>scholarship Title</p>
                <ul>All the crtierias</ul>
                <p>$1, 000, 000.00</p>
                <p>Lorem Ipsum something...</p>
               <button>Save Scholarship</button>
            </div>
        </>

    )
}
    
export default Scholarship