import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Environment variables schema
const envSchema = z.object({
  ADMIN_PASSWORD_HASH: z.string().min(1),
  ADMIN_AUTH_SECRET: z.string().min(1),
});

// Cookie name for admin session
const ADMIN_COOKIE_NAME = 'solistic_admin_session';

/**
 * Validate admin password
 */
export async function validateAdminPassword(password: string): Promise<boolean> {
  try {
    // In a production environment, we would use a proper password hashing library
    // For simplicity in this demo, we're using a basic comparison
    // Replace this with bcrypt or similar in a real application
    const { ADMIN_PASSWORD_HASH } = envSchema.parse(process.env);
    return password === ADMIN_PASSWORD_HASH;
  } catch (error) {
    console.error('Environment variables not properly configured:', error);
    return false;
  }
}

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
    const adminCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    
    return adminCookie?.value === ADMIN_AUTH_SECRET;
  } catch (error) {
    console.error('Failed to check authentication:', error);
    return false;
  }
}

/**
 * Middleware to protect admin routes
 */
export function withAdminAuth(request: NextRequest) {
  try {
    const { ADMIN_AUTH_SECRET } = envSchema.parse(process.env);
    const adminCookie = request.cookies.get(ADMIN_COOKIE_NAME);
    
    if (!adminCookie || adminCookie.value !== ADMIN_AUTH_SECRET) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
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
}
