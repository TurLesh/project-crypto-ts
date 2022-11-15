import React from 'react';
import ErrGif from '../../assets/images/404.gif';

const Error: React.FunctionComponent = () => {
    return (
        <div>
            <img src={ErrGif} alt="errgif" />
        </div>
    );
};

export default Error;
