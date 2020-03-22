import React, {Fragment, useEffect, useState} from 'react';
import { useParams } from "react-router-dom";


interface ErrorRouteParams {
    errorId: string,
}

interface ErrorInterface {
    code: number,
    message: string,
}

const Error: React.FC = () => {
    const defaultError: string = "Internal Server Error"; 
    const errorId = useParams<ErrorRouteParams>().errorId;
    const [errorMessage, setErrorMessage] = useState(defaultError);
    const errors: Array<ErrorInterface> = [
        {
            code: 404,
            message: 'Not found'
        },
        {
            code: 403,
            message: 'Not authorized' 
        }
    ];

    useEffect(() => {
        let errId: number = parseInt(errorId);
        errors.map(err => {
            if (err.code === errId) {
                setErrorMessage(err.message);
            }
        })
    }, [])

    return (
        <div className='error-message'>{errorMessage}</div>
    )
}

export default Error;