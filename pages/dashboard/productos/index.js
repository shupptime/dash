import * as React from 'react';
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
import Navbar from '../../../components/Navbar';
import ProductsDash from '../../../components/ProductsDash';


// hook
import { useRouter } from "next/router";

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
                Elige una Categoria
            </Typography>
            
            {/* <ProductsDash key={3} /> */}
            <List sx={style}  component="nav" aria-label="mailbox folders">
                {
                    categoria.map((cat) => (
                    <div key = {cat._id} > 
                        <ListItem button> 
                            <ListItemText 
                              style={{ textAlign: 'center'}} 
                              primary={cat.title}  
                              onClick={ ()=> { router.push(`/dashboard/productos/${cat._id}/dash`) }} />
                        </ListItem>
                        <Divider />
                    </div>
                    ))
                }
        </List>
            
            <Button 
                sx = {{ background:'radial-gradient(orange, transparent)', marginTop: '50px', marginLeft: '12px', width: '90%', height: '55px', fontSize: "15px"}}
                variant="contained" size="large"
                onClick={ ()=> { router.push(`/dashboard`) }}
            >
                Volver
            </Button>   
        
        </Box>
    </>
);
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/categorias");
    
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

  