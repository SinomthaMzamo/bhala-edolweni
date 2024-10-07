import React, { useState } from "react";
import SingleIconTableRow from "./SingleIconTableRow.jsx";
import debtors from "../../data/debtors.json";

const Update = () => {

    const totalAmount = debtors.reduce((amount, debtor) => amount + debtor.amount, 0);
    const icons = ["fas fa-pencil"]

    return (
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
                    <SingleIconTableRow
                        key={debtor.id}
                        num={index + 1}
                        name={debtor.name}
                        amount={debtor.amount}
                        date={debtor.date}
                        icons={icons}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Update;