import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import { api } from '../services/api';
import { About } from '../components/About';
import { CardHome } from '../components/Card Home';


export default function Home({ character }) {


  return (
    <>
      <div className={styles.container}>

        <Head>
          <title>Rick and Morty</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <About />
        
        <CardHome data={character}/>


      </div>
    </>
  )
}

export const getStaticProps = async () => {

  const response = await api.get('/character/1,2,8,4,5,6')
  const data = await response.data;

  return {
    props: {
      character: data,
    },
    revalidate: 60 * 60 * 24, // 24hrs
  }

};
