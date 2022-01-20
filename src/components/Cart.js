import { Typography } from "@mui/material";
import { useCartContext } from './CartContext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { NavLink } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextField from '@mui/material/TextField';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

function NoItemsView () {

    return (
        <Grid item xs={12} md={8} lg={9}>
            <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 500,
                borderRadius: 10
            }}
            elevation={3}>
                <Typography sx={{ marginTop: 5, fontWeight: 'bold'}} gutterBottom variant="h5"> 
                    Su carrito esta vacio
                </Typography>
                <Typography sx={{ marginTop: 2}} gutterBottom variant="body1"> 
                    Para seguir comprando navegue por las categorias o vuelva al inicio
                </Typography>
                <Box sx={{ display: 'flex', marginTop: 1, justifyContent: 'center' }}>
                    <NavLink key='continue_shopping' to={`/`} style={{ textDecoration: "none", marginTop: 6 }}>
                        <Button sx={{
                            marginTop: 6,
                            backgroundColor:'#e0b241', 
                            color: 'white', 
                            '&:hover': {
                            background: "#ebd8ab",
                            },
                            width: 500,
                            height: 300,
                            borderRadius: 50,
                            fontSize: 'large'}} 
                            variant="contained" startIcon={<AddShoppingCartIcon fontSize="large" />}>
                            Seguir Comprando
                        </Button>
                    </NavLink>
                </Box>
            </Paper>
        </Grid>
    )
}

const Cart = () => {

    const { cartItems, 
            removeItem,
            clear,
            cartTotal,
            itemQuantity,
            changeQuantity} = useCartContext()

    const cartTotalFormatted = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(cartTotal)

    const rows = cartItems.map((ci) => 
        ( {
            id : ci.id,
            name : ci.title,
            price : new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(ci.price),
            picture : ci.pictureUrl,
            stock : ci.stock,
            quantity : ci.quantity,
            subtotal : new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(ci.subtotal)
            }
        )
    )
    
    const deleteItemFromCart = (e, itemId) => {
        removeItem(itemId)
    }

    const emptyCart = (e) => {
        clear()
    }

    const changeItemQuantity = (e, itemId) => {
        
        changeQuantity(itemId, e.target.value)
    }

    return (

    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
            {cartItems.length > 0 ?
            (   <>
                    <Grid item xs={12} md={6} lg={7}>
                        <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 600,
                                borderRadius: 10}}
                                elevation={3}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Producto</TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right">P. unitario</TableCell>
                                            <TableCell align="right">Cantidad</TableCell>
                                            <TableCell align="right">Subtotal</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell align="left">
                                                <img src={row.picture} width="36" height="36" alt=""/>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    id={`item_quantity_${row.id}`}
                                                    type="number"
                                                    value={row.quantity}
                                                    onChange={(e) => {
                                                        changeItemQuantity(e, row.id);
                                                    }}
                                                    size="small"
                                                    InputProps={{ inputProps: { min: 1, max: row.stock } }}
                                                    />
                                            </TableCell>
                                            <TableCell align="right">{row.subtotal}</TableCell>
                                            <TableCell align="center">
                                                <IconButton color="primary" component="button"
                                                onClick={(e) => {
                                                    deleteItemFromCart(e, row.id);
                                                }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box sx={{ display: 'flex', marginTop: 1, justifyContent: 'center' }}> 
                                <Button sx={{
                                    marginTop: 6,
                                    backgroundColor:'#e0b241', 
                                    color: 'white', 
                                    '&:hover': {
                                    background: "#ebd8ab",
                                    },
                                    borderRadius: 50,
                                    fontSize: 'medium'}} 
                                    variant="contained" startIcon={<DeleteForeverIcon fontSize="medium" />}
                                    onClick={(e) => {
                                        emptyCart(e);
                                    }}>
                                    Vaciar Carrito
                                </Button>
                            </Box>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>
                        <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 600,
                            borderRadius: 10
                        }}
                        elevation={3}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <ListItem alignItems="center" sx={{ textAlign:'center' }}>
                                    <ListItemText
                                        primary={<Typography
                                            sx={{ display: 'inline'}}
                                            component="span"
                                            variant="h6"
                                            color="text.primary"
                                            >
                                            Resumen de compra
                                            </Typography>}
                                    />
                                </ListItem>
                                <Divider variant="fullWidth" component="li" />
                                <ListItem 
                                    alignItems="flex-start"
                                    sx={{ paddingTop: 3, paddingBottom: 3 }}
                                    secondaryAction={
                                        <IconButton>
                                            <CardGiftcardIcon />
                                        </IconButton>
                                    }>
                                    <ListItemText
                                        primary={<Typography
                                            sx={{ display: 'inline', fontStyle: 'italic' }}
                                            component="span"
                                            variant="caption"
                                            color="text.secondary"
                                            >
                                            Si tenes un codigo de descuento podes aplicarlo aqui
                                            </Typography>}
                                    />
                                </ListItem>
                                <Divider variant="fullWidth" component="li" />
                                <ListItem alignItems="flex-start"
                                    disableGutters
                                    sx={{ paddingTop: 3, paddingBottom: 3 }}>
                                    <ListItemText id='listItemSubTotal' primary='Subtotal'
                                    primaryTypographyProps={{
                                        fontSize: 15,
                                        fontWeight: 'light',
                                        lineHeight: '20px',
                                        mb: '2px',
                                      }}>
                                    </ListItemText>
                                    <Typography
                                            sx={{ display: 'inline'}}
                                            component="span"
                                            variant="subtitle1"
                                            color="text.primary"
                                            >
                                            {cartTotalFormatted}
                                    </Typography>
                                </ListItem>
                                <ListItem alignItems="flex-start"
                                    disableGutters
                                    sx={{ marginTop: -2, paddingBottom: 3 }}>
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
                                            sx={{ display: 'inline', fontWeight: 'bold'}}
                                            component="span"
                                            variant="h6"
                                            color="text.primary"
                                            >
                                            {cartTotalFormatted}
                                    </Typography>
                                </ListItem>
                                <Divider variant="fullWidth" component="li" />
                            </List>
                            <Box sx={{ display: 'flex', marginTop: 1, justifyContent: 'center', flexDirection: 'column'}}>
                                <NavLink key='start_order' to={`/order`} style={{ textDecoration: "none"}}>
                                    <Button sx={{
                                        marginTop: 6,
                                        backgroundColor:'#e0b241', 
                                        color: 'white', 
                                        '&:hover': {
                                        background: "#ebd8ab",
                                        },
                                        borderRadius: 50,
                                        fontSize: 'medium',
                                        width: '100%'}} 
                                        variant="contained" startIcon={<ShoppingBagIcon fontSize="medium" />}>
                                        Iniciar Compra
                                    </Button>
                                </NavLink>
                                <NavLink key='continue_shopping' to={`/`} style={{ textDecoration: "none" }}>
                                    <Button sx={{
                                        marginTop: 2,
                                        backgroundColor:'#e0b241', 
                                        color: 'white', 
                                        '&:hover': {
                                        background: "#ebd8ab",
                                        },
                                        borderRadius: 50,
                                        fontSize: 'medium',
                                        width: '100%'}} 
                                        variant="contained" startIcon={<ChevronLeftIcon fontSize="medium" />}>
                                        Seguir Comprando
                                    </Button>
                                </NavLink>
                            </Box>
                        </Paper>
                    </Grid>
                </>
            ) :
                (
                   <NoItemsView></NoItemsView>
                )
            }
        </Grid>
        <ToastContainer />
    </Container>       

    )

}

export default Cart