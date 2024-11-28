import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import IconButton from './IconButton';
import ViewDebtor from './ViewDebtor';
import { instanceOf } from 'prop-types';
import toTitle from '../utils/strings';


// Row component renders a single debtor row with controls for editing, viewing, and deleting.
const Row = ({debtor, number, onUpdate, onFocus, onDelete}) => {
    // State management for editing, deleting, and viewing debtor info
    const [state, setState] = useState({
        isEditing: false,
        isDeleting: false,
        isViewing: false,
    })
    
    // State to track changes in debtor's name and amount during editing
    const [nameState, setNameState] = useState(debtor.name);
    const [amountState, setAmountState] = useState(debtor.amount);

    // Focus state to manage input focus during interaction
    const [focus, setFocus] = useState(false);

    // Open View modal state 
    const [openViewDebtor, setOpenViewDebtor] = useState(false);

    // Refs to manage input fields for debtor name and amount
    const nameInputRef = useRef();
    const amountInputRef = useRef();
    

    // Handles clicks on any control button (edit, delete, view, etc.)
    const onControlClick = (event) => {
        setFocus(true);
        console.log(focus)
        onFocus();  // Notify parent component to handle focus state
        resetState();
        handleClick(event); // Handle the intended button click action
    }

    // Determines if the final save and cancel options should be shown
    const showFinalOptions = () => {
        return !focus;
    }

    // Determines if control buttons should be hidden
    const hideControls = () => { return Object.values(state).some(mode => mode === true) };
        
    // Resets the state flags for editing, deleting, and viewing
    const resetState = () => {
        setState(prevState => ({
            ...Object.keys(prevState).reduce((acc, currentKey) => {
                acc[currentKey] = false; // set all keys to false (reset)
                return acc;
            }, {}),
        }));
    };

    // Main handler for control button actions (edit, delete, save, cancel)
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

    // Handles saving the changes to the debtor (either update or delete)
    const handleSave = () => {
        // updateNameState(e);
        // updateAmountState(e);
        // check the state for current operation
        for (const operation of Object.keys(state)){
            if (state[`${operation}`]){
                console.log(`sending request to ${operation}/`, {name: debtor.name, amount: debtor.amount});
                if(operation.endsWith('Deleting')){
                    sendDeleteRequest();
                } else if (operation.endsWith('Editing')) {
                    sendUpdateRequest();
                }
            }
            
        }
        resetState();
        setFocus(false);
        // front-side validation of updates
        // make api call to relevant endpoint
        // report
    }

    // Initiates the editing state: allows name and amount to be edited
    const handleEdit = () => {
        // make the row name and amount fields editable
        setState(prevState => ({
            ...prevState, 
            isEditing: true}));

        // disable other icons and show save button
        console.log('form is being edited!');
        console.log('editing:', debtor);
    }

    // Sends an update request to the backend to save changes to debtor data
    function sendUpdateRequest() {
        const updatedDebtorData = debtor;

        const latestNameValue = nameInputRef.current.value;             // this feature needs to be marked 'coming soon' 
        const latestAmountValue = parseFloat(amountInputRef.current.value);
        console.log(latestAmountValue, latestNameValue, 'latest captured value')

        updatedDebtorData.name = typeof latestNameValue === 'string' ? latestNameValue : nameState;
        updatedDebtorData.amount = !isNaN(latestAmountValue) ? latestAmountValue : amountState;
        console.log('updated debtor data', updatedDebtorData);

        // This is where you would get user confirmation or preview changes


        // Prepare request body for update
        const updateRequest = {
            name: updatedDebtorData.name,
            amount: updatedDebtorData.amount,
            operation: 'set'
        }

        // Send PUT request to update debtor info
        axios.put('http://127.0.0.1:5000/update', updateRequest, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
            onUpdate();
        }).catch(error => {
            console.error('There was an error updating the debtor', error);
        });
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

    // Sends a delete request to the backend to remove the debtor
    function sendDeleteRequest() {

        if (debtor.amount > 0) {
            console.log("Cannot delete a debtor with a positive balance!");
            return;
        }
        
        // Send DELETE request to delete debtor data
        axios.delete(`http://127.0.0.1:5000/delete/${debtor.name}`)
        .then(response => {
            console.log(response.data);
            // error handling
            if (response.status == 200){
                console.log(response.data.message);
                setTimeout(() => console.log('a true success!'), 5000);
                onUpdate();     // Refresh the parent component (update data)
                console.log('we just refreshed');
            } else {
                throw new Error(response.data.error);
            }
            
        })
        .catch(error => {
            console.error("There was an error sending the request!", error);
        }).finally( () => {
            console.log('this is the end')
            onDelete(); // update parent
        }
        );
    }

    // Handle removal action: shows a red warning for deletion
    const handleRemoval = () => {
        setState(prevState => ({
            ...prevState, 
            isDeleting: true}));
        // make row's outer boarder red, i.e render the custom warning style
        // check debtor balance, reject if it is more than 0
        console.log('delete icon clicked!')

    }

    // Handle viewing action: shows debtor details in a modal
    const handleView = () => {
        // bring up a modal summarising debtor info
        // console.log(debtor, 'showing debtor info');
        setFocus(false);
        


    }

    const handleOpenViewDebtor = () => {
        setOpenViewDebtor(true)
    }

    const handleCloseViewDebtor = () => {
        setOpenViewDebtor(false);
    }

    // Name input field for editing debtor's name
    const NameInputField = () => {
        return ( 
            <input
            style={{width:'100%'}}
            ref={nameInputRef} 
            type='text' 
            defaultValue={nameState} 
            />
         );
    }

    // Amount input field for editing debtor's amount
    const AmountInputField = () => {
        return(
            <input
            style={{width:'100%'}}
            ref={amountInputRef} 
            type="number" 
            min='0' 
            defaultValue={amountState} 
            step="1"
            />
        );
    };
    
     // Icons for controls: edit, remove, view, save, cancel
    const [edit, remove, view, save, cancel] = ["fas fa-edit", "fas fa-trash", "fas fa-info", "fas fa fa-check", "fas fa-times"];
    const { id, name, amount, date} = debtor;
    
    // const handleOpen = () => setOpenViewDebtor(true);
    // const handleClose = () => setOpenViewDebtor(false);

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
                    <td style={{textAlign:'left'}}>{toTitle(name)}</td>
                )}
                
                {state.isEditing ? (
                    <td><AmountInputField/></td>  
                ) : (
                    <td style={{textAlign:'right'}}>R {amount}.00</td>
                )}
                
                <td>{date}</td>
                <td>
                    <div className="shortcuts" style={{display:'flex'}}>
                        { showFinalOptions() && <IconButton icon={edit} onClick={() => onControlClick('edit')}/>}
                        { showFinalOptions() && <IconButton icon={remove} onClick={() => onControlClick('delete')}/>}
                        { showFinalOptions() && <ViewDebtor view={'view'} onControlClick={onControlClick} handleClose={handleCloseViewDebtor} handleOpen={handleOpenViewDebtor}/>}
                        { hideControls() && <IconButton icon={save} onClick={handleSave}/>}
                        { hideControls() && <IconButton icon={cancel} onClick={() => handleClick('cancel')}/>}

                    </div>
                </td>
            </tr>
        </>
    );
}
 
export default Row;