import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleBackdrop from './SimpleBackdrop';

const theme = createTheme();

const SignUp = () => {

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
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUpEnabled, setSignUpEnabled] = useState(false);
    const [errors, setErrors] = useState({})
    const [isSigningUp, setIsSigningUp] = useState(false)
    const navigate = useNavigate();

    const requiredErrorMsg = 'Este campo es requerido'
    const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

    const signUp = () => {
       
        let newErrors = {}
        let valid = true

        setIsSigningUp(true)

        if (!username) {
            valid = false
            newErrors['username'] = requiredErrorMsg
        }


        if (!email) {
            valid = false
            newErrors['email'] = requiredErrorMsg
        }
        else {

            if (!RegExp(emailPattern).test(email)) {
                valid = false
                newErrors['email'] = 'Ingrese un email con formato valido'
            }
        }

        if (!password) {
            valid = false
            newErrors['password'] = requiredErrorMsg
        }
        else if (!RegExp(passwordPattern).test(password)) {
            valid = false
            newErrors['password'] = 'La contrasena debe contener al menos 6 caracteres, un numero y un caracter especial'
        }

        if (!confirmPassword) {
            valid = false
            newErrors['confirmPassword'] = 'Por favor confirme la contrasena'
        }


        if (password && confirmPassword && (password != confirmPassword)) {
            valid = false
            newErrors['confirmPassword'] = 'Las contrasenas deben coincidir'
        }

        setErrors(newErrors)

        if (valid) {
            registerWithEmailAndPassword(username, email, password).then((res) => {
                
                setIsSigningUp(false)
                if (res.result == 'OK') {
                    toast.info('Se ha creado la cuenta',
                        {
                            autoClose: 3000,
                            position: toast.POSITION.BOTTOM_RIGHT,
                            hideProgressBar: true
                        })
                    navigate("/login");
                }
                else if (res.result == 'ERROR') {
                    toast.error(`Se produjo un error al crear la cuenta: ${res.errorMsg}`,
                        {
                            autoClose: 3000,
                            position: toast.POSITION.BOTTOM_RIGHT,
                            hideProgressBar: true
                        })
                }
            })
        }
        else
            setIsSigningUp(false)

    };

    useEffect(() => {
        setSignUpEnabled(username && password && email && confirmPassword)
    }, [password, username, email, confirmPassword]);

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <SimpleBackdrop isProcessing={isSigningUp} customText='Creando cuenta...'>
                </SimpleBackdrop>

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Crear Cuenta
                    </Typography>
                    <Box component="div" sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="signup-username"
                            label="Usuario"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            color='warning'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={errors && errors.username ? true : false}
                            helperText={errors?.username}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="signup-email"
                            label="Email"
                            name="signup-email"
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
                            name="password"
                            label="Contrasena"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            color='warning'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors && errors.password ? true : false}
                            helperText={errors?.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password-confirm"
                            label="Confirmar Contrasena"
                            type="password"
                            id="password-confirm"
                            color='warning'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={errors && errors.confirmPassword ? true : false}
                            helperText={errors?.confirmPassword}
                        />
                        <StyledSignUpButton
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={signUp}
                            disabled={!signUpEnabled}
                        >
                            Crear cuenta
                        </StyledSignUpButton>
                    </Box>
                    <Link to={'/login'} variant="body2">
                        {"Ya tiene una cuenta? Iniciar sesion"}
                    </Link>
                </Box>
            </Container>
            <ToastContainer />
        </ThemeProvider>
    )
}

export default SignUp