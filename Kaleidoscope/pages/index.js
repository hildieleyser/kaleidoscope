import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import FeaturedPosts from '../components/FeaturedPosts'
import NewsletterSignup from '../components/NewsletterSignup'
import { fadeIn } from '../utils/animations'
import { getFeaturedPosts } from '../lib/posts'

export default function Home({ featuredPosts }) {
  return (
    <>
      <Head>
        <title>Kaleidoscope | Neuroscience Blog</title>
      </Head>
      
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden neuron-bg py-20">
        <motion.div 
          className="container mx-auto px-6 z-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-display font-bold mb-6"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }
            }}
          >
            <span className="text-gradient">Kaleidoscope</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-2xl"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
              }
            }}
          >
            Where brains get interesting without the academic hangover. 
            Neuroscience that's scientifically accurate and actually readable by humans.
          </motion.p>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: 0.4, ease: "easeOut" }
              }
            }}
          >
            <Link href="/blog" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg px-6 py-3 text-lg transition-colors">
              Explore Articles
            </Link>
          </motion.div>
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-neutral-900 pointer-events-none"></div>
      </section>
      
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
            Featured Insights
          </h2>
          <FeaturedPosts posts={featuredPosts} />
        </div>
      </section>
      
      <section className="py-16 px-6 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Visualizing the invisible
              </h2>
              <p className="text-lg mb-6">
                Kaleidoscope brings complex neuroscience concepts to life through 
                interactive visualizations and clear explanations. We make the invisible 
                machinery of your mind visible and understandable.
              </p>
              <p className="text-lg mb-6">
                From memory formation to consciousness, we explore the fascinating 
                frontier of brain science without getting lost in technical jargon.
              </p>
              <Link href="/about" className="inline-block text-primary-600 hover:text-primary-700 font-medium text-lg animated-underline">
                Learn more about our mission
              </Link>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden animate-float">
                <Image 
                  src="/images/brain-visualization.webp" 
                  alt="Interactive brain visualization" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <NewsletterSignup />
    </>
  )
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts()
  return {
    props: {
      featuredPosts
    }
  }
} 