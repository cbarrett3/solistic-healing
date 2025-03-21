import { NextRequest, NextResponse } from 'next/server';
import { savePost } from '@/app/lib/admin/file-system';
import { adminAuthGuard } from '@/app/lib/admin/auth';
import { BlogPost, OriginalPost, ExternalPost } from '@/app/types/blog';
import fs from 'fs/promises';
import path from 'path';

// Debug function to log to a file
async function logDebug(message: string, data?: any) {
  const logDir = path.join(process.cwd(), 'logs');
  const logFile = path.join(logDir, 'api-debug.log');
  
  try {
    // Ensure log directory exists
    await fs.mkdir(logDir, { recursive: true });
    
    // Format the message with timestamp
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] ${message}\n`;
    
    if (data) {
      logMessage += `Data: ${JSON.stringify(data, null, 2)}\n`;
    }
    
    // Append to log file
    await fs.appendFile(logFile, logMessage + '\n');
  } catch (err) {
    console.error('Failed to write to debug log:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    await adminAuthGuard();
    
    await logDebug('Received create post request');
    
    // Get form data
    const formData = await request.formData();
    const type = formData.get('type') as 'original' | 'external';
    
    await logDebug('Form data received', {
      type,
      fields: Array.from(formData.entries()).map(([key, value]) => ({ key, value: typeof value === 'string' ? value : '[File or complex data]' }))
    });
    
    // Validate required fields
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    
    if (!title || !slug || !type) {
      await logDebug('Missing required fields', { title, slug, type });
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Prepare post data
    const date = formData.get('date') as string || new Date().toISOString().split('T')[0];
    
    // Get optional fields
    const excerpt = formData.get('excerpt') as string || '';
    const featuredImage = formData.get('featuredImage') as string || '';
    const tagsString = formData.get('tags') as string || '';
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];
    
    let post: BlogPost;
    
    if (type === 'original') {
      const content = formData.get('content') as string || '';
      
      if (!content) {
        await logDebug('Content is required for original posts');
        return NextResponse.json(
          { message: 'Content is required for original posts' },
          { status: 400 }
        );
      }
      
      post = {
        type,
        title,
        slug,
        date,
        content,
        markdownContent: content, // Ensure markdownContent is set
        excerpt: excerpt || undefined,
        featuredImage: featuredImage || undefined,
        tags: tags.length > 0 ? tags : undefined
      } as OriginalPost;
      
      await logDebug('Created original post object', { title, slug, contentLength: content.length });
    } else {
      const externalUrl = formData.get('externalUrl') as string || '';
      const commentary = formData.get('commentary') as string || '';
      const sourceName = formData.get('sourceName') as string || '';
      
      if (!externalUrl || !commentary) {
        await logDebug('URL and commentary are required for external posts', { externalUrl: !!externalUrl, commentary: !!commentary });
        return NextResponse.json(
          { message: 'URL and commentary are required for external posts' },
          { status: 400 }
        );
      }
      
      post = {
        type,
        title,
        slug,
        date,
        externalUrl,
        commentary,
        markdownCommentary: commentary, // Ensure markdownCommentary is set
        excerpt: excerpt || undefined,
        featuredImage: featuredImage || undefined,
        sourceName: sourceName || undefined,
        tags: tags.length > 0 ? tags : undefined
      } as ExternalPost;
      
      await logDebug('Created external post object', { title, slug, externalUrl, commentaryLength: commentary.length });
    }
    
    // Save the post
    await logDebug('Attempting to save post', { slug, type });
    const success = await savePost(post);
    
    if (!success) {
      await logDebug('Failed to save post', { slug, type });
      return NextResponse.json(
        { message: 'Failed to save post' },
        { status: 500 }
      );
    }
    
    await logDebug('Post saved successfully', { slug, type });
    
    // Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Post created successfully',
      post: {
        slug: post.slug,
        title: post.title,
        type: post.type
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    
    await logDebug('Error creating post', { 
      error: errorMessage,
      stack: errorStack
    });
    
    console.error('Error creating post:', error);
    return NextResponse.json(
      { message: 'An error occurred', error: errorMessage },
      { status: 500 }
    );
  }
}
