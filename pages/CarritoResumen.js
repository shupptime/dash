import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

//component
import CardResumen from '../components/CardResumen';
import Navbar from '../components/Navbar';
import CardResumenAux from '../components/CardResumenAux';

//hook
import useQuiosco from "../hooks/useQuiosco";
import {useRouter } from "next/router";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Products() {
    const { pedido, colocarOrden } = useQuiosco();
    const router = useRouter();

  return (
    <>
        <Navbar />
        
        <Box sx={{ flexGrow: 1, padding: "3pc", marginTop:"45px"}}>
            
                    <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
                        Resumen
                    </Typography>
                    
                        {pedido.length === 0 ? (
                        <p style={{ textAlign: 'center' }}>No hay elementos en tu pedido</p>
                        ) : (
                        pedido.map((producto) => (
                            <CardResumenAux key={producto.id} producto={producto} />
                        ))
                        )}

                    { pedido.length !== 0 ? (
                        <>
                            <Button 
                                sx = {{ background:'radial-gradient(orange, transparent)', marginLeft: '12px', width: '90%', height: '55px', fontSize: "15px"}}
                                variant="contained" size="large"
                                // onClick={() =>handleEliminarProducto(producto.id)}
                                onClick={colocarOrden}
                            >
                            pedir
                            </Button> 
                            <Button 
                                sx = {{ 
                                    background:'radial-gradient(orange, transparent)',
                                    marginLeft: '12px', width: '90%', 
                                    height: '55px', fontSize: "15px",
                                    color: 'red', background: 'white',mt: 3,
                                }}
                                variant="contained" size="large"
                                onClick={()=>{  router.push(`/ProductsList`) }}
                            >
                            Volver
                            </Button> 
                        </>
                        ) : <> </> 
                        }
            
        </Box>
    </>
);
}
  