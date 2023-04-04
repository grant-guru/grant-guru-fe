import React, { useEffect, useState } from "react";
import './Library.css';
import Header from "../Header/Header";
import Scholarship from "../Scholarship/Scholarship";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { stat } from "fs/promises";
import Saved from "../Saved/Saved";
import { setScholarships } from "../../slices/scholarshipsSlice";
import { apiCalls } from "../../apiCalls";


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
    const {scholarships} = useAppSelector(state => state.scholarships)
    console.log("HERE are scholarships",scholarships)
    const {saved} = useAppSelector(state => state.saved)
    const dispatch = useAppDispatch()
    const [ fetching,setFetching ] = useState(false) 

    
    useEffect(() => {
        if (!fetching && scholarships.length === 0) {
            apiCalls.getScholarships()
                .then(data => {
                    console.log("data from Library fetch", data);
                    dispatch(setScholarships(data.data));
                    setFetching(true)
                });
        }
    }, [dispatch, scholarships.length, fetching]);


    
    console.log("localStorage.scholarships",localStorage.scholarships)
    if (scholarships.length === 0  && localStorage.scholarships.length > 0) {
        dispatch(setScholarships(JSON.parse(localStorage.scholarships)))
    }

    // const scholarships: Array<Scholarship> = JSON.parse(localStorage.scholarships)
    // const favorites: Array<Scholarship> = JSON.parse(localStorage.saved)
    if (scholarships.length === 0) {return <p>No scholarships available.</p>}

    const scholarshipCards = scholarships.map(scholarship => <Scholarship key={scholarship.id} {...scholarship} type={props.card}/>)
    const savedCards = saved.map(scholarship => <Saved key={scholarship.id} {...scholarship} type={props.card}/>)

    const determineRender = () => {
        if(props.card === 'scholarships') {
            return scholarshipCards.length > 0 ? scholarshipCards : <p>No scholarships available.</p>
        } else {
            return savedCards.length > 0 ? savedCards : <p>No saved scholarships available.</p>
        }
    }
    
    return(
        <>
            <Header />
            <div className="Library">
                {determineRender()}
            </div>
        </>
    )
}

export default Library