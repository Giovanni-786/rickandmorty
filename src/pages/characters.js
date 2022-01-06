import styles from '../styles/Characters.module.scss'
import { useSession, signIn, session, getSession } from 'next-auth/client';
import { parseCookies } from 'nookies';
import { api } from '../services/api';
import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";


import Router from 'next/router'
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';



export default function Characters({characters, page}) {
  
  const [items, setitems] = useState([]);
  const [infos, setInfos] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(()=>{
    setitems(characters.results);
    setInfos(characters.info);
  },[characters.results, characters.info, currentPage])

  const PER_PAGE = 20;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(infos?.count / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
    Router.push(`?page=${page = selectedPage + 1}`);
  };



  return (
    <>  
    <div className={styles.title}>
      <h1>All Characters avaliable in API!</h1>
    </div>   
    <div className={styles.containerMain}>
            {items.slice(offset, offset+PER_PAGE).map((item)=>(
                 
                 <section key={item.id} className={styles.cardContainer}>
                 <div className={styles.card}>
                   <div className={styles.cardContent}>
                     <h2>{item.name}</h2>
                     <span className={styles.status}>
                       <img src="/images/lens.svg" alt="circle" className={item.status == 'Dead' ? styles.dead : item.status === 'unknown' ? styles.unknown : null}></img>
                       {item.status}
                     </span>
                     <p>{item.species}</p>
                     <p>{item.gender}</p>
                     <p>Origin: {item.origin.name}</p>
 
                     <Link href={`/character/${item.id}`}>
                       <a className={styles.link_slug}>Show character</a>
                     </Link>
                   </div>
                   <div className={styles.cardImage}>
                     <img src={item.image}></img>
                   </div>
                 </div>
               </section>
               
            ))}
      </div>

      <section className={styles.paginate_container}>
       <div className={styles.paginate}>
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
      </section>

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