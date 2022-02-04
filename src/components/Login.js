import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInWithEmailAndPassword } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { usePurchaseContext } from './PurchaseContext';
import SimpleBackdrop from './SimpleBackdrop';

const theme = createTheme();

const Login = () => {
    const StyledSignUpButton = styled(Button)(({ theme }) => ({
        backgroundColor: '#e0b241',
        color: 'white',
        '&:hover': {
            background: "#ebd8ab",
        },
        borderRadius: 50,

    }));

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginEnabled, setLoginEnabled] = useState(false);
    const [errors, setErrors] = useState({})
    const [isLogginin, setIsLogginin] = useState(false)
    const navigate = useNavigate();

    const requiredErrorMsg = 'Este campo es requerido'

    const { saveUser } = usePurchaseContext()

    const login = () => {
        
        let newErrors = {}
        let valid = true
        setIsLogginin(true)

        if (!email) {
            valid = false
            newErrors['email'] = requiredErrorMsg
        }

        if (!password) {
            valid = false
            newErrors['password'] = requiredErrorMsg
        }

        setErrors(newErrors)

        if (valid) {
            logInWithEmailAndPassword(email, password).then((res) => {
                
                setIsLogginin(false)
                if (res.result == 'OK') {
                    saveUser(res.data.user)
                    navigate("/");
                }
                else if (res.result == 'ERROR') {
                    toast.error(`No ha sido posible iniciar sesion: ${res.errorMsg}`,
                        {
                            autoClose: 3000,
                            position: toast.POSITION.BOTTOM_RIGHT,
                            hideProgressBar: true
                        })
                }
            })
        }
        else
            setIsLogginin(false)

    };

    useEffect(() => {
        setLoginEnabled(password && email)
    }, [password, email]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <SimpleBackdrop isProcessing={isLogginin}></SimpleBackdrop>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar Sesion
                    </Typography>
                    <Box component="div" sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="login-email"
                            label="Email"
                            name="login-email"
                            autoComplete="email"
                            autoFocus
                            color='warning'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors && errors.email ? true : false}
                            helperText={errors?.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="login-password"
                            label="Contrasena"
                            type="password"
                            id="login-password"
                            autoComplete="current-password"
                            color='warning'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors && errors.password ? true : false}
                            helperText={errors?.password}
                        />
                        <StyledSignUpButton
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={login}
                            disabled={!loginEnabled}
                        >
                            Iniciar Sesion
                        </StyledSignUpButton>
                    </Box>
                    <Link to={'/signup'} variant="body2">
                        {"No tenes cuenta aun? Crear cuenta"}
                    </Link>
                </Box>
            </Container>
            <ToastContainer />
        </ThemeProvider>
    )
}

export default Login