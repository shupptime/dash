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
import Layout from '../../../layout/Layout';
import TableProduct from '../../../components/TableProduct'

//media-query
import useMediaQuery from "@mui/material/useMediaQuery";
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
  // maxWidth: 360,
  bgcolor: 'background.paper',
  marginTop: '50px',
};


export default function Products({ categoria , productos}) {
  const router = useRouter();
  const matches = useMediaQuery('(max-width:600px)');
  
  return (
    <Layout>
        <Typography variant="h4" sx={{ margin: '62px', textAlign: 'center' }}>
          Elige una Categoria
        </Typography>
       <TableProduct categorias = {categoria} productos ={productos}/>
    </Layout>
        
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://eat-ser.vercel.app/api/categorias");

  if (res.status === 200) {
    const categoria = await res.json();
    const r = await fetch("https://eat-ser.vercel.app/api/productos");
    const productos = await r.json()

    return {
      props: {
        categoria, productos
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

