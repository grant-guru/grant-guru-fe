import React from "react";
import './Library.css';
import Header from "../Header/Header";
import Scholarship from "../Scholarship/Scholarship";
import { useAppSelector } from '../../app/hooks';

const Library = () => {

    const { filtered } = useAppSelector(state => state.scholarships)

    // this cannot use state. i think it should call from the database instead. 
    // because when the page is refreshed, state is lost
    // i dont think this would happen if we were mapping over a database endpoint instead

    const cards = filtered.map(scholarship => <Scholarship key={scholarship.id} {...scholarship}/>)

    return(
        <>
            <Header />
            {cards}
        </>
    )
}

export default Library