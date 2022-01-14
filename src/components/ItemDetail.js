import { Box } from "@mui/system"
import Grid from '@mui/material/Grid';
import ImageGallery from "./ImageGallery";
import { useState, useEffect } from "react";
import useStyles from "./Styles";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemCount from "./ItemCount";
import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import { useCartContext } from "./CartContext";
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

//Componente que se utiliza para mostrar el detalle de un item que se recibe como parametro, en este detalle tambien se muestran las imagenes asociadas al item.

const ItemDetail = ({item}) => {

    const styles = useStyles()
    
    const { addItem } = useCartContext()

    const itemInitialValue = 1
    const [selectedImage, setSelectedImage] = useState(item.pictureUrl)
    const [showItemCount, setShowItemCount] = useState(true)

    const priceFormatted = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.price)
    const monthlyAmountFormatted = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.monthlyPaymentAmount)

    const onAdd = (total) => {

        //Funcion que agrega la cantidad de items solicitados al carrito 
        let itemAdded = addItem(item, total)
        
        if(itemAdded)
        {
            toast.info(`Se han agregado: ${total} ${item.title} al carrito`, 
            { autoClose: 2000, 
             position: toast.POSITION.BOTTOM_RIGHT,
             hideProgressBar: true })

             setShowItemCount(false)
             
        }
    }

    const onSelectNewImage = (imageId) => {
    
        const docRef = doc(db, "images", imageId.toString());
        
        getDoc(docRef).then((snapshot) => {
            
            if(snapshot.exists() > 0)
            {
                const newImage = {
                    id: snapshot.id,
                    ...snapshot.data()
                }

                setSelectedImage(newImage.pictureUrl)
            }
        })
        .catch()

    }

    function ProductDetail() {
        return (
          <>
            <Grid item xs={7} key='item-picture' >
                <Box
                    component="img"
                    className={styles.itemImgContainer}
                    alt=""
                    src={selectedImage}
                />
            </Grid>
            <Grid item xs={5} key='item-detail' sx={{ marginTop: 5, paddingRight: 5}}>
                <Typography gutterBottom variant="h5" color="grey.800"> 
                        {item.description}
                </Typography>
                <Typography gutterBottom variant="caption" color="text.secondary"> 
                        {item.code}
                </Typography>
                <Typography sx={{ marginTop: 4, fontWeight: 'bold'}} gutterBottom variant="h5" color="#ff8f00"> 
                        {priceFormatted}
                </Typography>
                <Box sx={{ marginTop: 1, display: 'flex', justifyContent:'flex-start', alignItems: 'center', gap: 1}}>
                    <span>
                        <CreditCardTwoToneIcon></CreditCardTwoToneIcon>
                    </span>
                    <Typography sx={{ textTransform:'uppercase', fontWeight: 500 }} gutterBottom variant="body" color="#616161"> 
                        {`3 cuotas sin interes de ${monthlyAmountFormatted}`}
                    </Typography>
                </Box>
                {showItemCount ? (
                    <Box sx={{ marginTop: 5, display: 'flex', justifyContent:'center' }}>
                        <ItemCount stock={item.stock} initial={itemInitialValue} onAddCallback={onAdd}>
                        </ItemCount>
                    </Box>
                ) : <div></div>}
                
                <Box sx={{ marginTop: 3, display: 'flex', justifyContent:'center'}}>
                    <NavLink key={`purchase_item_${item.id}`} to={`/cart`} style={{ textDecoration: "none" }}>
                        <Button 
                            variant="contained" 
                            size="large"
                            className={styles.itemButton}
                            sx={{   backgroundColor:'#e0b241', 
                                    color: 'white', 
                                    '&:hover': {
                                        background: "#ebd8ab",
                                    },
                                    width: 420
                                }}
                        >
                            Finalizar Compra
                        </Button>
                    </NavLink>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ marginTop: 6, fontWeight: 'bold', letterSpacing: 5, textTransform: 'uppercase'}} variant="h4" color="#ff8f00"> 
                            envio gratis
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', letterSpacing: 2}} gutterBottom variant="h6"> 
                            CABA y GBA
                    </Typography>
                    <Typography sx={{fontStyle:'italic'}} gutterBottom variant="body2"> 
                            * En compras superiores a $6000
                    </Typography>
                </Box>
            </Grid>
          </>
        );
    }

    function ImageGalleryContainer() {
        return (
          <>
            <Grid item xs={9} container={true}>
               <ImageGallery images={item.thumbnails} onThumbnailSelected={onSelectNewImage}></ImageGallery>
            </Grid>
          </>
        );
    }

    return (
    <>
        <Box sx={{ flexGrow: 1, padding:10 }}>
            <Grid container spacing={1}>
               
                <Grid container item xs={2} spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ImageGalleryContainer></ImageGalleryContainer>
                </Grid>
                <Grid container item xs={10} spacing={1} sx={{ backgroundColor:"whitesmoke" }}>
                    <ProductDetail />
                </Grid>

            </Grid>
        </Box>

        <ToastContainer />
    </>
    )


}

export default ItemDetail