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
    excerpt: 'Exploring how our physical sensations influence our mental state and how integrated approaches can lead to more effective healing. The mind-body connection is a powerful relationship that has been recognized by healers across cultures for thousands of years. Modern research continues to validate this ancient wisdom, showing how our thoughts and emotions can manifest physically, and how physical practices can transform our mental health.',
    content: 'The concept of the mind-body connection acknowledges that our thoughts, feelings, beliefs, and attitudes can positively or negatively affect our biological functioning. In other words, our minds can affect how healthy our bodies are. Conversely, what we do with our physical body (what we eat, how much we exercise, even our posture) can impact our mental state, positively or negatively.\n\nThis connection is the foundation of many integrative healing approaches. When we understand that psychological factors can directly influence our physical health, we can develop more holistic treatment plans that address both aspects simultaneously.',
    category: 'Mind-Body',
    date: 'March 15, 2025',
    readTime: '6 min read',
    imageSrc: 'https://images.unsplash.com/photo-1559595500-e15296bdbb48?q=80&w=800&auto=format&fit=crop',
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
  const [isVisible, setIsVisible] = useState(false);
  
  // Find featured post and regular posts
  const featuredPost = sampleBlogPosts.find(post => post.featured);
  const regularPosts = sampleBlogPosts.filter(post => !post.featured);
  
  // Duplicate regular posts to create a seamless loop
  const duplicatedRegularPosts = [...regularPosts, ...regularPosts];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.querySelector('[data-section="blog"]');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
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
    <section data-section="blog" className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-background/95 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground">Latest Articles</h2>
                <div className="w-12 sm:w-14 md:w-16 h-0.5 bg-primary"></div>
              </div>
              <p className="text-sm sm:text-base text-foreground/70 max-w-xl">
                Explore our latest articles on mental health, therapeutic approaches, and personal growth strategies.
              </p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center text-primary text-sm font-medium mt-4 md:mt-0 hover:translate-x-1 transition-transform duration-300 group">
              View all articles
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
        
        {/* Featured post - Content-focused design */}
        {featuredPost && (
          <motion.div 
            className="mb-10 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="group cursor-pointer mx-auto">
              <Link href="/blog" className="block h-full">
                <div className="rounded-xl border border-border/20 hover:border-primary/30 shadow-md transition-all duration-300 overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    {/* Left side - Content */}
                    <div className="p-5 sm:p-6 md:p-8 lg:p-10 lg:w-3/5 xl:w-2/3 flex flex-col">
                      <div className="flex items-center text-xs text-muted-foreground mb-3 sm:mb-4">
                        <span className="text-primary font-medium">{featuredPost.category}</span>
                        <span className="mx-2">•</span>
                        <span>{featuredPost.date}</span>
                        <span className="mx-2">•</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground mb-3 sm:mb-4 md:mb-5 group-hover:text-primary transition-colors duration-300">
                        {featuredPost.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-5 md:mb-6">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="mt-2 space-y-4 text-sm text-muted-foreground/90 hidden md:block">
                        <p>{featuredPost.content?.split('\n\n')[0]}</p>
                        <p className="line-clamp-3">{featuredPost.content?.split('\n\n')[1]}</p>
                      </div>
                      
                      <div className="flex items-center text-primary text-sm font-medium mt-6 group-hover:translate-x-1 transition-transform duration-300">
                        Read Full Article
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Right side - Image */}
                    <div className="lg:w-2/5 xl:w-1/3 relative">
                      <div className="relative h-[200px] sm:h-[240px] md:h-[280px] lg:h-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent z-10 lg:block hidden"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10 lg:hidden"></div>
                        <motion.div
                          animate={{ 
                            scale: hoveredPostId === featuredPost.id ? 1.05 : 1 
                          }}
                          transition={{ duration: 0.4 }}
                          className="h-full w-full"
                          onMouseEnter={() => setHoveredPostId(featuredPost.id)}
                          onMouseLeave={() => setHoveredPostId(null)}
                        >
                          <Image
                            src={featuredPost.imageSrc}
                            alt={featuredPost.title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority
                          />
                        </motion.div>
                        
                        {/* Featured tag */}
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
                          <span className="bg-primary text-black text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
                            Featured
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
        
        <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
          <h3 className="text-base sm:text-lg md:text-xl font-medium text-foreground">More Articles</h3>
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Auto-scrolling posts container */}
      <div className="container mx-auto px-4 sm:px-6 overflow-hidden">
        <div 
          ref={containerRef} 
          className="relative w-full"
        >
          <motion.div 
            className="flex gap-4 sm:gap-5 md:gap-6 py-3 sm:py-4"
            animate={controls}
          >
            {duplicatedRegularPosts.map((post, index) => (
              <PostCard key={`${post.id}-${index}`} post={post} />
            ))}
          </motion.div>
        </div>
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
      className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[320px] group cursor-pointer"
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      <Link href="/blog" className="block h-full">
        <div className="h-full overflow-hidden rounded-xl border border-border/20 hover:border-primary/30 bg-card/30 backdrop-blur-md shadow-md transition-all duration-300">
          {/* Image */}
          <div className="relative h-[160px] sm:h-[180px] overflow-hidden">
            <Image
              src={post.imageSrc}
              alt={post.title}
              fill
              className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
              sizes="(max-width: 640px) 260px, (max-width: 768px) 280px, 320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="p-3 sm:p-4">
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <span className="text-primary">{post.category}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
            
            <h3 className="text-sm sm:text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-muted-foreground text-xs line-clamp-2 mb-2 sm:mb-3">
              {post.excerpt}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
