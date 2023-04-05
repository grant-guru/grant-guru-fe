import React from "react";
import './Error.css';

interface ErrorProps {
    errorMessage: string;
}

const Error = (props: ErrorProps) => {
    return (
            <h2>{props.errorMessage}</h2>
    )
}

export default Error