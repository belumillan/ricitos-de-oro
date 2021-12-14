import ItemCount from "./ItemCount"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ItemList from "./ItemList";

const ItemListContainer = ({greeting}) => {
    
    //TODO: El container busca los items y se los pasa al itemList. El item list hace un map y muestra cada item, ver loader para los productos
    const productStock = 15;
    const itemInitialValue = 1;

    const onAdd = (total) => {
        
        //Funcion que luego va a agregar la cantidad de items solicitados al carrito
        toast.info(`Se han agregado: ${total} items al carrito`, 
            { autoClose: 10000, 
             position: toast.POSITION.BOTTOM_RIGHT,
             hideProgressBar: true })
    }

    const getFeaturedItems = () => {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                resolve([
                    {id:1, title:'Cepillo secador y voluminizador', price: 8500.00, pictureUrl: '/cepillo secador.jpg'},
                    {id:2, title:'Kit Loreal Professionnel Pro Longer', price: 5850.00, pictureUrl: '/kit loreal pro longer.jpg'},
                    {id:3, title:'Tigi Shampoo Resurrection', price: 3790.00, pictureUrl: 'tigi shampoo resurrection.jpg'},
                    {id:4, title:'Schwarzkopf Tintura Crema Blondme', price: 815.00, pictureUrl: 'Schwarzkopf tintura blondeme.jpg'},
                    {id:5, title:'Yellow Acondicionador liss', price: 2530.00, pictureUrl: 'acondicionador-liss-yellow.jpg'},
                    {id:6, title:'Babyliss plancha humedo-seco', price: 19990.00, pictureUrl: 'babyliss-plancha-humedo-seco.jpg'},
                    {id:7, title:'Taiff planchita safira', price: 8245.00, pictureUrl: 'taiff-safira1-.jpg'}
                ])
            }, 2000)
        })
    }

    const [featuredItems, setFeaturedItems] = useState([])
    const [itemsLoaded, setitemsLoaded] = useState(false)

    useEffect(() => {

        getFeaturedItems().then((items) => {
            setFeaturedItems(items)
            setitemsLoaded(true)
        })
    }, [])

    return (
        <>
            <h1 style={{textAlign:'center'}}>
                {greeting}
            </h1>
            <Container maxWidth="xl">
                {!itemsLoaded ? (
                    <>
                    <Box sx={{display: 'flex', alignContent:'center', justifyContent:'center'}}>
                        <Stack sx={{ color: 'grey.500' }} spacing={2}>
                            <CircularProgress color="secondary" size={100} sx={{ml:10}}/>
                            <h1>Cargando Productos...</h1>
                        </Stack>
                    </Box>
                    </>) :
                        (<ItemList items={featuredItems}></ItemList>)
                }
            
                <ItemCount stock={productStock} initial={itemInitialValue} onAddCallback={onAdd}>
                </ItemCount>

                <ToastContainer />
            </Container>
        </>
    )
}

export default ItemListContainer