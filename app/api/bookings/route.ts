import { NextRequest, NextResponse } from 'next/server';
import { submitBooking } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { full_name, email, whatsapp, plan } = body;
    
    if (!full_name || !email || !whatsapp || !plan) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate plan value
    if (!['excel', 'conquer', 'general'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan value' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Submit to Supabase
    const result = await submitBooking({
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp.trim(),
      message: body.message?.trim() || null,
      plan,
      source: 'website'
    });

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        data: result.data 
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Bookings API endpoint' },
    { status: 200 }
  );
}