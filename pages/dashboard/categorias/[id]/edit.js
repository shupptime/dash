import { useState, useEffect } from "react";
import axios from "axios";
import Layout from '../../../../layout/Layout';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';


// hook
import { query, useRouter } from "next/router";

export default function Edit() {

  const router = useRouter();
  const theme = createTheme();

  const [title, setTitle] = useState("");

  const getCategoria = async () => {
    try {

      const { data } = await axios(`/api/categorias/${query.id}`);
      console.log("data", data)
      // const categoria = await res.json();
      return setTitle(data.title);


    } catch (error) {
      console.log("message: ", error)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const _body = {};
    _body.title = title;

    try {

      const data = await axios.put(`/api/categorias/${query.id}`, _body);
      console.log("data:",data)
      toast.success('Categoria agregada!!')
      setTimeout(() => {
        
        return router.push("/dashboard/categorias");
      }, 2000)

    } catch (error) {
      toast.error('Error!!')
      console.error(error);
    }

  };

  useEffect(() => {
    if (query.id) getCategoria();
  }, []);

  return (
    <Layout>
      <ThemeProvider theme={theme} >
        <Container component="main" maxWidth="xs" style={{ marginTop: '-325px' }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" style={{ marginTop: '55px' }}>
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
                onChange={(e) => { setTitle(e.target.value) }}
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
                
                variant="contained"
                sx={{ mt: 2, mb: 2, color: 'red', background: 'white', display: 'flex', width: '80%'}}
                onClick={() => { router.push(`/dashboard/categorias`) }}
              >
                Volver
              </Button>

          </Box>
        </Container>
      </ThemeProvider>
    </Layout>

  )
}
