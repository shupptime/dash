import axios from "axios";
import Layout from '../../../layout/Layout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '../../../components/Table'
import { toast } from 'react-toastify'

// hook
import { useRouter } from "next/router";
import { flexbox } from "@mui/system";


const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    marginTop: '80px',
  };

export default function Home({categoria}) {

  const router = useRouter();

  const handleClick = async (cat) => {

    try {
      toast.error('No permitido!!');
      return router.push("/dashboard/categorias");
      const res = await axios.delete("/api/categorias/" + cat._id);
  
    if (res.status === 204) {
      toast.success('Catagoria eliminada!!');
      router.push("/dashboard/categorias");
    } 
    router.push("/dashboard/categorias");

    } catch (error) {
      console.log("msg:", error)
    }
  }
    
  return (
    <Layout>
        <Typography variant="h4" sx={{ margin: '62px', textAlign: 'center' }}>
          Categorias
        </Typography>
        <Table categorias = {categoria} />
        {/* <List sx={style}  component="nav" aria-label="mailbox folders">
           {
            categoria.map((cat) => (
             <div key = {cat._id}> 
              <ListItem button> 
                  <ListItemText primary={cat.title}  onClick={ ()=> { router.push(`/dashboard/categorias/${cat._id}/edit`) }} />
                  <Stack direction="row" spacing={1}>
                    {/* <Chip label="primary" color="primary" variant="outlined" /> 
                    <Chip 
                      label="eliminar" 
                      color="success" 
                      variant="outlined"
                      onClick={ ()=> { handleClick(cat) }} 
                      
                      />
                   </Stack>
              </ListItem>
              <Divider /> 
            </div>
            ))
           }
        </List> */}
        <div style ={{ textAlign: 'center', display: 'flex', width: '70%' }}> 
        <Button 
          style = {{ background:'radial-gradient(orange, transparent)', marginTop: '25px' ,marginLeft: '12px', width: '90%', height: '55px', fontSize: "15px"}}
          variant="contained" size="large"
          onClick={ ()=> { router.push(`/dashboard/categorias/add`) }}
        >
            Agregar
        </Button> 
        <Button 
          style = {{ background:'white', color:'red',  marginTop: '25px' ,marginLeft: '12px', width: '90%', height: '55px', fontSize: "15px"}}
          variant="contained" size="large"
          onClick={ ()=> { router.push(`/dashboard`) }}
        >
            Volver
        </Button>
        </div>
    </Layout>
 
  )
}

export async function getServerSideProps() {
    
    const { data } = await axios('https://eat-ser.vercel.app/api/categorias')

    if (true) {
      const categoria = data
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
