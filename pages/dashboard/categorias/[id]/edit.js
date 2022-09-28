import { useState, useEffect } from "react";
import Layout from '../../../../layout/Layout';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify'

// hook
import { query, useRouter } from "next/router";

export default function Edit() {

  const router = useRouter();
  const theme = createTheme();

  const [title, setTitle] = useState("");
  // const [cuerpo, setCuerpo] = useState({ title: title });

  const getCategoria = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categorias/" + query.id);
      const categoria = await res.json();

      setTitle(categoria.title);
    } catch (error) {
      console.log("message: ", error)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const _body = {};
    _body.title = title;
    
    try{ 
      
      const res = await fetch("https://eat-ser.vercel.app/api/categorias/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_body),
      });

    
      // console.log("res.status: ", res.status);
      res.status == 200 ? toast.success('Categoria agregada!!') :  toast.error('Error!!')
      setTimeout(() => { 
        return router.push("/dashboard/categorias");
    }, 2000)
      
  } catch (error) {
    console.error(error);
  }

  };

  useEffect(() => {
    if (query.id) getCategoria();
  }, []);
      
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
            Edición
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
              Editar
            </Button>
          </Box>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2, color: 'red', background: 'white' }}
              onClick={()=>{  router.push(`/dashboard/categorias`) }}
            >
              Volver
            </Button>
        </Box>
      </Container>
    </ThemeProvider>
    </Layout>
 
  )
}
