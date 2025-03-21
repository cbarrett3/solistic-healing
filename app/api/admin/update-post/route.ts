import { NextRequest, NextResponse } from 'next/server';
import { savePost, getPostBySlug } from '@/app/lib/admin/file-system';
import { adminAuthGuard } from '@/app/lib/admin/auth';
import { BlogPost, OriginalPost, ExternalPost } from '@/app/types/blog';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    await adminAuthGuard();
    
    // Get form data
    const formData = await request.formData();
    const type = formData.get('type') as 'original' | 'external';
    const slug = formData.get('slug') as string;
    
    // Log form data for debugging
    console.log('Received form data:', {
      type,
      slug,
      title: formData.get('title'),
      content: formData.has('content') ? 'Content present' : 'No content',
      commentary: formData.has('commentary') ? 'Commentary present' : 'No commentary',
      externalUrl: formData.get('externalUrl'),
    });
    
    // Validate required fields
    const title = formData.get('title') as string;
    
    if (!title || !slug || !type) {
      return NextResponse.json(
        { message: `Missing required fields: ${!title ? 'title' : ''} ${!slug ? 'slug' : ''} ${!type ? 'type' : ''}`.trim() },
        { status: 400 }
      );
    }
    
    // Get existing post to preserve fields that aren't being updated
    const existingPost = await getPostBySlug(slug, { raw: true });
    
    if (!existingPost) {
      return NextResponse.json(
        { message: `Post not found with slug: ${slug}` },
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
    
    // Get optional fields
    const excerpt = formData.get('excerpt') as string || existingPost.excerpt || '';
    const featuredImage = formData.get('featuredImage') as string || existingPost.featuredImage || '';
    const tagsString = formData.get('tags') as string || '';
    const tags = tagsString 
      ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) 
      : existingPost.tags || [];
    
    if (type === 'original') {
      const content = formData.get('content') as string || '';
      
      if (!content) {
        return NextResponse.json(
          { message: 'Content is required for original posts' },
          { status: 400 }
        );
      }
      
      updatedPost = {
        ...existingPost,
        title,
        content, // This will be used for HTML rendering
        markdownContent: content, // Store the raw markdown
        excerpt: excerpt || undefined,
        featuredImage: featuredImage || undefined,
        tags: tags.length > 0 ? tags : undefined
      } as OriginalPost;
    } else {
      const externalUrl = formData.get('externalUrl') as string || '';
      const commentary = formData.get('commentary') as string || '';
      // For external posts, safely get sourceName
      const sourceName = formData.get('sourceName') as string || 
        (existingPost.type === 'external' ? (existingPost as ExternalPost).sourceName : '') || '';
      
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
        commentary: commentary.trim(), // For HTML rendering
        markdownCommentary: commentary.trim(), // Store the raw markdown
        excerpt: excerpt || undefined,
        featuredImage: featuredImage || undefined,
        sourceName: sourceName || undefined,
        tags: tags.length > 0 ? tags : undefined
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
    
    // Return JSON response instead of redirect to avoid HTML parsing issues
    return NextResponse.json(
      { message: 'Post updated successfully', success: true },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { message: 'An error occurred', success: false },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
