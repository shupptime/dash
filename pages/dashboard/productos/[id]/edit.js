import * as React from 'react';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

//component
import Navbar from '../../../../components/Navbar';
import ProductsDash from '../../../../components/ProductsDash';

// hook
import { query, useRouter } from "next/router";
import { ConstructionOutlined } from '@mui/icons-material';

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


export default function Products({result, id}) {
   const router = useRouter();
  return (
    <>
        <Navbar />
        
        <Box sx={{ flexGrow: 1, padding: "3pc", marginTop:"45px"}}>
            
            <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
                  Edición Productos
            </Typography>
            
            { result.length === 0 ?
              ( <p style={{ textAlign: 'center' }}>No hay productos para editar</p>
              ) : ( 
                result.map( producto => (
                  <ProductsDash key = { producto._id } producto = {producto} />
                ))
               ) 
           }

            <Button 
                sx = {{ background:'radial-gradient(orange, transparent)', marginTop: '50px', marginLeft: '12px', width: '90%', height: '55px', fontSize: "15px"}}
                variant="contained" size="large"
                onClick={ ()=> {  router.push(`/dashboard/productos/${query.id}/dash`) }}
            >
                Volver
            </Button>   
        
        </Box>
    </>
);
}

export async function getServerSideProps({ query: { id } }) {
    const res = await fetch(`http://localhost:3000/api/productos`);
  
    if (res.status === 200) {
      const producto = await res.json();

    let result = [];
    const _producto = producto.map( e => {
    
    if(e.categoryId === id){
      result.push(e)
    }

    
   });

      return {
        props: {
          result,
          id
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

  