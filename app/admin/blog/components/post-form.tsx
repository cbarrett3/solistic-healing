'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BlogPost, OriginalPost, ExternalPost } from '@/app/types/blog';
import { Card, CardContent, Button, Input, Textarea, Tabs } from '../../components/ui';
import { useToast } from '../../components/ui/toast';

interface PostFormProps {
  post?: BlogPost;
  isEditing?: boolean;
}

export default function PostForm({ post, isEditing = false }: PostFormProps) {
  const router = useRouter();
  const { addToast } = useToast();
  
  // Form state
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.type === 'original' ? (post as OriginalPost).content : '');
  const [externalUrl, setExternalUrl] = useState(post?.type === 'external' ? (post as ExternalPost).externalUrl : '');
  const [sourceName, setSourceName] = useState(post?.type === 'external' ? (post as ExternalPost).sourceName || '' : '');
  const [commentary, setCommentary] = useState(post?.type === 'external' ? (post as ExternalPost).commentary : '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postType, setPostType] = useState<'original' | 'external'>(post?.type || 'original');
  
  // Generate slug from title
  const generateSlug = () => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')  // Remove special chars
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/-+/g, '-')       // Remove consecutive hyphens
      .trim();
    
    setSlug(generatedSlug);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Validate form
    if (!title || (!isEditing && !slug)) {
      addToast('Title and slug are required', 'error');
      return;
    }
    
    if (postType === 'original' && !content) {
      addToast('Content is required for original posts', 'error');
      return;
    }
    
    if (postType === 'external' && (!externalUrl || !commentary)) {
      addToast('URL and commentary are required for external posts', 'error');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Create form data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('type', postType);
      formData.append('excerpt', excerpt);
      
      if (postType === 'original') {
        formData.append('content', content);
      } else {
        formData.append('externalUrl', externalUrl);
        formData.append('sourceName', sourceName);
        formData.append('commentary', commentary);
      }
      
      // Submit the form
      const endpoint = isEditing ? '/api/admin/update-post' : '/api/admin/create-post';
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        addToast(`Post ${isEditing ? 'updated' : 'created'} successfully`, 'success');
        
        // Redirect after a short delay to allow the toast to be seen
        setTimeout(() => {
          router.push('/admin/blog');
        }, 1500);
      } else {
        throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'create'} post`);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} post:`, error);
      addToast(error instanceof Error ? error.message : 'An error occurred', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle tab change
  const handleTabChange = (value: string | number | boolean) => {
    if (typeof value === 'string' && (value === 'original' || value === 'external')) {
      setPostType(value as 'original' | 'external');
    }
  };
  
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardContent className="p-0">
        {/* Post Type Selector */}
        {!isEditing && (
          <div className="border-b">
            <Tabs 
              value={postType}
              onChange={handleTabChange}
              tabs={[
                { value: 'original', label: 'Original Content' },
                { value: 'external', label: 'External Link' }
              ]}
              className="px-6 pt-6"
            />
          </div>
        )}
        
        {isEditing && (
          <div className="px-6 py-4 border-b bg-muted/30 flex items-center">
            <span className={`
              px-2 py-1 rounded-sm text-xs font-medium
              ${postType === 'original' 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'}
            `}>
              {postType === 'original' ? 'Original Content' : 'External Link'}
            </span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-light text-foreground/80">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => {
                  if (title && !slug && !isEditing) {
                    generateSlug();
                  }
                }}
                placeholder="Post title"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-light text-foreground/80">
                Slug
              </label>
              {isEditing ? (
                <div className="px-3 py-2 border rounded-md bg-muted/50 text-muted-foreground">
                  {slug}
                </div>
              ) : (
                <div className="flex">
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-slug"
                    className="w-full"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateSlug}
                    className="ml-2 whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors"
                    disabled={!title}
                  >
                    Generate
                  </Button>
                </div>
              )}
              {isEditing && (
                <p className="text-xs text-muted-foreground mt-1">
                  Slug cannot be changed after creation
                </p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="excerpt" className="block text-sm font-light text-foreground/80">
              Excerpt
            </label>
            <Input
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of your post (optional)"
              className="w-full"
            />
          </div>
          
          {/* Original Content Fields */}
          {postType === 'original' && (
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-light text-foreground/80">
                Content (Markdown)
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content in Markdown..."
                className="w-full min-h-[300px]"
              />
            </div>
          )}
          
          {/* External Link Fields */}
          {postType === 'external' && (
            <>
              <div className="space-y-2">
                <label htmlFor="externalUrl" className="block text-sm font-light text-foreground/80">
                  External URL
                </label>
                <Input
                  id="externalUrl"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://example.com/article"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="sourceName" className="block text-sm font-light text-foreground/80">
                  Source Name
                </label>
                <Input
                  id="sourceName"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                  placeholder="Name of the original content source (optional)"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="commentary" className="block text-sm font-light text-foreground/80">
                  Commentary (Markdown)
                </label>
                <Textarea
                  id="commentary"
                  value={commentary}
                  onChange={(e) => setCommentary(e.target.value)}
                  placeholder="Write your commentary on this external content..."
                  className="w-full min-h-[200px]"
                />
              </div>
            </>
          )}
          
          <div className="px-0 pt-4 flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/blog')}
              disabled={isSubmitting}
              className="cursor-pointer hover:bg-muted/80 transition-colors"
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="relative cursor-pointer hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? (
                <>
                  <span className="opacity-0">
                    {isEditing ? 'Save Changes' : 'Create Post'}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg 
                      className="animate-spin h-5 w-5 text-current" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </span>
                </>
              ) : (
                isEditing ? 'Save Changes' : 'Create Post'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
