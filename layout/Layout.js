import Head from "next/head";
import useQuiosco from "../hooks/useQuiosco";
import styles from '../styles/Home.module.css'

//components
import Box from '@mui/material/Box';
import Image from 'next/image'
import Navbar from '../components/Navbar';
import Carrousel  from '../components/Carrousel';
import Footer from '../components/Footer';

export default function Layout({ children, pagina }) {
  const { modal } = useQuiosco();

  return (
    <div className={styles.container} >
      <Head>
        <title>ShuppDash</title> {/* - {pagina} */}
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Box component="main" sx={{ p: 3 }}  className={styles.main}>
       {/*  <Toolbar /> */}
       
        {children}
  
      </Box>
        
      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
      <Footer/>
    </div>
  );
}
