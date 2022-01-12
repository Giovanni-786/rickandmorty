import styles from '../styles/Characters.module.scss'
import { useSession, signIn, session, getSession } from 'next-auth/client';
import { parseCookies } from 'nookies';
import { api } from '../services/api';
import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";


import Router from 'next/router'
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { CardCharacter } from '../components/CardCharacter';



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
            <CardCharacter data={items} />
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