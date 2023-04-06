import React, { useEffect } from "react";
import './Library.css';
import Header from "../Header/Header";
import Scholarship from "../Scholarship/Scholarship";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { stat } from "fs/promises";
import Saved from "../Saved/Saved";
import { setScholarships } from "../../slices/scholarshipsSlice";
import { setSaved } from "../../slices/savedSlice";
import { apiCalls } from "../../apiCalls";
import { setUser } from "../../slices/userSlice";


interface LibraryProps {
    card: string
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

const Library = (props: LibraryProps) => {

    const { filtered } = useAppSelector(state => state.scholarships)
    const { saved } = useAppSelector(state => state.saved)
    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()



    useEffect(() => {
        if (localStorage.getItem('user') !== null && user.id === "") {
            const storedUser = JSON.parse(localStorage.getItem('user') as string);
            dispatch(setUser(storedUser));
        }
        let savedUrl = `https://grant-guru-be.herokuapp.com/api/v1/users/${user.id}/favorites/`
        if (user.id !== "") {
            apiCalls.getSaved(savedUrl)
            .then(data => {
                dispatch(setSaved(data.data))
                window.localStorage.setItem('saved', JSON.stringify(data.data))

            })
        }

    }, [user])

    useEffect(() => {
        if (localStorage.getItem('filtered') !== null && filtered.length === 0) {
            const storedFiltered = JSON.parse(localStorage.getItem('filtered') as string);
            dispatch(setScholarships(storedFiltered));
        }

        if (localStorage.getItem('saved') !== null && saved.length === 0) {
            const storedSaved = JSON.parse(localStorage.getItem('saved') as string);
            dispatch(setSaved(storedSaved));
        }
    }, [saved, filtered]);




    const scholarshipCards = filtered?.map(scholarship => <Scholarship key={scholarship.id} {...scholarship} type={props.card} />)
    const savedCards = saved?.map(scholarship => <Saved key={scholarship.id} {...scholarship} type={props.card} />)

    const determineRender = () => {
        if (props.card === 'scholarships') {
            return filtered.length > 0 ? scholarshipCards : <p>No scholarships available.</p>
        } else {
            return savedCards.length > 0 ? savedCards : <p>No saved scholarships available.</p>
        }
    }


    return (
        <>
            <Header />
            <div className="Library">
                {determineRender()}
            </div>
        </>
    );
};

export default Library