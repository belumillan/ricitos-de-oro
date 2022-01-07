import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import useStyles from "./Styles";
import { useParams } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ItemList from './ItemList';

const ItemListContainer = ({greeting}) => {

    const getFeaturedItems = () => {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                resolve([
                    {id:1, title:'Cepillo secador y voluminizador', price: 8500.00, pictureUrl: '/cepillo secador.jpg', stock: 5},
                    {id:2, title:'Kit Loreal Professionnel Pro Longer', price: 5850.00, pictureUrl: '/kit loreal pro longer.jpg', stock: 15},
                    {id:3, title:'Tigi Shampoo Resurrection', price: 3790.00, pictureUrl: 'tigi shampoo resurrection.jpg',stock: 15},
                    {id:4, title:'Schwarzkopf Tintura Crema Blondme', price: 815.00, pictureUrl: 'Schwarzkopf tintura blondeme.jpg',stock: 4},
                    {id:5, title:'Yellow Acondicionador liss', price: 2530.00, pictureUrl: 'acondicionador-liss-yellow.jpg',stock: 1},
                    {id:6, title:'Babyliss plancha humedo-seco', price: 19990.00, pictureUrl: 'babyliss-plancha-humedo-seco.jpg',stock: 10},
                    {id:7, title:'Taiff planchita safira', price: 8245.00, pictureUrl: 'taiff-safira1-.jpg',stock: 3}
                ])
            }, 2000)
        })
    }

    const getItemsByCategory = (category) => {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                
                let productList = []

                if(category == 'Accesories')
                {
                    productList = [{id:1, title:'Cepillo secador y voluminizador', price: 8500.00, pictureUrl: '/cepillo secador.jpg',stock: 5}]
                }
                else if (category == 'Hair')
                {
                    productList = [{id:2, title:'Kit Loreal Professionnel Pro Longer', price: 5850.00, pictureUrl: '/kit loreal pro longer.jpg',stock: 15},
                    {id:3, title:'Tigi Shampoo Resurrection', price: 3790.00, pictureUrl: '/tigi shampoo resurrection.jpg',stock: 15},
                    {id:4, title:'Schwarzkopf Tintura Crema Blondme', price: 815.00, pictureUrl: '/Schwarzkopf tintura blondeme.jpg',stock: 4},
                    {id:5, title:'Yellow Acondicionador liss', price: 2530.00, pictureUrl: '/acondicionador-liss-yellow.jpg',stock: 1},
                ]
                }
                else if(category == 'Tools')
                {
                    productList = [
                        {id:6, title:'Babyliss plancha humedo-seco', price: 19990.00, pictureUrl: '/babyliss-plancha-humedo-seco.jpg',stock: 10},
                        {id:7, title:'Taiff planchita safira', price: 8245.00, pictureUrl: '/taiff-safira1-.jpg',stock: 3}
                    ]
                }
                resolve(productList)
            }, 2000)
        })
    }

    const [featuredItems, setFeaturedItems] = useState([])
    const [itemsLoaded, setitemsLoaded] = useState(false)
    const { id } = useParams()

    useEffect(() => {

        setitemsLoaded(false)
       
        if (id)
        {
            getItemsByCategory(id).then((items) => {
                setFeaturedItems(items)
                setitemsLoaded(true)
            })
        }
        else {
            
            getFeaturedItems().then((items) => {
                setFeaturedItems(items)
                setitemsLoaded(true)
            })
        }
    }, [id])

    const styles = useStyles()

    return (
        <>
            <h1 style={{textAlign:'center'}}>
                {greeting}
            </h1>
            <Container maxWidth="xl" className={styles.body}>
               
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

            </Container>
        </>
    )
}

export default ItemListContainer