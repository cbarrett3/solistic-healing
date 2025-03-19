import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Environment variables schema
const envSchema = z.object({
  ADMIN_AUTH_SECRET: z.string().min(1),
});

// Cookie name for admin session
const ADMIN_COOKIE_NAME = 'solistic_admin_session';

/**
 * Create admin session
 */
export function createAdminSession() {
  try {
    const { ADMIN_AUTH_SECRET } = envSchema.parse(process.env);
    const cookieStore = cookies();
    
    // Set a secure HTTP-only cookie
    cookieStore.set({
      name: ADMIN_COOKIE_NAME,
      value: ADMIN_AUTH_SECRET,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      // 1 day expiration
      maxAge: 60 * 60 * 24,
    });
    
    return true;
  } catch (error) {
    console.error('Failed to create admin session:', error);
    return false;
  }
}

/**
 * Check if user is authenticated as admin
 */
export function isAuthenticated(): boolean {
  try {
    const { ADMIN_AUTH_SECRET } = envSchema.parse(process.env);
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    
    if (!sessionCookie) {
      return false;
    }
    
    return sessionCookie.value === ADMIN_AUTH_SECRET;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
}

/**
 * Middleware to protect admin routes
 */
export function withAdminAuth(request: NextRequest) {
  const { ADMIN_AUTH_SECRET } = process.env;
  
  if (!ADMIN_AUTH_SECRET) {
    console.error('ADMIN_AUTH_SECRET not configured');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME);
  
  if (!sessionCookie || sessionCookie.value !== ADMIN_AUTH_SECRET) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  return NextResponse.next();
}

/**
 * Auth guard for server components
 */
export function adminAuthGuard() {
  if (!isAuthenticated()) {
    redirect('/admin/login');
  }
}

/**
 * End admin session
 */
export function endAdminSession() {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return true;
}
