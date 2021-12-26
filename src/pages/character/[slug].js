import { api } from '../../services/api';
import styles from './character.module.scss'

export default function Character({character}){

    
    return(
        <div className={styles.containerMain}>
              return (
                <section className={styles.cardContainer}>
                  <div className={styles.card}>
                    <div className={styles.cardContent}>
                      <h2>{character.name}</h2>
                      <span className={styles.status}>
                        <img src="/images/lens.svg" alt="circle" className={character.status == 'Dead' ? styles.dead : character.status === 'unknown' ? styles.unknown : null}></img>
                        {character.status}
                      </span>
                      <p>{character.species}</p>
                      <p>{character.gender}</p>
                      <p>Origin: {character.origin.name}</p> 
                    </div>
                    <div className={styles.cardImage}>
                      <img src={character.image}></img>
                    </div>
                  </div>
                </section>
                )       
               
        </div>
    )
}


export const getServerSideProps = async({params}) =>{
        const {slug} = params;

        const response = await api.get(`/character/${slug}`);
        const data = await response.data;
        return {
            props: {
                character: data,
            }
        }
}
