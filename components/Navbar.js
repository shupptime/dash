import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router'

import "react-toastify/dist/ReactToastify.css";

//Componets
import CardResumen from '../components/CardResumen';
import Card from '../components/Card';
import { ToastContainer } from "react-toastify";

//Hook
import useQuiosco from "../hooks/useQuiosco";

// syles
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "95%", //85
  height: "89%", //82
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  flexGrow: 1,
  padding: "3pc",
  overflow: 'auto',
  
};

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { pedido, colocarOrden } = useQuiosco();
  const router = useRouter()

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}  onClick={ ()=>router.push('/')} >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={{ marginLeft: '280px', display: { xs: 'block', sm: 'block' } }}>
              
              <IconButton aria-label="cart" onClick={ ()=>router.push('/CarritoResumen') }> {/* () => { handleOpen() } */}
                <StyledBadge badgeContent={  pedido.length } color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
           
          </Box>
          
          {/* Modal */}
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
             <Box sx={style}>
              <h3 
                style= {{ marginLeft: '260PX', marginTop: '-20px'}} 
                onClick={() =>handleClose()}
              > 
                X
              </h3>

              <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
                Resumen
              </Typography>
              
                {pedido.length === 0 ? (
                  <p style={{ textAlign: 'center' }}>No hay elementos en tu pedido</p>
                  ) : (
                  pedido.map((producto) => (
                    <CardResumen key={producto.id} producto={producto} />
                  ))
                )}

               { pedido.length !== 0 ? (
                  <>
                    <Button 
                      sx = {{ width: '90px', height: '55px', marginLeft: '35px', fontSize: "11px"}}
                      variant="contained" size="large"
                      // onClick={() =>handleEliminarProducto(producto.id)}
                      onClick={colocarOrden}
                    >
                      pedir
                    </Button> 
                    <Button
                      sx = {{ width: '90px', height: '55px', marginLeft: '15px', fontSize: "11px"}}
                      variant="contained" size="large"
                      onClick={() =>handleClose()}
                    >
                      Cancelar
                    </Button>
                  </>
                  ) : <> </> 
                }
              
            </Box>
          </Modal>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <ToastContainer autoClose={700}  style ={{ marginTop: '56px'}} />
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
