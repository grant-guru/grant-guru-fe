import React from "react";
import './Saved.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { setSaved, deleteSaved } from "../../slices/savedSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { apiCalls } from "../../apiCalls";

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

interface Scholarship {
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

    const dispatch = useAppDispatch()
    
    const handleDelete = () => {

        // apiCalls.deleteSavedScholarship(user.id, props.id)
        //     .then(() => removeSaved(props.id))
        //     .catch(err => console.log(err))

        dispatch(deleteSaved(props))
    }

    return (
        <div className="Saved">
            <div className="card-image">
                <img src={props.attributes.image_url} alt={props.attributes.title} />
            </div>
            <Link to={`/scholarship/${props.id}`}>
                <h2>{props.attributes.title}</h2>
                <p>Award Amount: ${parseFloat(props.attributes.amount).toLocaleString("en-US")}</p>
            </Link>
            <button onClick={() => handleDelete()}>Remove from Saved</button>
        </div>
    )
}

export default Saved