'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/app/types/blog';
import PostForm from '../../components/post-form';
import { useToast } from '@/app/admin/components/ui/toast';
import { ExternalLink } from 'lucide-react';

export default function EditPostForm({ post }: { post: BlogPost }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToast } = useToast();

  // Handle form submission
  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    console.log('Submitting form...');

    try {
      // Submit the form
      const response = await fetch('/api/admin/update-post', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        console.log('Update successful, showing success state');
        // Show success animation
        setShowSuccess(true);
        
        // Direct redirect with window.location after delay
        setTimeout(() => {
          console.log('Redirecting with window.location');
          window.location.href = '/admin/blog';
        }, 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      addToast(error instanceof Error ? error.message : 'An unexpected error occurred', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative p-6 max-w-4xl mx-auto">
      {/* View on Site Button */}
      <div className="absolute top-4 right-4 z-10">
        <Link 
          href={`/blog/${post.slug}`} 
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-primary hover:text-primary-foreground bg-background hover:bg-primary border border-muted-foreground/20 hover:border-primary rounded-md transition-all shadow-sm"
          aria-label="View this post on the public site"
        >
          <span>View on Site</span>
          <ExternalLink size={14} className="ml-0.5" />
        </Link>
      </div>

      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
          <p className="text-muted-foreground mt-2">Update your blog post</p>
        </div>
        <Link 
          href="/admin/blog" 
          className="px-4 py-2 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-md transition-colors text-sm"
        >
          Back to Posts
        </Link>
      </div>

      <PostForm 
        post={post} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting}
        showSuccess={showSuccess}
        setIsSubmitting={setIsSubmitting}
      />
    </div>
  );
}
