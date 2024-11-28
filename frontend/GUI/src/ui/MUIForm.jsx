import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';


export default function MUIForm() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});
    const [feedback, setFeedback] = useState('');

    const handleNameInput = (keyboardInput) => setName(keyboardInput.target.value);
    const handleAmountInput = (keyboardInput) => setAmount(keyboardInput.target.value);

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required*';
        if (!amount || isNaN(amount)) newErrors.amount = 'Valid amount is required*';
        setFeedback("There are some invalid inputs. ");
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
                amount: parseInt(amount),
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

    return (
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={sendNewDebtorInfo}
      >
        <TextField id="standard-basic" sx={{}} label="Name" variant="standard" onChange={handleNameInput} />
        {errors.name && <div style={{marginTop:'0', fontSize:'0.7em', color:'brown'}}>{errors.name}</div>}
        <TextField id="standard-basic" label="Amount" variant="standard" onChange={handleAmountInput}/>
        {errors.amount && <div style={{marginTop:'0', fontSize:'0.7em', color:'brown'}}>{errors.amount}</div>}
        <Button variant="contained" disableElevation type="submit">
        ADD NEW DEBTOR
        </Button>
        {feedback && ( // Conditionally render the feedback message
                <div className="pacifico-regular feedback " style={{ marginTop: '10px', border: '2px solid darkgrey', background: 'white', padding: '2px' }}>
                    {feedback}
                </div>
            )}
      </Box>
    );
  }