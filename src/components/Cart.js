import { Typography } from "@mui/material";
import { useCartContext } from './CartContext';

const Cart = () => {

    const { cartItems, 
            addItem, 
            removeItem,
            clear } = useCartContext()

    return (

        <>

        <Typography sx={{ marginTop: 5, fontWeight: 'bold'}} gutterBottom variant="h5" color="#ff8f00"> 
            Estoy en el carrito de compras
        </Typography>

        </>

    )

}

export default Cart