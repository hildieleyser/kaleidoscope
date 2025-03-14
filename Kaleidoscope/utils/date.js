export function formatDate(dateString) {
  const date = new Date(dateString)
  
  // Format the date as Month DD, YYYY
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  }).format(date)
}

export function calculateReadingTime(content) {
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  
  // Count words in the content (rough estimate)
  const words = content.trim().split(/\s+/).length;
  
  // Calculate reading time
  const readingTime = Math.ceil(words / wordsPerMinute);
  
  // Return at least 1 minute
  return readingTime < 1 ? 1 : readingTime;
} 