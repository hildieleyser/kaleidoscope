import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { getAllPosts } from '../../lib/posts'
import BlogCard from '../../components/BlogCard'
import CategoryFilter from '../../components/CategoryFilter'

export default function Blog({ posts, categories }) {
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [activeCategory, setActiveCategory] = useState('all')
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    if (category === 'all') {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts.filter(post => 
        post.categories.includes(category)
      ))
    }
  }
  
  return (
    <>
      <Head>
        <title>Blog | Kaleidoscope</title>
      </Head>
      
      <section className="py-20 px-6 neuron-bg">
        <div className="container mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore the <span className="text-gradient">Brain</span>
          </motion.h1>
          <motion.p 
            className="text-xl max-w-2xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Dive into our collection of articles that make neuroscience fascinating and accessible.
          </motion.p>
          
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>
      </section>
      
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg">No articles found in this category. Try another filter?</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()
  
  // Extract unique categories
  const categoriesSet = new Set()
  posts.forEach(post => {
    post.categories.forEach(category => categoriesSet.add(category))
  })
  
  const categories = Array.from(categoriesSet)
  
  return {
    props: {
      posts,
      categories
    }
  }
} 