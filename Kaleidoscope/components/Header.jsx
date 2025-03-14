import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [router.asPath])
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-display font-bold text-gradient">Kaleidoscope</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link 
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors hover:text-primary-600 ${
                  router.pathname === link.href ? 'text-primary-600' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span 
                className={`block h-0.5 bg-neutral-800 dark:bg-neutral-200 transition-transform duration-300 ${
                  isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''
                }`}
              />
              <span 
                className={`block h-0.5 bg-neutral-800 dark:bg-neutral-200 transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`block h-0.5 bg-neutral-800 dark:bg-neutral-200 transition-transform duration-300 ${
                  isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <motion.div 
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 py-4 bg-white dark:bg-neutral-900 shadow-md">
          <nav className="flex flex-col space-y-4">
            {navLinks.map(link => (
              <Link 
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors py-2 hover:text-primary-600 ${
                  router.pathname === link.href ? 'text-primary-600' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </header>
  )
} 