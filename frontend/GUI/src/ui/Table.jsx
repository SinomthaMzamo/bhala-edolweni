import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from './Row';

const Table = () => {
    const [allDebtors, setAllDebtors] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);
    
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
    
    useEffect(() => {
        fetchDebtors();
    }, []);

    const handleRowUpdate = () => {
        setRefreshFlag(true); // Toggle the flag to trigger a refresh
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

    return ( 
        <>
            <div>
                <table className="table table-hover caption-top">
                    <caption>
                        <h2>Total: ZAR {totalAmount}</h2>
                        <i className="fa fa-plus-square fa-2x" aria-hidden="true"></i>
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
                            <Row debtor={debtor} number={index+1} key={id} onUpdate={handleRowUpdate} onFocus={() => handleRowFocus(id)} onDelete={() => handleDelete(id)}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
 
export default Table;