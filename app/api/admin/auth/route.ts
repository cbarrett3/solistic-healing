import { NextRequest, NextResponse } from 'next/server';
import { createAdminSession, validateAdminPassword } from '@/app/lib/admin/auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { message: 'Password is required' },
        { status: 400 }
      );
    }

    const isValid = await validateAdminPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create session
    const success = createAdminSession();

    if (!success) {
      return NextResponse.json(
        { message: 'Failed to create session' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { message: 'An error occurred' },
      { status: 500 }
    );
  }
}
