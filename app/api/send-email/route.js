// /app/api/send-email/route.js

import { Resend } from 'resend';
import { EmailTemplate } from '../../_components/email-template';
import { NextResponse } from 'next/server';

// Initialize Resend client with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // Parse JSON body from the request
    const body = await request.json();
    
    // Send email using Resend
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [body.email],
      subject: 'Orders From Sleem Tech',
      react: EmailTemplate({ body }), // Render email template
    });

    // Return successful response with email data
    return NextResponse.json(data);
  } catch (error) {
    // Return error response if something goes wrong
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}