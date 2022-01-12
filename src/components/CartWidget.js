import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartContext } from './CartContext';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { NavLink } from "react-router-dom";

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
        <NavLink key='cartButton' to={'/Cart'} style={({isActive}) => { return {textDecoration: "none", color: 'white'}} }>
            <IconButton
                size="large"
                color="inherit"
            >
                <StyledBadge badgeContent={itemQuantity} color="secondary">
                    <ShoppingCartIcon sx={{ width: 36, height: 36, color: 'white' }}/>
                </StyledBadge>
            </IconButton>
        </NavLink>
    )
}

export default CartWidget