
import { NextResponse } from 'next/server';
import React from 'react';
import { FollowupEmail } from '@/components/email-templates/follow-up-email';
import { supabase, resend } from '@/app/api/lib/client';

export async function GET() {
  try {
    // Retrieve waitlist entries with confirmed = true
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .eq('confirmed', true);

    if (error) {
      throw new Error(error.message);
    }

    // If no waitlist entries are found, return an informative response
    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No confirmed waitlist entries to follow up on." });
    }

    // Build a batch payload from the confirmed entries
    const emailBatch = data.map((entry) => ({
      from: `Stratum <${process.env.FROM_EMAIL!}>`,
      to: [entry.email],
      subject: "Exciting Updates from Grit!",
      // Here we create the React element for the email template and pass in the recipient's email
      react: React.createElement(FollowupEmail, { email: entry.email }),
    }));

    // Use Resend's batch sending API to send all emails at once ~100 [https://resend.com/docs/api-reference/emails/send-batch-emails]
    const emailBatchResponse = await resend.batch.send(emailBatch);

    if (emailBatchResponse.error) {
        return NextResponse.json(
          { error: 'Failed to send follow-up email', details: emailBatchResponse.error?.message },
          { status: 500 }
        );
      }

    return NextResponse.json(
      { message: "Follow-up emails sent", details: emailBatchResponse.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending follow-up emails:", error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
