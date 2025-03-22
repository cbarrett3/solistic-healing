'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin-layout';
import PostForm from '../components/post-form';
import { useToast } from '@/app/admin/components/ui/toast';
import { CheckCircle } from 'lucide-react';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToast } = useToast();
  
  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/admin/create-post', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        // Show success animation before redirecting
        setShowSuccess(true);
        
        // Wait for animation to complete before redirecting
        setTimeout(() => {
          router.push('/admin/blog');
        }, 1500);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      addToast(error instanceof Error ? error.message : 'An unexpected error occurred', 'error');
      setIsSubmitting(false);
    }
  };
  
  return (
    <AdminLayout 
      title="New Post" 
      description="Create a new blog post"
    >
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
              Post Created!
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
          />
        </div>
      )}
    </AdminLayout>
  );
}
