// This is a setup script to create the public directory structure
const fs = require('fs')
const path = require('path')

// Create directories
const directories = [
  'public/images',
  'public/images/posts',
  'public/images/authors',
  '_posts'
]

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`Created directory: ${dir}`)
  }
})

// Create a placeholder image function
function createPlaceholderImage(filePath, width, height, color) {
  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">
    Image Placeholder
  </text>
</svg>
  `.trim()
  
  fs.writeFileSync(filePath, svg)
  console.log(`Created placeholder image: ${filePath}`)
}

// Create placeholder images for development
const placeholderImages = [
  { path: 'public/images/posts/creativity.jpg', width: 1200, height: 800, color: '#3B82F6' },
  { path: 'public/images/posts/memory.jpg', width: 1200, height: 800, color: '#8B5CF6' },
  { path: 'public/images/posts/gut-brain.jpg', width: 1200, height: 800, color: '#10B981' },
  { path: 'public/images/authors/emma-chen.jpg', width: 500, height: 500, color: '#6366F1' },
  { path: 'public/images/authors/marcus-johnson.jpg', width: 500, height: 500, color: '#EC4899' },
  { path: 'public/images/authors/sofia-rodriguez.jpg', width: 500, height: 500, color: '#F59E0B' },
  { path: 'public/images/brain-visualization.webp', width: 800, height: 800, color: '#4F46E5' },
  { path: 'public/favicon.ico', width: 32, height: 32, color: '#2563EB' }
]

placeholderImages.forEach(img => {
  createPlaceholderImage(img.path, img.width, img.height, img.color)
})

console.log('Setup complete! Project structure is ready for development.') 