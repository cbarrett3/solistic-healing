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
  const [masonry, setMasonry] = useState<number[][]>([]);
  
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

  // Generate masonry layout
  useEffect(() => {
    if (filteredPosts.length === 0) return;
    
    // Create a masonry layout with 4 columns
    const columns = 4;
    const layout: number[][] = Array.from({ length: columns }, () => []);
    
    // Distribute posts across columns
    filteredPosts.forEach((post, index) => {
      // Determine size based on index
      const isLarge = index % 7 === 0;
      const isWide = index % 9 === 2;
      const isTall = index % 5 === 1;
      
      if (isLarge) {
        // Large posts take 2 columns
        const shortestCol = layout.indexOf(layout.reduce((prev, curr) => 
          prev.reduce((a, b) => a + b, 0) <= curr.reduce((a, b) => a + b, 0) ? prev : curr
        ));
        const nextCol = (shortestCol + 1) % columns;
        
        // Add to both columns with height 2
        layout[shortestCol].push(2);
        layout[nextCol].push(0); // Placeholder to skip this column for next item
      } else if (isWide) {
        // Wide posts take 2 columns with height 1
        const shortestCol = layout.indexOf(layout.reduce((prev, curr) => 
          prev.reduce((a, b) => a + b, 0) <= curr.reduce((a, b) => a + b, 0) ? prev : curr
        ));
        const nextCol = (shortestCol + 1) % columns;
        
        layout[shortestCol].push(1);
        layout[nextCol].push(0); // Placeholder
      } else if (isTall) {
        // Tall posts take 1 column with height 2
        const shortestCol = layout.indexOf(layout.reduce((prev, curr) => 
          prev.reduce((a, b) => a + b, 0) <= curr.reduce((a, b) => a + b, 0) ? prev : curr
        ));
        
        layout[shortestCol].push(2);
      } else {
        // Regular posts take 1 column with height 1
        const shortestCol = layout.indexOf(layout.reduce((prev, curr) => 
          prev.reduce((a, b) => a + b, 0) <= curr.reduce((a, b) => a + b, 0) ? prev : curr
        ));
        
        layout[shortestCol].push(1);
      }
    });
    
    setMasonry(layout);
  }, [filteredPosts]);
  
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
              className="text-3xl md:text-4xl lg:text-5xl font-light text-center mb-6 relative inline-block"
            >
              <span className="text-white">Insights</span>
              <span className="text-primary font-medium">&nbsp;& Resources</span>
              
              {/* Simple two-color underline */}
              <motion.div 
                className="absolute -bottom-3 left-0 w-full h-[3px] rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="w-full h-full bg-gradient-to-r from-white via-white to-primary"></div>
              </motion.div>
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
            {/* Search and Filter Section */}
            <div className="w-full flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-md bg-card/30 border border-foreground/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm transition-colors duration-300"
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground/80 min-h-[24px] min-w-[24px] cursor-pointer"
                  >
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors duration-300 min-h-[44px] min-w-[44px] cursor-pointer ${
                    selectedCategory === null 
                      ? 'bg-primary text-white' 
                      : 'bg-card/30 hover:bg-card/50 text-foreground/80'
                  }`}
                >
                  All Categories
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors duration-300 min-h-[44px] min-w-[44px] cursor-pointer ${
                      selectedCategory === category 
                        ? 'bg-primary text-white' 
                        : 'bg-card/30 hover:bg-card/50 text-foreground/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Filter Status */}
              {(selectedCategory || searchQuery) && (
                <div className="text-sm text-foreground/60 flex items-center gap-2">
                  <span>
                    Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'}
                    {selectedCategory && <span> in <strong>{selectedCategory}</strong></span>}
                    {searchQuery && <span> for "<strong>{searchQuery}</strong>"</span>}
                  </span>
                  {(selectedCategory || searchQuery) && (
                    <button 
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery('');
                      }}
                      className="text-primary hover:text-primary/80 text-xs underline cursor-pointer"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>
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
                  
                  <Link href={`/blog/${featuredPost.id}`} className="group">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-t border-l border-foreground/10">
                {filteredPosts.map((post, index) => {
                  // Determine article size based on index
                  const isLarge = index % 7 === 0; // Every 7th item is large
                  const isMedium = index % 5 === 1; // Every 5th item (offset by 1) is medium
                  const isWide = index % 9 === 2; // Every 9th item (offset by 2) is wide
                  
                  // Calculate height based on content
                  const heightClass = isLarge || isMedium ? 'row-span-2' : 'row-span-1';
                  
                  // Calculate width based on content
                  const widthClass = isLarge || isWide ? 'col-span-2' : 'col-span-1';
                  
                  // Skip placeholder items (used for wide/large items)
                  if (index > 0 && (
                    (filteredPosts[index-1] && index % 7 === 1) || // Skip after large
                    (filteredPosts[index-1] && index % 9 === 3)    // Skip after wide
                  )) {
                    return null;
                  }
                  
                  return (
                    <motion.div
                      key={post.id}
                      className={`group relative overflow-hidden border-r border-b border-foreground/10 bg-card/20 hover:bg-card/40 transition-colors duration-300 h-full flex flex-col ${heightClass} ${widthClass}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.02 * Math.min(index, 10) }}
                    >
                      {/* Subtle background image */}
                      <div className="absolute inset-0 w-full h-full opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500">
                        <Image
                          src={post.imageSrc}
                          alt=""
                          fill
                          className="object-cover blur-[2px] group-hover:blur-[1px] transition-all duration-700"
                          sizes={`(max-width: 640px) 50vw, ${isLarge || isWide ? '(max-width: 1024px) 50vw, 40vw' : '(max-width: 1024px) 33vw, 20vw'}`}
                          priority={index < 4}
                        />
                      </div>
                      
                      {/* Content - Text-oriented approach */}
                      <div className="p-3 flex flex-col h-full relative z-10">
                        <Link href={`/blog/${post.id}`} className="group h-full flex flex-col">
                          {/* Category */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedCategory(post.category);
                            }}
                            className="self-start mb-2 text-[10px] text-primary font-medium hover:underline"
                          >
                            {post.category}
                          </button>
                          
                          {/* Title */}
                          <h3 className={`${isLarge ? 'text-sm sm:text-base font-semibold' : 'text-xs font-medium'} mb-1.5 line-clamp-3 group-hover:text-primary transition-colors duration-300`}>
                            {post.title}
                          </h3>
                          
                          {/* Excerpt */}
                          <p className="text-[10px] text-foreground/70 mb-2 flex-grow line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          {/* Author and date */}
                          <div className="flex items-center justify-between mt-auto pt-2 border-t border-foreground/10 text-[9px] text-foreground/60">
                            <div className="flex items-center gap-1.5">
                              <div className="relative w-4 h-4 rounded-full overflow-hidden">
                                <Image
                                  src={post.author.avatar}
                                  alt={post.author.name}
                                  fill
                                  className="object-cover"
                                  sizes="16px"
                                />
                              </div>
                              <span>{post.author.name}</span>
                            </div>
                            <span>{post.date}</span>
                          </div>
                        </Link>
                      </div>
                      
                      {/* Hover indicator */}
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </motion.div>
                  );
                })}
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
                  className="mt-6 px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors duration-300 cursor-pointer"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
          
          {/* Resource Section */}
          <div className="mt-16 md:mt-24"></div>
        </div>
      </section>
    </div>
  );
}
