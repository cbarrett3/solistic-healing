'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Copy, Twitter, Facebook, Linkedin } from 'lucide-react';

import { Navbar } from '../../components/layout';
import { BlogPost } from '@/app/types/blog';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Handle mobile menu toggle from Navbar component
  const handleMobileMenuToggle = (isOpen: boolean) => {
    setMobileMenuOpen(isOpen);
  };

  // Handle share link copy
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  
  useEffect(() => {
    // Fetch post data from API
    const fetchPost = async () => {
      setIsLoading(true);
      const postSlug = params.slug as string;
      
      try {
        const response = await fetch(`/api/blog/post?slug=${postSlug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            // Post not found, redirect to blog listing
            router.push('/blog');
            return;
          }
          throw new Error('Failed to fetch post');
        }
        
        const data = await response.json();
        
        if (data.success && data.post) {
          setPost(data.post);
          
          // Fetch related posts (for a real implementation, you would fetch related posts based on tags or category)
          const postsResponse = await fetch('/api/blog/posts');
          if (postsResponse.ok) {
            const postsData = await postsResponse.json();
            if (postsData.success && postsData.posts) {
              // Get up to 3 other posts as "related"
              const otherPosts = postsData.posts
                .filter((p: BlogPost) => p.slug !== postSlug)
                .slice(0, 3);
              setRelatedPosts(otherPosts);
            }
          }
          
          // Scroll to top
          window.scrollTo(0, 0);
        } else {
          // Post not found or error
          router.push('/blog');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        router.push('/blog');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [params.slug, router]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onMobileMenuToggle={handleMobileMenuToggle} forceDarkMode={true} />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Header loading animation */}
            <div className="flex flex-col items-center justify-center mb-12">
              <div className="animate-pulse h-8 bg-card/30 rounded w-3/4 mb-4"></div>
              <div className="animate-pulse h-4 bg-card/20 rounded w-1/4 mb-8"></div>
              
              {/* Loading spinner */}
              <div className="flex justify-center my-8">
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
            
              {/* Content loading animation */}
              <div className="w-full space-y-4 mt-8">
                <div className="h-4 bg-card/30 rounded w-full"></div>
                <div className="h-4 bg-card/30 rounded w-full"></div>
                <div className="h-4 bg-card/30 rounded w-5/6"></div>
                <div className="h-4 bg-card/30 rounded w-full"></div>
                <div className="h-4 bg-card/30 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar onMobileMenuToggle={handleMobileMenuToggle} forceDarkMode={true} />
      
      {/* Sleek article layout */}
      <section className="pt-16 md:pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back link and share button row */}
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/blog"
              className="inline-flex items-center text-xs text-foreground/70 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back to Blog
            </Link>
            
            {/* Share menu */}
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 rounded-full hover:bg-card/30 text-foreground/70 hover:text-primary transition-colors"
                aria-label="Share this post"
              >
                <Share2 className="w-4 h-4" />
              </button>
              
              {showShareMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 bg-card shadow-lg rounded-lg border border-border/10 z-20 w-48"
                >
                  <div className="p-2">
                    <button 
                      onClick={handleCopyLink}
                      className="w-full flex items-center p-2 text-sm hover:bg-card/50 rounded-md transition-colors"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copySuccess ? 'Copied!' : 'Copy link'}
                    </button>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center p-2 text-sm hover:bg-card/50 rounded-md transition-colors"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Share on Twitter
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center p-2 text-sm hover:bg-card/50 rounded-md transition-colors"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Share on Facebook
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center p-2 text-sm hover:bg-card/50 rounded-md transition-colors"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      Share on LinkedIn
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Article card with consistent styling */}
          <div className="bg-card/20 border border-border/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            {/* Featured image - reduced height and increased fade */}
            {post.featuredImage && (
              <div className="w-full h-40 md:h-56 relative">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover opacity-60"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/30"></div>
              </div>
            )}
            
            {/* Content container */}
            <div className="p-5 md:p-6">
              {/* Post metadata */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {post.type === 'original' ? 'Original' : 'External'}
                </span>
                <span className="text-foreground/30">•</span>
                <span className="text-xs text-foreground/60 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {post.date}
                </span>
                
                {/* Source info for external posts */}
                {post.type === 'external' && post.sourceName && (
                  <>
                    <span className="text-foreground/30">•</span>
                    <span className="text-xs text-foreground/60">
                      {post.sourceName}
                      {post.sourceAuthor && <span> by {post.sourceAuthor}</span>}
                    </span>
                  </>
                )}
              </div>
              
              {/* Post title */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-medium mb-4 text-foreground leading-tight">
                {post.title}
              </h1>
              
              {/* External link for external posts */}
              {post.type === 'external' && post.externalUrl && (
                <a 
                  href={post.externalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-primary mb-4 hover:underline"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Read original article on {post.externalUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                </a>
              )}
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-card/50 rounded-full text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Article content */}
              <article className="prose prose-sm sm:prose-base dark:prose-invert w-full
                prose-headings:font-medium 
                prose-headings:text-foreground 
                prose-p:text-foreground/90 
                prose-p:leading-relaxed
                prose-a:text-primary 
                prose-a:no-underline 
                hover:prose-a:underline 
                prose-img:rounded-md
                prose-strong:text-foreground
                prose-li:text-foreground/90
                prose-li:leading-relaxed
                prose-blockquote:border-primary/30
                prose-blockquote:bg-card/20
                prose-blockquote:py-0.5
                prose-blockquote:px-3
                prose-blockquote:rounded-sm
                prose-blockquote:not-italic
                prose-blockquote:text-foreground/80
                max-w-none">
                {post.type === 'original' ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: post.commentary }} />
                )}
              </article>
            </div>
          </div>
          
          {/* Related posts section */}
          {relatedPosts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-base font-medium mb-4">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="relative h-24 bg-card/20 hover:bg-card/30 border border-border/10 rounded-md overflow-hidden transition-all duration-300 flex shadow-sm hover:shadow-md">
                      {/* Background image with opacity */}
                      {relatedPost.featuredImage && (
                        <div className="absolute inset-0 z-0">
                          <Image
                            src={relatedPost.featuredImage}
                            alt=""
                            fill
                            className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/70"></div>
                        </div>
                      )}
                      
                      {/* Content overlay */}
                      <div className="relative z-10 p-3 flex-1">
                        <div className="flex items-center mb-1">
                          <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            {relatedPost.type === 'original' ? 'Original' : 'External'}
                          </span>
                        </div>
                        <h3 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
