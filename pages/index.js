import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

//Components
import Accordion  from '../components/Accordion';
import AccordionAux  from '../components/AccordionAux';
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
