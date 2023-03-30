import React from "react";
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

    const { saved } = useAppSelector(state => state.saved)

    const dispatch = useAppDispatch()

    const handleClick = () => {
        const find = saved.find(save => save.id === props.id)
        if (find === undefined) {
          dispatch(addSaved(props))
        }
    }

    return(
        <>
            <Link to={`/scholarship/${props.id}`}>
                <h2>{props.attributes.title}</h2>
                <h3>{props.attributes.description}</h3>
                <p>{props.attributes.amount}</p>
            </Link>
            <button onClick={() => handleClick()}>Save this Scholarship</button>
        </>
    )
}
    
export default Scholarship