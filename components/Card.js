import * as React from 'react';
import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// component
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import burga from '../public/doble.png';
//incons
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

//hook
import useMediaQuery from "@mui/material/useMediaQuery";
import { fontSize } from '@mui/system';
import useQuiosco from "../hooks/useQuiosco";

//en el hook esta producto tambien . ver cual va sino cambiar nombre.
function MainFeaturedPost({ producto }) { 
  const matches = useMediaQuery('(max-width:600px)');
  // const { nombre, imagen, precio } = producto;
  const { name, price } = producto;
  const { handleAgregarPedido, pedido } = useQuiosco();
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);
  const imagetest = 'especial.png'

  useEffect(() => {
    //TODO: Cambio a prod id * _id
    if (pedido.some((pedidoState) => pedidoState._id === producto._id)) {
      const productoEdicion = pedido.find(
        (pedidoState) => pedidoState._id === producto._id
      );
      setEdicion(true);
      setCantidad(productoEdicion.cantidad);
    }
  }, [producto, pedido]);

  return (
    <Paper
      sx={{
        position: 'relative',
        // backgroundColor: 'grey.800',
        backgroundColor: '#9894949c',
        borderRadius: '47px',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: 'red',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          // backgroundColor: 'rgba(0,0,0,.3)',
          display: 'flex', flexDirection: 'column'

        }}
      />
    
      <Grid container>
      
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="#353535" gutterBottom sx = { matches ? { fontSize: "22px", width: '68%'} : ''}>
              {name}
            </Typography>
            <Typography variant="h5" color="magenta" paragraph sx = { matches ? { fontSize: "18px"} : ''}>
              $ {price}
            </Typography>

            <div 
              style ={{ 
                display: 'flex',
                position: 'relative',
                marginLeft: '-15px'
              }}
            >
              <IconButton 
                aria-label="delete"
                type="button"
                onClick={() => {
                  if (cantidad <= 1) return;
                  setCantidad(cantidad - 1);
                }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <p>{cantidad}</p>
              <IconButton 
                aria-label="delete"
                type="button"
                onClick={() => {
                  if (cantidad >= 5) return;
                  setCantidad(cantidad + 1);
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
              <Button
                sx ={{ background:'radial-gradient(black, transparent)'}}
                variant="contained" size="small"
                onClick={() => handleAgregarPedido({ ...producto, cantidad })}
              >
                {edicion ? "Editar" : "Agregar"}
              </Button> 
            </div>

          </Box>
        </Grid>
        <Grid item md={6}>
        <img  style={ !matches ? { display: 'block', marginLeft: "100px", width: "350px", height:"250px" } : {display: 'flex',
          marginLeft: "187px",
          width: "125px",
          height: "115px",
          marginTop: '-165px',
          borderRadius: '103px',
          marginRight:' 18px'} } 
          src={ 'https://eat-ser.vercel.app/' + imagetest } 
          /// src='https://s3-eu-central-1.amazonaws.com/www.burgerking.com.ar.v2/wp-media-folder-burger-king-argentina//home/ubuntu/preview/menu-app/frontend/apps/marketing-website-wordpress-app/web/app/uploads/sites/5/ExtraBurger-XL.png' alt="img" 
          /> 
        </Grid>
        {/*  marginLeft: "200px",
          width: "125px",
          height: "133px",
          marginTop: '-140px'} */}
        
      </Grid>
    </Paper>
  );
}

export default MainFeaturedPost;