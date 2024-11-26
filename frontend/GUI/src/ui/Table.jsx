import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from './Row';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddForm from './AddForm';

const Table = () => {
    const [allDebtors, setAllDebtors] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [activeRow, setActiveRow] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(() => {
        fetchDebtors();
    }, []);
    
    const fetchDebtors = async () => {
        try{
            const response = await axios.get('http://127.0.0.1:5000/view');
            const debtorData = response.data.data
            if(Array.isArray(debtorData)){
                setAllDebtors(generateDebtorsMapWithId(debtorData));
            } else {
                console.error("Response malformed")
                console.error(debtorData)
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleRowClick = (id) => {
        setActiveRow(id);  // Set the active row to the clicked row
    };

    const handleRowUpdate = () => {
        setRefreshFlag((prev) => !prev); // Toggle the flag to trigger a refresh
        console.log(refreshFlag)
      };

    const handleRowFocus = (id) => {
        //allow the Table component to control focus mode for each row
        console.log('You are focused on', generateFocusMap()[id])

    }

    const handleDelete = (id) => {
        const workingDebtors = allDebtors;
        delete workingDebtors[id];
        setAllDebtors(workingDebtors);
    }

    const generateFocusMap = () => {
        let indexIncrement = 0;
        const focusMap = {};
        console.log('all debtors', allDebtors)
        for (let debtor of Object.values(allDebtors)) {
            console.log(debtor);
            focusMap[indexIncrement] = debtor;
            ++indexIncrement;
            console.log(focusMap)
        }
        return focusMap;
    }


    const generateDebtorsMapWithId = allDebtors => {
        const workingDebtors = {}
        let indexIncrement = 0;

        for(let debtor of allDebtors){
            workingDebtors[indexIncrement] = debtor;
            debtor['id'] = indexIncrement;
            debtor['date'] = '11/11/2024'
            ++indexIncrement;
        }
        console.log('working debtors', workingDebtors);
        return workingDebtors;
    }
    
    
    // console.log(allDebtors);
    const totalAmount = Object.values(allDebtors).reduce((amount, debtor) => amount + Number(debtor.amount), 0)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return ( 
        <>
            <div>
                <table className="table table-hover caption-top">
                    <caption>
                        <h2>Total: ZAR {totalAmount}.00</h2>
                        {/* <i className="fa fa-plus-square fa-2x" aria-hidden="true"></i> */}
                        <Button variant='contained' onClick={handleOpen}>Add new</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                            <AddForm/>
                            </Box>
                        </Modal>
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
                        {Object.entries(allDebtors).map(([id, debtor], index) => (
                            <Row 
                            debtor={debtor} 
                            number={index+1}
                            isActive={activeRow === debtor.id} 
                            key={id} 
                            onUpdate={handleRowUpdate} 
                            onFocus={() => handleRowClick(id)} 
                            onDelete={() => handleDelete(id)}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
 
export default Table;