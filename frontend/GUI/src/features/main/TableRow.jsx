import React, { useState } from "react";
import PropTypes from 'prop-types';
import IconBox from "../sidebar/IconBox";

const TableRow = ({ num, name, amount, date}) => {
    return(
        <tr>
            <th scope="row">{num}</th>
            <td>{name}</td>
            <td>{amount}</td>
            <td>{date}</td>
            <td>
                <div className="shortcuts" style={{display:'flex'}}>
                    <button>
                        <IconBox icon={"fas fa-trash"}/>
                    </button>
                    <button>
                        <IconBox icon={"fas fa-pencil"}/>
                    </button>
                </div>
            </td>


        </tr>
    );
};

TableRow.propTypes = {
    num: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.number,
    date: PropTypes.string
}

export default TableRow;