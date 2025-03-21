import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/app/lib/admin/file-system';
import { adminAuthGuard } from '@/app/lib/admin/auth';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    await adminAuthGuard();
    
    // Get the slug from query params
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      );
    }
    
    // Get the post
    const post = await getPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}
