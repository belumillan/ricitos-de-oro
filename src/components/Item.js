import VisibilityIcon from '@mui/icons-material/Visibility';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { CardActionArea } from '@mui/material';
import useStyles from './Styles';
import { NavLink } from "react-router-dom"
import { useCartContext } from "./CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item = ({product}) => {

    const { addItem } = useCartContext()

    const styles = useStyles()
    const priceFormatted = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)

    const buyItem = () => {

        let itemAdded = addItem(product, 1)
        
        if(itemAdded)
        {
            toast.info(`Se ha agregado: ${product.title} al carrito`, 
            { autoClose: 2000, 
             position: toast.POSITION.BOTTOM_RIGHT,
             hideProgressBar: true })
        }
    };

    return (

        <Card className={styles.card}>
            <NavLink key={`CardAction_${product.id}`} to={`/item/${product.id}`} style={{ textDecoration: "none" }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt={product.title}
                    image={product.pictureUrl}
                    />
                    <CardContent className={styles.cardContent}>
                        <Typography gutterBottom variant="body2" color="text.secondary"> 
                            {product.title}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: 'text.primary'}}>
                            {priceFormatted}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </NavLink>
            <CardActions sx={{ justifyContent: 'center'}}>
                    <Button sx={{backgroundColor:'#e0b241', color: 'white', '&:hover': {
                                background: "#ebd8ab",
                                },
                                width: 300,
                                borderRadius: 50}} 
                        variant="contained" 
                        size="small" 
                        startIcon={<ShoppingBagIcon />}
                        onClick={buyItem}
                        >Comprar
                        </Button>

                    <NavLink key={product.id} to={`/item/${product.id}`} style={{ textDecoration: "none" }}>
                        <Button sx={{backgroundColor:'#e0b241', color: 'white', '&:hover': {
                            background: "#ebd8ab",
                            },
                            width: 100,
                            borderRadius: 50, marginLeft: 1 }} 
                            variant="contained" 
                            size="small" 
                            startIcon={<VisibilityIcon />}
                            >
                                Ver
                            </Button>
                    </NavLink> 
                   
            </CardActions>
            <ToastContainer />
      </Card>

    )

}

export default Item