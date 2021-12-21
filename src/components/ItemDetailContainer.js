import { useState, useEffect } from "react";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {

    const [currentItem, setCurrentItem] = useState({})
    const [itemLoaded, setitemLoaded] = useState(false)
    const { id } = useParams()

    const getItem = (itemId) => {

        //Por el momento se hace un mock con un item de ejemplo, mas adelante se obtendran los detalles del item utilizando el itemId
        return new Promise((resolve, reject) => {
            
            setTimeout(()=> {
                let item = {}
                if(itemId === '1')
                {
                    item = {
                        id:1,
                        title:'Cepillo secador y voluminizador', 
                        price: 8500.00, 
                        pictureUrl: '/cepillo secador.jpg',
                        stock: 5,
                        code: 44420,
                        description: 'Revlon cepillo secador y voluminizador',
                        thumbnails: [
                            {id: 200, thumbUrl:'/revlon thumbnail.jpg', title:'revlon0'},
                            {id: 201, thumbUrl:'/revlon thumbnail 1.jpg', title:'revlon1'}
                        ]
                    }
                }
                else if(itemId === '2')
                {
                    item = {
                        id:1,
                        title:'Kit Loreal Professionnel Pro Longer', 
                        price: 5850.00, 
                        pictureUrl: '/kit loreal pro longer.jpg',
                        stock: 15,
                        code: 33200,
                        description: 'Kit Loreal Professionnel Pro Longer',
                        thumbnails: [
                            {id: 300, thumbUrl:'/loreal thumbnail.jpg', title:'loreal0'},
                            {id: 301, thumbUrl:'/loreal thumbnail1.jpg', title:'loreal1'}
                        ]
                    }
                }
                else if(itemId === '3')
                {
                    item = {
                        id:1,
                        title:'Tigi Shampoo Resurrection', 
                        price: 3790.00, 
                        pictureUrl: '/tigi shampoo resurrection.jpg',
                        stock: 15,
                        code: 33200,
                        description: 'Tigi Shampoo Resurrection',
                        thumbnails: [
                            {id: 400, thumbUrl:'/tigi thumbnail.jpg', title:'tigi0'},
                        ]
                    }
                }
                else if(itemId === '4')
                {
                    item = {
                        id:1,
                        title:'Schwarzkopf Tintura Crema Blondme', 
                        price: 815.00, 
                        pictureUrl: '/Schwarzkopf tintura blondeme.jpg',
                        stock: 4,
                        code: 5233,
                        description: 'Schwarzkopf Tintura Crema Blondme',
                        thumbnails: [
                            {id: 500, thumbUrl:'/schwarz thumbnail1.jpg', title:'schwarz0'},
                            {id: 501, thumbUrl:'/schwarz thumbnail2.jpg', title:'schwarz1'},
                        ]
                    }
                }
                else if(itemId === '5')
                {
                    item = {
                        id:1,
                        title:'Yellow Acondicionador liss', 
                        price: 2530.00, 
                        pictureUrl: '/acondicionador-liss-yellow.jpg',
                        stock: 1,
                        code: 12355,
                        description: 'Yellow Acondicionador liss',
                        thumbnails: [
                            {id: 600, thumbUrl:'/yellow thumbnail.jpg', title:'yellow0'}
                        ]
                    }
                }
                else if(itemId === '6')
                {
                    item = {
                        id:6,
                        title:'Babyliss plancha humedo-seco', 
                        price: 19990.00, 
                        pictureUrl: '/babyliss-plancha-humedo-seco.jpg',
                        stock: 10,
                        code: 55120,
                        description: 'Plancha Alisado Pelo Húmedo Nano Titanium con estuche Babyliss Pro 2073',
                        thumbnails: [
                            {id: 100, thumbUrl:'/thumb_babyliss_1.jpg', title:'babyliss1'},
                            {id: 102, thumbUrl:'/thumb_babyliss_2.jpg', title:'babyliss2'},
                            {id: 103, thumbUrl:'/thumb_babyliss_3.jpg', title:'babyliss3'},
                            {id: 104, thumbUrl:'/thumb_babyliss_4.jpg', title:'babyliss4'},
                        ]
                    }
                }
                resolve (item)

            }, 2000)

        })

    }

    useEffect(() => {

        setitemLoaded(false)

        getItem(id).then((item) => {

            setCurrentItem(item)
            setitemLoaded(true)
        })

    }, [id])

    return (
        <>
            <Container maxWidth="xl">
                {!itemLoaded ? (
                    <>
                    <Box sx={{display: 'flex', alignContent:'center', justifyContent:'center', marginTop: 5}}>
                        <Stack sx={{ color: 'amber.800' }} spacing={2}>
                            <CircularProgress color="primary" size={100} sx={{ml:10}}/>
                            <h1>{`Cargando Item ${id} ...`}</h1>
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