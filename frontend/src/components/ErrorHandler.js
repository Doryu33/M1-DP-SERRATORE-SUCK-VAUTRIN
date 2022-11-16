import React from 'react';
import '../styles/errors.css';


const ErrorHandler = ({message, details}) => {

    return (
        <div className='errorsContainer'>
            <h3>{message}</h3>
            <div>
                {                
                details ?
                    Object.values(details).map((err) => {
                            return <li>{err}</li>
                    })
                    :
                    (<></>)
                }
            </div>
        </div>
    );
};

export default ErrorHandler;