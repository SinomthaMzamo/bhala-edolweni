import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import Sidebar from "../sidebar/SideBar";
import TableRow from "./TableRow";
import debtors from "../../../backend/data/debtors.json";

const View = ({}) => {
    const [allDebtors, setAllDebtors] = useState([]);
    useEffect(() => {
        const fetchDebtors = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:5000/view');
                const debtorData = response.data.data
                if(Array.isArray(debtorData)){
                    setAllDebtors(debtorData);
                } else {
                    console.error("Response malformed")
                    console.error(debtorData)
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchDebtors();
    }, []);
    
    console.log(allDebtors);
    const totalAmount = allDebtors.reduce((amount, debtor) => amount + debtor.amount, 0)

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
                    {allDebtors.map((debtor, index) => (
                        <TableRow  
                        num={index + 1} 
                        name={debtor.name} 
                        amount={debtor.amount} 
                        date={"17/05/24"}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default View;