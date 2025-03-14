import { motion } from 'framer-motion'

export default function CategoryFilter({ categories, activeCategory, onChange }) {
  if (!categories || categories.length === 0) {
    return null
  }
  
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-2 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeCategory === 'all' 
            ? 'bg-primary-600 text-white' 
            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
        }`}
        onClick={() => onChange('all')}
      >
        All Topics
      </button>
      
      {categories.map(category => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category 
              ? 'bg-primary-600 text-white' 
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
          }`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </motion.div>
  )
} 