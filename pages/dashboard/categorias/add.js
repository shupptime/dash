import { useState, useEffect } from "react";
import Layout from '../../../layout/Layout';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify'
import axios from 'axios';

// hook
import { query, useRouter } from "next/router";

export default function Edit() {

  const router = useRouter();
  const theme = createTheme();

  const [title, setTitle] = useState("");
  // const [cuerpo, setCuerpo] = useState({ title: title });


  const handleSubmit = async (event) => {
    event.preventDefault();
    createCategory()

  };

  const createCategory = async () => {
    const _body = {};
    _body.title = title;

    try {
       /*  const res = await fetch("https://eat-ser.vercel.app/api/categorias", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(_body),
      }); */
      const data  = axios.post('/api/categorias',_body )

  
      setTimeout(() => { 
        toast.success('Categoria agregada!!')
        return router.push("/dashboard/categorias");
    }, 2000)

      
    } catch (error) {
      toast.error('Error!!')
      console.error(error);
    }
  };
 
  return (
    <Layout>
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs" style= {{ marginTop: '-325px'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add Category..
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="title"
              name="title"
              autoComplete="title"
              autoFocus
              value={title}
              onChange={ (e)=> { setTitle(e.target.value) }}
             /*  onChange={(e) =>
                setCuerpo({
                  ...cuerpo,
                  title: e.target.value,
                })} */
            /> 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Agregar
            </Button>
          </Box>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2, background: 'white', color: 'red' }}
              onClick={ ()=> {  router.push(`/dashboard/categorias`) }}
            >
              Volver
            </Button>
        </Box>
      </Container>
    </ThemeProvider>
    </Layout>
 
  )
}
