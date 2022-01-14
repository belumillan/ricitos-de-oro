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
import { db } from './firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

const ItemListContainer = ({greeting}) => {

    const itemsCollection = collection(db, 'salonProducts')

    const getFeaturedItems = () => {

        return getDocs(itemsCollection).then((snapshot) => {

            let products = []
            if(snapshot.size > 0)
            {
                products = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
            }
            
            return products
        }

        )
    }

    const getItemsByCategory = (category) => {

        const q = query(
            itemsCollection,
            where('category','==',category),
            orderBy('title', 'asc')
        )

        return getDocs(q).then((snapshot) => {
            
            let products = []
            if(snapshot.size > 0)
            {
                products = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
            }
            
            return products
        }, function(err) {
            console.log(err);
          }
        )
        .catch((error) => {
            console.log(error)
        })
    }

    const [featuredItems, setFeaturedItems] = useState([])
    const [itemsLoaded, setitemsLoaded] = useState(false)
    const { id } = useParams()

    useEffect(() => {

        setitemsLoaded(false)
       
        let getItemsPromise

        if (id)
        {
            getItemsPromise =  getItemsByCategory(id)
        }
        else {
            
            getItemsPromise = getFeaturedItems()
        }

        getItemsPromise.then((items) => {
                setFeaturedItems(items)
                setitemsLoaded(true)
            }
        )

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