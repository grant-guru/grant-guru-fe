import React from "react";
import './Library.css';
import Header from "../Header/Header";
import Scholarship from "../Scholarship/Scholarship";

const Library = () => {

    const data = {
        data: [
        {
        id: "6",
        type: "scholarship",
        attributes: {
        title: "Hire us plz",
        organization: "Ruby Central",
        amount: "1234",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        deadline: "March 01, 2023",
        education: "Graduate",
        state: "",
        women: false,
        lgbt: true,
        ethnicity: [ ],
        veteran: false,
        immigrant: true,
        url: "https://linkedin.com/",
        image_url: "https://media.istockphoto.com/id/1333580948/photo/piggy-bank-with-graduation-cap-on-black-glass-floor-money-saving-concept.jpg?s=612x612&w=0&k=20&c=Vp1CnOigey0sK1RJi11v5F8GY5_kJnCG_SLNeiQ6x0A="
        }
        },
        {
        id: "7",
        type: "scholarship",
        attributes: {
        title: "We do great work",
        organization: "Women in Security and Privacy (WISP)",
        amount: "1234",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        deadline: "March 01, 2023",
        education: "Graduate",
        state: "Colorado",
        women: false,
        lgbt: true,
        ethnicity: [
        "Black",
        "Hispanic"
        ],
        veteran: false,
        immigrant: true,
        url: "https://linkedin.com/",
        image_url: "https://thumbs.dreamstime.com/b/scholarship-cap-money-graduation-105209321.jpg"
        }
        },
        {
        id: "8",
        type: "scholarship",
        attributes: {
        title: "Last but not least",
        organization: "Ruby Central",
        amount: "1234",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        deadline: "March 01, 2023",
        education: "Graduate",
        state: "",
        women: false,
        lgbt: true,
        ethnicity: [ ],
        veteran: false,
        immigrant: true,
        url: "https://linkedin.com/",
        image_url: "https://media.istockphoto.com/id/1333580948/photo/piggy-bank-with-graduation-cap-on-black-glass-floor-money-saving-concept.jpg?s=612x612&w=0&k=20&c=Vp1CnOigey0sK1RJi11v5F8GY5_kJnCG_SLNeiQ6x0A="
        }
        }
        ]
    }

    const cards = data.data.map(scholarship => <Scholarship key={scholarship.id} {...scholarship}/>)

    return(
        <>
            <Header />
            {cards}
        </>
    )
}

export default Library