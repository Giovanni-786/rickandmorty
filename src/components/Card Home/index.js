import styles from './styles.module.scss';

export function CardHome(props) {    
    
      
    return (
        <>
        <div className={styles.containerMain}>
        {props.data.map((item) => {
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

        </div>
    
        
        </>
    );
}
