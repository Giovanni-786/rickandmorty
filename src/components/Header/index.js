
import { useSession, signIn } from 'next-auth/client';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import { ToastContainer } from 'react-nextjs-toast'
import { useRouter } from 'next/router'

export function Header(){
    const router = useRouter()
    const [session] = useSession();

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
                    <a className={styles.active} href="/">Home</a>
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