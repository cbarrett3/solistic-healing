import { NextRequest, NextResponse } from 'next/server';
import { endAdminSession } from '@/app/lib/admin/auth';

export function GET(request: NextRequest) {
  // End the admin session
  endAdminSession();
  
  // Redirect to login page
  return NextResponse.redirect(new URL('/admin/login', request.url));
}
