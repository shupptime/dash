import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

//component
import Navbar from '../../../../components/Navbar';
// import ProductsDash from '../../../components/ProductsDash';

// hook
import { query, useRouter } from "next/router";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    marginTop: '50px',
    };


export default function Products({categoria}) {
    const router = useRouter();

  return (
    <>
        <Navbar />
        
        <Box sx={{ flexGrow: 1, padding: "3pc", marginTop:"45px"}}>
            
            <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
                Opciones
            </Typography>
            <Button 
                sx = {{ background:'radial-gradient(orange, transparent)', marginTop: '50px', marginLeft: '12px', width: '90%', height: '55px', fontSize: "15px"}}
                variant="contained" 
                size="large"
                onClick={ ()=> { router.push(`/dashboard/productos/${query.id}/add`) }}
            >
                Crear
            </Button>
            <Button 
                sx = {{ background:'radial-gradient(orange, transparent)', marginTop: '50px', marginLeft: '12px', width: '90%', height: '55px', fontSize: "15px"}}
                variant="contained" 
                size="large"
                onClick={ ()=> { router.push(`/dashboard/productos/${query.id}/edit`) }}
            >
                Lista&Editar
            </Button>
            
            <Button 
                sx = {{ background:'radial-gradient(orange, transparent)', marginTop: '50px', marginLeft: '12px', width: '90%', height: '55px', fontSize: "15px"}}
                variant="contained" 
                size="large"
                onClick={ ()=> { router.push(`/dashboard/productos`) }}
            >
                Volver
            </Button>   
        
        </Box>
    </>
);
}

export async function getServerSideProps() {
    const res = await fetch("https://eat-ser.vercel.app/api/categorias");
    
    if (res.status === 200) {
      const categoria = await res.json();
      return {
        props: {
          categoria,
        },
      };
    }
  
    return {
      props: {
        error: {
          statusCode: res.status,
          statusText: "not table",
        },
      },
    };
  }

  