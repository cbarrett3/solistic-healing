'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '@/app/lib/utils';
import { BlogPost } from '@/app/types/blog';
import { Button } from '../components/ui';
import { Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

interface PostItemProps {
  post: BlogPost;
}

export default function PostItem({ post }: PostItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };
  
  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };
  
  const handleConfirmDelete = async () => {
    setShowConfirmModal(false);
    setIsDeleting(true);
    
    try {
      const formData = new FormData();
      formData.append('slug', post.slug);
      
      const response = await fetch('/api/admin/delete-post', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show success animation
        setShowSuccessModal(true);
        
        // Wait for animation to complete before refreshing
        setTimeout(() => {
          window.location.href = '/admin/blog';
        }, 1500);
      } else {
        console.error('Failed to delete post:', result.message);
        setIsDeleting(false);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setIsDeleting(false);
    }
  };
  
  return (
    <>
      <div className="group border-b border-border/30 last:border-0 transition-all duration-200 hover:bg-muted/40 hover:scale-[1.005]">
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link 
              href={`/admin/blog/edit-post?slug=${post.slug}`}
              className="flex-1 min-w-0 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors duration-200">
                  {post.title}
                </h3>
                <span className={`
                  px-1.5 py-0.5 rounded-sm text-[10px] font-medium uppercase
                  ${post.type === 'original' 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'}
                `}>
                  {post.type}
                </span>
                {post.featured && (
                  <span className="px-1.5 py-0.5 rounded-sm bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-medium uppercase">
                    Featured
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 mt-1.5">
                <p className="text-xs text-muted-foreground">
                  {formatDate(post.date)}
                </p>
                {post.category && (
                  <p className="text-xs text-muted-foreground">
                    {post.category}
                  </p>
                )}
              </div>
            </Link>
            
            <div className="flex items-center gap-2">
              <Link 
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs py-1 px-2 opacity-60 hover:opacity-100 hover:bg-blue-500/10 hover:text-blue-500 transition-all duration-200 group-hover:scale-105 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 mr-1">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  View on Site
                </Button>
              </Link>
              
              <Link
                href={`/admin/blog/edit-post?slug=${post.slug}`}
                className="inline-block"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs py-1 px-2 opacity-60 hover:opacity-100 hover:bg-primary/10 hover:text-primary transition-all duration-200 group-hover:scale-105 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 mr-1">
                    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                  Edit
                </Button>
              </Link>
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="text-xs py-1 px-2 opacity-60 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group-hover:scale-105 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg border border-border"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex flex-col items-center text-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                  className="mb-4 text-destructive"
                >
                  <AlertTriangle size={40} />
                </motion.div>
                <h2 className="text-xl font-semibold mb-2">Delete Post</h2>
                <p className="text-muted-foreground">
                  Are you sure you want to delete "{post.title}"? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex justify-center gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelDelete}
                  className="w-full cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleConfirmDelete}
                  className="w-full cursor-pointer"
                >
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center justify-center p-8 bg-card rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
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
                Post Deleted!
              </motion.h2>
              <motion.p 
                className="text-muted-foreground text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Refreshing page...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
