import styles from '../styles/Characters.module.scss'
import { useSession, signIn } from 'next-auth/client';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ReactPaginate from 'react-paginate';
import { Card } from '../components/Card';


export default function Characters() {
    const [character, setCharacters] = useState([]);

    // api.get("/character").then((response)=>setCharacters(response.data)).catch((err)=>{
    //   console.log("Ops! Ocorreu um erro" + err);
    // })

    const getCharacters = async() => {
      api.get("/character").then((response)=>setCharacters(response.data)).catch((err)=>{
          console.log("Ops! Ocorreu um erro" + err);
        })
    }


    useEffect(() =>{
      getCharacters();
    },[])
  
    return (
    <>  
    <div className={styles.title}>
      <h1>All Characters avaliable in API!</h1>
    </div>   

    <Card data={character}/>

    </>
           
  )
  
}

export const getServerSideProps = async(ctx) =>{

  const {['next-auth.session-token']: token} = parseCookies(ctx)
    
  if(!token){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }else{
    return {
      props: {}
    }
  }

  
}