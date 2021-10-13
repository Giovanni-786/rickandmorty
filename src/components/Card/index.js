import styles from './styles.module.scss';
import ReactPaginate from "react-paginate";
import { useEffect, useState } from 'react';
import { useBoard } from '../../context/contextApi';
import { api } from '../../services/api';

export function Card({character}) {    
  
  console.log(character);

  const [currentPage, setCurrentPage] = useState(0);
  // const [character, setCharacters] = useState([]);

  // const {
  //   currentPage,
  //   setCurrentPage
  // } = useBoard();

    // const getCharacters = async() => {
    //   api.get(`/character`).then((response)=>setCharacters(response.data)).catch((err)=>{
    //       console.log("Ops! Ocorreu um erro" + err);
    //     })
    // }

    // console.log(character.info.count)

    // useEffect(() =>{
    //   getCharacters();
    // },[])



  // const handlePageClick = ({ selected: selectedPage }) => {
  //   setCurrentPage(selectedPage);
  // };
  
  // const PER_PAGE = 20;
  // const offset = currentPage * PER_PAGE;
  // const pageCount = Math.ceil(character.info?.count / PER_PAGE);

    return (
        <>
        <div className={styles.containerMain}>
        {/* {character.results?.slice(offset, offset + PER_PAGE).map((item, key) => {
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

        {character.results?.length > 4 && (
            <div className={styles.center}>
              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próximo"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />

            </div>
          )} */}
        </div>
      </>
    );
}


export async function getStaticProps() {
  const response = await api.get('/character/1,2,8,4,5,6')
  const data = await response.data;
  
  return {
    props: {
      character: data,
    },
    revalidate: 60 * 60 * 24, // 24hrs
  }
}