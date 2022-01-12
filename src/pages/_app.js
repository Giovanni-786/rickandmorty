// import { About } from '../components/About'
import { Header } from '../components/Header'
import '../styles/globals.css'
import {Provider as NextAuthProvider} from 'next-auth/client';
import BoardProvider from '../context/contextApi';
import { Link } from 'react-router-dom';

function MyApp({ Component, pageProps }) {
  return (
    
    <BoardProvider>
    <NextAuthProvider session={pageProps.session}>
    <Header/>
    <Component {...pageProps} />
    </NextAuthProvider>
    </BoardProvider>
    
    
    )
}

export default MyApp
