import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartWidget = () => {
    
    return (
        <IconButton
            size="large"
            color="inherit"
        >
            <ShoppingCartIcon sx={{ width: 36, height: 36 }}/>
        </IconButton>
    )
}

export default CartWidget