import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { usePurchaseContext } from './PurchaseContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const BuyerForm = ({ currentStep, onHandleSubmit, onHandleBack, stepCount }) => {

    const StyledButton = styled(Button)(({ theme }) => ({
            backgroundColor:'#e0b241', 
            color: 'white', 
            '&:hover': {
            background: "#ebd8ab",
            },
            borderRadius: 50,
 
    }));

    const {errors} = usePurchaseContext()

    const requiredDefault = {
        value: true,
        message: 'Este Campo es requerido'
    }

    const buyerValidations = [

        {
            key: 'email', value: {
                required: requiredDefault,
                pattern: {
                    value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    message: 'El formato del email no es valido'
                }
            }
        },
        {
            key: 'phone', value: {
                required: requiredDefault,
                custom: {
                    isValid: (value) => value.length == 10,
                    message: 'El nro de telefono debe tener 10 digitos',
                }
            }
        },
        {
            key: 'buyerName', value: {
                required: requiredDefault
            }
        },
        {
            key: 'lastName', value: {
                required: requiredDefault
            }
        }
    ]

    const handleBuyerSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const fData = {
            email: data.get('email'),
            buyerName: data.get('buyerName'),
            lastName: data.get('lastName'),
            phone: data.get('phone')
        }

        onHandleSubmit(fData, buyerValidations)
    };

    const handleBack = (event) => {
        onHandleBack()
    }

    return (
        <>
            <Typography variant="h6" gutterBottom textAlign='center'>
                Datos de Contacto
            </Typography>
            <Box component="form" onSubmit={handleBuyerSubmit} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="E-mail"
                            fullWidth
                            variant="standard"
                            error={errors && errors.email ? true : false}
                            helperText={errors?.email}
                            color='warning'
                        //onChange={(e) => handleEmailChange(e)}
                        //value={email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="buyerName"
                            name="buyerName"
                            label="Nombre"
                            fullWidth
                            variant="standard"
                            color='warning'
                            helperText={errors?.buyerName}
                            //onChange={(e) => handleBuyerNameChange(e)}
                            error={errors && errors.buyerName ? true : false}
                        //value={buyerData.buyerName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Apellido"
                            fullWidth
                            variant="standard"
                            color='warning'
                            helperText={errors?.lastName}
                            //onChange={(e) => handleLastNameChange(e)}
                            error={errors && errors.lastName ? true : false}
                        //value={buyerData.lastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="Telefono"
                            fullWidth
                            variant="standard"
                            error={errors && errors.phone ? true : false}
                            color='warning'
                            helperText={errors?.phone}
                        //onChange={(e) => handlePhoneChange(e)}
                        //value={buyerData.phone}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {currentStep !== 0 && (
                                <StyledButton onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    Volver
                                </StyledButton>
                            )}

                            <StyledButton
                                variant="contained"
                                type="submit"
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {currentStep === stepCount - 1 ? 'Confirmar Compra' : 'Siguiente'}
                            </StyledButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )

}

export default BuyerForm