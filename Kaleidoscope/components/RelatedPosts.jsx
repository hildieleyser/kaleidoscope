import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { formatDate } from '../utils/date'

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return null
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="card group"
        >
          <Link href={`/blog/${post.slug}`} className="block">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
          <div className="p-4">
            <Link href={`/blog/${post.slug}`} className="block group-hover:text-primary-600 transition-colors">
              <h3 className="font-bold mb-2">{post.title}</h3>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {formatDate(post.date)} • {post.readingTime} min read
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 