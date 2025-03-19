'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

import { Navbar } from '../components/layout';
import { SectionHeading } from '../components/ui';

// Define types
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  imageSrc: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding the Mind-Body Connection in Therapy',
    excerpt: 'Explore how mental and physical health are interconnected and how holistic approaches to therapy can lead to more comprehensive healing.',
    content: 'The mind-body connection represents one of the most profound frontiers in modern therapeutic practice. Research consistently demonstrates that our thoughts and emotions directly influence our physical well-being, creating a feedback loop that can either promote healing or exacerbate illness. When we approach therapy with an integrated perspective, acknowledging both psychological and physiological dimensions, we unlock pathways to healing that remain inaccessible through compartmentalized treatment models.',
    category: 'Holistic Therapy',
    date: 'March 15, 2025',
    readTime: '5 min read',
    imageSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    featured: true,
    author: {
      name: 'Eric Peterson',
      role: 'Holistic Therapist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 2,
    title: 'The Benefits of Energy Healing for Chronic Pain',
    excerpt: 'Learn how energy healing techniques can complement traditional pain management approaches for those suffering from chronic conditions.',
    content: 'Energy healing modalities offer a complementary approach to conventional pain management that addresses the multidimensional nature of chronic pain. Clinical observations suggest that practices like Reiki and therapeutic touch can modulate the nervous system\'s response to pain signals, potentially reducing inflammation and promoting the body\'s natural healing mechanisms. For many patients experiencing persistent discomfort, these approaches provide not only physical relief but also emotional regulation tools that transform their relationship with pain.',
    category: 'Energy Healing',
    date: 'March 8, 2025',
    readTime: '8 min read',
    imageSrc: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Energy Healing Specialist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 3,
    title: 'Nutritional Approaches to Mental Wellness',
    excerpt: 'Discover the growing evidence for how dietary choices can impact mental health and emotional wellbeing.',
    content: 'The emerging field of nutritional psychiatry has revealed compelling connections between our dietary patterns and mental health outcomes. The gut-brain axis, mediated through our microbiome, serves as a critical communication pathway that influences neurotransmitter production, inflammation levels, and neural function. Strategic nutritional interventions focusing on omega-3 fatty acids, antioxidants, and prebiotic-rich foods can significantly modulate mood disorders and cognitive function, offering a powerful adjunctive approach to conventional mental health treatments.',
    category: 'Nutrition',
    date: 'February 28, 2025',
    readTime: '5 min read',
    imageSrc: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Nutritional Therapist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 4,
    title: 'Mindfulness Meditation: A Path to Emotional Regulation',
    excerpt: 'Explore how regular mindfulness practice can help develop healthier emotional responses to life\'s challenges.',
    content: 'Mindfulness meditation represents a transformative practice that fundamentally alters our relationship with our emotional landscape. By cultivating present-moment awareness without judgment, we develop the capacity to observe our thoughts and feelings as transient experiences rather than absolute truths. This metacognitive skill creates a crucial space between stimulus and response, allowing for more intentional choices rather than reactive patterns. Neuroimaging studies confirm that consistent practice physically restructures brain regions associated with emotional regulation, attention, and self-awareness.',
    category: 'Mindfulness',
    date: 'February 20, 2025',
    readTime: '7 min read',
    imageSrc: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Mindfulness Instructor',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 5,
    title: 'Trauma-Informed Somatic Practices for Healing',
    excerpt: 'Learn how body-centered approaches can help address and release trauma stored in the physical body.',
    content: 'Somatic approaches to trauma resolution acknowledge the fundamental truth that traumatic experiences are not merely psychological events but are deeply encoded in our physiological systems. The body keeps the score, maintaining patterns of tension, constriction, and dysregulation that persist long after the traumatic event has passed. Through mindful movement, breathwork, and interoceptive awareness practices, we can gently access and release these embodied trauma patterns, restoring the nervous system\'s natural capacity for regulation and resilience.',
    category: 'Trauma Healing',
    date: 'February 12, 2025',
    readTime: '9 min read',
    imageSrc: 'https://images.unsplash.com/photo-1502230831726-fe5549140034?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Trauma Specialist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 6,
    title: 'The Science Behind Sound Healing Therapy',
    excerpt: 'Discover how sound frequencies can influence brainwave patterns and promote deep relaxation and healing.',
    content: 'Sound healing harnesses the profound physiological effects of acoustic vibrations on our neurological and cellular systems. Research demonstrates that specific sound frequencies can entrain brainwave patterns, shifting consciousness from alert beta states to more therapeutic alpha and theta rhythms associated with deep relaxation and healing. Beyond these neurological effects, the vibrational properties of instruments like singing bowls and tuning forks appear to influence cellular structures and tissue resonance, potentially facilitating physiological repair processes at the most fundamental levels.',
    category: 'Sound Therapy',
    date: 'January 30, 2025',
    readTime: '6 min read',
    imageSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Sound Healing Practitioner',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 7,
    title: 'Integrating Eastern and Western Healing Modalities',
    excerpt: 'Explore how combining traditional Eastern practices with Western medicine can create a more comprehensive approach to wellness.',
    content: 'The integration of Eastern healing traditions with Western medical approaches represents a paradigm shift in healthcare that honors both the scientific rigor of evidence-based medicine and the holistic wisdom of ancient healing systems. This complementary framework recognizes that optimal health emerges from addressing not only physical symptoms but also the energetic, emotional, and spiritual dimensions of wellbeing. By bridging these seemingly disparate approaches, we can develop truly comprehensive treatment protocols that leverage the strengths of each tradition while compensating for their respective limitations.',
    category: 'Integrative Medicine',
    date: 'January 15, 2025',
    readTime: '7 min read',
    imageSrc: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Integrative Health Specialist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 8,
    title: 'The Role of Breathwork in Stress Reduction',
    excerpt: 'Learn how conscious breathing techniques can activate the parasympathetic nervous system and reduce chronic stress.',
    content: 'Conscious breathwork represents one of the most accessible yet profound tools for modulating our autonomic nervous system and counteracting the physiological effects of chronic stress. Through specific breathing patterns that emphasize extended exhalation and diaphragmatic engagement, we can directly activate the parasympathetic branch of the nervous system, triggering the body\'s relaxation response. This vagal stimulation cascades through multiple systems, reducing cortisol levels, decreasing inflammation, and restoring homeostatic balance to organs and tissues previously locked in stress-response patterns.',
    category: 'Breathwork',
    date: 'January 5, 2025',
    readTime: '8 min read',
    imageSrc: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Eric Peterson',
      role: 'Breathwork Facilitator',
      avatar: '/eric.jpeg'
    }
  },
];

// Available categories for filtering
const categories = Array.from(new Set(blogPosts.map(post => post.category)));

export default function BlogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPostId, setHoveredPostId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  
  // Handle mobile menu toggle from Navbar component
  const handleMobileMenuToggle = (isOpen: boolean) => {
    setMobileMenuOpen(isOpen);
  };
  
  // Filter posts based on search query and selected category
  useEffect(() => {
    let result = blogPosts;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    setFilteredPosts(result);
  }, [searchQuery, selectedCategory]);
  
  // Featured post is the first one marked as featured
  const featuredPost = blogPosts.find(post => post.featured);
  
  return (
    <div className="min-h-screen relative bg-background">
      {/* Navigation Bar */}
      <Navbar onMobileMenuToggle={handleMobileMenuToggle} forceDarkMode={true} />
      
      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-6 md:pb-8 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-3 relative inline-block"
            >
              <span className="relative z-10">Insights & Resources</span>
              <motion.span 
                className="absolute bottom-0 left-0 h-1 bg-primary/40"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-foreground/70 mb-6 max-w-2xl mx-auto"
            >
              Explore our collection of articles on holistic healing, mental health, and therapeutic approaches.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Search and Filter Section */}
      <section className="py-4 w-full relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            {/* Search Bar */}
            <motion.div 
              className="relative w-full md:w-1/3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 rounded-full border border-foreground/10 bg-card/30 focus:bg-card/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 text-foreground placeholder:text-foreground/50"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50 group-hover:text-primary transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Filter Categories */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border hover:shadow-sm ${
                  selectedCategory === '' 
                    ? 'bg-primary text-white border-primary hover:bg-primary/90' 
                    : 'bg-card/30 border-foreground/10 text-foreground/80 hover:bg-card/50 hover:border-foreground/30 hover:text-foreground'
                } cursor-pointer`}
              >
                All
              </button>
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border hover:shadow-sm ${
                    selectedCategory === category 
                      ? 'bg-primary text-white border-primary hover:bg-primary/90' 
                      : 'bg-card/30 border-foreground/10 text-foreground/80 hover:bg-card/50 hover:border-foreground/30 hover:text-foreground'
                  } cursor-pointer`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Article Section */}
      {featuredPost && (
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-2xl md:text-3xl font-light mb-6 inline-block relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span>Featured Article</span>
              <motion.span 
                className="absolute bottom-0 left-0 h-[2px] bg-primary/30"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </motion.h2>
            
            <motion.div 
              className="relative overflow-hidden rounded-xl shadow-lg group bg-card/40 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                {/* Image - takes full width on mobile, side on desktop */}
                <div className="lg:col-span-2 relative overflow-hidden">
                  <div className="relative aspect-[16/9] lg:h-full w-full overflow-hidden">
                    <Image
                      src={featuredPost.imageSrc}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent lg:via-black/40 lg:to-transparent"></div>
                  </div>
                </div>
                
                {/* Content - larger portion */}
                <div className="lg:col-span-3 p-5 sm:p-6 md:p-8 relative">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <button 
                      onClick={() => setSelectedCategory(featuredPost.category)}
                      className="px-3 py-1 bg-primary/90 text-white text-xs rounded-full hover:bg-primary transition-colors duration-300"
                    >
                      {featuredPost.category}
                    </button>
                    <span className="text-xs text-foreground/60">{featuredPost.date} · {featuredPost.readTime}</span>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.id}`} className="block group">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4 lg:line-clamp-6">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <blockquote className="border-l-4 border-primary/50 pl-3 sm:pl-4 italic text-foreground/90 text-sm sm:text-base">
                        "{featuredPost.content.split('.')[0]}."
                      </blockquote>
                      
                      <p className="text-xs sm:text-sm text-foreground/70 hidden sm:block">
                        {featuredPost.content.split('.')[1] ? featuredPost.content.split('.')[1] + '.' : ''}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 32px, 40px"
                          />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-medium">{featuredPost.author.name}</p>
                          <p className="text-xs text-foreground/60 hidden sm:block">{featuredPost.author.role}</p>
                        </div>
                      </div>
                      
                      <div className="inline-flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                        <span className="mr-2 text-sm sm:text-base">Read Full Article</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
      
      {/* Blog Content */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          {/* All Posts Grid */}
          <div className="mb-8">
            <motion.h2 
              className="text-2xl md:text-3xl font-light mb-6 inline-block relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span>{selectedCategory ? `${selectedCategory} Articles` : searchQuery ? 'Search Results' : 'All Articles'}</span>
              <motion.span 
                className="absolute bottom-0 left-0 h-[2px] bg-primary/30"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </motion.h2>
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="group relative overflow-hidden rounded-xl shadow-md bg-card/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * Math.min(index, 5) }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Image - smaller portion */}
                    <div className="relative aspect-[3/2] sm:aspect-[2/1] w-full overflow-hidden">
                      <Image
                        src={post.imageSrc}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedCategory(post.category);
                          }}
                          className="px-3 py-1 bg-primary/90 text-white text-xs rounded-full hover:bg-primary transition-colors duration-300 min-h-[28px] min-w-[44px]"
                        >
                          {post.category}
                        </button>
                      </div>
                    </div>
                    
                    {/* Content - larger portion */}
                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <Link href={`/blog/${post.id}`} className="block group">
                        <h3 className="text-base sm:text-lg md:text-xl font-medium mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </h3>
                        
                        <p className="text-xs sm:text-sm text-foreground/70 mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-4">
                          {post.excerpt}
                        </p>
                        
                        <blockquote className="border-l-2 border-primary/50 pl-3 sm:pl-4 italic text-foreground/90 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                          "{post.content.split('.')[0]}."
                        </blockquote>
                        
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-foreground/10">
                          <div className="flex items-center gap-2">
                            <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden">
                              <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 24px, 32px"
                              />
                            </div>
                            <span className="text-xs sm:text-sm text-foreground/60">{post.author.name}</span>
                          </div>
                          <span className="text-xs text-foreground/60">{post.date}</span>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 text-foreground/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-foreground mb-2">No articles found</h3>
                <p className="text-foreground/60">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                  }}
                  className="mt-6 px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors duration-300"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
          
          {/* Newsletter Signup */}
          <div className="mt-16 md:mt-24 p-8 md:p-12 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-light text-foreground mb-4">Stay Updated</h3>
              <p className="text-foreground/70 mb-8">
                Subscribe to our newsletter to receive the latest articles, resources, and updates directly in your inbox.
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
