import React, { useState } from "react";
import './Scholarship.css';
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addSaved } from "../../slices/savedSlice";
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

const Scholarship = (props: CardProps) => {

    const {saved} = useAppSelector(state => state.saved)
    const dispatch = useAppDispatch()

    const handleAdd = () => {
        const find = saved.find(save => save.id === props.id)
        if (find === undefined) {
            dispatch(addSaved(props))
        }
        // apiCalls.addSavedScholarship(user.id, props.id)
        //     .then(json => console.log(json))
        //     .catch(err => console.log(err))
    }

    return (
        <div className="Scholarship">
            <div className="card-image">
                <img src={props.attributes.image_url} alt={props.attributes.title} />
            </div>
            <Link to={`/scholarship/${props.id}`}>
                <h2>{props.attributes.title}</h2>
                <p>Award Amount: ${parseFloat(props.attributes.amount).toLocaleString("en-US")}</p>
            </Link>
            <button onClick={() => handleAdd()}>Save this Scholarship</button>
        </div>
    )
}

export default Scholarship