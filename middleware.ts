import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only run this in production and only for admin routes
  if (process.env.NODE_ENV === 'production' && 
      request.nextUrl.pathname.startsWith('/admin/blog')) {
    
    // Check if GitHub token is set
    if (!process.env.GITHUB_TOKEN) {
      // If accessing the admin blog routes without a GitHub token in production
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'GitHub token is not configured. Please add GITHUB_TOKEN to your environment variables.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }

  return NextResponse.next();
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/admin/blog/:path*'],
};
