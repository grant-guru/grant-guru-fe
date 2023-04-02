import React from "react";
import './Saved.css';
import { Link } from "react-router-dom";

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

const Saved = (props: CardProps) => {
    
    const handleClick = () => {
        console.log('you clicked the delete button')
    }

    return(
        <>
            <Link to={`/scholarship/${props.id}`}>
                <h2>{props.attributes.title}</h2>
                <h3>{props.attributes.description}</h3>
                <p>{props.attributes.amount}</p>
            </Link>
            <button onClick={() => handleClick()}>Remove from Saved</button>
        </>
    )
}

export default Saved