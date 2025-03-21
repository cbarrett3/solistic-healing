'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPost, OriginalPost, ExternalPost } from '@/app/types/blog';

export default function EditPostForm({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [postType, setPostType] = useState<'original' | 'external'>(post.type);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate a slug from the title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Add post type
      formData.set('type', postType);

      // Submit the form
      const response = await fetch('/api/admin/update-post', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Show success message via toast if available
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('blog_toast', JSON.stringify({
            type: 'success',
            message: 'Post updated successfully'
          }));
        }
        
        // Always redirect to blog management page on success
        router.push('/admin/blog');
      } else {
        // Try to parse error response as JSON
        try {
          const data = await response.json();
          setError(data.message || 'Failed to update post');
        } catch (jsonError) {
          // If JSON parsing fails, use status text
          setError(`Error: ${response.status} ${response.statusText}`);
        }
      }
    } catch (err) {
      console.error('Error updating post:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground mt-2">Update your blog post</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive">
          {error}
        </div>
      )}

      <div className="bg-card rounded-lg shadow-sm p-6">
        {/* Post Type Selector (disabled in edit mode) */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Post Type</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="postType"
                value="original"
                checked={postType === 'original'}
                disabled
                className="mr-2"
              />
              <span>Original Content</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="postType"
                value="external"
                checked={postType === 'external'}
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hidden slug field */}
          <input type="hidden" name="slug" value={post.slug} />
          
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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="displaySlug" className="block text-sm font-medium mb-1">
                Slug
              </label>
              <input
                id="displaySlug"
                type="text"
                disabled
                value={post.slug}
                className="w-full px-3 py-2 border rounded-md bg-muted/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Slug cannot be changed after creation
              </p>
            </div>
          </div>

          {/* External Link Fields */}
          {postType === 'external' && (
            <>
              <div>
                <label htmlFor="externalUrl" className="block text-sm font-medium mb-1">
                  External URL *
                </label>
                <input
                  id="externalUrl"
                  name="externalUrl"
                  type="url"
                  required
                  defaultValue={(post as ExternalPost).externalUrl}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com/article"
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
                  defaultValue={(post as ExternalPost).commentary}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add your thoughts, analysis, or commentary about this external content"
                />
              </div>
            </>
          )}

          {/* Original Content Fields */}
          {postType === 'original' && (
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                rows={20}
                required
                defaultValue={(post as OriginalPost).content}
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
              {isSubmitting ? 'Updating...' : 'Update Post'}
            </button>
            <Link
              href="/admin/blog"
              className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
