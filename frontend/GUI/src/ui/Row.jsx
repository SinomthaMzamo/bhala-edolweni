import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
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

    const [focus, setFocus] = useState(false);

    const onControlClick = (event) => {
        setFocus(true);
        resetState();
        handleClick(event);
    }

    const showFinalOptions = () => {
        return !focus;
    }

    const hideControls = () => { return Object.values(state).some(mode => mode === true) };
        

    const resetState = () => {
        setState(prevState => ({
            ...Object.keys(prevState).reduce((acc, currentKey) => {
                acc[currentKey] = false; // set all keys to false (reset)
                return acc;
            }, {}),
        }));
    };

    const handleClick = (eventName) => {
        // when any icon is clicked,
        switch(eventName.toLowerCase()){
            case 'edit':
                handleEdit();
                break;
            case 'delete':
                handleRemoval();
                break;
            case 'view':
                handleView();
                break;
            case 'save':
                handleSave();
                break;
            case 'cancel':
                setNameState(debtor.name);
                setAmountState(debtor.amount);
                resetState();
                setFocus(false);
                break;
            default:
                console.log(`${eventName} button clicked!`);
        }
        // hide the normal icons and display the save and cancel icons
        // 1. update state and ensure only current operation is set to true
        // call the required handler for that icon
        // 2. the save and cancel button should be rendered
        }

    const handleSave = () => {
        // updateNameState(e);
        // updateAmountState(e);
        // check the state for current operation
        for (const operation of Object.keys(state)){
            if (state[`${operation}`]){
                console.log(`sending request to ${operation}/`, {name: debtor.name, amount: debtor.amount});
                if(operation.endsWith('Deleting')){
                    sendDeleteRequest();
                }
            }
            
        }
        resetState();
        setFocus(false);
        // front-side validation of updates
        // make api call to relevant endpoint
        // report
        }

    const handleEdit = () => {
        // make the row name and amount fields editable
        setState(prevState => ({
            ...prevState, 
            isEditing: true}));

        // disable other icons and show save button
        console.log('form is being edited!');
        console.log('editing:', debtor);
    }

    // im gonna need these for clientside validation and making api calls
    const updateNameState = (e) => {
        const newNameValue = e.target.value;
        setNameState(newNameValue);
    };

    const updateAmountState = (e) => {
        const newAmountValue = e.target.value;
        setAmountState(parseInt(newAmountValue));
    };

    function sendDeleteRequest() {

        if (debtor.amount > 0) {
            console.log("Cannot delete a debtor with a positive balance!");
            return;
        }
        
        // send data to api
        axios.delete(`http://127.0.0.1:5000/delete/${debtor.name}`)
        .then(response => {
            console.log(response.data);
            // Set the feedback message
            console.log(`Debtor '${name}' added successfully with a balance of ${amount}.`);

            setTimeout(() => console.log('a true success!'), 5000);
        })
        .catch(error => {
            console.error("There was an error sending the request!", error);
        }); // Perform the effect
}

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
        setFocus(false);

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
                        { showFinalOptions() && <IconButton
                        icon={edit}
                        onClick={() => onControlClick('edit')}
                        />}
                        { showFinalOptions() && <IconButton
                        icon={remove}
                        onClick={() => onControlClick('delete')}
                        />}
                        { showFinalOptions() && <IconButton
                        icon={view}
                        onClick={() => onControlClick('view')}
                        />}
                        { hideControls() && 
                        <IconButton
                        icon={save}
                        onClick={handleSave}
                        />}
                        { hideControls() &&
                        <IconButton
                        icon={cancel}
                        onClick={() => handleClick('cancel')}
                        />}

                    </div>
                </td>
            </tr>
        </>
    );
}
 
export default Row;