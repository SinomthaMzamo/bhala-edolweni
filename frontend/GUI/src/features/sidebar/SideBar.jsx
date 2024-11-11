import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tab from "./Tab";


const Sidebar = ({ updateView}) => {
    return(
        <div className="sidebar" style={{border: 'solid 2px palevioletred', borderRadius:'12px', padding: '15px'}}>
            <Tab icon={"fas fa-eye"} tabTitle={"View All Debtors"} isCollapsed={false} handleViewChange={() => updateView('view')}></Tab>
            <Tab icon={"fas fa-add"} tabTitle={'Add New Debtor'} isCollapsed={false} handleViewChange={() => updateView('add')}></Tab>
            <Tab icon={"fas fa-pencil"} tabTitle={"Update Exsting Debtor"} isCollapsed={false} handleViewChange={() => updateView('edit')}></Tab>
            <Tab icon={"fas fa-trash"} tabTitle={"Settle Debtor"} isCollapsed={false} handleViewChange={() => updateView('close')}></Tab>
        </div>
    );
};

// define Sidebar PropTypes
Sidebar.propTypes = {
    updateView: PropTypes.func.isRequired
}

export default Sidebar;