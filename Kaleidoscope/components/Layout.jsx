import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  const [mounted, setMounted] = useState(false)
  
  // Hydration fix
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {mounted && children}
      </motion.main>
      <Footer />
    </div>
  )
} 