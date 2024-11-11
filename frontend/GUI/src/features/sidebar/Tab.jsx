import React, { useState } from "react";
import PropTypes from 'prop-types';
import IconBox from "./IconBox";


const Tab = ({ icon, tabTitle, isCollapsed, handleViewChange}) => {


    return(
        <button onClick={handleViewChange} style={{width:'100%', background:'palevioletred',color:'white', display:'flex', border:'solid 3px wheat', borderRadius:'12px'}}>
            <IconBox icon={icon}/>
            <h6>{tabTitle}</h6>
        </button>
    );
};

// define PropTypes
Tab.propTypes = {
    icon: PropTypes.string.isRequired,
    tabTitle: PropTypes.string.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
}

export default Tab;