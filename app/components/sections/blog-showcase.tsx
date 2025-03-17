'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Sample blog data - this would typically come from a CMS or API
const sampleBlogPosts = [
  {
    id: 1,
    title: 'Understanding the Mind-Body Connection in Therapy',
    excerpt: 'Exploring how our physical sensations influence our mental state and how integrated approaches can lead to more effective healing.',
    category: 'Mind-Body',
    date: 'March 15, 2025',
    readTime: '6 min read',
    imageSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 2,
    title: 'The Science Behind Ketamine-Assisted Therapy',
    excerpt: 'Recent research findings on how ketamine affects neuroplasticity and creates opportunities for psychological breakthroughs.',
    category: 'Research',
    date: 'March 8, 2025',
    readTime: '8 min read',
    imageSrc: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Mindfulness Practices for Daily Anxiety Management',
    excerpt: 'Simple techniques you can incorporate into your routine to reduce anxiety and increase present-moment awareness.',
    category: 'Mindfulness',
    date: 'February 28, 2025',
    readTime: '5 min read',
    imageSrc: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Trauma-Informed Care: A Compassionate Approach',
    excerpt: 'How understanding the impact of trauma can transform therapeutic relationships and improve outcomes.',
    category: 'Trauma',
    date: 'February 20, 2025',
    readTime: '7 min read',
    imageSrc: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'The Role of Psychedelics in Modern Psychotherapy',
    excerpt: 'An overview of current research and therapeutic applications of psychedelic medicines in mental health treatment.',
    category: 'Psychedelics',
    date: 'February 12, 2025',
    readTime: '9 min read',
    imageSrc: 'https://images.unsplash.com/photo-1502230831726-fe5549140034?q=80&w=800&auto=format&fit=crop',
  },
];

export default function BlogShowcase() {
  const [hoveredPostId, setHoveredPostId] = useState<number | null>(null);
  const featuredPost = sampleBlogPosts.find(post => post.featured);
  const regularPosts = sampleBlogPosts.filter(post => !post.featured).slice(0, 4);
  
  return (
    <section data-section className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">Insights & Perspectives</h2>
          <div className="w-[60px] h-[1px] bg-primary mb-6"></div>
          <p className="text-foreground/70 max-w-[700px]">
            Explore our latest articles on mental health, therapeutic approaches, and personal growth strategies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-10">
          {/* Featured post - takes up more space */}
          {featuredPost && (
            <motion.div 
              className="col-span-1 lg:col-span-6 group cursor-pointer"
              initial={{ opacity: 0.9 }}
              whileHover={{ 
                opacity: 1,
                y: -4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              onMouseEnter={() => setHoveredPostId(featuredPost.id)}
              onMouseLeave={() => setHoveredPostId(null)}
            >
              <Link href="/blog" className="block h-full">
                <div className="relative h-full overflow-hidden rounded-xl border-2 border-border/20 hover:border-primary/30 bg-card/30 backdrop-blur-md shadow-lg flex flex-col transition-all duration-300">
                  {/* Featured post image - subtle and small */}
                  <div className="relative w-full h-[140px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent z-10"></div>
                    <motion.div
                      animate={{ 
                        scale: hoveredPostId === featuredPost.id ? 1.05 : 1 
                      }}
                      transition={{ duration: 0.4 }}
                      className="h-full w-full"
                    >
                      <Image
                        src={featuredPost.imageSrc}
                        alt={featuredPost.title}
                        fill
                        className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </motion.div>
                    
                    {/* Featured tag */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-primary text-black text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <span className="text-primary">{featuredPost.category}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredPost.date}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm md:text-base mb-6 flex-1">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center text-primary text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform duration-300">
                      Read Article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
          
          {/* Regular posts grid */}
          <div className="col-span-1 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {regularPosts.map((post) => (
              <motion.div 
                key={post.id}
                className="group cursor-pointer"
                initial={{ opacity: 0.9 }}
                whileHover={{ 
                  opacity: 1,
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                onMouseEnter={() => setHoveredPostId(post.id)}
                onMouseLeave={() => setHoveredPostId(null)}
              >
                <Link href="/blog" className="block h-full">
                  <div className="relative h-full overflow-hidden rounded-xl border-2 border-border/20 hover:border-primary/30 bg-card/30 backdrop-blur-md shadow-lg flex flex-col transition-all duration-300">
                    {/* Small image at top */}
                    <div className="relative w-full h-[80px] overflow-hidden">
                      <motion.div
                        animate={{ 
                          scale: hoveredPostId === post.id ? 1.05 : 1 
                        }}
                        transition={{ duration: 0.4 }}
                        className="h-full w-full"
                      >
                        <Image
                          src={post.imageSrc}
                          alt={post.title}
                          fill
                          className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <span className="text-primary">{post.category}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-base sm:text-lg font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-3 flex-1">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-primary text-xs font-medium mt-auto group-hover:translate-x-1 transition-transform duration-300">
                        Read Article
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Latest blog posts - horizontal scrolling list on mobile */}
        <div className="mt-12 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-light text-foreground">Latest Articles</h3>
            <motion.div
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link 
                href="/blog" 
                className="text-primary text-sm font-medium hover:underline flex items-center"
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
          
          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex space-x-6 min-w-max">
              {sampleBlogPosts.map((post) => (
                <motion.div 
                  key={post.id}
                  className="w-[280px] sm:w-[320px] shrink-0 border-l-2 border-primary/30 pl-4 group cursor-pointer"
                  whileHover={{ 
                    x: 3,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  <Link href="/blog">
                    <div className="flex flex-row items-center gap-3">
                      {/* Tiny circular image */}
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-primary/20">
                        <Image
                          src={post.imageSrc}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <span className="text-primary">{post.category}</span>
                          <span className="mx-2">•</span>
                          <span>{post.date}</span>
                        </div>
                        
                        <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </h4>
                        
                        <div className="flex items-center text-primary text-xs font-medium mt-1 group-hover:translate-x-1 transition-transform duration-300">
                          Read
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Newsletter signup */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 sm:p-8 border border-primary/10 hover:border-primary/20 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="md:w-2/3">
              <h3 className="text-xl md:text-2xl font-light text-foreground mb-2">Stay Updated</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Subscribe to our newsletter for the latest articles, insights, and therapeutic approaches.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 bg-background/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px]"
                />
                <motion.button 
                  className="bg-primary text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors min-h-[44px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        
        {/* View all blog posts CTA */}
        <div className="text-center mt-12">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center text-primary border-2 border-primary px-6 py-2 rounded-full text-sm hover:bg-primary hover:text-black transition-all duration-300 group min-h-[44px]"
            >
              Explore All Articles
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
