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
        { message: 'Slug is required', success: false },
        { status: 400 }
      );
    }
    
    // Delete the post
    const success = await deletePost(slug);
    
    if (!success) {
      return NextResponse.json(
        { message: 'Failed to delete post', success: false },
        { status: 500 }
      );
    }
    
    // Return JSON response instead of redirect
    return NextResponse.json(
      { 
        message: 'Post deleted successfully', 
        success: true,
        redirectUrl: '/admin/blog' // Client can use this to navigate
      },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { message: 'An error occurred', success: false },
      { status: 500 }
    );
  }
}
