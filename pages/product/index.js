import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

//component
import Navbar from '../../components/Navbar';
import ProductsDash from '../../components/ProductsDash';

//hook
import useQuiosco from "../../hooks/useQuiosco";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Products() {
    const { pedido, colocarOrden } = useQuiosco();

  return (
    <>
        <Navbar />
        
        <Box sx={{ flexGrow: 1, padding: "3pc", marginTop:"45px"}}>
            
                    <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
                        Resumen
                    </Typography>
                    
                       
                    <ProductsDash key={3} />
                        
                    { true ? (
                        <>
                            <Button 
                            sx = {{ background:'radial-gradient(orange, transparent)', marginLeft: '12px', width: '90%', height: '55px', fontSize: "15px"}}
                            variant="contained" size="large"
                            // onClick={() =>handleEliminarProducto(producto.id)}
                            onClick={colocarOrden}
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
  