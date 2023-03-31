import React from "react";
import './UserCard.css';
import { useAppDispatch } from "../../app/hooks"
import { setUser } from "../../slices/userSlice";
import { useHistory } from "react-router-dom";

interface UserCardProps {
    id: string,
    type: string,
    attributes: {
        first_name: string,
        last_name: string,
        image_url: string
    }
}

const UserCard = (props: UserCardProps) => {
    const dispatch = useAppDispatch()
    const history = useHistory()

    const handleClick = (e: any) => {
        e.preventDefault();
        console.log('clicked')
        console.log('userID: e.t.id', e.target.id)
        const userID = e.target.id
        fetch('https://college-fund-mock-data-api.herokuapp.com/user')
        .then(response => response.json())
        .then(data => {
            dispatch(setUser(data))
            console.log("this is the fetch data",data)
            history.push('/form')
        })
        .catch(error => console.log(error))
    }

    return(
        <>
            <div onClick={handleClick} className="user-card-container" id={props.id}>
                    <img src={props.attributes.image_url} alt="user profile" id={props.id}/>
                    <h2 id={props.id}>{props.attributes.first_name} {props.attributes.last_name} </h2>
            </div>
        </>
    )
}
    
export default UserCard