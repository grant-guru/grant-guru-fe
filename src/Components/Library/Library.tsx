import React, { useEffect } from "react";
import './Library.css';
import Header from "../Header/Header";
import Scholarship from "../Scholarship/Scholarship";
import { useAppSelector } from '../../app/hooks';
import { stat } from "fs/promises";
import Saved from "../Saved/Saved";

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

    const {saved} = useAppSelector(state => state.saved)
    
    const scholarships: Array<Scholarship> = JSON.parse(localStorage.scholarships)
    const favorites: Array<Scholarship> = JSON.parse(localStorage.saved)
    
    const scholarshipCards = scholarships.map(scholarship => <Scholarship key={scholarship.id} {...scholarship} type={props.card}/>)
    const savedCards = favorites.map(scholarship => <Saved key={scholarship.id} {...scholarship} type={props.card}/>)
    console.log("CARDSS:", props.card)

    const determineRender = () => {
        if (props.card === 'scholarships') {
            return scholarshipCards.length > 0 ? scholarshipCards : <p>No scholarships available.</p>;
        } else {
            return savedCards.length > 0 ? savedCards : <p>No saved scholarships.</p>;
        }
    };

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