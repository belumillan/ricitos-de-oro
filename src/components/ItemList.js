import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from './Item'
import { Typography } from "@mui/material";

const ItemList = ({items}) => {
    
    return (

    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 1, md: 2}} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
            items.length > 0 ? (
                items.map((item, index) => (
                    <Grid item xs={4} sm={4} md={3} key={index}>
                        <Item product={item}></Item>
                    </Grid>
                ))
            ) : ( 
                <Grid item xs={12} alignContent={'center'} textAlign={'center'}>
                    <Typography sx={{ fontWeight: 'bold', letterSpacing: 2}} gutterBottom variant="h6"> 
                        No hay productos disponibles
                    </Typography>
                </Grid>
                )
        }
        
        </Grid>
    </Box>

    )
}

export default ItemList