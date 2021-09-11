import styles from './styles.module.scss';



export function About(){
    return(
        <>
        <div className={styles.containerAbout}>
        <div className={styles.aboutContent}>
        <img src="/images/logo.svg"></img> 
            <h1>What is it?</h1>
            <p>The Rick and Morty API is a REST(ish) and GraphQL API based on the television show Rick and Morty.<br></br> You will have access to about hundreds of characters, images, locations and episodes. The Rick and Morty API is filled with canonical information as seen on the TV show.</p>
            <p>Explore and meet all available characters and locations from the series</p>
            <a>Get to know this API</a>
        </div>
        </div>
        </>
    )
}