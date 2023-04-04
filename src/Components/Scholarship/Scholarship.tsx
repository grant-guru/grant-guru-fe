import React, { useState } from "react";
import './Scholarship.css';
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addSaved } from "../../slices/savedSlice";

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

    const handleClick = () => {

        // const user = JSON.parse(localStorage.user)


        // fetch(`/api/v1/users/${user.id}/scholarships/${props.id}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        //   })
        //     // .then(response => response.json())
        //     // .then(json => console.log(json))
        //     .catch(err => console.log(err));
    }

    const handleAdd = () => {
        const find = saved.find(save => save.id === props.id)
        if (find === undefined) {
            dispatch(addSaved(props))
        }

    }
    const handleDelete = () => {
        console.log('you clicked the delete button')
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