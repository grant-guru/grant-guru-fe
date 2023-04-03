import React from "react";
import './Library.css';
import Header from "../Header/Header";
import Scholarship from "../Scholarship/Scholarship";
import { useAppSelector } from '../../app/hooks';
import { stat } from "fs/promises";
import Saved from "../Saved/Saved";

interface LibraryProps {
    card: string
}

// this cannot use state. i think it should call from the database instead. 
// because when the page is refreshed, state is lost
// i dont think this would happen if we were mapping over a database endpoint instead

const Library = (props: LibraryProps) => {

    const { filtered } = useAppSelector(state => state.scholarships)
    const { saved } = useAppSelector(state => state.saved)
    
    const scholarshipCards = filtered.map(scholarship => <Scholarship key={scholarship.id} {...scholarship} type={props.card}/>)
    const savedCards = saved.map(scholarship => <Saved key={scholarship.id} {...scholarship} type={props.card}/>)
    
    return(
        <>
            <Header />
            {props.card === 'scholarships' ? scholarshipCards : savedCards}
        </>
    )
}

export default Library