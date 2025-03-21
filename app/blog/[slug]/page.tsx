'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';

import { Navbar } from '../../components/layout';
import { BlogPost } from '@/app/types/blog';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle mobile menu toggle from Navbar component
  const handleMobileMenuToggle = (isOpen: boolean) => {
    setMobileMenuOpen(isOpen);
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
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-card/50 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-card/30 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-card/20 rounded mb-8"></div>
            <div className="h-4 bg-card/30 rounded w-full mb-2"></div>
            <div className="h-4 bg-card/30 rounded w-full mb-2"></div>
            <div className="h-4 bg-card/30 rounded w-5/6"></div>
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
      
      {/* Compact article layout */}
      <section className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-col">
            {/* Back link */}
            <Link 
              href="/blog"
              className="inline-flex items-center text-xs text-foreground/70 hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back to Blog
            </Link>
            
            {/* Article header with small image */}
            <div className="flex flex-col md:flex-row gap-5 mb-6">
              {/* Content */}
              <div className="flex-1">
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
                
                <h1 className="text-xl md:text-2xl lg:text-3xl font-medium mb-3 text-foreground leading-tight">
                  {post.title}
                </h1>
                
                {post.excerpt && (
                  <p className="text-foreground/80 text-base mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>
              
              {/* Small image */}
              {post.featuredImage && (
                <div className="md:w-1/3 shrink-0">
                  <div className="relative aspect-[4/3] rounded-md overflow-hidden shadow-sm">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover opacity-80"
                      sizes="(max-width: 768px) 100vw, 300px"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Divider */}
            <div className="border-t border-foreground/10 my-4"></div>
            
            {/* Article content */}
            <article className="prose prose-sm sm:prose-base dark:prose-invert mx-auto w-full
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
                <>
                  {/* Back button styled like X */}
                  <div className="mb-6">
                    <Link href="/blog" className="inline-flex items-center text-foreground/80 hover:text-primary transition-colors">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <span className="text-sm font-medium">Back to Timeline</span>
                    </Link>
                  </div>

                  {/* Main content card styled like X */}
                  <div className="mb-8 border border-border/10 dark:border-border/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    {/* Header with source info */}
                    <div className="p-4 border-b border-border/10 dark:border-border/20 flex items-center">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                        {post.sourceName ? (
                          <span className="text-secondary font-bold text-sm">
                            {post.sourceName.substring(0, 1).toUpperCase()}
                          </span>
                        ) : (
                          <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-foreground">
                          {post.sourceName || "External Source"}
                        </div>
                        <div className="text-xs text-foreground/60 flex items-center">
                          {post.sourceAuthor && <span className="mr-1">{post.sourceAuthor}</span>}
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            {post.externalUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                          </span>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="text-xs text-foreground/60">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Post title */}
                    <div className="p-4 border-b border-border/10 dark:border-border/20">
                      <h2 className="text-xl font-bold text-foreground leading-tight mb-2">{post.title}</h2>
                      
                      {/* External link preview */}
                      <a 
                        href={post.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block mt-3 group"
                      >
                        <div className="border border-border/10 dark:border-border/20 rounded-lg overflow-hidden hover:bg-card/30 transition-colors duration-300">
                          {post.featuredImage && (
                            <div className="w-full h-48 bg-card/20 relative">
                              <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="p-3">
                            <div className="text-sm text-foreground/80 font-medium group-hover:text-primary transition-colors duration-300 flex items-center">
                              <svg className="w-4 h-4 mr-1.5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Read full article on {post.externalUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>

                    {/* Commentary section styled like X post content */}
                    <div className="p-4">
                      <div className="prose prose-sm dark:prose-invert w-full
                        prose-p:text-foreground/90 
                        prose-p:leading-relaxed
                        prose-p:text-base
                        prose-a:text-primary 
                        prose-a:no-underline 
                        hover:prose-a:underline 
                        prose-strong:text-primary/90
                        max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: post.commentary }} />
                      </div>
                    </div>

                    {/* Engagement actions like X */}
                    <div className="px-4 py-3 border-t border-border/10 dark:border-border/20 flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        {/* Reply */}
                        <button className="group flex items-center text-foreground/60 hover:text-primary transition-colors">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-primary/10 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                        </button>

                        {/* Repost */}
                        <button className="group flex items-center text-foreground/60 hover:text-green-500 transition-colors">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-green-500/10 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </div>
                        </button>

                        {/* Like */}
                        <button className="group flex items-center text-foreground/60 hover:text-red-500 transition-colors">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-red-500/10 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                        </button>

                        {/* Share */}
                        <div className="relative group">
                          <button className="group flex items-center text-foreground/60 hover:text-primary transition-colors">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-primary/10 transition-colors">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                              </svg>
                            </div>
                          </button>
                          <div className="absolute bottom-full left-0 mb-2 w-48 bg-background border border-border/10 dark:border-border/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            <div className="py-1">
                              <button 
                                className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-card/30 transition-colors flex items-center"
                                onClick={() => {
                                  navigator.clipboard.writeText(window.location.href);
                                  // In a real app, you would show a toast notification here
                                }}
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy link
                              </button>
                              <a 
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-card/30 transition-colors flex items-center"
                              >
                                <svg className="w-4 h-4 mr-2 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                                Share on X
                              </a>
                              <a 
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-card/30 transition-colors flex items-center"
                              >
                                <svg className="w-4 h-4 mr-2 text-[#4267B2]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Share on Facebook
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <button className="text-foreground/60 hover:text-primary transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Related posts section */}
                  <div className="mt-10">
                    <h3 className="text-lg font-bold text-foreground mb-4">More from Timeline</h3>
                    {/* Related posts would go here */}
                  </div>
                </>
              )}
            </article>
            
            {/* Tags section */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 pt-4 border-t border-foreground/10">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <Tag className="w-3 h-3 text-primary/80" />
                  <span className="text-xs text-foreground/70 mr-1">Tags:</span>
                  {post.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-0.5 bg-card/30 hover:bg-card/50 rounded-full text-xs text-foreground/80 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Related posts section */}
      {relatedPosts.length > 0 && (
        <section className="py-8 mt-6 bg-card/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-base font-medium mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      {relatedPost.excerpt && (
                        <p className="text-xs text-foreground/70 line-clamp-1 leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
