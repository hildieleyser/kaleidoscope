import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import NeuralNetworkAnimation from '../components/visualizations/NeuralNetworkAnimation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const featuredArticlesRef = useRef(null);
  
  useEffect(() => {
    if (featuredArticlesRef.current) {
      gsap.from(featuredArticlesRef.current.querySelectorAll('.article-card'), {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuredArticlesRef.current,
          start: "top 80%",
        }
      });
    }
  }, []);
  
  return (
    <>
      <Head>
        <title>Kalidescope | Neuroscience Blog</title>
        <meta name="description" content="Explore the fascinating world of neuroscience through our blog articles and interactive visualizations." />
      </Head>
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <NeuralNetworkAnimation />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
              Kalidescope
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Explore the beautiful complexity of the human brain through cutting-edge neuroscience
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-full text-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
            Explore Articles
          </button>
        </div>
      </section>
      
      {/* Featured Articles */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900" ref={featuredArticlesRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Featured Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "The Neural Basis of Consciousness",
                excerpt: "Exploring the latest theories on how our brains create conscious experience.",
                image: "/images/consciousness.jpg",
                category: "Cognitive Neuroscience"
              },
              {
                title: "Neuroplasticity and Learning",
                excerpt: "How our brains rewire themselves when we acquire new knowledge and skills.",
                image: "/images/neuroplasticity.jpg", 
                category: "Learning & Memory"
              },
              {
                title: "The Future of Brain-Computer Interfaces",
                excerpt: "Recent breakthroughs in technology that connects minds and machines.",
                image: "/images/bci.jpg",
                category: "Neurotech"
              }
            ].map((article, index) => (
              <div key={index} className="article-card bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="h-48 bg-gray-700 relative">
                  {/* Image would be here in production */}
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs py-1 px-2 rounded-full">
                    {article.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                  <p className="text-gray-300 mb-4">{article.excerpt}</p>
                  <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="/articles" className="inline-block border border-blue-400 text-blue-400 py-2 px-6 rounded-full hover:bg-blue-400 hover:text-black transition-colors">
              View All Articles
            </a>
          </div>
        </div>
      </section>
      
      {/* Interactive Visualization Preview */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Interactive Visualizations
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Experience neuroscience concepts through our interactive 3D visualizations that bring complex ideas to life.
              </p>
              <a href="/visualizations" className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-8 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg">
                Explore Visualizations
              </a>
            </div>
            <div className="md:w-1/2 bg-gray-800 h-80 rounded-xl overflow-hidden">
              {/* This would be an interactive visualization preview */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                [Interactive Brain Model Preview]
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-10 backdrop-blur-sm border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Stay at the Cutting Edge
            </h2>
            <p className="text-gray-300 mb-8 text-center max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest neuroscience discoveries, breakthrough research, and interactive content.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Kalidescope</h3>
              <p className="mb-4">Exploring the fascinating world of neuroscience through engaging content and interactive visualizations.</p>
            </div>
            
            <div>
              <h4 className="text-white text-lg font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                {['Cognitive Neuroscience', 'Neuroanatomy', 'Neurotech', 'Learning & Memory', 'Clinical Neuroscience'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-blue-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'Contributors'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-blue-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-lg font-bold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((platform) => (
                  <a key={platform} href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    {platform[0]}
                  </a>
                ))}
              </div>
              <p>© {new Date().getFullYear()} Kalidescope. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 