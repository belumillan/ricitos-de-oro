import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CartWidget from './CartWidget';
import { NavLink } from "react-router-dom"

const NavBar = ({userName, links, loggedIn}) => {

   function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(usr) {
    let name = usr.userName.toString();
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };

  }

   return (
        
    <AppBar position="static">
        <Container maxWidth="xl" sx={{bgcolor:'#e0b241'}}>
          <Toolbar disableGutters>
          <NavLink to="/">
            <Avatar
                  alt="Ricitos de Oro"
                  src="/golden-curls.png"
                  sx={{ width: 56, height: 56 }}
              />
          </NavLink>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ p:2, mr: 4, display: { xs: 'none', md: 'flex' } }}
            >
              RICITOS DE ORO
            </Typography>
  
            {/* Si es una pantalla chica muestro un icono que luego sera un menu que despliegue las categorias en lugar de mostrarlas en la toolbar */}
            
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              RICITOS DE ORO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignContent:'center', justifyContent:'center', gap:'30px' }}>
              { links.map((link) => (

                  <NavLink key={link.id} to={link.href} style={({isActive}) => { return {textDecoration: "none", backgroundColor: isActive ? '#ef6c00' : ''}} }>
                    <Button
                    key={link.id}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                    {link.name}
                    </Button>
                  </NavLink>

              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'inline-flex' }}>
                {/* Dependiendo si esta logueado o no el user se muestra un icono distinto */}
                {(() => {


                        if (loggedIn) {
                        return ( 
                                <Tooltip title = {userName}>
                                    <Avatar {...stringAvatar({userName})} 
                                        sx={{ p: 0, width: 56, height: 56 }}
                                    />
                                </Tooltip>
                                );
                        } else {
                        return ( <Tooltip title = "Login">
                                    <IconButton sx={{ p: 0, width: 56, height: 56 }}>
                                        <AccountCircleIcon sx={{ width: 56, height: 56 }}/>
                                    </IconButton>
                                </Tooltip>);
                        }
                    })()
                }
               <CartWidget></CartWidget>
             
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

    )
}

export default NavBar