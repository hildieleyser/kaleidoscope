import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </AnimatePresence>
  )
}

export default MyApp 