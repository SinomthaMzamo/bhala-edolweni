import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from './Row';

const Table = () => {
    const [allDebtors, setAllDebtors] = useState([]);
    
    
    useEffect(() => {
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
        fetchDebtors();
    }, []);

    const generateDebtorsMapWithId = allDebtors => {
        const workingDebtors = {}
        let indexIncrement = 0;

        for(let debtor of allDebtors){
            workingDebtors[indexIncrement] = debtor;
            debtor['id'] = indexIncrement;
            debtor['date'] = '11/11/2024'
            ++indexIncrement;
        }
        return workingDebtors;
    }
    
    
    console.log(allDebtors);
    const totalAmount = Object.values(allDebtors).reduce((amount, debtor) => amount + Number(debtor.amount), 0)

    return ( 
        <>
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
                        {Object.entries(allDebtors).map(([id, debtor], index) => (
                            <Row debtor={debtor} number={index+1} key={id}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
 
export default Table;