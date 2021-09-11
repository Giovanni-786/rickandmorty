import styles from '../styles/Characters.module.scss'
import { useSession, signIn } from 'next-auth/client';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ReactPaginate from 'react-paginate';


export default function Characters(characters) {
  const [currentPage, setCurrentPage] = useState(0);
 
  // console.log(characters.characters.info)


  useEffect(()=>{
      console.log(currentPage)

  },[currentPage])

  
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  
  const PER_PAGE = 20;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(characters.characters.results.length / PER_PAGE);
  return (
    <>
    <div className={styles.title}>
      <h1>All Characters avaliable in API!</h1>
    </div>

    <section className={styles.container}>
    <div className={styles.containerMain}>
        {characters.characters.results.length >=1 ? characters.characters.results.slice(offset, offset + PER_PAGE).map((item, key) =>(
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
        )):<h2>Not Characters found!</h2> }
        
        {characters.characters.results.length > 4 && (
            <div className={styles.center}>
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próximo"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
            </div>
          )}     

    </div>
    </section>
    </>

  )
}

export const getServerSideProps = async(ctx) =>{
 
  const {['next-auth.session-token']: token} = parseCookies(ctx)
  const response = await api.get('/character')
  const data = await response.data;
  
  if(!token){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }else{
    return {
      props: {characters: data}
    }
  }

  
}