import React, { useState, useEffect } from 'react';
import IconButton from './IconButton';

const Row = ({debtor, number}) => {
    const [edit, remove, view] = ["fas fa-pencil", "fas fa-trash", "fas fa-info"];
    const { id, name, amount, date} = debtor;

    const handleEdit = () => {
        // make the row name and amount fields editable
        // disable other icons and show save button
        console.log('form is being edited!');
    }

    const handleRemoval = () => {
        // make row's outer boarder red
        // check debtor balance, reject if it is more than 0
        console.log('delete icon clicked!')

    }

    const handleView = () => {
        // bring up a modal summarising debtor info
        console.log(debtor, 'showing debtor info');
    }

    return ( 
        <>
            <tr>
                <th scope='row'>{number}</th>
                <td>{name}</td>
                <td>R{amount}</td>
                <td>{date}</td>
                <td>
                    <div className="shortcuts" style={{display:'flex'}}>
                        <IconButton
                        icon={edit}
                        onClick={handleEdit}
                        />
                        <IconButton
                        icon={remove}
                        onClick={handleRemoval}
                        />
                        <IconButton
                        icon={view}
                        onClick={handleView}
                        />

                    </div>
                </td>
            </tr>
        </>
    );
}
 
export default Row;