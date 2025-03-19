import { NextRequest, NextResponse } from 'next/server';
import { savePost, getPostBySlug } from '@/app/lib/admin/file-system';
import { adminAuthGuard } from '@/app/lib/admin/auth';
import { BlogPost, OriginalPost, ExternalPost } from '@/app/types/blog';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    adminAuthGuard();
    
    // Get form data
    const formData = await request.formData();
    const type = formData.get('type') as 'original' | 'external';
    const slug = formData.get('slug') as string;
    
    // Validate required fields
    const title = formData.get('title') as string;
    
    if (!title || !slug || !type) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Get existing post to preserve fields that aren't being updated
    const existingPost = await getPostBySlug(slug);
    
    if (!existingPost) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Ensure post types match
    if (existingPost.type !== type) {
      return NextResponse.json(
        { message: 'Cannot change post type' },
        { status: 400 }
      );
    }
    
    // Prepare updated post data
    let updatedPost: BlogPost;
    
    if (type === 'original') {
      const content = formData.get('content') as string;
      
      if (!content) {
        return NextResponse.json(
          { message: 'Content is required for original posts' },
          { status: 400 }
        );
      }
      
      updatedPost = {
        ...existingPost,
        title,
        content
      } as OriginalPost;
    } else {
      const externalUrl = formData.get('externalUrl') as string;
      const commentary = formData.get('commentary') as string;
      
      if (!externalUrl || !commentary) {
        return NextResponse.json(
          { message: 'URL and commentary are required for external posts' },
          { status: 400 }
        );
      }
      
      updatedPost = {
        ...existingPost,
        title,
        externalUrl,
        commentary
      } as ExternalPost;
    }
    
    // Save the updated post
    const success = await savePost(updatedPost);
    
    if (!success) {
      return NextResponse.json(
        { message: 'Failed to save post' },
        { status: 500 }
      );
    }
    
    // Redirect back to the blog admin
    return NextResponse.redirect(new URL('/admin/blog', request.url));
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}
