'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogPost } from '@/app/types/blog';
import PostForm from '../../components/post-form';
import { useToast } from '@/app/admin/components/ui/toast';
import { CheckCircle, ExternalLink } from 'lucide-react';

export default function EditPostForm({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToast } = useToast();

  // Handle form submission
  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      // Log form data for debugging
      console.log('Submitting form data:', {
        slug: formData.get('slug'),
        title: formData.get('title'),
        type: formData.get('type'),
        hasContent: formData.has('content'),
        hasCommentary: formData.has('commentary')
      });
      
      // Submit the form
      const response = await fetch('/api/admin/update-post', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        // Show success message immediately
        addToast('Post updated successfully', 'success');
        
        // Show success animation
        setShowSuccess(true);
        
        // Force a small delay to ensure the toast is visible
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Redirect to blog management page
        router.push('/admin/blog');
      } else {
        // Try to parse error response as JSON
        try {
          const data = await response.json();
          console.error('Error response:', data);
          throw new Error(data.message || `Failed to update post (Status: ${response.status})`);
        } catch {
          // If JSON parsing fails, use status text
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      }
    } catch (err) {
      console.error('Error updating post:', err);
      addToast(err instanceof Error ? err.message : 'An unexpected error occurred', 'error');
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

      {showSuccess ? (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex flex-col items-center justify-center p-8 bg-card rounded-lg shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              <CheckCircle className="w-16 h-16 text-primary mb-4" />
            </motion.div>
            <motion.h2 
              className="text-xl font-semibold mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Post Updated!
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Redirecting to blog management...
            </motion.p>
          </motion.div>
        </motion.div>
      ) : (
        <>
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
          />
        </>
      )}
    </div>
  );
}
