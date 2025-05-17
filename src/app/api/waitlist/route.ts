import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { nanoid } from 'nanoid';
import React from 'react';
import { ConfirmationEmail } from '@/components/email-templates/confirmation-email';
import { PostHog } from 'posthog-node'

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ANON_KEY!
);

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY!);

const posthogClient = new PostHog(
  process.env.POSTHOG_SERVER_KEY!,
  { host: process.env.NEXT_PUBLIC_POSTHOG_HOST! }
)

// POST handler for the waitlist endpoint
export async function POST(request: Request) {
  try {
    // Parse the incoming request
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a unique token for email confirmation
    const token = nanoid();

    // Insert the waitlist entry into Supabase [https://supabase.com/]
    const { error: dbError } = await supabase.from('waitlist').insert([
      { email, token }
    ]);

    if (dbError) {
      console.error('Supabase Error:', dbError);
      return NextResponse.json(
        { error: 'Database insertion failed', details: dbError.message },
        { status: 500 }
      );
    }

    // Send the confirmation email using Resend [https://resend.com/]
    const { data, error } = await resend.emails.send({
      from: `Stratum <${process.env.FROM_EMAIL!}>`,
      to: [email],
      subject: 'Grit waitlist signup confirmation!',
      react: React.createElement(ConfirmationEmail, { token })
    });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send confirmation email', details: error.message },
        { status: 500 }
      );
    }

    try {
      // Capture the waitlist submission event
      posthogClient.capture({
        distinctId: email,
        event: 'waitlist_form_submitted',
        properties: {
          email
        }
      })

      await posthogClient.shutdown()
    } catch (phError) {
      console.error('PostHog tracking error (non-fatal):', phError)
    }

    return NextResponse.json(
      { message: 'Confirmation email sent', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing waitlist request:', error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
