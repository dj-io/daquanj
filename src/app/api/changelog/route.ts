
import { NextResponse } from 'next/server';
import React from 'react';
import { ChangelogEmail } from '@/components/email-templates/changelog-email';
import { supabase, resend } from '@/app/api/lib/client';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const apiKey = authHeader?.replace('Bearer ', '');

    if (!apiKey || apiKey !== process.env.EMAIL_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized. Valid API key required.' },
        { status: 401 }
      );
    }


    if (process.env.NODE_ENV === 'production' && !process.env.ENABLE_CHANGELOG_SEND) {
      return NextResponse.json(
        { error: 'Changelog sending disabled in production' },
        { status: 403 }
      );
    }
    // Retrieve waitlist entries with confirmed = true
    const { data, error } = await supabase
      .from('waitlist')
      .select('email')
      .eq('confirmed', true)
      .or(`campaign_sent_at.is.null,campaign_version.neq.${process.env.CAMPAIGN_VERSION}`)

    if (error) {
      throw new Error(error.message);
    }

    // If no waitlist entries are found, return an informative response
    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No confirmed waitlist entries to send changelog to." });
    }

    // Build a batch payload from the confirmed entries
    const emailBatch = data.map((entry) => ({
      from: `Stratum <${process.env.FROM_EMAIL!}>`,
      to: [entry.email],
      subject: "You're absolutely right!",
      // Here we create the React element for the email template and pass in the recipient's email
      react: React.createElement(ChangelogEmail, { email: entry.email }),
      tags: [
        { name: 'campaign', value: process.env.CAMPAIGN_VERSION! },
        { name: 'audience', value: 'waitlist' }
      ]
    }));

    // Use Resend's batch sending API to send all emails at once ~100 [https://resend.com/docs/api-reference/emails/send-batch-emails]
    const emailBatchResponse = await resend.batch.send(emailBatch);

    if (emailBatchResponse.error) {
        return NextResponse.json(
          { error: 'Failed to send changelog email', details: emailBatchResponse.error?.message },
          { status: 500 }
        );
      }

    // Mark recipients as having received this campaign version
    const recipientEmails = data.map(entry => entry.email);
    const { error: updateError } = await supabase
        .from('waitlist')
        .update({
            campaign_version: process.env.CAMPAIGN_VERSION,
            campaign_sent_at: new Date().toISOString()
        })
        .in('email', recipientEmails);

    if (updateError) {
        // log the error
        console.error('Error updating changelog tracking:', updateError);
    }

    return NextResponse.json({
        message: "Changelog emails sent successfully",
        details: emailBatchResponse.data,
        emailsSent: data.length,
        timestamp: new Date().toISOString(),
        recipients: recipientEmails
     },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending changelog emails:", error);
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
