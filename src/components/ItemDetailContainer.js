import { useState, useEffect } from "react";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const ItemDetailContainer = () => {

    const [currentItem, setCurrentItem] = useState({})
    const [itemLoaded, setitemLoaded] = useState(false)
    const { id } = useParams()

    const getItem = (itemId) => {
      
        const docRef = doc(db, "salonProducts", itemId);
        
        return getDoc(docRef).then((snapshot) => {
            
            let item = null
            if(snapshot.exists() > 0)
            {
                item = {
                    id: snapshot.id,
                    ...snapshot.data()
                }
            }
            
            return item
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