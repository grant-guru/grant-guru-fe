import React, { useEffect } from "react";
import './Library.css';
import Header from "../Header/Header";
import Scholarship from "../Scholarship/Scholarship";
import { useAppSelector } from '../../app/hooks';
import { stat } from "fs/promises";
import Saved from "../Saved/Saved";
import Error from "../Error/Error";

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

    const { scholarshipsError } = useAppSelector(state => state.error.error)
    const { savedError } = useAppSelector(state => state.error.error)
    const {filtered} = useAppSelector(state => state.scholarships)
    const {saved} = useAppSelector(state => state.saved)

    useEffect(() => {
            
    }, [filtered, saved])


    if (scholarshipsError) {
        return (
            <Error errorMessage={scholarshipsError}/>
        )
    } else if (savedError) {
        return (
            <Error errorMessage={savedError}/>
        )
    } else {
        
        const scholarshipCards = filtered?.map(scholarship => <Scholarship key={scholarship.id} {...scholarship} type={props.card}/>)
        const savedCards = saved?.map(scholarship => <Saved key={scholarship.id} {...scholarship} type={props.card}/>)
    
        const determineRender = () => {
            if(props.card === 'scholarships') {
                return filtered.length > 0 ? scholarshipCards : <p>No scholarships available.</p>
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
};

export default Library