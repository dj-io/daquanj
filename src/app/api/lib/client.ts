import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { PostHog } from 'posthog-node';

// Supabase client singleton
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ANON_KEY as string
);

// Resend client singleton
export const resend = new Resend(process.env.RESEND_API_KEY as string);

// Server-side PostHog client singleton
export const posthog = new PostHog(
  process.env.POSTHOG_SERVER_KEY as string,
  { host: process.env.POSTHOG_HOST as string }
);
