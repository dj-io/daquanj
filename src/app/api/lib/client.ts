
import { Resend } from 'resend';
import { PostHog } from 'posthog-node';


// Resend client singleton
export const resend = new Resend(process.env.RESEND_API_KEY as string);

// Server-side PostHog client singleton
export const posthogClient = new PostHog(
  process.env.POSTHOG_SERVER_KEY as string, {
    host: process.env.POSTHOG_HOST as string,
    flushAt: 1,
    flushInterval: 0
});
