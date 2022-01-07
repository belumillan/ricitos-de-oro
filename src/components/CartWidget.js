import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartContext } from './CartContext';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}));

const CartWidget = () => {
    
    const { itemQuantity } = useCartContext()

    return (
        <IconButton
            size="large"
            color="inherit"
        >
            <StyledBadge badgeContent={itemQuantity} color="secondary">
                <ShoppingCartIcon sx={{ width: 36, height: 36 }}/>
            </StyledBadge>
        </IconButton>
    )
}

export default CartWidget