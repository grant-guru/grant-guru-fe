import React from "react";
import './Scholarship.css';
// import Header from "../Header/Header";

interface CardProps {
    id: string,
    type: string,
    attributes: {
        title: string,
        organization: string,
        amount: string,
        description: string,
        deadline: string,
        education: string,
        state: string,
        women: boolean,
        lgbt: boolean,
        ethnicity: Array<string>,
        veteran: boolean,
        immigrant: boolean,
        url: string,
        image_url: string
    }
}

const Scholarship = (props: CardProps) => {

    return(
        <>
            <h2>{props.attributes.title}</h2>
            <h3>{props.attributes.description}</h3>
            <img src={props.attributes.image_url}/>
            <p>{props.attributes.amount}</p>
            <button>Save this Scholarship</button>
        </>

    )
}
    
export default Scholarship