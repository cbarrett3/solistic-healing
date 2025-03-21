import { NextRequest, NextResponse } from 'next/server';
import { deletePost } from '@/app/lib/admin/file-system';
import { adminAuthGuard } from '@/app/lib/admin/auth';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    await adminAuthGuard();
    
    // Get form data
    const formData = await request.formData();
    const slug = formData.get('slug') as string;
    
    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      );
    }
    
    // Delete the post
    const success = await deletePost(slug);
    
    if (!success) {
      return NextResponse.json(
        { message: 'Failed to delete post' },
        { status: 500 }
      );
    }
    
    // Redirect back to the blog admin
    return NextResponse.redirect(new URL('/admin/blog', request.url));
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}
