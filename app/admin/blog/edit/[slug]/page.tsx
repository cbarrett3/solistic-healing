'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createOrUpdatePost } from '@/app/actions/blog-actions';
import { BlogPost } from '@/app/types/blog';

export default function EditBlogPost({
  post,
}: {
  params?: { slug: string };
  post: BlogPost;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlPreview, setUrlPreview] = useState<{
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    author?: string;
  } | null>(null);

  // Generate a slug from the title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Handle title change to auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slugInput = formRef.current?.querySelector<HTMLInputElement>('[name="slug"]');
    if (slugInput && (!slugInput.value || slugInput.value === generateSlug(e.target.defaultValue))) {
      slugInput.value = generateSlug(title);
    }
  };

  // Fetch URL preview for external links
  const fetchUrlPreview = async (url: string) => {
    if (!url || !url.startsWith('http')) return;
    
    try {
      setError(null);
      // In a real app, you'd implement a server endpoint to fetch URL metadata
      // For now, we'll simulate a successful response
      setUrlPreview({
        title: 'Example Article Title',
        description: 'This is a placeholder for the article description that would be fetched from the URL.',
        siteName: new URL(url).hostname.replace('www.', ''),
      });
    } catch (err) {
      console.error('Error fetching URL preview:', err);
      setError('Failed to fetch URL preview');
    }
  };

  // Handle form submission
  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Add current date if not provided
      if (!formData.get('date')) {
        formData.set('date', new Date().toISOString().split('T')[0]);
      }

      // Add post type
      formData.set('type', post.type);

      // Submit the form
      const result = await createOrUpdatePost(formData);
      
      if (result?.success === false) {
        setError(result.error || 'Failed to update post');
        setIsSubmitting(false);
      }
      // If successful, the action will redirect to the blog admin page
    } catch (err) {
      console.error('Error updating post:', err);
      setError('An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  // If we're editing an external post, initialize the URL preview
  useEffect(() => {
    if (post && post.type === 'external' && 'externalUrl' in post) {
      fetchUrlPreview(post.externalUrl);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-sm p-6 text-center">
          <p className="text-muted-foreground">Post not found</p>
          <button
            onClick={() => router.push('/admin/blog')}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground mt-2">Update an existing blog post</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive">
          {error}
        </div>
      )}

      <div className="bg-card rounded-lg shadow-sm p-6">
        {/* Post Type Selector (disabled for editing) */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Post Type</label>
          <div className="flex gap-4">
            <label className="flex items-center opacity-70">
              <input
                type="radio"
                name="postType"
                value="original"
                checked={post.type === 'original'}
                disabled
                className="mr-2"
              />
              <span>Original Content</span>
            </label>
            <label className="flex items-center opacity-70">
              <input
                type="radio"
                name="postType"
                value="external"
                checked={post.type === 'external'}
                disabled
                className="mr-2"
              />
              <span>External Link</span>
            </label>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Post type cannot be changed after creation
          </p>
        </div>

        <form ref={formRef} action={handleSubmit} className="space-y-6">
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                defaultValue={post.title}
                onChange={handleTitleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-1">
                Slug *
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                required
                defaultValue={post.slug}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL-friendly identifier
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                defaultValue={post.category || ''}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-1">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                placeholder="Comma-separated tags"
                defaultValue={post.tags?.join(', ') || ''}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={2}
              defaultValue={post.excerpt || ''}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Brief summary of the post (optional)"
            />
          </div>

          <div>
            <label htmlFor="featuredImage" className="block text-sm font-medium mb-1">
              Featured Image URL
            </label>
            <input
              id="featuredImage"
              name="featuredImage"
              type="text"
              defaultValue={post.featuredImage || ''}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="/content/assets/images/example.jpg"
            />
          </div>

          {/* External Link Fields */}
          {post.type === 'external' && 'externalUrl' in post && (
            <>
              <div>
                <label htmlFor="externalUrl" className="block text-sm font-medium mb-1">
                  External URL *
                </label>
                <div className="flex gap-2">
                  <input
                    id="externalUrl"
                    name="externalUrl"
                    type="url"
                    required
                    defaultValue={post.externalUrl}
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com/article"
                    onChange={(e) => {
                      // Debounce URL preview fetching
                      const url = e.target.value;
                      const timer = setTimeout(() => fetchUrlPreview(url), 500);
                      return () => clearTimeout(timer);
                    }}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors"
                    onClick={() => {
                      const urlInput = formRef.current?.querySelector<HTMLInputElement>('[name="externalUrl"]');
                      if (urlInput?.value) {
                        fetchUrlPreview(urlInput.value);
                      }
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {urlPreview && (
                <div className="p-4 bg-muted/30 rounded-md">
                  <h3 className="font-medium">{urlPreview.title || 'Untitled'}</h3>
                  {urlPreview.description && <p className="text-sm mt-1">{urlPreview.description}</p>}
                  <div className="text-xs text-muted-foreground mt-2">
                    {urlPreview.siteName && <span>{urlPreview.siteName}</span>}
                    {urlPreview.author && <span> • {urlPreview.author}</span>}
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="sourceName" className="block text-sm font-medium mb-1">
                  Source Name
                </label>
                <input
                  id="sourceName"
                  name="sourceName"
                  type="text"
                  defaultValue={post.sourceName || ''}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., The New York Times"
                />
              </div>

              <div>
                <label htmlFor="sourceAuthor" className="block text-sm font-medium mb-1">
                  Source Author
                </label>
                <input
                  id="sourceAuthor"
                  name="sourceAuthor"
                  type="text"
                  defaultValue={post.sourceAuthor || ''}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., John Smith"
                />
              </div>

              <div>
                <label htmlFor="commentary" className="block text-sm font-medium mb-1">
                  Your Commentary *
                </label>
                <textarea
                  id="commentary"
                  name="commentary"
                  rows={10}
                  required
                  defaultValue={post.commentary}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add your thoughts, analysis, or commentary about this external content"
                />
              </div>
            </>
          )}

          {/* Original Content Fields */}
          {post.type === 'original' && 'content' in post && (
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                rows={20}
                required
                defaultValue={post.content}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                placeholder="Write your blog post content in Markdown..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                Supports Markdown formatting
              </p>
            </div>
          )}

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/blog')}
              className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
