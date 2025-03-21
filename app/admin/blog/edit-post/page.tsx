'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BlogPost } from '@/app/types/blog';
import AdminLayout from '../../components/admin-layout';
import PostForm from '../components/post-form';
import { Card, CardContent } from '../../components/ui';
import { LinkButton } from '../../components/ui';
import Link from 'next/link';

export default function EditPostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch post data
  useEffect(() => {
    if (!slug) {
      router.push('/admin/blog');
      return;
    }

    async function fetchPost() {
      try {
        const response = await fetch(`/api/admin/get-post?slug=${slug}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        
        const data = await response.json();
        setPost(data.post);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [slug, router]);

  if (isLoading) {
    return (
      <AdminLayout 
        title="Edit Post" 
        description="Loading post data..."
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-muted rounded mb-4"></div>
            <div className="h-4 w-48 bg-muted rounded"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!post) {
    return (
      <AdminLayout 
        title="Post Not Found" 
        description="The requested post could not be found"
      >
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="bg-destructive/10 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-destructive">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Post Not Found</h3>
            <p className="text-muted-foreground mb-6 text-center">
              The post you're looking for doesn't exist or couldn't be loaded.
            </p>
            <LinkButton href="/admin/blog" variant="primary">
              Back to Posts
            </LinkButton>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Edit Post" 
      description={post.title}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.push('/admin/blog')}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-muted/50 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Posts
          </button>
          
          <Link 
            href={`/blog/${post.slug}`} 
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-primary hover:text-primary-foreground bg-background hover:bg-primary border border-muted-foreground/20 hover:border-primary rounded-md transition-all shadow-sm"
            aria-label="View this post on the public site"
          >
            <span>View on Site</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </Link>
        </div>
        
        {error && (
          <motion.div 
            className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}
        
        <PostForm 
          post={post} 
          onSubmit={async (formData) => {
            try {
              setError(null);
              
              // Log form data for debugging
              console.log('Submitting form data:', {
                slug: formData.get('slug'),
                title: formData.get('title'),
                type: formData.get('type'),
                hasContent: formData.has('content'),
                hasCommentary: formData.has('commentary')
              });
              
              const response = await fetch('/api/admin/update-post', {
                method: 'POST',
                body: formData,
              });
              
              // Log response status
              console.log('Response status:', response.status);
              
              if (response.ok) {
                // Show success message with toast if available
                if (typeof window !== 'undefined') {
                  // Create a toast notification
                  const toast = document.createElement('div');
                  toast.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50';
                  toast.innerHTML = `
                    <div class="flex items-center">
                      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span>Post updated successfully!</span>
                    </div>
                  `;
                  document.body.appendChild(toast);
                  
                  // Remove toast after 3 seconds
                  setTimeout(() => {
                    toast.remove();
                  }, 3000);
                }
                
                // Force a small delay to ensure the user sees the success message
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Redirect to blog management page
                router.push('/admin/blog');
              } else {
                const data = await response.json();
                console.error('Error response:', data);
                setError(data.message || `Failed to update post (Status: ${response.status})`);
              }
            } catch (err) {
              console.error('Error updating post:', err);
              setError('An unexpected error occurred');
            }
          }}
          isSubmitting={isLoading}
        />
      </div>
    </AdminLayout>
  );
}
