
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
            toast.error(`Solo quedan disponibles: ${stock} unidades del producto`, 
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
                    sx={{   backgroundColor:'#e0b241', 
                            color: 'white', 
                            width: 40,
                            '&:hover': {
                            background: "#ebd8ab",
                            
                    }}}
                >
                    <AddIcon/>
                </Button>
                
                <Button disabled 
                    sx={{   borderColor: "transparent",
                            width: 130
                    }}>
                    <Typography color='black' variant='button'>
                        {total}
                    </Typography>
                </Button>

                <Button
                    size="small"
                    onClick={handleDecrement}
                    sx={{   backgroundColor:'#e0b241', 
                            width: 40,     
                            color: 'white', 
                            '&:hover': {
                            background: "#ebd8ab",
                            
                    }}}
                >
                    <RemoveIcon/>
                </Button>
            </ButtonGroup>

            <Button 
                variant="contained" 
                onClick={addItemToCart}
                size="large"
                sx={{ 
                    width: 210,
                    backgroundColor:'#e0b241', 
                    color: 'white', 
                    '&:hover': {
                        background: "#ebd8ab",
                    }}}
            >
                Agregar al Carrito
            </Button>
        </Box>
       
    )

}

export default ItemCount