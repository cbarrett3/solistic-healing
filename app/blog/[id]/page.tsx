'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';

import { Navbar } from '../../components/layout';

// Sample blog data - this would typically come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: 'Understanding the Mind-Body Connection in Therapy',
    excerpt: 'Exploring how our physical sensations influence our mental state and how integrated approaches can lead to more effective healing.',
    content: `
      <p>The mind-body connection is a powerful relationship that forms the foundation of holistic healing approaches. When we understand how our physical sensations influence our mental state—and vice versa—we can develop more effective therapeutic strategies.</p>
      
      <h2>The Science Behind the Connection</h2>
      <p>Research in neuroscience has demonstrated that our thoughts and emotions directly impact our physical health. The nervous system, endocrine system, and immune system all communicate with each other, creating a complex network of interactions.</p>
      
      <p>When we experience stress, our body releases cortisol and adrenaline, preparing us for "fight or flight." This physiological response can manifest as increased heart rate, shallow breathing, muscle tension, and digestive issues. Over time, chronic stress can lead to serious health problems.</p>
      
      <h2>Therapeutic Approaches</h2>
      <p>Integrative therapies that acknowledge the mind-body connection include:</p>
      
      <ul>
        <li><strong>Somatic Experiencing:</strong> Focuses on bodily sensations to resolve trauma</li>
        <li><strong>Mindfulness-Based Cognitive Therapy:</strong> Combines meditation with cognitive techniques</li>
        <li><strong>Yoga Therapy:</strong> Uses movement, breath, and awareness to promote healing</li>
        <li><strong>Biofeedback:</strong> Provides real-time information about physiological processes</li>
      </ul>
      
      <p>By incorporating awareness of physical sensations into therapeutic work, clients can develop greater emotional regulation skills and resilience.</p>
      
      <h2>Practical Applications</h2>
      <p>In our practice, we've found that simple techniques like body scanning, breath awareness, and gentle movement can significantly enhance therapeutic outcomes. These approaches help clients develop a more integrated sense of self and greater capacity for self-regulation.</p>
      
      <p>The mind-body connection reminds us that healing is not compartmentalized—it's a holistic process that encompasses our entire being.</p>
    `,
    category: 'Mind-Body',
    date: 'March 15, 2025',
    readTime: '6 min read',
    imageSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    featured: true,
    author: {
      name: 'Eric Peterson',
      role: 'Holistic Therapist',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [2, 3, 7]
  },
  {
    id: 2,
    title: 'The Science Behind Ketamine-Assisted Therapy',
    excerpt: 'Recent research findings on how ketamine affects neuroplasticity and creates opportunities for psychological breakthroughs.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'Research',
    date: 'March 8, 2025',
    readTime: '8 min read',
    imageSrc: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Energy Healing Specialist',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 5, 8]
  },
  {
    id: 3,
    title: 'Mindfulness Practices for Daily Anxiety Management',
    excerpt: 'Simple techniques you can incorporate into your routine to reduce anxiety and increase present-moment awareness.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'Mindfulness',
    date: 'February 28, 2025',
    readTime: '5 min read',
    imageSrc: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Nutritional Therapist',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 6, 7]
  },
  {
    id: 4,
    title: 'Trauma-Informed Care: A Compassionate Approach',
    excerpt: 'How understanding the impact of trauma can transform therapeutic relationships and improve outcomes.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'Trauma',
    date: 'February 20, 2025',
    readTime: '7 min read',
    imageSrc: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Mindfulness Instructor',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 3, 6]
  },
  {
    id: 5,
    title: 'The Role of Psychedelics in Modern Psychotherapy',
    excerpt: 'An overview of current research and therapeutic applications of psychedelic medicines in mental health treatment.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'Psychedelics',
    date: 'February 12, 2025',
    readTime: '9 min read',
    imageSrc: 'https://images.unsplash.com/photo-1502230831726-fe5549140034?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Trauma Specialist',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [2, 7, 8]
  },
  {
    id: 6,
    title: 'Somatic Experiencing: Healing Trauma Through the Body',
    excerpt: 'How somatic approaches help release stored trauma patterns and restore natural regulation to the nervous system.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'Somatic',
    date: 'January 30, 2025',
    readTime: '6 min read',
    imageSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Sound Healing Practitioner',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 3, 4]
  },
  {
    id: 7,
    title: 'Integrating Spirituality into Therapeutic Practice',
    excerpt: 'The benefits of acknowledging spiritual dimensions in therapy while maintaining evidence-based approaches.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'Spirituality',
    date: 'January 15, 2025',
    readTime: '7 min read',
    imageSrc: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Integrative Health Specialist',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 3, 5]
  },
  {
    id: 8,
    title: 'The Neuroscience of Attachment and Relationships',
    excerpt: 'How early attachment patterns shape our neural pathways and influence our adult relationships.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'Neuroscience',
    date: 'January 5, 2025',
    readTime: '8 min read',
    imageSrc: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Breathwork Facilitator',
      avatar: '/eric.jpeg'
    },
    relatedPosts: [1, 2, 5]
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle mobile menu toggle from Navbar component
  const handleMobileMenuToggle = (isOpen: boolean) => {
    setMobileMenuOpen(isOpen);
  };
  
  useEffect(() => {
    // Simulate fetching post data
    setIsLoading(true);
    const postId = Number(params.id);
    const foundPost = blogPosts.find(p => p.id === postId);
    
    if (foundPost) {
      setPost(foundPost);
      
      // Get related posts
      if (foundPost.relatedPosts && foundPost.relatedPosts.length > 0) {
        const related = blogPosts.filter(p => foundPost.relatedPosts.includes(p.id));
        setRelatedPosts(related);
      }
      
      // Scroll to top
      window.scrollTo(0, 0);
    } else {
      // Post not found, redirect to blog listing
      router.push('/blog');
    }
    
    setIsLoading(false);
  }, [params.id, router]);
  
  if (isLoading || !post) {
    return (
      <div className="min-h-screen relative bg-background">
        <Navbar onMobileMenuToggle={handleMobileMenuToggle} forceDarkMode={true} />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="animate-pulse">
            <div className="h-8 bg-card/50 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-card/50 rounded w-1/4 mb-12"></div>
            <div className="h-64 bg-card/50 rounded mb-8"></div>
            <div className="h-4 bg-card/50 rounded mb-3"></div>
            <div className="h-4 bg-card/50 rounded mb-3"></div>
            <div className="h-4 bg-card/50 rounded mb-3"></div>
            <div className="h-4 bg-card/50 rounded w-5/6 mb-6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen relative bg-background">
      {/* Navigation Bar */}
      <Navbar onMobileMenuToggle={handleMobileMenuToggle} forceDarkMode={true} />
      
      {/* Article Header */}
      <section className="pt-24 md:pt-32 pb-6 w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.9] z-0">
          <Image
            src={post.imageSrc}
            alt=""
            fill
            className="object-cover blur-[2px]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-background/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mr-2 group-hover:-translate-x-1 transition-transform duration-300">
                  <ArrowLeft size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium">Back to articles</span>
              </Link>
              
              <div className="flex items-center gap-2">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] transition-colors duration-300"
                  aria-label="Share on Facebook"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                  </svg>
                </a>
                <a 
                  href={`https://www.instagram.com/`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E4405F]/10 hover:bg-[#E4405F]/20 text-[#E4405F] transition-colors duration-300"
                  aria-label="Share on Instagram"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden relative mr-2.5 ring-2 ring-background/80">
                  <Image 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{post.author.name}</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                {post.category}
              </span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-medium text-foreground mb-4"
            >
              {post.title}
            </motion.h1>
            
            <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-foreground/60 pb-6 border-b border-foreground/10">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg dark:prose-invert prose-headings:font-medium prose-headings:text-foreground prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary/40 prose-blockquote:bg-primary/5 prose-blockquote:py-0.5 prose-blockquote:px-4 prose-blockquote:rounded-sm prose-blockquote:not-italic prose-blockquote:text-foreground/80 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-foreground/10">
              <div className="flex items-start gap-4 p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-foreground/5">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">{post.author.name}</h3>
                  <p className="text-sm text-foreground/60 mb-3">{post.author.role}</p>
                  <p className="text-sm text-foreground/80">
                    Eric is a holistic therapist specializing in mind-body approaches to healing. 
                    With over 15 years of experience, he integrates traditional therapeutic methods 
                    with innovative approaches to support comprehensive wellness.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                <span className="text-foreground/60 text-sm">Topics:</span>
                <Link 
                  href={`/blog?category=${post.category}`}
                  className="px-3 py-1 bg-card/40 hover:bg-card/60 text-foreground/80 hover:text-foreground text-xs rounded-full transition-colors"
                >
                  {post.category}
                </Link>
                <Link 
                  href="/blog?category=Therapy"
                  className="px-3 py-1 bg-card/40 hover:bg-card/60 text-foreground/80 hover:text-foreground text-xs rounded-full transition-colors"
                >
                  Therapy
                </Link>
                <Link 
                  href="/blog?category=Wellness"
                  className="px-3 py-1 bg-card/40 hover:bg-card/60 text-foreground/80 hover:text-foreground text-xs rounded-full transition-colors"
                >
                  Wellness
                </Link>
              </div>
            </div>
            
            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <section className="py-12 md:py-16 bg-card/5">
                <div className="container mx-auto px-4">
                  <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl md:text-2xl font-medium text-foreground">Related Articles</h2>
                      <Link href="/blog" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                        View all articles
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <Link 
                          href={`/blog/${relatedPost.id}`}
                          key={relatedPost.id}
                          className="group"
                        >
                          <article className="relative p-6 bg-card/30 hover:bg-card/50 border border-foreground/5 rounded-lg transition-all duration-300 h-full flex flex-col overflow-hidden">
                            {/* Subtle background image for entire card */}
                            <div className="absolute inset-0 w-full h-full opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-300">
                              <Image
                                src={relatedPost.imageSrc}
                                alt=""
                                fill
                                className="object-cover blur-[1px]"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/70"></div>
                            </div>
                            
                            {/* Content positioned above the background */}
                            <div className="relative z-10 flex flex-col h-full">
                              {/* Article metadata with enhanced typography */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  <div className="w-7 h-7 rounded-full overflow-hidden relative mr-2.5 ring-2 ring-background/80">
                                    <Image 
                                      src={relatedPost.author.avatar} 
                                      alt={relatedPost.author.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <span className="text-xs font-medium">{relatedPost.author.name}</span>
                                </div>
                              </div>
                              
                              {/* Title with dynamic sizing and improved typography */}
                              <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                {relatedPost.title}
                              </h3>
                              
                              {/* First paragraph of content with proper styling */}
                              <div className="mb-4 flex-grow">
                                <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
                                  {relatedPost.excerpt}
                                </p>
                              </div>
                              
                              {/* Enhanced footer with date, read time and visual indicator */}
                              <div className="flex items-center justify-between pt-4 border-t border-foreground/10 mt-auto">
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-foreground/60">{relatedPost.date}</span>
                                  <span className="flex items-center text-xs text-foreground/60">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-primary/70" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    {relatedPost.readTime}
                                  </span>
                                </div>
                                
                                {/* Read more indicator with animation */}
                                <div className="flex items-center text-primary text-xs font-medium group-hover:underline">
                                  Read more
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
