import axios from "axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

//component
import Navbar from '../../../../components/Navbar';
import ProductsDash from '../../../../components/ProductsDash';

// hook
import { query, useRouter } from "next/router";

export default function Products({result}) {
   const router = useRouter();
  return (
    <>
        <Navbar />
        
        <Box sx={{ flexGrow: 1, padding: "3pc", marginTop:"45px"}}>
            
            <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
                  Edición Productos
            </Typography>
            
            { result?.length === 0 ?
              ( <p style={{ textAlign: 'center' }}>No hay productos para editar</p>
              ) : ( 
                result?.map( producto => (
                  <ProductsDash key = { producto._id } producto = {producto} />
                ))
               ) 
           }

            <Button 
                sx = {{ background:'radial-gradient(orange, transparent)', marginTop: '50px', marginLeft: '12px', width: '90%', height: '55px', fontSize: "15px"}}
                variant="contained" size="large"
                onClick={ ()=> {  router.push(`/dashboard/productos/${query.id}/dash`) }}
            >
                Volver
            </Button>   
        
        </Box>
    </>
);
}

export async function getServerSideProps({ query: { id } }) {
    const {data} = await axios("https://eat-ser.vercel.app/api/productos");
  
    if (true) {
      const producto = data;

    let result = [];
    const _producto = producto.map( e => {
    
    if(e.categoryId === id){
      result.push(e)
    }

    
   });

      return {
        props: {
          result,
        },
      };
    }
  
  }

  