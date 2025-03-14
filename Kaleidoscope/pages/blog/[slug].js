import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getPostBySlug, getAllPosts } from '../../lib/posts'
import { formatDate } from '../../utils/date'
import ShareButtons from '../../components/ShareButtons'
import AuthorBio from '../../components/AuthorBio'
import RelatedPosts from '../../components/RelatedPosts'

export default function BlogPost({ post, relatedPosts }) {
  useEffect(() => {
    // Add any post-render effects for interactive elements
    const codeBlocks = document.querySelectorAll('pre code')
    if (codeBlocks.length && window.hljs) {
      codeBlocks.forEach(block => {
        window.hljs.highlightElement(block)
      })
    }
  }, [])
  
  if (!post) return null
  
  return (
    <>
      <Head>
        <title>{post.title} | Kaleidoscope</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Kaleidoscope`} />
        <meta property="og:description" content={post.excerpt} />
        {post.coverImage && (
          <meta property="og:image" content={post.coverImage} />
        )}
      </Head>
      
      <article className="pt-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map(category => (
                  <span 
                    key={category}
                    className="text-sm font-medium px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                  >
                    {category}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center mb-6 text-neutral-600 dark:text-neutral-400">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="mx-2">•</span>
                <span>{post.readingTime} min read</span>
              </div>
            </motion.div>
            
            {post.coverImage && (
              <motion.div 
                className="relative aspect-video rounded-xl overflow-hidden mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Image 
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            )}
            
            <motion.div 
              className="prose prose-lg dark:prose-invert max-w-none mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <ShareButtons title={post.title} />
            
            <div className="my-12 border-t border-b border-neutral-200 dark:border-neutral-700 py-8">
              <AuthorBio author={post.author} />
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
              Continue exploring
            </h2>
            <RelatedPosts posts={relatedPosts} />
          </div>
        </div>
      </article>
    </>
  )
}

export async function getStaticPaths() {
  const posts = getAllPosts()
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }))
  
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  const allPosts = getAllPosts()
  
  // Get related posts based on categories
  const relatedPosts = allPosts
    .filter(p => 
      p.slug !== params.slug && 
      p.categories.some(c => post.categories.includes(c))
    )
    .slice(0, 3)
  
  return {
    props: {
      post,
      relatedPosts
    }
  }
} 