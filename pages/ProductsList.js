import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

//component
import Card from '../components/Card';
import Navbar from '../components/Navbar';

//hook
import useQuiosco from "../hooks/useQuiosco";
import {useRouter } from "next/router";
import Layout from '../layout/Layout';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Products() {
  const { categoriaActual, handleClickCategoria } = useQuiosco();
  // console.log("categoriaActual: --", categoriaActual)
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: "3pc", marginTop:"45px"}}>
        <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
            Productos
        </Typography>
        
        <Grid container spacing={2}>
          {categoriaActual?.productos?.map((producto) => (
              <Card key={producto._id} producto={producto} /> // id * _id
            ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2, color: 'red', background: 'white' }}
          onClick={()=>{  router.push(`/`) }}
        >
          Volver
        </Button>
      </Box>
    </>
);
}
  