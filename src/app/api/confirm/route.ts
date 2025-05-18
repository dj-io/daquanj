import React from 'react';
import { NextResponse } from 'next/server';
import { WelcomeEmail } from '@/components/email-templates/welcome-email';
import { supabase, resend } from '@/app/api/lib/client';


export async function PATCH(request: Request) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
  }

  // First confirm the email in database
  const { data: dbData, error: dbError } = await supabase
    .from('waitlist')
    .update({ confirmed: true })
    .eq('token', token)
    .select('email');


  if (dbError) {
    console.log('ERROR', dbError)
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  if (!dbData || dbData.length === 0) {
    console.log('No matching signup found or already confirmed')
    return NextResponse.json({ message: 'No matching signup found or already confirmed' }, { status: 404 });
  }

  // Email is now confirmed, attempt to send welcome email
  try {
    const { data, error } = await resend.emails.send({
      from: `Gleam From Grit <${process.env.WELCOME_EMAIL!}>`,
      to: [dbData[0].email],
      subject: 'Welcome to Grit!',
      react: React.createElement(WelcomeEmail, { email: dbData[0].email })
    });

    if (!data) {
      console.error('No data returned from Resend')
      return NextResponse.json({ error: 'No data returned from Resend' }, { status: 500 });
    }

    if (error) {
      console.error('Failed to send welcome email:', error);
      // Still return success since email was confirmed
      return NextResponse.json({
        message: 'Email confirmed successfully!',
        warning: 'Welcome email failed to send'
      });
    }
  } catch (error) {
    console.error('Resend email error:', error);
    // Still return success since email was confirmed
    return NextResponse.json({
      message: 'Email confirmed successfully!',
      warning: 'Welcome email failed to send'
    });
  }

  return NextResponse.json({ message: 'Email confirmed successfully!' });
}
