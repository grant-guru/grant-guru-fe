import React from "react";
import './ScholarshipDetail.css';
import Header from "../Header/Header";
import { useAppSelector } from '../../app/hooks';
import { addSaved } from "../../slices/savedSlice";
import { apiCalls } from "../../apiCalls";

interface DetailProps {
    id: string
}

const ScholarshipDetail = (props: DetailProps) => {

    const { filtered } = useAppSelector(state => state.scholarships)
    
    const selectedScholarship = filtered.find(scholarship => scholarship.id === props.id)

    // const handleClick = () => {

    //     const user = JSON.parse(localStorage.user)

    //     apiCalls.addSaved(user.id, props.id)
    //         .then(json => console.log(json))
    //         .catch(err => console.log(err))
    // }
 
    return(
        <>
            <Header />
            <div className='scholarshipDetail'>
                <h1> {selectedScholarship?.attributes.title} </h1>
                <h3> ${selectedScholarship?.attributes.amount} </h3>
                <p> {selectedScholarship?.attributes.description} </p>
                {/* <button onClick={() => handleClick()}>Save this Scholarship</button> */}
            </div>
        </>

    )
}
    
export default ScholarshipDetail