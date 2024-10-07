import React, { useState } from "react";
import PropTypes from 'prop-types';
import Sidebar from "../sidebar/SideBar";
import TableRow from "./TableRow";
import debtors from "../../data/debtors.json";

const View = ({}) => {
    const totalAmount = debtors.reduce((amount, debtor) => amount + debtor.amount, 0)
    return(
        <div>
            <table className="table table-hover caption-top">
                <caption>
                    <h2>Total: ZAR {totalAmount}</h2>
                </caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {debtors.map((debtor, index) => (
                        <TableRow  
                        num={index + 1} 
                        name={debtor.name} 
                        amount={debtor.amount} 
                        date={debtor.date}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default View;