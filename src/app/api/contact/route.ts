import React from 'react';
import { NextResponse } from 'next/server';
import { resend } from '@/app/api/lib/client';
import { ContactEmail } from '@/components/email-templates/contact-email';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    const target = process.env.CONTACT_TARGET_EMAIL;

    if (!target) {
      console.error('Missing CONTACT_TARGET_EMAIL env var');
      return NextResponse.json(
        { error: 'Contact email not configured' },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: `Message from DaquanJ <${process.env.FROM_EMAIL!}>`,
      to: [target],
      replyTo: [email],
      subject: `New contact from ${name || email}`,
      react: React.createElement(ContactEmail, { name, email, message }),
    });

    if (error) {
      console.error('Resend error', error);
      return NextResponse.json(
        { error: 'Failed to send contact email', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Message sent', data }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error in /api/contact', err);
    return NextResponse.json(
      { error: 'Unexpected error' },
      { status: 500 }
    );
  }
}


