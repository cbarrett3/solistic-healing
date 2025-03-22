'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BlogPost, OriginalPost, ExternalPost } from '@/app/types/blog';
import { Card, CardContent, Button, Input, Textarea, Tabs } from '../../components/ui';
import { useToast } from '@/app/admin/components/ui/toast';
import MarkdownPreview from '@/app/admin/components/markdown-preview';

interface PostFormProps {
  post?: BlogPost;
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting?: boolean;
}

export default function PostForm({ 
  post, 
  onSubmit, 
  isSubmitting: submittingProp = false 
}: PostFormProps) {
  const router = useRouter();
  const { addToast } = useToast();
  
  // Form state
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(
    post?.type === 'original' 
      ? (post as OriginalPost).markdownContent || (post as OriginalPost).content 
      : ''
  );
  const [externalUrl, setExternalUrl] = useState(
    post?.type === 'external' 
      ? (post as ExternalPost).externalUrl 
      : ''
  );
  const [sourceName, setSourceName] = useState(
    post?.type === 'external' 
      ? (post as ExternalPost).sourceName || '' 
      : ''
  );
  const [commentary, setCommentary] = useState(
    post?.type === 'external' 
      ? (post as ExternalPost).markdownCommentary || (post as ExternalPost).commentary 
      : ''
  );
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [postType, setPostType] = useState<'original' | 'external'>(post?.type || 'original');
  const [featuredImageUrl, setFeaturedImageUrl] = useState(post?.featuredImage || '');
  const [isImageValid, setIsImageValid] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [isSubmitting, setIsSubmitting] = useState(submittingProp);
  
  // Validate image URL when it changes
  useEffect(() => {
    if (!featuredImageUrl) {
      setIsImageValid(false);
      setImageError(null);
      return;
    }
    
    setIsImageLoading(true);
    setImageError(null);
    
    const img = new window.Image();
    img.onload = () => {
      setIsImageValid(true);
      setIsImageLoading(false);
    };
    img.onerror = () => {
      setIsImageValid(false);
      setIsImageLoading(false);
      setImageError('Unable to load image. Please check the URL.');
    };
    img.src = featuredImageUrl;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [featuredImageUrl]);
  
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
    
    try {
      setIsSubmitting(true);
      
      // Create a FormData object from the form
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // Add the post type
      formData.set('type', postType);
      
      // Submit the form
      await onSubmit(formData);
      
      // Redirect to blog admin page
      router.push('/admin/blog');
    } catch {
      // Show error toast
      addToast('Failed to save post. Please try again.', 'error');
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
        {!post && (
          <div className="px-6 pt-4 pb-2 border-b bg-muted/10 flex items-center">
            <Tabs 
              value={postType}
              onChange={handleTabChange}
              tabs={[
                { value: 'original', label: 'Original Content' },
                { value: 'external', label: 'External Link' }
              ]}
              variant="pills"
              className="inline-flex"
            />
          </div>
        )}
        
        {post && (
          <div className="px-6 py-3 border-b bg-muted/10 flex items-start">
            <span className={`
              inline-flex px-3 py-1 rounded-full text-xs font-medium
              ${postType === 'original' 
                ? 'bg-lime-100 text-lime-700 dark:bg-lime-950/50 dark:text-lime-300' 
                : 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'}
            `}>
              {postType === 'original' ? 'Original Content' : 'External Link'}
            </span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-light text-foreground/80">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => {
                  if (title && !slug && !post) {
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
              {post ? (
                <div className="relative">
                  <div className="px-3 py-2 border rounded-md bg-muted/50 text-muted-foreground">
                    {slug}
                  </div>
                  <input type="hidden" name="slug" value={slug} />
                </div>
              ) : (
                <div className="flex">
                  <Input
                    id="slug"
                    name="slug"
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
              {post && (
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
              name="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of your post (optional)"
              className="w-full"
            />
          </div>
          
          {/* Featured Image URL with Preview */}
          <div className="space-y-2">
            <label htmlFor="featuredImageUrl" className="block text-sm font-light text-foreground/80">
              Featured Image URL
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  id="featuredImageUrl"
                  name="featuredImage"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full"
                />
                {imageError && (
                  <p className="text-xs text-red-500 mt-1">{imageError}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Enter a direct URL to an image (JPG, PNG, WebP)
                </p>
              </div>
              
              <div className="w-full md:w-1/3 h-[120px] rounded-md overflow-hidden border border-border/50 bg-muted/30 flex items-center justify-center">
                {isImageLoading ? (
                  <div className="animate-pulse text-xs text-muted-foreground">Loading...</div>
                ) : featuredImageUrl && isImageValid ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={featuredImageUrl}
                      alt="Featured image preview"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground text-center px-4">
                    {featuredImageUrl ? 'Invalid image URL' : 'Image preview will appear here'}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Original Content Fields */}
          {postType === 'original' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="content" className="block text-sm font-light text-foreground/80">
                  Content
                </label>
                <div className="flex bg-muted/30 p-0.5 rounded-md">
                  <button
                    type="button"
                    onClick={() => setViewMode('edit')}
                    className={`text-xs px-3 py-1.5 rounded-md cursor-pointer ${viewMode === 'edit' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('split')}
                    className={`text-xs px-3 py-1.5 rounded-md cursor-pointer ${viewMode === 'split' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
                  >
                    Split
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('preview')}
                    className={`text-xs px-3 py-1.5 rounded-md cursor-pointer ${viewMode === 'preview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
                  >
                    Preview
                  </button>
                </div>
              </div>
              
              <div className={`${viewMode === 'split' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'block'}`}>
                {(viewMode === 'edit' || viewMode === 'split') && (
                  <div className={viewMode === 'split' ? '' : 'mb-4'}>
                    <Textarea
                      id="content"
                      name="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your post content in Markdown..."
                      className="w-full min-h-[400px]"
                    />
                  </div>
                )}
                
                {(viewMode === 'preview' || viewMode === 'split') && (
                  <div className="border border-border rounded-md bg-background p-4 h-[400px] overflow-y-auto">
                    <MarkdownPreview content={content} />
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* External Link Fields */}
          {postType === 'external' && (
            <div className="w-full space-y-6">
              <div className="space-y-5">
                <div className="w-full">
                  <label htmlFor="externalUrl" className="block text-sm font-medium mb-2">
                    External URL
                  </label>
                  <div className="flex items-center w-full">
                    <div className="relative flex-grow">
                      <div className="absolute left-3 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                      </div>
                      <Input
                        id="externalUrl"
                        name="externalUrl"
                        value={externalUrl}
                        onChange={(e) => setExternalUrl(e.target.value)}
                        placeholder="https://example.com/article"
                        className="pl-10 pr-3 py-3 bg-background border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary transition-all w-full text-sm"
                      />
                    </div>
                    {externalUrl && (
                      <a 
                        href={externalUrl.startsWith('http') ? externalUrl : `https://${externalUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-primary hover:text-primary/80 transition-colors"
                        title="Open URL"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <label htmlFor="sourceName" className="block text-sm font-medium mb-2">
                    Source Name
                  </label>
                  <Input
                    id="sourceName"
                    name="sourceName"
                    value={sourceName}
                    onChange={(e) => setSourceName(e.target.value)}
                    placeholder="New York Times, Medium, etc."
                    className="py-3 bg-background border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary transition-all w-full text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="commentary" className="block text-sm font-light text-foreground/80">
                    Commentary
                  </label>
                  <div className="flex bg-muted/30 p-0.5 rounded-md">
                    <button
                      type="button"
                      onClick={() => setViewMode('edit')}
                      className={`text-xs px-3 py-1.5 rounded-md cursor-pointer ${viewMode === 'edit' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('split')}
                      className={`text-xs px-3 py-1.5 rounded-md cursor-pointer ${viewMode === 'split' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
                    >
                      Split
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('preview')}
                      className={`text-xs px-3 py-1.5 rounded-md cursor-pointer ${viewMode === 'preview' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
                    >
                      Preview
                    </button>
                  </div>
                </div>
                
                <div className={`${viewMode === 'split' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'block'}`}>
                  {(viewMode === 'edit' || viewMode === 'split') && (
                    <div className={viewMode === 'split' ? '' : 'mb-4'}>
                      <Textarea
                        id="commentary"
                        name="commentary"
                        value={commentary}
                        onChange={(e) => setCommentary(e.target.value)}
                        placeholder="Add your thoughts, analysis, or commentary about this external content..."
                        className="w-full min-h-[500px] text-base leading-relaxed"
                      />
                    </div>
                  )}
                  
                  {(viewMode === 'preview' || viewMode === 'split') && (
                    <div className="border border-border rounded-md bg-background p-4 h-[500px] overflow-y-auto">
                      <MarkdownPreview content={commentary} />
                    </div>
                  )}
                </div>
              </div>
            </div>
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
                    {post ? 'Save Changes' : 'Create Post'}
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
                post ? 'Save Changes' : 'Create Post'
              )}
            </Button>
          </div>
          
          {/* Markdown Tips Section */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <h3 className="text-sm font-medium mb-3 text-foreground/90">Quick Formatting Guide</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="bg-muted/20 rounded-md p-4 border border-border/20">
                  <h4 className="text-xs font-medium text-foreground/80 mb-2.5 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                    </svg>
                    Text Styling
                  </h4>
                  
                  <div className="space-y-2.5">
                    <div className="flex items-start">
                      <code className="bg-muted/40 px-1.5 py-0.5 rounded text-xs font-mono min-w-[100px]"># Heading</code>
                      <span className="text-xs text-muted-foreground ml-3">Large title</span>
                    </div>
                    
                    <div className="flex items-start">
                      <code className="bg-muted/40 px-1.5 py-0.5 rounded text-xs font-mono min-w-[100px]">**Bold**</code>
                      <span className="text-xs text-muted-foreground ml-3">Makes text <strong>bold</strong></span>
                    </div>
                    
                    <div className="flex items-start">
                      <code className="bg-muted/40 px-1.5 py-0.5 rounded text-xs font-mono min-w-[100px]">*Italic*</code>
                      <span className="text-xs text-muted-foreground ml-3">Makes text <em>italic</em></span>
                    </div>
                    
                    <div className="flex items-start">
                      <code className="bg-muted/40 px-1.5 py-0.5 rounded text-xs font-mono min-w-[100px]">- Item</code>
                      <span className="text-xs text-muted-foreground ml-3">Creates a bullet list</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-muted/20 rounded-md p-4 border border-border/20">
                  <h4 className="text-xs font-medium text-foreground/80 mb-2.5 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                      <circle cx="9" cy="9" r="2"/>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                    </svg>
                    Links & Images
                  </h4>
                  
                  <div className="space-y-2.5">
                    <div className="flex items-start">
                      <code className="bg-muted/40 px-1.5 py-0.5 rounded text-xs font-mono min-w-[100px]">[Text](URL)</code>
                      <span className="text-xs text-muted-foreground ml-3">Creates a clickable link</span>
                    </div>
                    
                    <div className="flex items-start">
                      <code className="bg-muted/40 px-1.5 py-0.5 rounded text-xs font-mono min-w-[100px]">![Alt](URL)</code>
                      <span className="text-xs text-muted-foreground ml-3">Embeds an image in text</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-md p-4">
              <h4 className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
                Helpful Tips
              </h4>
              
              <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-2 pl-5 list-disc">
                <li>
                  <strong>Featured Image:</strong> Use the field above to add your main post image - it will appear in the blog listing
                </li>
                <li>
                  <strong>Additional Images:</strong> To add more images within your content, use <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded text-[10px]">![Description](https://example.com/image.jpg)</code>
                </li>
                <li>
                  <strong>Paragraphs:</strong> Leave a blank line between paragraphs to create proper spacing
                </li>
                <li>
                  <strong>Quotes:</strong> Use <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded text-[10px]">{'>'} Text</code> to create indented quotes
                </li>
              </ul>
              
              <div className="mt-3 pt-3 border-t border-blue-100 dark:border-blue-900/50">
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  <strong>Example:</strong> <code className="bg-blue-100 dark:bg-blue-900/40 px-1 rounded text-[10px]">Check out this [helpful article](https://example.com) about healing!</code>
                  <br />
                  <span className="mt-1 block">Creates: Check out this <span className="underline">helpful article</span> about healing!</span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
