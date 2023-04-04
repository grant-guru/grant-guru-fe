import React from "react";
import './Saved.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { setSaved } from "../../slices/savedSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';

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

    //const {saved} = useAppSelector(state => state.saved)
    const dispatch = useAppDispatch()

    const removeSaved = (scholarshipID: string) => {

        const favorites = JSON.parse(localStorage.saved)
        const newSaved: Array<Scholarship> = favorites.filter((scholarship: Scholarship) => scholarship.id !== scholarshipID)

        window.localStorage.setItem('saved', JSON.stringify(newSaved))
        dispatch(setSaved(newSaved))
    }
    
    const handleClick = () => {

        const user = JSON.parse(localStorage.user)

        // fetch(`/api/v1/users/${user.id}/scholarships/${props.id}`, {
        //     method: 'DELETE',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        //   })
        //     .then(response => {
        //       if (!response.ok) {
        //         throw new Error('Something went wrong')
        //       } 

        //       removeSaved(props.id)
        //     })
        //     .catch(err => console.log(err))
        removeSaved(props.id)
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