import React from 'react';

const Tab = ({text, className, onClick}) => {


    return (
        <div className={className} onClick={onClick}>
            {text}
        </div>
    );
};

export default Tab;