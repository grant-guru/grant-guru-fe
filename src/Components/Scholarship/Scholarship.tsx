import React, { useState } from "react";
import './Scholarship.css';
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addSaved, deleteSaved } from "../../slices/savedSlice";
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
    const [isSaved, setSaved ] = useState(saved?.some(save => save.id === props.id))
    const dispatch = useAppDispatch()
    const user = JSON.parse(localStorage.user)

    const handleClick = () => {
        if (!isSaved) {
      setSaved(true);
      apiCalls.addSavedScholarship(user.id, props.id)
          .then((data)=> {
            console.log("POST CONSOLE LOG:", data)
            dispatch(addSaved(props))
          })
          .catch(err => console.log(err))
    } else {
       apiCalls.deleteSavedScholarship(user.id, props.id)
            .then((data) => {
              console.log("DELETE CONSOLE LOG:", data)
              dispatch(deleteSaved(props))
              setSaved(false);
            })
            .catch(err => console.log(err))
            }
        }

    return (
        <div className="Scholarship">
            <Link to={`/scholarship/${props.id}`}>
            <div className="card-image">
                <img src={props.attributes.image_url} alt={props.attributes.title} />
            </div>
                <h2 className="scholarship-title">{props.attributes.title}</h2>
                <p className="scholarship-award">Award Amount: ${parseFloat(props.attributes.amount).toLocaleString("en-US")}</p>
            </Link>
            <button className="scholarship-button" onClick={() => handleClick()} style={{ backgroundColor: isSaved ? "red" : "#006c67ac"}}>{isSaved ? "Remove from Saved" : "Save this Scholarship"}</button>
        </div>
    )
}

export default Scholarship