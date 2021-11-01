import styles from '../styles/Characters.module.scss'
import { useSession, signIn, session, getSession } from 'next-auth/client';
import { parseCookies } from 'nookies';
import { api } from '../services/api';
import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";


import Router from 'next/router'



export default function Characters({characters, page}) {
  
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

        {/* <Link href="?page=${page - 1}">
          <a>PREVIEW</a>
        </Link> */}

        <button className={styles.paginate_preview} onClick={() => Router.push(`?page=${page - 1}`)}>
          PREVIEW
        </button>

        <button className={styles.paginate_next} onClick={() => Router.push(`?page=${page + 1}`)}>
          NEXT
        </button>
      
        
        </div>

    </>
           
  )
  
}

export const getServerSideProps = async({query:{ page = 1}, req}) =>{
 
  const session = await getSession({req});
  const response = await api.get(`/character?page=${page}`)
  const data = await response.data;
  
  if(!session){
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