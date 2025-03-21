'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

import { Navbar } from '../components/layout';
import { SectionHeading } from '../components/ui';

// define blog post type
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  imageSrc: string;
  featured?: boolean;
  type: 'original' | 'external';
  externalUrl?: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

// sample blog content for development
const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'understanding-mind-body-connection',
    title: 'Understanding the Mind-Body Connection in Therapy',
    excerpt: 'Explore how mental and physical health are interconnected and how holistic approaches to therapy can lead to more comprehensive healing.',
    content: 'The mind-body connection represents one of the most profound frontiers in modern therapeutic practice. Research consistently demonstrates that our thoughts and emotions directly influence our physical well-being, creating a feedback loop that can either promote healing or exacerbate illness. When we approach therapy with an integrated perspective, acknowledging both psychological and physiological dimensions, we unlock pathways to healing that remain inaccessible through compartmentalized treatment models.',
    category: 'Holistic Therapy',
    date: 'March 15, 2025',
    readTime: '5 min read',
    imageSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    featured: true,
    type: 'original',
    author: {
      name: 'Eric Peterson',
      role: 'Holistic Therapist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 2,
    slug: 'benefits-energy-healing-chronic-pain',
    title: 'The Benefits of Energy Healing for Chronic Pain',
    excerpt: 'Learn how energy healing techniques can complement traditional pain management approaches for those suffering from chronic conditions.',
    content: 'Energy healing modalities offer a complementary approach to conventional pain management that addresses the multidimensional nature of chronic pain. Clinical observations suggest that practices like Reiki and therapeutic touch can modulate the nervous system\'s response to pain signals, potentially reducing inflammation and promoting the body\'s natural healing mechanisms. For many patients experiencing persistent discomfort, these approaches provide not only physical relief but also emotional regulation tools that transform their relationship with pain.',
    category: 'Energy Healing',
    date: 'March 8, 2025',
    readTime: '8 min read',
    imageSrc: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop',
    type: 'original',
    author: {
      name: 'Eric Peterson',
      role: 'Energy Healing Specialist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 3,
    slug: 'nutritional-approaches-mental-wellness',
    title: 'Nutritional Approaches to Mental Wellness',
    excerpt: 'Discover the growing evidence for how dietary choices can impact mental health and emotional wellbeing.',
    content: 'The emerging field of nutritional psychiatry has revealed compelling connections between our dietary patterns and mental health outcomes. The gut-brain axis, mediated through our microbiome, serves as a critical communication pathway that influences neurotransmitter production, inflammation levels, and neural function. Strategic nutritional interventions focusing on omega-3 fatty acids, antioxidants, and prebiotic-rich foods can significantly modulate mood disorders and cognitive function, offering a powerful adjunctive approach to conventional mental health treatments.',
    category: 'Nutrition',
    date: 'February 28, 2025',
    readTime: '5 min read',
    imageSrc: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=800&auto=format&fit=crop',
    type: 'original',
    author: {
      name: 'Eric Peterson',
      role: 'Nutritional Therapist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 4,
    slug: 'mindfulness-meditation-emotional-regulation',
    title: 'Mindfulness Meditation: A Path to Emotional Regulation',
    excerpt: 'Explore how regular mindfulness practice can help develop healthier emotional responses to life\'s challenges.',
    content: 'Mindfulness meditation represents a transformative practice that fundamentally alters our relationship with our emotional landscape. By cultivating present-moment awareness without judgment, we develop the capacity to observe our thoughts and feelings as transient experiences rather than absolute truths. This metacognitive skill creates a crucial space between stimulus and response, allowing for more intentional choices rather than reactive patterns. Neuroimaging studies confirm that consistent practice physically restructures brain regions associated with emotional regulation, attention, and self-awareness.',
    category: 'Mindfulness',
    date: 'February 20, 2025',
    readTime: '7 min read',
    imageSrc: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
    type: 'external',
    externalUrl: 'https://example.com/mindfulness-article',
    author: {
      name: 'Eric Peterson',
      role: 'Mindfulness Instructor',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 5,
    slug: 'trauma-informed-somatic-practices',
    title: 'Trauma-Informed Somatic Practices for Healing',
    excerpt: 'Learn how body-centered approaches can help address and release trauma stored in the physical body.',
    content: 'Somatic approaches to trauma resolution acknowledge the fundamental truth that traumatic experiences are not merely psychological events but are deeply encoded in our physiological systems. The body keeps the score, maintaining patterns of tension, constriction, and dysregulation that persist long after the traumatic event has passed. Through mindful movement, breathwork, and interoceptive awareness practices, we can gently access and release these embodied trauma patterns, restoring the nervous system\'s natural capacity for regulation and resilience.',
    category: 'Trauma Healing',
    date: 'February 12, 2025',
    readTime: '9 min read',
    imageSrc: 'https://images.unsplash.com/photo-1502230831726-fe5549140034?q=80&w=800&auto=format&fit=crop',
    type: 'original',
    author: {
      name: 'Eric Peterson',
      role: 'Trauma Specialist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 6,
    slug: 'science-behind-sound-healing',
    title: 'The Science Behind Sound Healing Therapy',
    excerpt: 'Discover how sound frequencies can influence brainwave patterns and promote deep relaxation and healing.',
    content: 'Sound healing harnesses the profound physiological effects of acoustic vibrations on our neurological and cellular systems. Research demonstrates that specific sound frequencies can entrain brainwave patterns, shifting consciousness from alert beta states to more therapeutic alpha and theta rhythms associated with deep relaxation and healing. Beyond these neurological effects, the vibrational properties of instruments like singing bowls and tuning forks appear to influence cellular structures and tissue resonance, potentially facilitating physiological repair processes at the most fundamental levels.',
    category: 'Sound Therapy',
    date: 'January 30, 2025',
    readTime: '6 min read',
    imageSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    type: 'original',
    author: {
      name: 'Eric Peterson',
      role: 'Sound Healing Practitioner',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 7,
    slug: 'integrating-eastern-western-healing',
    title: 'Integrating Eastern and Western Healing Modalities',
    excerpt: 'Explore how combining traditional Eastern practices with Western medicine can create a more comprehensive approach to wellness.',
    content: 'The integration of Eastern healing traditions with Western medical approaches represents a paradigm shift in healthcare that honors both the scientific rigor of evidence-based medicine and the holistic wisdom of ancient healing systems. This complementary framework recognizes that optimal health emerges from addressing not only physical symptoms but also the energetic, emotional, and spiritual dimensions of wellbeing. By bridging these seemingly disparate approaches, we can develop truly comprehensive treatment protocols that leverage the strengths of each tradition while compensating for their respective limitations.',
    category: 'Integrative Medicine',
    date: 'January 15, 2025',
    readTime: '7 min read',
    imageSrc: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
    type: 'original',
    author: {
      name: 'Eric Peterson',
      role: 'Integrative Health Specialist',
      avatar: '/eric.jpeg'
    }
  },
  {
    id: 8,
    slug: 'role-breathwork-stress-reduction',
    title: 'The Role of Breathwork in Stress Reduction',
    excerpt: 'Learn how conscious breathing techniques can activate the parasympathetic nervous system and reduce chronic stress.',
    content: 'Conscious breathwork represents one of the most accessible yet profound tools for modulating our autonomic nervous system and counteracting the physiological effects of chronic stress. Through specific breathing patterns that emphasize extended exhalation and diaphragmatic engagement, we can directly activate the parasympathetic branch of the nervous system, triggering the body\'s relaxation response. This vagal stimulation cascades through multiple systems, reducing cortisol levels, decreasing inflammation, and restoring homeostatic balance to organs and tissues previously locked in stress-response patterns.',
    category: 'Breathwork',
    date: 'January 5, 2025',
    readTime: '8 min read',
    imageSrc: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop',
    type: 'original',
    author: {
      name: 'Eric Peterson',
      role: 'Breathwork Facilitator',
      avatar: '/eric.jpeg'
    }
  },
];

// extract unique categories for filters
const categories = Array.from(new Set(blogPosts.map(post => post.category)));

export default function BlogPage() {
  // state for ui interactions and filtering
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPostId, setHoveredPostId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'original' | 'external'>('all');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  
  // sync mobile menu with navbar component
  const handleMobileMenuToggle = (isOpen: boolean) => {
    setMobileMenuOpen(isOpen);
  };
  
  // apply search and type filters
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
    
    if (selectedType !== 'all') {
      result = result.filter(post => post.type === selectedType);
    }
    
    setFilteredPosts(result);
  }, [searchQuery, selectedType]);

  return (
    <div className="min-h-screen relative bg-background">
      {/* navigation bar */}
      <Navbar onMobileMenuToggle={handleMobileMenuToggle} forceDarkMode={true} />
      
      {/* hero section with integrated search */}
      <section className="pt-24 md:pt-32 pb-2 w-full relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-medium mb-1 text-foreground dark:text-white">
                <span className="text-primary">Blog</span> & Resources
              </h1>
              <p className="text-sm text-foreground/70">
                Explore our collection of articles on holistic healing and mental health.
              </p>
            </div>
            
            {/* search bar */}
            <div className="relative w-full md:w-auto md:min-w-[280px]">
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground/80 text-xs underline cursor-pointer"
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
          </div>
        </div>
      </section>
      
      {/* simplified filter section */}
      <section className="py-2 w-full relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer flex items-center ${
                selectedType === 'all' 
                  ? 'bg-primary text-white shadow-sm shadow-primary/20 scale-105' 
                  : 'bg-card/30 hover:bg-card/70 hover:shadow-sm active:scale-95 text-foreground/80 hover:text-foreground border border-transparent hover:border-foreground/10'
              }`}
            >
              All Posts
              {selectedType === 'all' && (
                <span className="ml-1.5 flex items-center justify-center bg-white/20 text-[10px] w-5 h-5 rounded-full">
                  {filteredPosts.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setSelectedType('original')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer flex items-center ${
                selectedType === 'original' 
                  ? 'bg-primary text-white shadow-sm shadow-primary/20 scale-105' 
                  : 'bg-card/30 hover:bg-card/70 hover:shadow-sm active:scale-95 text-foreground/80 hover:text-foreground border border-transparent hover:border-foreground/10'
              }`}
            >
              Original Content
              {selectedType === 'original' && (
                <span className="ml-1.5 flex items-center justify-center bg-white/20 text-[10px] w-5 h-5 rounded-full">
                  {filteredPosts.filter(post => post.type === 'original').length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setSelectedType('external')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer flex items-center ${
                selectedType === 'external' 
                  ? 'bg-primary text-white shadow-sm shadow-primary/20 scale-105' 
                  : 'bg-card/30 hover:bg-card/70 hover:shadow-sm active:scale-95 text-foreground/80 hover:text-foreground border border-transparent hover:border-foreground/10'
              }`}
            >
              Shared Resources
              {selectedType === 'external' && (
                <span className="ml-1.5 flex items-center justify-center bg-white/20 text-[10px] w-5 h-5 rounded-full">
                  {filteredPosts.filter(post => post.type === 'external').length}
                </span>
              )}
            </button>
          </div>
          
          {/* filter status */}
          {(selectedType !== 'all' || searchQuery) && (
            <div className="text-xs text-foreground/60 mt-2 flex items-center gap-2">
              <span>
                {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'}
                {selectedType !== 'all' && <span> in <strong>{selectedType === 'original' ? 'Original Content' : 'Shared Resources'}</strong></span>}
                {searchQuery && <span> for "<strong>{searchQuery}</strong>"</span>}
              </span>
              {(selectedType !== 'all' || searchQuery) && (
                <button 
                  onClick={() => {
                    setSelectedType('all');
                    setSearchQuery('');
                  }}
                  className="text-primary hover:text-primary/80 text-xs underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* blog content - text-focused design with enhanced typography */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* section heading with improved design */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
            <div className="mb-4 sm:mb-0">
              <span className="text-xs uppercase tracking-wider text-primary/80 font-medium mb-1 block">Explore Our Content</span>
              <h2 className="text-2xl font-medium text-foreground/90">
                {selectedType === 'all' ? 'All Articles' : selectedType === 'original' ? 'Original Content' : 'Shared Resources'}
              </h2>
            </div>
            <div className="text-xs bg-card/40 px-3 py-1.5 rounded-full flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary/70 mr-2"></span>
              <span className="text-foreground/70">{filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}</span>
            </div>
          </div>
          
          {/* text-focused article cards with enhanced typography */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPosts.map((post: BlogPost) => (
                <Link 
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className="group"
                >
                  <article className="relative p-6 bg-card/30 hover:bg-card/50 border border-foreground/5 rounded-lg transition-all duration-300 h-full flex flex-col overflow-hidden">
                    {/* Subtle background image for entire card */}
                    <div className="absolute inset-0 w-full h-full opacity-[0.5] group-hover:opacity-[0.12] transition-opacity duration-300">
                      <Image
                        src={post.imageSrc}
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
                              src={post.author.avatar} 
                              alt={post.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs font-medium">{post.author.name}</span>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full ${
                          post.type === 'original' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-foreground/10 text-foreground/70'
                        }`}>
                          {post.type === 'original' ? 'Original' : 'Shared'}
                        </span>
                      </div>
                      
                      {/* Title with dynamic sizing and improved typography */}
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      {/* First paragraph of content with proper styling */}
                      <div className="mb-4 flex-grow">
                        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-4">
                          {post.excerpt}
                        </p>
                        
                        {/* Pull quote - first sentence of content */}
                        <blockquote className="mt-4 pl-3 border-l-2 border-primary/40 italic text-sm text-foreground/80">
                          "{post.content.split('.')[0]}."
                        </blockquote>
                      </div>
                      
                      {/* Enhanced footer with date, read time and visual indicator */}
                      <div className="flex items-center justify-between pt-4 border-t border-foreground/10 mt-auto">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-foreground/60">{post.date}</span>
                          <span className="flex items-center text-xs text-foreground/60">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-primary/70" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {post.readTime}
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
          ) : (
            <div className="py-16 text-center bg-card/20 rounded-lg border border-foreground/5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/5 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No articles found</h3>
              <p className="text-foreground/60 max-w-md mx-auto">Try adjusting your search or filter criteria to find what you're looking for</p>
              <button 
                onClick={() => {
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="mt-6 px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors duration-300 cursor-pointer"
              >
                View all articles
              </button>
            </div>
          )}
          
          {/* Pagination placeholder - can be implemented later */}
          {filteredPosts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="inline-flex rounded-md shadow-sm">
                <button className="px-3 py-2 text-sm font-medium text-foreground/70 bg-card/30 rounded-l-md border border-foreground/10 hover:bg-card/50">
                  Previous
                </button>
                <button className="px-3 py-2 text-sm font-medium text-white bg-primary rounded-none border-t border-b border-primary">
                  1
                </button>
                <button className="px-3 py-2 text-sm font-medium text-foreground/70 bg-card/30 border border-foreground/10 hover:bg-card/50">
                  2
                </button>
                <button className="px-3 py-2 text-sm font-medium text-foreground/70 bg-card/30 rounded-r-md border border-foreground/10 hover:bg-card/50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
