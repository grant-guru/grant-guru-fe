import React from "react";
import './ScholarshipDetail.css';
import Header from "../Header/Header";

interface DetailProps {
    id: string
}

const ScholarshipDetail = (props: DetailProps) => {

    // use match param id to find the correct scholarship and display its info

    // use the find iterator to look through global state scholarships
    // when found, store that in a variable

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
    
export default ScholarshipDetail