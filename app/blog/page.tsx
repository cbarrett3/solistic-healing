'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

import { Navbar } from '../components/layout';
import { SectionHeading } from '../components/ui';
import { BlogPost } from '../types/blog';

export default function BlogPage() {
  // state for ui interactions and filtering
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'original' | 'external'>('all');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // fetch blog posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setBlogPosts(data.posts);
        setFilteredPosts(data.posts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // sync mobile menu with navbar component
  const handleMobileMenuToggle = (isOpen: boolean) => {
    setMobileMenuOpen(isOpen);
  };
  
  // apply search and type filters
  useEffect(() => {
    if (!blogPosts.length) return;
    
    let result = blogPosts;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        (post.excerpt && post.excerpt.toLowerCase().includes(query))
      );
    }
    
    if (selectedType !== 'all') {
      result = result.filter(post => post.type === selectedType);
    }
    
    setFilteredPosts(result);
  }, [searchQuery, selectedType, blogPosts]);

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
          {isLoading ? (
            <div className="py-16 text-center bg-card/20 rounded-lg border border-foreground/5">
              <div className="inline-flex items-center justify-center mb-4">
                <svg className="w-16 h-16 text-primary" viewBox="0 0 24 24">
                  {/* Circle */}
                  <circle 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    className="stroke-primary/20" 
                    strokeWidth="1" 
                    fill="none" 
                  />
                  
                  {/* Animated arc */}
                  <path
                    d="M12 2a10 10 0 0 1 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-spin origin-center"
                    style={{ animationDuration: '1.5s' }}
                  />
                  
                  {/* Tree/peace symbol */}
                  <path 
                    d="M12 6V18" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    className="animate-pulse"
                    style={{ animationDuration: '2s' }}
                  />
                  
                  {/* Branches/peace lines */}
                  <path 
                    d="M12 9L9 12M12 9L15 12" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    className="animate-pulse"
                    style={{ animationDuration: '2s' }}
                  />
                  
                  <path 
                    d="M12 14L9 17M12 14L15 17" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    className="animate-pulse"
                    style={{ animationDuration: '2s' }}
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Loading articles...</h3>
              <p className="text-sm text-foreground/60">Please wait while we gather the latest content</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredPosts.map((post: BlogPost) => (
                <Link 
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="group"
                  onMouseEnter={() => setHoveredPostId(post.slug)}
                  onMouseLeave={() => setHoveredPostId(null)}
                >
                  <div className="relative h-72 bg-card/20 hover:bg-card/30 border border-border/10 rounded-md overflow-hidden transition-all duration-300 flex flex-col shadow-sm hover:shadow-md">
                    {/* Background image with opacity */}
                    {post.featuredImage && (
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={post.featuredImage}
                          alt=""
                          fill
                          className="object-cover opacity-15 group-hover:opacity-25 transition-opacity"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/70"></div>
                      </div>
                    )}
                    
                    {/* Content overlay */}
                    <div className="relative z-10 p-4 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                          {post.type === 'original' ? 'Original' : 'External'}
                        </span>
                        <span className="text-foreground/30">•</span>
                        <span className="text-xs text-foreground/60 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {post.date}
                        </span>
                      </div>
                      
                      {/* Post type indicator - only show for original content */}
                      {post.type === 'original' && (
                        <div className="mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
                            Original
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      {post.type === 'original' ? (
                        // Original post excerpt
                        post.excerpt && (
                          <p className="text-sm text-foreground/80 mb-4 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )
                      ) : (
                        // External post - show source info and commentary
                        <div className="mb-3">
                          {/* External URL with icon */}
                          {post.externalUrl && (
                            <div className="flex items-center text-xs text-primary/90 mb-2 group-hover:text-primary transition-colors">
                              <svg 
                                className="w-3 h-3 mr-1.5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                                />
                              </svg>
                              <span className="truncate hover:underline">
                                {post.externalUrl.replace(/^https?:\/\/(www\.)?/, '')}
                              </span>
                            </div>
                          )}
                          
                          {/* Source info with icon */}
                          {post.sourceName && (
                            <div className="flex items-center text-xs text-foreground/80 mb-2">
                              <svg 
                                className="w-3 h-3 mr-1.5 text-secondary/70" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v8a2 2 0 002 2h5z" 
                                />
                              </svg>
                              <span>
                                {post.sourceName}
                                {post.sourceAuthor && <span> by {post.sourceAuthor}</span>}
                              </span>
                            </div>
                          )}
                          
                          {/* Commentary quote with styled block */}
                          {post.commentary && (
                            <div className="relative">
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary/40 to-secondary/10 rounded-full"></div>
                              <div className="text-sm text-foreground/90 line-clamp-3 leading-relaxed pl-3 italic">
                                "{post.commentary.replace(/<[^>]*>/g, '').substring(0, 150)}..."
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {post.tags.slice(0, 3).map(tag => (
                            <span 
                              key={tag}
                              className="text-xs px-2 py-0.5 bg-card/50 rounded-full text-foreground/70"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs px-2 py-0.5 bg-card/50 rounded-full text-foreground/70">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Read more link */}
                      <div className={`mt-3 flex items-center text-xs font-medium ${
                        hoveredPostId === post.slug ? 'text-primary' : 'text-foreground/70'
                      } transition-colors`}>
                        <span>{post.type === 'original' ? 'Read article' : 'View commentary'}</span>
                        <ArrowRight className={`h-3 w-3 ml-1 transition-transform duration-300 ${
                          hoveredPostId === post.slug ? 'translate-x-0.5' : ''
                        }`} />
                      </div>
                    </div>
                  </div>
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
              <p className="text-sm text-foreground/70 max-w-md mx-auto">
                We couldn't find any articles matching your search criteria. Try adjusting your filters or search query.
              </p>
              <button 
                onClick={() => {
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="mt-4 text-primary hover:text-primary/80 text-sm underline cursor-pointer"
              >
                View all articles
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
