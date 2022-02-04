
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import {useNavigate } from "react-router-dom"

const OrderSearch = ({ onOk, onCancel, open, setOpen }) => {

    const StyledDialogButton = styled(Button)(({ theme }) => ({
        backgroundColor: '#e0b241',
        color: 'white',
        '&:hover': {
            background: "#ebd8ab",
        },
        borderRadius: 50

    }));

    const [orderNumber, setOrderNumber] = useState('');
    const [orderNumberError, setOrderNumberError] = useState('');
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        if (onCancel)
            onCancel()
    };

    const handleSearch = () => {
        
        if (orderNumber != '') {
            setOpen(false);
            navigate(`orderdetail/${orderNumber}`)
        }
        else {
            setOrderNumberError('Ingrese un nro de orden para realizar la busqueda')
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Buscar Pedido</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Por favor ingrese el numero de orden
                </DialogContentText>
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    id="order-number-search"
                    label="Orden Nro"
                    type="text"
                    fullWidth
                    variant="standard"
                    color='warning'
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    error={orderNumberError != ''}
                    helperText={orderNumberError}
                />
            </DialogContent>
            <DialogActions>
                <StyledDialogButton onClick={handleClose}>Cancelar</StyledDialogButton>
                <StyledDialogButton onClick={handleSearch}>Buscar</StyledDialogButton>
            </DialogActions>
        </Dialog>
    )
}

export default OrderSearch