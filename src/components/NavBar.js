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
import { NavLink, useNavigate } from "react-router-dom"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { usePurchaseContext } from './PurchaseContext';
import { useEffect, useState } from "react";
import { logout } from './firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderSearch from './OrderSearch';

const NavBar = ({ links }) => {

  const { loggedUser, saveUser } = usePurchaseContext()
  const navigate = useNavigate();

  const userMenuItems = [
    { id: 1, name: 'Crear cuenta', href: '/signup' },
    { id: 2, name: 'Iniciar sesion', href: '/login' }
  ];

  const loggedInMenuItems = [
    { id: 4, name: 'Buscar pedido', key: 'ordersearch' },
    { id: 3, name: 'Cerrar sesion', key: 'logout' }
  ];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [openOrderSearch, setOpenOrderSearch] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuAction = (actionName) => {

    switch (actionName) {
      case 'logout':
        userLogout()
        break
      case 'ordersearch':
        handleOpenOrderSearch()
        break
      default: { }
        break
    }
  }
  const userLogout = () => {

    logout().then((res) => {

      if (res.result == 'OK') {
        toast.info('Se ha cerrado la sesion',
          {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true
          })
        saveUser({})
        navigate('/')
      }
      else if (res.result == 'ERROR') {
        toast.error(`Se produjo un error al cerrar la sesion: ${res.errorMsg}`,
          {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true
          })
      }
    })

    handleCloseUserMenu()
  }

  var colors = [
    "#FFB900",
    "#D83B01",
    "#B50E0E",
    "#E81123",
    "#B4009E",
    "#5C2D91",
    "#0078D7",
    "#00B4FF",
    "#008272",
    "#107C10"
  ];

  function calculateColor(email) {

    var sum = 0;
    for (var index in email) {
      sum += email.charCodeAt(index);
    }
    return sum % colors.length;
  }

  function stringAvatar(usr) {

    let name = usr.userName.toString().toUpperCase();
    let colorId = calculateColor(name)
    return {
      sx: {
        bgcolor: colors[colorId],
        p: 0,
        width: 56,
        height: 56
      },
      children: `${name[0]}${name[1]}`,
    };

  }

  useEffect(() => {
    setLoggedIn(loggedUser.email != null)

    if (loggedUser.email != null)
      setUserName(loggedUser.email)
    else
      setUserName('')
  }, [loggedUser]);

  const handleOpenOrderSearch = () => {
    setOpenOrderSearch(true)
    handleCloseUserMenu()
  }

  return (

    <AppBar position="static">
      <Container maxWidth="xl" sx={{ bgcolor: '#e0b241' }}>
        <OrderSearch
          open={openOrderSearch}
          setOpen={setOpenOrderSearch}
        >
        </OrderSearch>
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
            sx={{ p: 2, mr: 4, display: { xs: 'none', md: 'flex' } }}
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

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignContent: 'center', justifyContent: 'center', gap: '30px' }}>
            {links.map((link) => (

              <NavLink key={link.id} to={link.href} style={({ isActive }) => { return { textDecoration: "none", backgroundColor: isActive ? '#ef6c00' : '' } }}>
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

            {(() => {


              if (loggedIn) {
                return (
                  <>
                    <Tooltip title={userName}>
                      <Avatar {...stringAvatar({ userName })}
                        onClick={handleOpenUserMenu}
                      />
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="user-menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {loggedInMenuItems.map((setting) => (
                        <MenuItem key={setting.name} onClick={(e) => { handleMenuAction(setting.key) }}>
                          <Typography textAlign="center">{setting.name}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                );
              } else {
                return (
                  <>
                    <Tooltip title="Cuenta">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, width: 56, height: 56 }}>
                        <AccountCircleIcon sx={{ color: 'white', width: 36, height: 36 }} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="user-menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {userMenuItems.map((setting) => (
                        <NavLink key={`menu_item_${setting.id}`} to={setting.href} style={{ color: 'inherit', textDecoration: "none" }}>
                          <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting.name}</Typography>
                          </MenuItem>
                        </NavLink>
                      ))}
                    </Menu>
                  </>
                );
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