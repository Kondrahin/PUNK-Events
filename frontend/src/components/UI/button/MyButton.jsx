import React from 'react';
import './MyButton.css'

const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className="my-button" role="button"><span className="text">{children}</span>
        </button>
    );
};

export default MyButton;
