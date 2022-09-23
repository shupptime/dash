import axios from "axios";
import Layout from '../../../layout/Layout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    marginTop: 6,
  };

export default function Home({categoria}) {
    
  return (
    <Layout>
      
        <List sx={style}  component="nav" aria-label="mailbox folders">
           
           {
            categoria.map((cat) => (
             <> 
              <ListItem button  style={{ textAlign: 'center' }} > 
                  <ListItemText primary={cat.title} />
              </ListItem>
              <Divider /> {/* light */}
            </>
            ))
           }

        
        </List>
    
    </Layout>
 
  )
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
