import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from "react";
import { db } from './firebase';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import OrderItemList from './OrderItemList';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { doc, getDoc } from 'firebase/firestore';

const OrderDetail = () => {

    const [orderLoaded, setOrderLoaded] = useState(false)
    const [orderData, setOrderData] = useState({})
    const [shippingCostFormatted, setShippingCostFormatted] = useState('')
    const [finalTotalFormatted, setFinalTotalFormatted] = useState('')
    const [totalItems, setTotalItems] = useState(0)
    const { id } = useParams()

    const getOrderById = (id) => {
       
        const docRef = doc(db, "orders", id);

        return getDoc(docRef).then((snapshot) => {
            
            let item = null
            if (snapshot.exists() > 0) {
                item = {
                    id: snapshot.id,
                    ...snapshot.data()
                }
            }

            return item
        })
    }

    useEffect(() => {

        setOrderLoaded(false)

        getOrderById(id).then((item) => {
            
            setOrderData(item)
            if (item != null) {
                setShippingCostFormatted(item.shippingCost > 0 ? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.shippingCost) : 'Gratis')
                setFinalTotalFormatted(new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(item.total))
                let itemCount = 0
                item.items.forEach((i) => {
                    itemCount += i.quantity
                })
                setTotalItems(itemCount)

            }
            setOrderLoaded(true)
        })

    }, [id]);

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 10,
                        width: '80%'
                    }}
                    elevation={3}>
                    {!orderLoaded ? (
                        <>
                            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginTop: 5 }}>
                                <Stack sx={{ color: 'amber.800' }} spacing={2}>
                                    <CircularProgress color="primary" size={100} sx={{ ml: 40 }} />
                                    <h1>{`Buscando orden ${id} ...`}</h1>
                                </Stack>
                            </Box>
                        </>) : (orderData ?
                            (
                                <>
                                    <Typography variant="h6" gutterBottom textAlign='center'>
                                        {`Detalle del pedido Nro: ${id}`}
                                    </Typography>
                                    <OrderItemList
                                        shippingCostFormatted={shippingCostFormatted}
                                        finalTotalFormatted={finalTotalFormatted}
                                        cartItems={orderData.items}
                                        cartTotal={orderData.total}
                                        itemQuantity={totalItems}>
                                    </OrderItemList>
                                </>
                            ) :
                            (
                                <Stack sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginTop: 5 }}>
                                    <Typography variant="h3" gutterBottom textAlign='center'>
                                        Ups! No encontramos ningun pedido con el codigo ingresado. Chequea si es correcto
                                    </Typography>
                                    <SentimentVeryDissatisfiedIcon color="warning" sx={{ fontSize: 200, alignSelf: 'center' }} />
                                </Stack>
                            )
                    )
                    }

                </Paper>


            </Box>

        </Container>
    )
}

export default OrderDetail