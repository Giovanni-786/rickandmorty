import { Link } from 'react-router-dom';
import { useBoard } from '../../context/contextApi';
import styles from './styles.module.scss';

export function CardCharacter(props){

    const {
        currentPage,
        setCurrentPage
    } = useBoard()

    const PER_PAGE = 20;
    const offset = currentPage * PER_PAGE;

    return(
        <>
        <div className={styles.containerMain}>
        {props.data?.slice(offset, offset+PER_PAGE).map((item)=>(     
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
                <a href={`/character/${item.id}`} className={styles.link_slug}>Show character</a>
             </div>
             <div className={styles.cardImage}>
               <img src={item.image}></img>
             </div>
           </div>
         </section>
        ))} 
        </div>
      </>
    )

}