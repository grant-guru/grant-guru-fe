import React from "react";
import './UserCard.css';
import { useAppDispatch } from "../../app/hooks"
import { setUser } from "../../slices/userSlice";
import { useHistory } from "react-router-dom";
import { setUserError } from "../../slices/errorSlice";

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

        const userID = e.target.id

        const url = `https://grant-guru-be.herokuapp.com/api/v1/users/${userID}/`
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const cleanUserData = {
                id: data.data.id,
                type: data.data.type,
                attributes: {
                    first_name: data.data.attributes.first_name,
                    last_name: data.data.attributes.last_name,
                    image_url: data.data.attributes.image_url
                }
            }
            dispatch(setUser(cleanUserData))

            history.push('/form')
            const user = data.data 

            window.localStorage.setItem('user', JSON.stringify(user))
        })
        .catch(error => dispatch(setUserError(error.message)))
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