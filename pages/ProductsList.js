import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

//component
import Card from '../components/Card';
import Navbar from '../components/Navbar';

//hook
import useQuiosco from "../hooks/useQuiosco";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Products() {
  const { categoriaActual, handleClickCategoria } = useQuiosco();

  return (
    <>
      <Navbar />
    
    <Box sx={{ flexGrow: 1, padding: "3pc", marginTop:"45px"}}>
      <Grid container spacing={2}>
         {categoriaActual?.productos?.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))}
      </Grid>
    </Box>
  
    </>
);
}
  