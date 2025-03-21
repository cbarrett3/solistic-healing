import { NextRequest, NextResponse } from 'next/server';
import { createAdminSession } from '@/app/lib/admin/auth';

export async function POST(request: NextRequest) {
  try {
    const { answer } = await request.json();

    if (!answer) {
      return NextResponse.json(
        { message: 'Answer is required' },
        { status: 400 }
      );
    }

    // Check if the answer is correct (case insensitive)
    const isValid = answer.toLowerCase() === 'cloquet';

    if (!isValid) {
      return NextResponse.json(
        { message: 'Incorrect answer' },
        { status: 401 }
      );
    }

    // Create session
    const success = await createAdminSession();

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
