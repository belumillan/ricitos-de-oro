
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStyles from './Styles';

const ItemCount = ({stock, initial, onAddCallback}) => {

    const styles = useStyles()

    const [total, setTotal] = useState(initial);

    const handleIncrement = () => {
        
        if(total + 1 <= stock)
            setTotal(total + 1)
        else
            toast.error(`Solo quedan disponibles: ${stock} items del producto`, 
            { autoClose: 7000, 
             position: toast.POSITION.BOTTOM_RIGHT,
             hideProgressBar: true })
    };
    
    const handleDecrement = () => {
        
        if(total - 1 > 0)
            setTotal(total - 1)
    };

    const addItemToCart = () => {

        if(total <= stock)
        {
            onAddCallback(total)
        }

    }

    return (

        <Box  
            className={styles.itemCountContainer}
        >
            <ToastContainer />
            <ButtonGroup variant="contained" size="large" fullWidth>
                
                <Button
                    size="small"
                    onClick={handleIncrement}
                    className={styles.addRemoveItemButton}
                    
                >
                    <AddIcon/>
                </Button>
                
                <Button disabled className={styles.itemTotal}>
                    <Typography color='black' variant='button'>
                        {total}
                    </Typography>
                </Button>

                <Button
                    size="small"
                    onClick={handleDecrement}
                    className={styles.addRemoveItemButton}
                >
                    <RemoveIcon/>
                </Button>
            </ButtonGroup>

            <Button 
                variant="contained" 
                onClick={addItemToCart}
                size="large"
                className={styles.counterButton}
                sx={{ width: 210}}
            >
                Agregar al Carrito
            </Button>
        </Box>
       
    )

}

export default ItemCount