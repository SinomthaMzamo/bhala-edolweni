import React, { useState, useEffect, useRef } from 'react';
import IconButton from './IconButton';

const Row = ({debtor, number}) => {
    const [state, setState] = useState({
        isEditing: false,
        isDeleting: false,
        isViewing: false,
    })
    
    const [nameState, setNameState] = useState(debtor.name);
    const [amountState, setAmountState] = useState(debtor.amount);

    const nameInputRef = useRef();
    const amountInputRef = useRef();


    const handleEdit = () => {
        // make the row name and amount fields editable
        setState(prevState => ({
            ...prevState, 
            isEditing: true}));

        // disable other icons and show save button
        console.log('form is being edited!');
    }

    // im gonna need these for clientside validation and making api calls
    const handleNameInput = (e) => {
        const newNameValue = e.target.value;
        setNameState(newNameValue);
    };

    const handleAmountInput = (e) => {
        const newAmountValue = e.target.value;
        setAmountState(parseInt(newAmountValue));
    };

    const handleRemoval = () => {
        setState(prevState => ({
            ...prevState, 
            isDeleting: true}));
        // make row's outer boarder red, i.e render the custom warning style
        // check debtor balance, reject if it is more than 0
        console.log('delete icon clicked!')

    }

    const handleView = () => {
        // bring up a modal summarising debtor info
        console.log(debtor, 'showing debtor info');
    }


    const NameInputField = () => {
        return ( 
            <input
            ref={nameInputRef} 
            type='text' 
            defaultValue={nameState} 
            />
         );
    }
     
    const AmountInputField = () => {
        return(
            <input
            ref={amountInputRef} 
            type="number" 
            min='0' 
            defaultValue={amountState} 
            step="1"
            />
        );
    };

    const [edit, remove, view, save, cancel] = ["fas fa-edit", "fas fa-trash", "fas fa-info", "fas fa fa-check", "fas fa-times"];
    const { id, name, amount, date} = debtor;

    return ( 
        <>
            <tr style={{
                    border: state.isDeleting ? '3px solid red': 'initial',
                    borderColor: state.isDeleting ? 'red' : 'initial',
                    boxShadow: state.isDeleting ? '0 0 8px red' : 'initial'}}>
                <th scope='row'>{number}</th>
                {state.isEditing ? (
                    
                    <td><NameInputField/></td>
                    
                ) : (
                    <td>{name}</td>
                )}
                
                {state.isEditing ? (
                    <td><AmountInputField/></td>  
                ) : (
                    <td>R {amount}.00</td>
                )}
                
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
                        <IconButton
                        icon={save}
                        onClick={handleEdit}
                        />
                        <IconButton
                        icon={cancel}
                        onClick={handleEdit}
                        />

                    </div>
                </td>
            </tr>
        </>
    );
}
 
export default Row;