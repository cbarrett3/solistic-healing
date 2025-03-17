'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimationControls } from 'framer-motion';

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

// Duplicate posts to create a seamless loop
const duplicatedPosts = [...sampleBlogPosts, ...sampleBlogPosts];

export default function AutoScrollPosts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [hoveredPostId, setHoveredPostId] = useState<number | null>(null);
  
  // Find featured post and regular posts
  const featuredPost = sampleBlogPosts.find(post => post.featured);
  const regularPosts = sampleBlogPosts.filter(post => !post.featured);
  
  // Duplicate regular posts to create a seamless loop
  const duplicatedRegularPosts = [...regularPosts, ...regularPosts];
  
  useEffect(() => {
    const animate = async () => {
      // Get the width of the container and its content
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = containerRef.current.scrollWidth / 2; // Half because we duplicated the content
      
      // Set initial position
      await controls.set({ x: 0 });
      
      // Animate continuously
      await controls.start({
        x: -contentWidth,
        transition: {
          duration: 30, // Adjust speed here (seconds to complete one cycle)
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    };
    
    animate();
    
    // Pause animation on hover
    const container = containerRef.current;
    const handleMouseEnter = () => controls.stop();
    const handleMouseLeave = () => animate();
    
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [controls]);
  
  return (
    <section data-section className="w-full py-16 md:py-24 bg-gradient-to-b from-background to-background/95 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">Latest Articles</h2>
          <div className="w-[60px] h-[1px] bg-primary mb-6"></div>
          <p className="text-foreground/70 max-w-[700px]">
            Explore our latest articles on mental health, therapeutic approaches, and personal growth strategies.
          </p>
        </div>
        
        {/* Featured post */}
        {featuredPost && (
          <div className="mb-12">
            <motion.div 
              className="mx-auto max-w-3xl group cursor-pointer"
              initial={{ opacity: 0.9 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
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
                <div className="relative h-full overflow-hidden rounded-xl border-2 border-border/20 hover:border-primary/30 bg-card/30 backdrop-blur-md shadow-lg flex flex-col md:flex-row transition-all duration-300">
                  {/* Featured post image */}
                  <div className="relative w-full md:w-2/5 h-[200px] md:h-auto overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent z-10 md:bg-gradient-to-r"></div>
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
          </div>
        )}
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg md:text-xl font-medium text-foreground">More Articles</h3>
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Auto-scrolling posts container */}
      <div 
        ref={containerRef} 
        className="relative w-full"
      >
        <motion.div 
          className="flex gap-6 py-4"
          animate={controls}
        >
          {duplicatedRegularPosts.map((post, index) => (
            <PostCard key={`${post.id}-${index}`} post={post} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface PostCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    imageSrc: string;
  };
}

function PostCard({ post }: PostCardProps) {
  return (
    <motion.div 
      className="flex-shrink-0 w-[280px] sm:w-[320px] group cursor-pointer"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      <Link href="/blog" className="block h-full">
        <div className="relative h-full overflow-hidden rounded-xl border-2 border-border/20 hover:border-primary/30 bg-card/30 backdrop-blur-md shadow-lg flex flex-col transition-all duration-300">
          {/* Post image */}
          <div className="relative w-full h-[140px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent z-10"></div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full"
            >
              <Image
                src={post.imageSrc}
                alt={post.title}
                fill
                className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                sizes="(max-width: 768px) 280px, 320px"
              />
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-center text-xs text-muted-foreground mb-3">
              <span className="text-primary">{post.category}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>
            
            <h3 className="text-lg font-medium text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
              {post.excerpt}
            </p>
            
            <div className="flex items-center text-primary text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform duration-300">
              Read
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
