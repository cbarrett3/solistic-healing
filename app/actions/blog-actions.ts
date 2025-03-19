'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { BlogPost, OriginalPost, ExternalPost } from '@/app/types/blog';
import { savePost, deletePost, saveImage } from '@/app/lib/admin/file-system';
import { adminAuthGuard } from '@/app/lib/admin/auth';

// Schema for original post
const originalPostSchema = z.object({
  type: z.literal('original'),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  date: z.string().min(1, 'Date is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

// Schema for external post
const externalPostSchema = z.object({
  type: z.literal('external'),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  date: z.string().min(1, 'Date is required'),
  externalUrl: z.string().url('Valid URL is required'),
  commentary: z.string().min(1, 'Commentary is required'),
  sourceName: z.string().optional(),
  sourceAuthor: z.string().optional(),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

// Combined schema for all post types
const blogPostSchema = z.discriminatedUnion('type', [
  originalPostSchema,
  externalPostSchema,
]);

/**
 * Create or update a blog post
 */
export async function createOrUpdatePost(formData: FormData) {
  // Check authentication
  adminAuthGuard();

  try {
    // Extract and validate post data
    const rawData: Record<string, any> = Object.fromEntries(formData.entries());
    
    // Handle tags (convert from comma-separated string to array)
    if (rawData.tags && typeof rawData.tags === 'string') {
      rawData.tags = rawData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    } else {
      rawData.tags = [];
    }
    
    // Handle featured flag
    rawData.featured = rawData.featured === 'true';
    
    // Parse and validate with zod
    const postData = blogPostSchema.parse(rawData);
    
    // Save the post
    const success = await savePost(postData);
    
    if (!success) {
      return { success: false, error: 'Failed to save post' };
    }
    
    // Revalidate the blog pages
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    
    // Redirect to the blog admin
    redirect('/admin/blog');
  } catch (error) {
    console.error('Error creating/updating post:', error);
    
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      return { 
        success: false, 
        error: 'Validation error', 
        fieldErrors 
      };
    }
    
    return { success: false, error: 'An error occurred' };
  }
}

/**
 * Delete a blog post
 */
export async function deleteBlogPost(formData: FormData) {
  // Check authentication
  adminAuthGuard();
  
  const slug = formData.get('slug') as string;
  
  if (!slug) {
    return { success: false, error: 'Slug is required' };
  }
  
  try {
    const success = await deletePost(slug);
    
    if (!success) {
      return { success: false, error: 'Failed to delete post' };
    }
    
    // Revalidate the blog pages
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: 'An error occurred' };
  }
}

/**
 * Upload an image
 */
export async function uploadImage(formData: FormData) {
  // Check authentication
  adminAuthGuard();
  
  const file = formData.get('file') as File;
  
  if (!file) {
    return { success: false, error: 'No file provided' };
  }
  
  try {
    const imagePath = await saveImage(file);
    
    if (!imagePath) {
      return { success: false, error: 'Failed to save image' };
    }
    
    return { success: true, imagePath };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, error: 'An error occurred' };
  }
}
