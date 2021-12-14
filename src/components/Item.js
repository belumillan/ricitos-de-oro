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

const Item = ({product}) => {

    const styles = useStyles()
    const priceFormatted = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(product.price)
    
    return (

        <Card className={styles.card}>
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
                    <Typography gutterBottom variant="h5" component="div">
                        {priceFormatted}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: 'center'}}>
                    <Button className={styles.itemButton} variant="contained" size="small" startIcon={<ShoppingBagIcon />}>Comprar</Button>
                    <Button className={styles.itemButton} variant="contained" size="small" startIcon={<VisibilityIcon />}>Ver</Button>
            </CardActions>
      </Card>

    )

}

export default Item