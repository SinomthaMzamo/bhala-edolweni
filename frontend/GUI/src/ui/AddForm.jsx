import { useState } from 'react';
import axios from 'axios';

const AddForm = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});
    const [feedback, setFeedback] = useState('');


    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!amount || isNaN(amount)) newErrors.amount = 'Valid amount is required';
        return newErrors;
      };

    // handle form submission
    const sendNewDebtorInfo = (submitButtonClick) => {
        submitButtonClick.preventDefault();
        console.log("submitted!")

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        } else {
            // send data to api
            axios.post("http://127.0.0.1:5000/add", {
                name: name,
                amount: amount,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response.data);
                // Set the feedback message
                setFeedback(`Debtor '${name}' added successfully with a balance of ${amount}.`);
                setName("");
                setAmount("");

                setTimeout(() => setFeedback(''), 5000);
            })
            .catch(error => {
                console.error("There was an error submitting the form!", error);
                setFeedback("There was an error adding the debtor.");
            });
        }
    };

    const handleNameInput = (keyboardInput) => setName(keyboardInput.target.value);
    const handleAmountInput = (keyboardInput) => setAmount(keyboardInput.target.value);

    return(
        <div className="wrapper">
            <form onSubmit={sendNewDebtorInfo} style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <label htmlFor="debtorName">
                        Name:
                        <input id="debtorName" value={name} onChange={handleNameInput} type="text"/>
                    </label>
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="amount">
                        Amount:
                        <input id="amount" value={amount} onChange={handleAmountInput} type="text"/>
                    </label>
                    {errors.amount && <span>{errors.amount}</span>}
                </div>

                <button type="submit">Submit</button>
            </form>
            {feedback && ( // Conditionally render the feedback message
                <div className="pacifico-regular feedback " style={{ marginTop: '10px', border: '2px solid darkgrey', background: 'white', padding: '2px' }}>
                    {feedback}
                </div>
            )}
        </div>
    );
};

export default AddForm;
