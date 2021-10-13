import styles from '../styles/Characters.module.scss'
import { useSession, signIn } from 'next-auth/client';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ReactPaginate from 'react-paginate';
import Router from 'next/router'
import { Card } from '../components/Card';
import { useBoard } from '../context/contextApi';


export default function Characters({characters, page}) {
    // const [character, setCharacters] = useState([]);
    // const {
    //   currentPage,
    //   setCurrentPage
    // } = useBoard();

    console.log(characters);

    

    
    // api.get(`/character?page=${currentPage}`).then((response)=>setCharacters(response.data)).catch((err)=>{
    //   console.log("Ops! Ocorreu um erro" + err);
    // })

    // const getCharacters = async() => {
    //   api.get(`/character?page=${currentPage}`).then((response)=>setCharacters(response.data)).catch((err)=>{
    //       console.log("Ops! Ocorreu um erro" + err);
    //     })
    // }


    // useEffect(() =>{
    //   getCharacters();
    // },[])
  
    return (
    <>  
    <div className={styles.title}>
      <h1>All Characters avaliable in API!</h1>
    </div>   

    <div className={styles.containerMain}>
        {characters.results.map((item, key) => {
            return (
              <section key={item.id} className={styles.cardContainer}>
                <div className={styles.card}>
                  <div className={styles.cardContent}>
                    <h2>{item.name}</h2>
                    <span className={styles.status}>
                      <img src="/images/lens.svg" alt="circle" className={item.status == 'Dead' ? styles.dead : null}></img>
                      {item.status}
                    </span>
                    <p>{item.species}</p>
                    <p>{item.gender}</p>
                    <p>Origin: {item.origin.name}</p>
                  </div>
                  <div className={styles.cardImage}>
                    <img src={item.image}></img>
                  </div>
                </div>
              </section>
        )
        })}

        <button onClick={() => Router.push(`?page=${page - 1}`)}>
          PREVIEW
        </button>

        <button onClick={() => Router.push(`?page=${page + 1}`)}>
          NEXT
        </button>


        
        </div>

    </>
           
  )
  
}

export const getServerSideProps = async({ query:{page = 1}, ctx}) =>{
  const response = await api.get(`/character?page=${page}`)
  const data = await response.data;
  


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
      props: {
        characters: data,
        page: parseInt(page, 10)
      }
    }

  }
}