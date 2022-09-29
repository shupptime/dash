import Carrousel  from '../components/Carrousel';
import MenuList from '../components/MenuList';
import Layout from '../layout/Layout';

//hook
import useQuiosco from '../hooks/useQuiosco';

export default function Home() {
  const { categorias } = useQuiosco();

  return (
    <Layout>
      <Carrousel /> 
      {
          categorias.map( (categoria) => (
            <MenuList key= {categoria._id} categoria ={categoria} />
          ))
       }
    </Layout>
 
  )
}
