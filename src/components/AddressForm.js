import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { usePurchaseContext } from './PurchaseContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const AddressForm = ({ currentStep, onHandleSubmit, onHandleBack, stepCount }) => {

    const StyledButton = styled(Button)(({ theme }) => ({
        backgroundColor:'#e0b241', 
        color: 'white', 
        '&:hover': {
        background: "#ebd8ab",
        },
        borderRadius: 50,

    }));

    const [selectedProvince, setSelectedProvince] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [unknownStreetNumber, setUnknownStreetNumber] = useState(false);

    const provincesCollection = collection(db, 'provinces')

    const getProvinces = () => {

        const q = query(
            provincesCollection,
            orderBy('name', 'asc')
        )

        return getDocs(q).then((snapshot) => {

            let provinces = []
            if (snapshot.size > 0) {
                provinces = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
            }

            return provinces
        }

        )
    }

    const handleCheckUnknownStreetNumber = (event) => {
        setUnknownStreetNumber(event.target.checked);
    };

    const { errors } = usePurchaseContext()

    const requiredDefault = {
        value: true,
        message: 'Este Campo es requerido'
    }

    const addressValidations = [

        {
            key: 'street', value: {
                required: requiredDefault,
            }
        },
        {
            key: 'streetNumber', value: {
                custom: {
                    isValid: (value) => !isNaN(value),
                    message: 'Ingrese solo numeros para el nro de calle',
                }
            }
        },
        {
            key: 'floor', value: {
                custom: {
                    isValid: (value) => !isNaN(value),
                    message: 'Ingrese solo numeros para el piso',
                }
            }
        },
        {
            key: 'city', value: {
                required: requiredDefault
            }
        },
        {
            key: 'zipCode', value: {
                required: requiredDefault
            }
        },
        {
            key: 'province', value: {
                required: requiredDefault
            }
        },
        {
            key: 'docNumber', value: {
                required: requiredDefault
            },
            custom: {
                isValid: (value) => !isNaN(value),
                message: 'Ingrese solo numeros para el documento',
            }
        }
    ]

    useEffect(() => {

        setSelectedProvince('')

        getProvinces().then((items) => {
            setProvinces(items)
        }
        )
    }, [])


    const selectProvince = (event) => {
        setSelectedProvince(event.target.value);
    };

    const handleAddressSubmit = (event) => {
        
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const fData = {
            street: data.get('street'),
            streetNumber: data.get('streetNumber'),
            unknownStreetNumber: unknownStreetNumber,
            floor: data.get('floor'),
            apartment: data.get('apartment'),
            city: data.get('city'),
            zipCode: data.get('zipCode'),
            province: data.get('province'),
            docNumber: data.get('docNumber'),
        }

        onHandleSubmit(fData, addressValidations)
    };

    const handleBack = (event) => {
        onHandleBack()
    }

    return (
        <>
            <Typography variant="h6" gutterBottom textAlign='center'>
                Domicilio
            </Typography>
            <Box component="form" onSubmit={handleAddressSubmit} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="street"
                            name="street"
                            label="Calle"
                            fullWidth
                            variant="standard"
                            color='warning'
                            error={errors && errors.street ? true : false}
                            helperText={errors?.street}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required={!unknownStreetNumber}
                            id="streetNumber"
                            name="streetNumber"
                            label="Nro"
                            fullWidth
                            variant="standard"
                            color='warning'
                            disabled={unknownStreetNumber}
                            error={errors && errors.streetNumber ? true : false}
                            helperText={errors?.streetNumber}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel sx={{ mt: 2 }}
                            control={<Checkbox color="warning"
                                checked={unknownStreetNumber}
                                onChange={handleCheckUnknownStreetNumber} />}
                            label="Sin numeracion" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="floor"
                            name="floor"
                            label="Piso"
                            fullWidth
                            variant="standard"
                            color='warning'
                            error={errors && errors.floor ? true : false}
                            helperText={errors?.floor}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="apartment"
                            name="apartment"
                            label="Depto"
                            fullWidth
                            variant="standard"
                            color='warning'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="Ciudad"
                            fullWidth
                            variant="standard"
                            color='warning'
                            error={errors && errors.city ? true : false}
                            helperText={errors?.city}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zipCode"
                            name="zipCode"
                            label="Codigo Postal"
                            fullWidth
                            variant="standard"
                            color='warning'
                            error={errors && errors.zipCode ? true : false}
                            helperText={errors?.zipCode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="province"
                            name='province'
                            select
                            label="Provincia"
                            value={selectedProvince}
                            onChange={selectProvince}
                            variant="standard"
                            color='warning'
                            fullWidth
                            error={errors && errors.province ? true : false}
                            helperText={errors?.province}
                        >
                            {provinces.map((option) => (
                                <MenuItem key={option.id} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}

                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="docNumber"
                            name="docNumber"
                            label="DNI o CUIL"
                            fullWidth
                            variant="standard"
                            color='warning'
                            error={errors && errors.docNumber ? true : false}
                            helperText={errors?.docNumber}
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

export default AddressForm