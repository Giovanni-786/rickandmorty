import styles from './styles.module.scss';
import ReactPaginate from "react-paginate";
import { useState } from 'react';

export function Card(props) {    
  const [currentPage, setCurrentPage] = useState(0);


  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
  
  const PER_PAGE = 20;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(props.data.info?.count / PER_PAGE);


    return (
        <>
        <div className={styles.containerMain}>
        {props.data.results?.slice(offset, offset + PER_PAGE).map((item, key) => {
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

        {props.data.results?.length > 4 && (
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
          )}
        </div>
      </>
    );
}
