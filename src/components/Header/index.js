
import { useSession, signIn } from 'next-auth/client';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import { ToastContainer } from 'react-nextjs-toast'
import { useRouter } from 'next/router'
import { useState } from 'react';

export function Header(){
    const router = useRouter()
    const [session] = useSession();
    const [isActive, setIsActive] = useState();

  function handleCharacters(){
      if(!session){
          signIn('github')       
          
    }else{
        return router.push("/characters");
      }

      return router.push("/characters");
      }

      function handleClick(){
          setIsActive('active');
      }

      console.log(isActive);
    
  return (
        <>
        
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <nav>          
                    <a  onClick={handleClick} className={isActive == 'active' ? styles.active : null} href="/">Home</a>
                    {
                    (session) ?
                    <a onClick={handleCharacters}>Characters</a>
                    : null
                    }
                    </nav>
                <SignInButton />
            </div>
        </header>
        </>
    );
    }