
import axios from "axios";
import { useState, useEffect, useCallback} from "react";
import {useDropzone} from 'react-dropzone'
import Layout from '../../../../layout/Layout';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify'


// hook
import { query, useRouter } from "next/router";

export default function Login() {

  const router = useRouter();
  const theme = createTheme();
  const [cuerpo, setCuerpo] = useState({ name: '', price: '', img: '', categoryId: '' });
  const [ categorias , setCategorias] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault();
    createProduct();
  };
   
  const createProduct = async () => {
    try {
      const data  = axios.post('/api/productos', cuerpo )
      console.log("data", data)
        toast.success('Producto agregado!!');
        setTimeout(() => { 
          return router.push(`/dashboard/productos`);
      }, 2000)
        
    } catch (error) {
      toast.error('error en carga!!')
      console.error(error);
      router.push(`/dashboard/productos`);
     
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

    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
      console.log("diego:", acceptedFiles)
      const formData = new FormData()
      formData.append('image', acceptedFiles[0])
      const { data } = axios.post('http://localhost:3000/api/img',formData )
      console.log("DATAA", data)
    }, [])


    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  useEffect(() => {
    if (query.id) getCategorias();
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
            Agregar 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
         
               {/* <div {...getRootProps()}>
                <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p>Drop the files here ...</p> :
                      <p>Drag 'n' drop some files here, or click to select files</p>
                  }
              </div> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
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
              type="img"
              id="img"
              autoComplete="img"
              onChange={(e) =>
                setCuerpo({
                  ...cuerpo,
                  img: e.target.value,
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
              onChange={(e) =>
                setCuerpo({
                  ...cuerpo,
                  price: e.target.value,
                })}
            />
          {/*   <TextField
              margin="normal"
              required
              fullWidth
              id="categoryId"
              label="categoryId"
              name="categoryId"
              autoComplete="categoryId"
              autoFocus
              
              onChange={(e) =>
                setCuerpo({
                  ...cuerpo,
                  categoryId: e.target.value,
                })}
            /> */}
            <FormControl fullWidth>  
             <InputLabel  style ={{margin: "15px", marginLeft: "2px" }} id="categoryId">categoria</InputLabel> 
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
                  categorias.map( categoria => (
                    <MenuItem key= {categoria._id} value={categoria._id}>{categoria.title}</MenuItem>
                  ))
                }
                
              </Select>
            </FormControl> 
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2, color: 'red', background: 'white' }}
              // antes/${query.id}/dash
              onClick={()=>{  router.push(`/dashboard/productos`) }}
            >
              Volver
            </Button>
        </Box>
      </Container>
    </ThemeProvider>
    </Layout>
 
  )
}
