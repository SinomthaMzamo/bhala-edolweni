import React, { useState } from "react"

const IconBox = ({ icon }) => {
    return (
        <div className="iconBox" style={{border: '1px transparent', margin:'0 0.4em'}}>
            <h3><i className={icon}></i></h3>
        </div>
    );
};

export default IconBox;