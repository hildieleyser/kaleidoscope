import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '../utils/date'

export default function FeaturedPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No featured posts available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="card group"
        >
          <Link href={`/blog/${post.slug}`} className="block">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: o768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-600 text-white rounded-full mb-2">
                  {post.categories[0]}
                </span>
                <h3 className="text-xl font-bold text-white">{post.title}</h3>
              </div>
            </div>
          </Link>
          <div className="p-6">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
              {formatDate(post.date)} • {post.readingTime} min read
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              {post.excerpt}
            </p>
            <Link 
              href={`/blog/${post.slug}`} 
              className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center animated-underline"
            >
              Read more
              <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 