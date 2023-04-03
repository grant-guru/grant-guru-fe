import React from "react";
import './ScholarshipDetail.css';
import Header from "../Header/Header";
import { useAppSelector } from '../../app/hooks';

interface DetailProps {
    id: string
}

const ScholarshipDetail = (props: DetailProps) => {

    const selectedScholarship = filtered.find(scholarship => scholarship.id === props.id)
 
    return(
        <>
            <Header />
            <div className='scholarshipDetail'>
                {/* <p>{selectedScholarship?.attributes.title}</p> */}
                {/* <ul>All the crtierias</ul>
                <p>$1, 000, 000.00</p>
                <p>Lorem Ipsum something...</p>
               <button>Save Scholarship</button> */}
            </div>
        </>

    )
}
    
export default ScholarshipDetail