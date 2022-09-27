import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

// component
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

//incons
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

//hook
import useMediaQuery from "@mui/material/useMediaQuery";
import { query, useRouter } from "next/router";

//en el hook esta producto tambien . ver cual va sino cambiar nombre.
function MainFeaturedPost({ producto }) { 

  const matches = useMediaQuery('(max-width:600px)');
  const { name, price, categoryId, image, _id} = producto;
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);
  const router = useRouter();


  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete("/api/productos/" + _id);
  
    if (res.status === 204) {
      router.push(`/dashboard/productos/${query.id}/edit`); 
    } 
    // router.push("/dashboard/categorias");

    } catch (error) {
      console.log("msg:", error)
    }
  }

  return (
    <Paper
      sx={{
        position: 'relative',
        //position: 'absolute',
        backgroundColor: '#9894949c',
        borderRadius: '47px',
        // backgroundColor: 'grey!important',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: 'red',
        maxWidth: "700px",
        height: "23%",
        marginRight: '-2pc',
        marginLeft: '-35px'
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
    
      <Grid container >
      
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom sx = { matches ? { fontSize: "16px", maxWidth: '90%'} : ''}> {/*  width: '85%' */}
              {name}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph sx = { matches ? { fontSize: "15px"} : ''}>
              {price}
            </Typography>
            {/* <Link variant="subtitle1" href="#">
              aca link ?
            </Link> */}
            <div 
              style ={{ 
                display: 'flex',
                position: 'relative',
                marginLeft: '-15px',
              }}
            >
              <IconButton 
                sx = {{ width: '35px', height: '35px'}}
                aria-label="delete"
                type="button"
                onClick={() => {
                  if (cantidad <= 1) return;
                  setCantidad(cantidad - 1);
                }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <p style = {{ marginTop: "6px"}}>{cantidad}</p>
              <IconButton 
                sx = {{ width: '35px', height: '35px'}}
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
               sx = {{ background:'radial-gradient(black, transparent)', width: '35px', height: '35px', marginLeft: '5px', fontSize: "11px"}}
                variant="contained" size="small"
                onClick={() => router.push(`/dashboard/productos/${_id}/editProduct`)}
              >
                Editar
              </Button> 
              <Button
                 sx = {{ background:'radial-gradient(red, transparent)', width: '35px', height: '35px', marginLeft: '5px', fontSize: "11px"}}
                variant="contained" size="small"
                onClick={ ()=> { handleDelete(_id) }} 
              >
                eliminar
              </Button> 
            </div>

          </Box>
        </Grid>
        <Grid item md={6} >
        <img  style={ !matches ? { display: 'block', marginLeft: "100px", width: "350px", height:"250px" } : {display: 'flex',
          marginLeft: "240px",
          width: "125px",
          height: "155px",
          marginTop: '-151px',
            }} 
          src='https://s3-eu-central-1.amazonaws.com/www.burgerking.com.ar.v2/wp-media-folder-burger-king-argentina//home/ubuntu/preview/menu-app/frontend/apps/marketing-website-wordpress-app/web/app/uploads/sites/5/ExtraBurger-XL.png' alt="img" /> 
        </Grid>
        
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;