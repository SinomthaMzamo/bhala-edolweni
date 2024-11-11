import React, { useState } from "react";
import PropTypes from 'prop-types';
import IconBox from "../sidebar/IconBox";

const SingleIconTableRow = ({ num, name, amount, date, icons}) => {
    return(
        <tr>
            <th scope="row">{num}</th>
            <td>{name}</td>
            <td>{amount}</td>
            <td>{date}</td>
            <td>
                <div className="shortcuts" style={{display:'flex'}}>
                    {icons.map((icon, index) => (
                        <button key={index}>
                            <IconBox icon={icon}/>
                        </button>
                    ))}
                </div>
            </td>


        </tr>
    );
};

SingleIconTableRow.propTypes = {
    num: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.number,
    date: PropTypes.string,
    icons: PropTypes.arrayOf(PropTypes.string)
}

export default SingleIconTableRow;