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
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import OrderItemList from './OrderItemList';
import SimpleBackdrop from './SimpleBackdrop';

const Order = () => {

    const steps = ['Informacion de Contacto', 'Domicilio'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <BuyerForm currentStep={step} onHandleSubmit={handleNext} onHandleBack={handleBack} stepCount={steps.length} />;
            case 1:
                return <AddressForm currentStep={step} onHandleSubmit={handleNext} onHandleBack={handleBack} stepCount={steps.length} />;
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
        freeShippingThreshold,
        itemQuantity } = useCartContext()

    const { handleSubmit } = usePurchaseContext()

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

    const placeOrder = () => {
        
        if (buyerData && addressData) {

            setIsCreatingOrder(true)
            const ordersCollection = collection(db, "orders")

            addDoc(ordersCollection, {
                buyer: buyerData,
                address: addressData,
                items: cartItems,
                date: serverTimestamp(),
                total: cartTotal + shippingCost,
                shippingCost: shippingCost,
                status: 'Generada'
            })
                .then((orderResult) => {
                    
                    setIsCreatingOrder(false)
                    setOrderId(orderResult.id)
                    clear()
                    setBuyerData({})
                    addressData = {}
                    setActiveStep(activeStep + 1)
                })
                .catch((error) => {
                    
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
        
        let valid = handleSubmit(data, validations)
        
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
            <SimpleBackdrop isProcessing={isCreatingOrder} customText={'Procesando Orden ...'}></SimpleBackdrop>
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
                            <OrderItemList 
                            shippingCostFormatted={shippingCostFormatted} 
                            finalTotalFormatted={finalTotalFormatted}
                            cartItems={cartItems}
                            cartTotal={cartTotal}
                            itemQuantity={itemQuantity}>
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