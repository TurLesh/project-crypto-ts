import React from 'react';
import './ErrorPageStyle.css';

const Error: React.FunctionComponent = () => {
    return (
        <div className="error-wrapper">
            <p className="error-text">PAGE NOT FOUND</p>
        </div>
    );
};

export default Error;
