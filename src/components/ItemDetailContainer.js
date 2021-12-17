import { useState, useEffect } from "react";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = ({itemId}) => {

    const [currentItem, setCurrentItem] = useState({})
    const [itemLoaded, setitemLoaded] = useState(false)

    const getItem = (itemId) => {

        //Por el momento se hace un mock con un item de ejemplo, mas adelante se obtendran los detalles del item utilizando el itemId
        return new Promise((resolve, reject) => {
            
            setTimeout(()=> {

                resolve ({
                    id:6,
                    title:'Babyliss plancha humedo-seco', 
                    price: 19990.00, 
                    pictureUrl: 'babyliss-plancha-humedo-seco.jpg',
                    stock: 10,
                    code: 55120,
                    description: 'Plancha Alisado Pelo Húmedo Nano Titanium con estuche Babyliss Pro 2073',
                    thumbnails: [
                        {id: 100, thumbUrl:'thumb_babyliss_1.jpg', title:'babyliss1'},
                        {id: 102, thumbUrl:'thumb_babyliss_2.jpg', title:'babyliss2'},
                        {id: 103, thumbUrl:'thumb_babyliss_3.jpg', title:'babyliss3'},
                        {id: 104, thumbUrl:'thumb_babyliss_4.jpg', title:'babyliss4'},
                    ]
                })

            }, 2000)

        })

    }

    useEffect(() => {

        getItem(itemId).then((item) => {
            setCurrentItem(item)
            setitemLoaded(true)
        })
    }, [])

    return (
        <>
            <Container maxWidth="xl">
                {!itemLoaded ? (
                    <>
                    <Box sx={{display: 'flex', alignContent:'center', justifyContent:'center'}}>
                        <Stack sx={{ color: 'amber.800' }} spacing={2}>
                            <CircularProgress color="primary" size={100} sx={{ml:10}}/>
                            <h1>{`Cargando Item ${itemId} ...`}</h1>
                        </Stack>
                    </Box>
                    </>) :
                        (<ItemDetail item={currentItem}></ItemDetail>)
                }

            </Container>
        </>

    )
}

export default ItemDetailContainer