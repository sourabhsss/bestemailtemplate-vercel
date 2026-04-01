import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) {
    console.warn('Turnstile secret key not configured — skipping verification');
    return true;
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch {
    console.error('Turnstile verification failed');
    return false;
  }
}

async function sendEmail(name: string, email: string, message: string) {
  if (!resend || !CONTACT_EMAIL_TO) {
    console.warn('Resend not configured — logging submission instead');
    console.log('Contact form submission:', { name, email, message });
    return;
  }

  await resend.emails.send({
    from: 'Best Email Template <onboarding@resend.dev>',
    to: CONTACT_EMAIL_TO,
    subject: `Contact Form: ${name}`,
    replyTo: email,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Date: ${new Date().toISOString()}`,
      '',
      'Message:',
      message,
    ].join('\n'),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, turnstileToken } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long. Please keep it under 5000 characters.' },
        { status: 400 }
      );
    }

    // Verify Turnstile
    if (turnstileToken) {
      const isHuman = await verifyTurnstile(turnstileToken);
      if (!isHuman) {
        return NextResponse.json(
          { error: 'Bot detection failed. Please try again.' },
          { status: 403 }
        );
      }
    }

    // Send email notification
    await sendEmail(name.trim(), email.trim(), message.trim());

    return NextResponse.json(
      { message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
