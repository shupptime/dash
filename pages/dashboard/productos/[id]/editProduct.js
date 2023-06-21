import { useState, useEffect } from "react";
import Layout from '../../../../layout/Layout';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify'
import axios from 'axios'


// hook
import { query, useRouter } from "next/router";

export default function Login() {

  const router = useRouter();
  const theme = createTheme();
  const [aux, setAux] = useState("");
  const [categorias, setCategorias] = useState([])
  const [cuerpo, setCuerpo] = useState({ _id: '', name: '', price: '', image: '', categoryId: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateProduct();
  };

  const updateProduct = async () => {
    try {
      const { _id, name, price, image, categoryId } = cuerpo;
      console.log("llega dato a acualizar:", cuerpo);
      return toast.error('no permitido!!');
      const res = await fetch("https://eat-ser.vercel.app/api/productos/" + _id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "no cors",
        },
        body: JSON.stringify({ name, price, image, categoryId }),
      });

      console.log("res.status: ", res.status);
      toast.success('Producto actualizado!!');
      setTimeout(() => {
        return router.push(`/dashboard/productos/${categoryId}/edit`);
      }, 2000)


    } catch (error) {
      console.error(error);
      router.push(`/dashboard/productos/${categoryId}/edit`);
    }
  };

  const getCategorias = async () => {
    try {

      const {data} = await axios(`/api/categorias`);
      setCategorias(data);
    } catch (error) {
      console.log("message: ", error)
    }
  }

  const getProducto = async () => {
    try {
      const {data} = await axios(`/api/productos/${query.id}`);
      
      setCuerpo(data);
      getCategorias()
    } catch (error) {
      console.log("message: ", error)
    }
  }

  useEffect(() => {
    if (query.id) getProducto();
  }, []);

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Editar Producto
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="id"
                label="id"
                autoComplete="id"
                value={cuerpo._id}
                disabled
                style={{ display: 'none' }}
                onChange={(e) =>
                  setCuerpo({
                    ...cuerpo,
                    id: e.target.value,
                  })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={cuerpo.name}
                onChange={(e) =>
                  setCuerpo({
                    ...cuerpo,
                    name: e.target.value,
                  })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="img"
                label="Img"
                // type="img"
                id="img"
                autoComplete="img"
                value={cuerpo.image}
                onChange={(e) =>
                  setCuerpo({
                    ...cuerpo,
                    image: e.target.value,
                  })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                autoComplete="price"
                autoFocus
                value={cuerpo.price}
                onChange={(e) =>
                  setCuerpo({
                    ...cuerpo,
                    price: e.target.value,
                  })}
              />
              {/* <TextField
              margin="normal"
              required
              fullWidth
              id="categoryId"
              label="categoryId"
              name="categoryId"
              autoComplete="categoryId"
              
              value={cuerpo.categoryId}
              onChange={(e) =>
                setCuerpo({
                  ...cuerpo,
                  categoryId: e.target.value,
                })}
            /> */}
              <FormControl fullWidth>
                <InputLabel style={{ margin: "15px", marginLeft: "2px" }} id="categoryId">categoria</InputLabel>
                <Select
                  labelId="categoryId"
                  // id="categoryId"
                  label="categoryId"
                  displayEmpty
                  value={cuerpo.categoryId}
                  // inputProps={{ 'aria-label': 'Without label' }}
                  sx={{ mt: 2, width: '100%' }}
                  onChange={(e) =>
                    setCuerpo({
                      ...cuerpo,
                      categoryId: e.target.value,
                    })

                  }
                >
                  {
                    categorias.map(categoria => (
                      <MenuItem key={categoria._id} value={categoria._id}>{categoria.title}</MenuItem>
                    ))
                  }

                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Actualizar
              </Button>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2, color: 'red', background: 'white' }}
              onClick={() => { router.push(`/dashboard/productos`) }}
            >
              Volver
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </Layout>

  )
}
