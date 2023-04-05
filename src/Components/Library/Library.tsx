import React, { useEffect } from "react";
import './Library.css';
import Header from "../Header/Header";
import Scholarship from "../Scholarship/Scholarship";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { stat } from "fs/promises";
import Saved from "../Saved/Saved";
import { setScholarships } from "../../slices/scholarshipsSlice";
import { setSaved } from "../../slices/savedSlice";

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

    const {filtered} = useAppSelector(state => state.scholarships)
    const {saved} = useAppSelector(state => state.saved)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('filtered') !== null && filtered.length === 0) {
            const storedFiltered = JSON.parse(localStorage.getItem('filtered') as string);
            dispatch(setScholarships(storedFiltered));
        }

        if (localStorage.getItem('saved') !== null && filtered.length === 0) {
            const storedSaved = JSON.parse(localStorage.getItem('saved') as string);
            dispatch(setSaved(storedSaved));
        }
    }, []);




    const scholarshipCards = filtered?.map(scholarship => <Scholarship key={scholarship.id} {...scholarship} type={props.card}/>)
    const savedCards = saved?.map(scholarship => <Saved key={scholarship.id} {...scholarship} type={props.card}/>)

    const determineRender = () => {
        if(props.card === 'scholarships') {
            return filtered.length > 0 ? scholarshipCards : <p>No scholarships available.</p>
        } else {
            return savedCards.length > 0 ? savedCards : <p>No saved scholarships available.</p>
        }
    }

    useEffect(() => {
        
    }, [filtered, saved])
    
    return(
        <>
            <Header />
            <div className="Library">
                {determineRender()}
            </div>
        </>
    );
};

export default Library