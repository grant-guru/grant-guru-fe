import React from "react";
import './UserCard.css';
import { useAppDispatch } from "../../app/hooks"
import { setUser } from "../../slices/userSlice";
import { useHistory } from "react-router-dom";
import { apiCalls } from "../../apiCalls";


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

    const createUrlWithQueryParams = (e: any) => {
        // const baseUrl = "https://grant-guru-be.herokuapp.com/api/v1/users/";
        const baseUrl = "https://college-fund-mock-data-api.herokuapp.com/user";
        const url = new URL(baseUrl);
        const queryParams = new URLSearchParams();
    
        queryParams.append("userid", e.target.id);
    
        url.search = queryParams.toString();
    
        return url;
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        apiCalls.getUser(createUrlWithQueryParams(e).toString())
        .then(data => {
            dispatch(setUser(data))
            history.push('/form')
            const user = data.data 
            window.localStorage.setItem('user', JSON.stringify(user))
        })
        .catch(error => {
            console.error('Error fetching user data:', error.message);
        });
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
    
export default UserCard;
