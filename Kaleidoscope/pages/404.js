import { motion } from 'framer-motion'
import Link from 'next/link'
import Head from 'next/head'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Kaleidoscope</title>
      </Head>
      
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-md w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-display font-bold text-primary-600 mb-6">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg px-6 py-3 text-lg transition-colors"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </>
  )
} 