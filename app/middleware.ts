import { NextResponse, type NextRequest } from 'next/server';
import { withAdminAuth } from './lib/admin/auth';

export function middleware(request: NextRequest) {
  // Admin route protection
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    return withAdminAuth(request);
  }

  return NextResponse.next();
}

export const config = {
  // Match all admin routes except login
  matcher: ['/admin/:path*'],
};
