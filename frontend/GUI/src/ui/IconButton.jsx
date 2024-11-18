import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const IconButton = ( { icon, onClick }) => {
    return (
        <button className="btn btn-sm btn-light" style={{width:'2em', height:'2em', margin:2}} onClick={onClick}>
        <i className={icon}></i>
        </button>
        
    );
}
 
export default IconButton;