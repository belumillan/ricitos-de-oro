import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Typography } from "@mui/material";
import { useCartContext } from './CartContext';

const OrderItemList = ({shippingCostFormatted, finalTotalFormatted}) => {

    const {cartItems, cartTotal, itemQuantity} = useCartContext()

    const cartTotalFormatted = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(cartTotal)

    const orderItems = cartItems.map((ci) =>
    ({
        id: ci.id,
        name: ci.title,
        description: `${ci.description} x ${ci.quantity}`,
        picture: ci.pictureUrl,
        stock: ci.stock,
        subtotal: new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(ci.subtotal)
    }))

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper', overflowY: 'auto' }}>
            {orderItems.map((oi, index) => (
                <>
                    <ListItem key={oi.id}>
                        <ListItemAvatar key={`avatar-item-${index}`}>
                            <Avatar alt={oi.name} src={oi.picture} variant="square" />
                        </ListItemAvatar>
                        <ListItemText
                            key={`text-item-${index}`}
                            primary={oi.description}
                            primaryTypographyProps={{
                                fontSize: 12,
                                fontWeight: 'light',
                                lineHeight: '20px',
                                mb: '2px',
                            }}
                        >
                        </ListItemText>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {oi.subtotal}
                        </Typography>
                    </ListItem>
                    <Divider variant="fullWidth" component="li" key={`divider-item-${index}`} />

                </>
            ))}
            <ListItem
                key='orderTotal'
                alignItems="flex-start"
                disableGutters>
                <ListItemText id='listItemSubTotal' primary='Subtotal'
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'light',
                        lineHeight: '20px',
                        mb: '2px',
                    }}>
                </ListItemText>
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="subtitle1"
                    color="text.primary"
                >
                    {cartTotalFormatted}
                </Typography>
            </ListItem>
            <ListItem key='shipping'
                alignItems="flex-start"
                disableGutters
                sx={{ paddingBottom: 3 }}>
                <ListItemText id='shippingCost' primary='Costo de Envio'
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'light',
                        lineHeight: '20px',
                        mb: '2px',
                    }}>
                </ListItemText>
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="subtitle1"
                    color="text.primary"
                >
                    {shippingCostFormatted}
                </Typography>
            </ListItem>
            <Divider variant="fullWidth" component="li" key='divider1' />
            <ListItem
                key='orderFinalTotal'
                alignItems="flex-start"
                disableGutters
                sx={{ marginTop: 0, paddingBottom: 3 }}>
                <ListItemText
                    primary={<Typography
                        sx={{ display: 'inline', fontWeight: 'bold' }}
                        component="span"
                        variant="h6"
                        color="text.primary"
                    >
                        {`Total: ${itemQuantity} productos`}
                    </Typography>}
                />
                <Typography
                    sx={{ display: 'inline', fontWeight: 'bold' }}
                    component="span"
                    variant="h6"
                    color="text.primary"
                >
                    {finalTotalFormatted}
                </Typography>
            </ListItem>
        </List>
    )

}

export default OrderItemList