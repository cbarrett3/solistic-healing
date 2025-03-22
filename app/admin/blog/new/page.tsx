'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../../components/admin-layout';
import PostForm from '../components/post-form';
import { useToast } from '@/app/admin/components/ui/toast';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToast } = useToast();
  
  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    console.log('NewBlogPostPage: Starting submission');
    
    try {
      const response = await fetch('/api/admin/create-post', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        console.log('Create successful, showing success state');
        // Show success animation
        setShowSuccess(true);
      } else {
        const data = await response.json().catch(() => ({ 
          message: `Error: ${response.status} ${response.statusText}` 
        }));
        throw new Error(data.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      addToast(error instanceof Error ? error.message : 'An unexpected error occurred', 'error');
      setIsSubmitting(false);
    }
  };
  
  // Handle redirect when showSuccess changes to true
  useEffect(() => {
    let redirectTimer: NodeJS.Timeout;
    let fallbackTimer: NodeJS.Timeout;
    
    if (showSuccess) {
      console.log('showSuccess is true, setting up redirect timer');
      
      redirectTimer = setTimeout(() => {
        console.log('Redirect timer fired, navigating to /admin/blog');
        try {
          router.push('/admin/blog');
          console.log('router.push called');
          
          // Fallback to window.location if router doesn't work
          fallbackTimer = setTimeout(() => {
            console.log('Fallback redirect triggered');
            window.location.href = '/admin/blog';
          }, 500);
        } catch (error) {
          console.error('Error during navigation:', error);
          // Use window.location as fallback
          window.location.href = '/admin/blog';
        }
      }, 1500);
      
      // Force redirect after a longer delay as a final fallback
      const hardRedirectTimer = setTimeout(() => {
        console.log('Hard redirect triggered');
        window.location.href = '/admin/blog';
      }, 3000);
      
      return () => {
        console.log('Clearing redirect timers');
        clearTimeout(redirectTimer);
        clearTimeout(fallbackTimer);
        clearTimeout(hardRedirectTimer);
      };
    }
  }, [showSuccess, router]);
  
  return (
    <AdminLayout 
      title="New Post" 
      description="Create a new blog post"
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
        </div>
        
        <PostForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          showSuccess={showSuccess}
          setIsSubmitting={setIsSubmitting}
        />
      </div>
    </AdminLayout>
  );
}
