import { getAllPosts } from '../../lib/posts';

export default function handler(req, res) {
  try {
    // This will create sample posts if they don't exist yet
    const posts = getAllPosts();
    
    res.status(200).json({ 
      success: true, 
      message: 'Setup complete! Sample posts created.', 
      postsCount: posts.length 
    });
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error during setup', 
      error: error.message 
    });
  }
} 