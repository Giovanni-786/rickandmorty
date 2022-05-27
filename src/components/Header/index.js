
import { useSession, signIn } from 'next-auth/client';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/link';


export function Header(){
    const router = useRouter()
    const [session] = useSession();
    const [isActive, setIsActive] = useState();
    const { asPath } = useRouter();

    console.log(asPath);

  function handleCharacters(){
      if(!session){
          signIn('github')       
          
    }else{
        return router.push("/characters");
      }

      return router.push("/characters");
      }

    
  return (
        <>
        
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <nav>          
                    <Link href="/">
                     <a className={asPath === '/' ? styles.active : ''}> Home </a>
                    </Link>
                    {
                    (session) ?
                    <Link href="/characters"> 
                        <a className={asPath === '/characters' ? styles.active : ''}>Characters</a>
                    </Link>
                    : null
                    }
                    </nav>
                <SignInButton />
            </div>
        </header>
        </>
    );
    }