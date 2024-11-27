import IconButton from "./IconButton";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ViewDebtor = ({ view, onControlClick, handleClose, handleOpen}) => {
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

    return(
        <>
            <IconButton
                icon={'fas fa-info'}
                onClick={() => {onControlClick('view');
                    handleOpen();
                }}
                />
        </>
    );
};

export default ViewDebtor;