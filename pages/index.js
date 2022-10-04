import Carrousel  from '../components/Carrousel';
import MenuList from '../components/MenuList';
import Layout from '../layout/Layout';
import Animations from '../components/Animations';
import Circular from '../components/Circular';

//hook
import useQuiosco from '../hooks/useQuiosco';

export default function Home() {
  const { categorias } = useQuiosco();

  return (
    <Layout>
      <Carrousel /> 


     {/*  <Animations /> */}
      
     {/* <Circular/> */}
  
      {
          categorias.map( (categoria) => (
            <MenuList key= {categoria._id} categoria ={categoria} />
          ))
       }
    </Layout>
 
  )
}
