import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { envConfig } from './env-config';

// Admin auth cookie name
const ADMIN_AUTH_COOKIE = 'admin_auth';

/**
 * Create admin session
 */
export async function createAdminSession() {
  try {
    const cookieStore = await cookies();
    
    // Set a secure HTTP-only cookie
    cookieStore.set({
      name: ADMIN_AUTH_COOKIE,
      value: envConfig.adminAuthSecret,
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
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(ADMIN_AUTH_COOKIE);
    
    if (!authCookie) {
      return false;
    }
    
    // Compare with the admin auth secret
    return authCookie.value === envConfig.adminAuthSecret;
  } catch (error) {
    console.error('Error checking admin authentication:', error);
    return false;
  }
}

/**
 * Middleware to protect admin routes
 */
export function withAdminAuth(request: NextRequest) {
  const validation = envConfig.validate();
  if (!validation.isValid) {
    console.error(`Missing required environment variables: ${validation.missingVars.join(', ')}`);
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  const sessionCookie = request.cookies.get(ADMIN_AUTH_COOKIE);
  
  if (!sessionCookie || sessionCookie.value !== envConfig.adminAuthSecret) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  return NextResponse.next();
}

/**
 * Admin auth guard for server components
 * Redirects to login page if the user is not authenticated
 */
export async function adminAuthGuard(): Promise<void> {
  // Validate environment configuration
  const validation = envConfig.validate();
  if (!validation.isValid) {
    console.error(`Missing required environment variables: ${validation.missingVars.join(', ')}`);
  }
  
  const isAuthenticated = await isAdminAuthenticated();
  
  if (!isAuthenticated) {
    redirect('/admin/login');
  }
}

/**
 * End admin session
 */
export async function endAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_AUTH_COOKIE);
  return true;
}
