import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '../utils/date'

export default function BlogCard({ post }) {
  return (
    <div className="card group h-full flex flex-col">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
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
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.slice(0, 2).map(category => (
            <span 
              key={category}
              className="text-xs font-medium px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
            >
              {category}
            </span>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`} className="block group-hover:text-primary-600 transition-colors mb-3">
          <h3 className="text-xl font-bold">{post.title}</h3>
        </Link>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
          {formatDate(post.date)} • {post.readingTime} min read
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-grow">
          {post.excerpt}
        </p>
        <Link 
          href={`/blog/${post.slug}`} 
          className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center mt-auto animated-underline"
        >
          Read more
          <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  )
} 