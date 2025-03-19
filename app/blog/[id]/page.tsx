'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';

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
      <section className="pt-24 md:pt-32 pb-8 md:pb-12 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              <span>Back to all articles</span>
            </Link>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6"
            >
              {post.title}
            </motion.h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag size={14} />
                <span>{post.category}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Image */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[240px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={post.imageSrc}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Author Info - Sidebar */}
              <div className="md:col-span-3 order-2 md:order-1">
                <div className="sticky top-24">
                  {post.author && (
                    <div className="mb-8 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/20">
                      <h3 className="text-lg font-light text-foreground mb-4">About the Author</h3>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{post.author.name}</p>
                          <p className="text-sm text-foreground/60">{post.author.role}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Share Links */}
                  <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/20">
                    <h3 className="text-lg font-light text-foreground mb-4">Share this article</h3>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        <Share2 size={18} />
                      </button>
                      {/* Add more social share buttons as needed */}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-9 order-1 md:order-2">
                <article className="prose prose-lg dark:prose-invert prose-headings:font-light prose-p:text-foreground/80 prose-a:text-primary hover:prose-a:text-primary/80 max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
                
                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-border/20">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-muted-foreground">Tags:</span>
                    <Link 
                      href={`/blog?category=${post.category}`}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {post.category}
                    </Link>
                    <Link 
                      href="/blog?category=Therapy"
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors"
                    >
                      Therapy
                    </Link>
                    <Link 
                      href="/blog?category=Wellness"
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors"
                    >
                      Wellness
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-card/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <motion.div
                    key={relatedPost.id}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ 
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Link href={`/blog/${relatedPost.id}`} className="block h-full">
                      <div className="h-full overflow-hidden rounded-xl border border-border/20 hover:border-primary/30 bg-card/30 backdrop-blur-md shadow-lg flex flex-col transition-all duration-300">
                        {/* Post image */}
                        <div className="relative h-[140px] overflow-hidden">
                          <Image
                            src={relatedPost.imageSrc}
                            alt={relatedPost.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        
                        {/* Post content */}
                        <div className="p-4 flex-1 flex flex-col">
                          <h3 className="text-lg font-light text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-foreground/70 text-sm mb-3 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <div className="mt-auto text-xs text-muted-foreground">
                            {relatedPost.date} · {relatedPost.readTime}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Newsletter CTA */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-light text-foreground mb-4">Enjoyed this article?</h3>
              <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive more insights on holistic healing, mental health, and therapeutic approaches.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-foreground/50 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
