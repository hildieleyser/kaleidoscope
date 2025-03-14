import { useState } from 'react'
import { motion } from 'framer-motion'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus(null)
      }, 5000)
    }, 1500)
  }
  
  return (
    <section className="py-16 px-6 neuron-bg">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get brain insights in your inbox
            </motion.h2>
            <motion.p 
              className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Subscribe to our newsletter for the latest neuroscience breakthroughs, 
              thought-provoking insights, and practical knowledge.
            </motion.p>
          </div>
          
          <motion.form 
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-grow px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            
            {status === 'success' && (
              <motion.p 
                className="mt-3 text-green-600 dark:text-green-400"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                Thanks for subscribing! Check your inbox to confirm your email.
              </motion.p>
            )}
            
            {status === 'error' && (
              <motion.p 
                className="mt-3 text-red-600 dark:text-red-400"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                There was an error subscribing. Please try again.
              </motion.p>
            )}
            
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              We respect your privacy. No spam, just brain science.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
} 