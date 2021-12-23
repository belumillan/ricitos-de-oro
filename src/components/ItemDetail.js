import { Box } from "@mui/system"
import Grid from '@mui/material/Grid';
import ImageGallery from "./ImageGallery";
import { useState } from "react";
import useStyles from "./Styles";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemCount from "./ItemCount";

const ItemDetail = ({item}) => {

    const styles = useStyles()

    const [selectedImage, setSelectedImage] = useState(item.pictureUrl)
    const priceFormatted = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.price)
    const itemInitialValue = 1

    const onAdd = (total) => {
        
        //Funcion que luego va a agregar la cantidad de items solicitados al carrito
        toast.info(`Se han agregado: ${total} items al carrito`, 
            { autoClose: 5000, 
             position: toast.POSITION.BOTTOM_RIGHT,
             hideProgressBar: true })
    }

    const onSelectNewImage = (imageId) => {
    //Por el momento se hace un mock para obtener imagen por id
        return new Promise((resolve, reject) => {
                    
            setTimeout(()=> {

                let newImage = {}

                switch(imageId)
                {
                    case 100:
                        newImage = {
                            id:100,
                            title:'Babyliss plancha humedo-seco 1', 
                            pictureUrl: '/babyliss-plancha-humedo-seco.jpg'}
                            break;
                    case 102:
                        newImage = {
                            id:102,
                            title:'Babyliss plancha humedo-seco 2', 
                            pictureUrl: '/babyliss-plancha-humedo-seco_2.jpg'}
                            break;
                    case 103:
                        newImage = {
                            id:103,
                            title:'Babyliss plancha humedo-seco 3', 
                            pictureUrl: '/babyliss-plancha-humedo-seco_3.jpg'}
                            break;
                    case 104:
                        newImage = {
                            id:104,
                            title:'Babyliss plancha humedo-seco 4', 
                            pictureUrl: '/babyliss-plancha-humedo-seco_4.jpg'}
                            break;
                    case 200:
                        newImage = {
                            id:200,
                            title:'Cepillo secador y voluminizador', 
                            pictureUrl: '/cepillo secador.jpg'}
                            break;
                    case 201:
                        newImage = {
                            id:200,
                            title:'Cepillo secador y voluminizador2', 
                            pictureUrl: '/revlon image 1.jpg'}
                            break; 
                    case 300:
                        newImage = {
                            id:300,
                            title:'Loreal1', 
                            pictureUrl: '/kit loreal pro longer.jpg'}
                            break;  
                    case 301:
                        newImage = {
                            id:301,
                            title:'Loreal2', 
                            pictureUrl: '/loreal 2.jpg'}
                            break; 
                    case 400:
                        newImage = {
                            id:400,
                            title:'tigi1', 
                            pictureUrl: '/tigi shampoo resurrection.jpg'}
                            break;    
                    case 500:
                        newImage = {
                            id:500,
                            title:'schwarz1', 
                            pictureUrl: '/Schwarzkopf tintura blondeme.jpg'}
                            break; 
                    case 501:
                        newImage = {
                            id:501,
                            title:'schwarz2', 
                            pictureUrl: '/schwarz 2.jpg'}
                            break;   
                    case 600:
                        newImage = {
                            id:600,
                            title:'yellow0', 
                            pictureUrl: '/acondicionador-liss-yellow.jpg'}
                            break;  
                    case 700:
                        newImage = {
                            id:700,
                            title:'zafira0', 
                            pictureUrl: '/taiff-safira1-.jpg'}
                            break;
                    case 701:
                        newImage = {
                            id:701,
                            title:'zafira1', 
                            pictureUrl: '/zafira2.jpg'}
                            break;    
                    default:
                        break
                }
                
                resolve (
                    setSelectedImage(newImage.pictureUrl)
                    )

            }, 1000)

    })

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
                <Typography gutterBottom variant="h6" color="grey.800"> 
                        {item.description}
                </Typography>
                <Typography gutterBottom variant="caption" color="text.secondary"> 
                        {item.code}
                </Typography>
                <Typography sx={{ marginTop: 5, fontWeight: 'bold'}} gutterBottom variant="h5" color="#ff8f00"> 
                        {priceFormatted}
                </Typography>
                <Box sx={{ marginTop: 6, display: 'flex', justifyContent:'center' }}>
                    <ItemCount stock={item.stock} initial={itemInitialValue} onAddCallback={onAdd}>
                    </ItemCount>
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