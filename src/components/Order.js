import * as React from 'react';
import { Typography } from "@mui/material";
import { useCartContext } from './CartContext';
import { NavLink } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import BuyerForm from "./BuyerForm";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddressForm from './AddressForm';
import { usePurchaseContext } from './PurchaseContext';
import { db } from './firebase';
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import OrderItemList from './OrderItemList';

const Order = () => {

    const steps = ['Informacion de Contacto', 'Domicilio'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <BuyerForm currentStep={step} onHandleSubmit={handleNext} onHandleBack={handleBack} stepCount={steps.length} />;
            case 1:
                return <AddressForm currentStep={step} onHandleSubmit={handleNext} onHandleBack={handleBack} stepCount={steps.length} />;
            // case 2:
            //     return <PaymentForm />;
            default:
                throw new Error('Unknown step');
        }
    }

    const [activeStep, setActiveStep] = useState(0);
    const [finalTotalFormatted, setFinalTotalFormatted] = useState('0')
    const [shippingCostFormatted, setShippingCostFormatted] = useState('0')
    const [buyerData, setBuyerData] = useState({})
    const [orderId, setOrderId] = useState('')
    const [shippingCost, setShippingCost] = useState(0)
    const [isCreatingOrder, setIsCreatingOrder] = useState(false)

    let addressData = {}

    const { cartItems,
        cartTotal,
        clear,
        freeShippingThreshold } = useCartContext()

    const { handleSubmit } = usePurchaseContext()

    // const cartTotalFormatted = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(cartTotal)

    // const orderItems = cartItems.map((ci) =>
    // ({
    //     id: ci.id,
    //     name: ci.title,
    //     description: `${ci.description} x ${ci.quantity}`,
    //     picture: ci.pictureUrl,
    //     stock: ci.stock,
    //     subtotal: new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(ci.subtotal)
    // }))

    useEffect(() => {

        let shippingCost = cartTotal < freeShippingThreshold ? 350.00 : 0
        setShippingCost(shippingCost)
        setShippingCostFormatted(shippingCost > 0 ? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(shippingCost) : 'Gratis')
        let finalTotal = cartTotal + shippingCost
        setFinalTotalFormatted(new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(finalTotal))

    }, [cartTotal])

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    // const updateItemsStock = () => {

    // }

    const placeOrder = () => {
        debugger
        if (buyerData && addressData) {

            setIsCreatingOrder(true)
            const ordersCollection = collection(db, "orders")

            addDoc(ordersCollection, {
                buyer: buyerData,
                address: addressData,
                items: cartItems,
                date: serverTimestamp(),
                total: cartTotal + shippingCost,
                shippingCost: shippingCost
            })
                .then((orderResult) => {
                    debugger
                    setIsCreatingOrder(false)
                    setOrderId(orderResult.id)
                    clear()
                    setBuyerData({})
                    addressData = {}
                    setActiveStep(activeStep + 1)
                })
                .catch((error) => {
                    debugger
                    setIsCreatingOrder(false)
                    return (<Alert severity="error">
                        <AlertTitle>Error al generar la orden</AlertTitle>
                        No se ha podido procesar la compra. Intentar mas tarde
                    </Alert>)
                })
        }
        else
            return (
                <Alert severity="error">
                    <AlertTitle>Datos incompletos</AlertTitle>
                    Por favor complete los datos de contacto y domicilio
                </Alert>
            )
    }

    const handleNext = (data, validations) => {
        debugger
        let valid = handleSubmit(data, validations)
        debugger
        if (valid) {
            if (activeStep == 0) {
                setBuyerData(data)
            }
            else if (activeStep == 1) {
                addressData = { ...data }
            }

            if (activeStep == steps.length - 1) {
                placeOrder()
            }
            else
                setActiveStep(activeStep + 1)
        }

    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Backdrop
                sx={{ color: '#B2B2B2', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isCreatingOrder}
            >
                <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                    <Stack sx={{ color: 'grey.500' }} spacing={2}>
                        <CircularProgress color="warning" size={100} sx={{ ml: 10 }} />
                        <Typography variant="h4" gutterBottom align='center' sx={{ color: 'black', fontWeight: 'bold' }}>
                            Procesando Orden ...
                        </Typography>
                    </Stack>
                </Box>
            </Backdrop>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={7}>
                    <Paper sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 10
                    }}
                        elevation={3}>
                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom sx={{ mt: -2, pb: 1 }}>
                                    Gracias por su compra.
                                </Typography>
                                <Typography variant="subtitle2">
                                    {`Su codigo de orden es ${orderId}. Se envio un correo a la direccion provista.`}
                                </Typography>
                            </>
                        ) : (
                            <>
                                {getStepContent(activeStep)}
                            </>
                        )}

                    </Paper>
                </Grid>
                {cartItems.length > 0 && (
                    <Grid item xs={12} md={4} lg={5}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 600,
                                borderRadius: 10,
                            }}
                            elevation={3}>
                            <OrderItemList shippingCostFormatted={shippingCostFormatted} finalTotalFormatted={finalTotalFormatted}>
                            </OrderItemList>
                            <Box sx={{ display: 'flex', marginTop: 1, justifyContent: 'center', flexDirection: 'column' }}>
                                <NavLink key='review_cart' to={`/Cart`} style={{ textDecoration: "none" }}>
                                    <Button sx={{
                                        marginTop: 6,
                                        backgroundColor: '#e0b241',
                                        color: 'white',
                                        '&:hover': {
                                            background: "#ebd8ab",
                                        },
                                        borderRadius: 50,
                                        fontSize: 'medium',
                                        width: '100%'
                                    }}
                                        variant="contained" startIcon={<ShoppingCartCheckoutIcon fontSize="medium" />}>
                                        Volver al Carrito
                                    </Button>
                                </NavLink>
                            </Box>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Container>

    )

}

export default Order