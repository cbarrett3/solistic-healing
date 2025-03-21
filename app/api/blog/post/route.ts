import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/app/lib/admin/file-system';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required', success: false },
        { status: 400 }
      );
    }
    
    const post = await getPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found', success: false },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      post,
      success: true 
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post', success: false },
      { status: 500 }
    );
  }
}
