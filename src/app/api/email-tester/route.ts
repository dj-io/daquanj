// import React from 'react';
// import { NextResponse } from 'next/server';
// import { ConfirmationEmail } from '@/components/email-templates/confirmation-email';
// import { resend } from '@/app/api/lib/client';

// export async function GET() {
// const resend_email = 'delivered@resend.dev'
// const token = '1234567890'

//     // test welcome email template and email delivery
//     // const { data, error } = await resend.emails.send({
//     //   from: `Gleam From Grit <${process.env.WELCOME_EMAIL!}>`,
//     //   to: [resend_email],
//     //   subject: 'Welcome to Grit!',
//     //   react:  React.createElement(WelcomeEmail, { email: resend_email })
//     // });

//     // test confirmation email template and email delivery
//     const { data, error } = await resend.emails.send({
//         from: `Stratum <${process.env.FROM_EMAIL!}>`,
//         to: [resend_email],
//         subject: 'Confirm your Grit waitlist signup!',
//         react: React.createElement(ConfirmationEmail, { token })
//     });

//     if (!data) {
//       console.error('No data returned from Resend')
//       return NextResponse.json({ error: 'No data returned from Resend' }, { status: 500 });
//     }

//     if (error) {
//       console.error('Failed to send welcome email:', error);
//       // Still return success since email was confirmed
//       return NextResponse.json({
//         message: 'Email confirmed successfully!',
//         warning: 'Welcome email failed to send'
//       });
//     }

//     return NextResponse.json({ message: 'Email sent successfully!' });
// }

export async function POST() {
    return new Response("Email tester disabled in production", { status: 404 });
}
