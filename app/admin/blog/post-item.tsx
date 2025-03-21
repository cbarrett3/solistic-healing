'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/app/lib/utils';
import { BlogPost } from '@/app/types/blog';
import { Button } from '../components/ui';

interface PostItemProps {
  post: BlogPost;
}

export default function PostItem({ post }: PostItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      const form = e.currentTarget.closest('form');
      if (form) form.submit();
    }
  };
  
  return (
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
            
            <form 
              action="/api/admin/delete-post" 
              method="POST"
              className="inline-block"
            >
              <input type="hidden" name="slug" value={post.slug} />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="text-xs py-1 px-2 opacity-60 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group-hover:scale-105 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 mr-1">
                  <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}
