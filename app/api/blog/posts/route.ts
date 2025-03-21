import { NextResponse } from 'next/server';
import { getAllPosts } from '@/app/lib/admin/file-system';

export async function GET() {
  try {
    const posts = await getAllPosts();
    
    return NextResponse.json({ 
      posts,
      success: true 
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', success: false },
      { status: 500 }
    );
  }
}
