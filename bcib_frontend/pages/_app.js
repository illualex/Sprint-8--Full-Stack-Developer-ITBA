import '@/styles/globals.css'
import { AuthProvider } from '../components/authContext';
import Footer from '@/components/footer'
import Header from '@/components/header'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </>
  )
}
