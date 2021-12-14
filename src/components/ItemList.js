import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from './Item'
const ItemList = ({items}) => {
    
    return (

    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 1, md: 2}} columns={{ xs: 4, sm: 8, md: 12 }}>
        {items.map((item, index) => (
            <Grid item xs={4} sm={4} md={3} key={index}>
                <Item product={item}></Item>
            </Grid>
        ))}
        </Grid>
    </Box>

    )
}

export default ItemList