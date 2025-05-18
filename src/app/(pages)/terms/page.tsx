// app/terms-of-service/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

export const metadata: Metadata = {
  title: "Terms of Service - Stratum Labs",
  description: "Terms of Service for Stratum Labs governing access and use of our waitlist and services.",
  openGraph: {
    title: "Terms of Service - Stratum Labs",
    description: "Terms of Service for Stratum Labs governing access and use of our waitlist and services.",
    url: "https://stratumlabs.ai/terms",
    siteName: "Stratum Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - Stratum Labs",
    description: "Terms of Service for Stratum Labs governing access and use of our waitlist and services.",
  },
  alternates: {
    canonical: "https://stratumlabs.ai/terms"
  }
};

export default function TermsOfServicePage() {
  return (
    <main className="relative min-h-screen w-full">
        <div className="relative z-10 flex flex-col items-start max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-8 text-[#9CA3AF] dark:text-[#9CA3AF]/80">Effective Date: May 16, 2025</p>
      <BlurFade delay={0.2}>
          <div className={cn(
            'w-full space-y-16',
            'text-foreground/90 dark:text-zinc-300',
          )}>
      <section className="mb-8">
        <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>1. Introduction</h2>

        <p className="text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
          Welcome to <strong>Stratum Labs</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
          Stratum Labs is a U.S.-based company and the legal entity responsible for operating <strong>Grit</strong>, an AI-powered note-taking application.
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website and waitlist services (collectively, the &quot;Service&quot;).
          By joining our waitlist or using our Service, you agree to be bound by these Terms.
        </p>
      </section>

      <div className="my-8 border-t border-border/40 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      </div>

      <section className="mb-8">
        <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>2. Acceptance of Terms</h2>
        <p className="text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
          By submitting your email to join our waitlist or using our Service, you acknowledge that you have read,
          understood, and agree to be legally bound by these Terms. If you do not agree, please do not use our Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>3. Modifications to Terms</h2>
        <p className="text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
          We may update these Terms at any time. When changes occur, we will update the &quot;Effective Date&quot; and notify users through appropriate channels. Continued use of the Service after changes constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>4. Description of Services</h2>
        <p className="mb-2 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
          Grit offers an AI-powered note-taking platform designed to enhance productivity and knowledge management for individuals and teams. Our Service includes:
        </p>
        <ul className="space-y-2 ml-6 mb-2 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Collection of email addresses via our marketing website to manage the waitlist.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Registration and account management, where we collect personal details such as name, email, payment information, and additional information provided during sign-up.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Usage analytics through PostHog to capture non-personal usage data (including IP addresses, page views, feature interactions, session duration, and browser information) to improve user experience and application performance.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>AI-powered note-taking capabilities including real-time text analysis, intelligent organization, automated categorization, and contextual suggestions to help users capture, organize, and leverage their knowledge more effectively.</span>
          </li>
        </ul>
        <p className="mt-4 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">Full product features and services will be made available after the waitlist phase, with regular updates and enhancements based on user feedback.</p>
      </section>

      <section className="mb-8">
        <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>5. Data Collection and Privacy</h2>
        <div className="space-y-8">
          <div>
            <p className={cn(
                    'text-xl font-semibold mb-4',
                    'text-foreground dark:text-white',
                  )}><strong>5.1 Data Collection</strong></p>
            <ul className="space-y-2 ml-6 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>We collect your email address when you join the waitlist.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Additional personal information may be collected once you become a full user.</span>
              </li>
            </ul>
          </div>

          <div>
            <p className={cn(
                    'text-xl font-semibold mb-4',
                    'text-foreground dark:text-white',
                  )}><strong>5.2 Data Use</strong></p>
            <ul className="space-y-2 ml-6 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Your email is used solely to communicate updates about Stratum Labs.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>We do not sell or share your email with third parties for marketing purposes.</span>
              </li>
            </ul>
          </div>

          <div>
            <p className={cn(
                    'text-xl font-semibold mb-4',
                    'text-foreground dark:text-white',
                  )}><strong>5.3 Data Security and Retention</strong></p>
            <ul className="space-y-2 ml-6 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Your data is securely stored using Supabase, which provides enterprise-grade security and encryption.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>We implement strict access controls and security measures to protect your information.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Data retention periods are based on service requirements, with a minimum 30-day retention for basic analytics data.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Your email and account information will be retained until you request deletion or unsubscribe from our services.</span>
              </li>
            </ul>
          </div>

          <div>
            <p className={cn(
                    'text-xl font-semibold mb-4',
                    'text-foreground dark:text-white',
                  )}><strong>5.4 Geographic Scope</strong></p>
            <p className="ml-6 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">Our Service is intended for users in the United States. We do not currently operate in or target users in the European Union.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>6. User Responsibilities and Prohibited Uses</h2>
        <p className="mb-2 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">You agree to use the Service lawfully and not to:</p>
        <ul className="space-y-2 ml-6 mb-2 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Submit false or misleading information.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use the Service to violate any laws or regulations.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Interfere with the operation or security of the Service.</span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>7. Intellectual Property and Content Rights</h2>
          <div className="space-y-4">
            <div>
              <p className={cn(
                    'text-xl font-semibold mb-4',
                    'text-foreground dark:text-white',
                  )}><strong>7.1 Service Intellectual Property</strong></p>
              <p className="text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
                The Grit platform, including its software, interface, algorithms, AI models, trademarks, and all related intellectual property (&quot;Service IP&quot;) are owned by Stratum Labs or our licensors. You are granted a limited, non-exclusive, non-transferable license to use the Service solely for its intended purpose.
              </p>
            </div>

            <div>
              <p className={cn(
                    'text-xl font-semibold mb-4',
                    'text-foreground dark:text-white',
                  )}><strong>7.2 User Content Ownership</strong></p>
              <p className="text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
                You retain full and exclusive ownership of all notes, documents, and other content you create, write, or upload to the Service (&quot;User Content&quot;). This includes:
              </p>
              <ul className="space-y-2 ml-6 mt-2 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>All text, images, and files you create or upload</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Your personal knowledge graphs and organizational structures</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Content generated through our AI features based on your input</span>
                </li>
              </ul>
            </div>

            <div>
              <p className={cn(
                    'text-xl font-semibold mb-4',
                    'text-foreground dark:text-white',
                  )}><strong>7.3 AI-Generated Content</strong></p>
              <p className="text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
                When you use our AI features:
              </p>
              <ul className="space-y-2 ml-6 mt-2 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You own all content generated through AI features based on your input</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>The underlying AI technology and models remain the property of their respective owners (including OpenAI, Google, and other providers)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You are responsible for reviewing and validating AI-generated content before use</span>
                </li>
              </ul>
            </div>

            <div>
              <p className={cn(
                    'text-xl font-semibold mb-4',
                    'text-foreground dark:text-white',
                  )}><strong>7.4 Content Storage and Processing</strong></p>
              <p className="text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
                To provide the Service, you grant us a limited license to:
              </p>
              <ul className="space-y-2 ml-6 mt-2 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Process, but not store, your content on our secure servers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Analyze your content to provide AI-powered features, unless you opt out of this feature</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Create and maintain backups for service reliability, unless you opt out of this feature</span>
                </li>
              </ul>
              <p className="mt-2 text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">
                This license is solely for providing and improving your experience with Grit and does not transfer ownership of your content.
              </p>
            </div>
          </div>
      </section>

      <section className="mb-8">
        <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>8. Limitation of Liability</h2>
        <p className="text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">The Service is provided &quot;as is&quot; without warranties. Stratum Labs is not liable for any damages arising from your use of the Service, including indirect or consequential damages.</p>
      </section>

      <section className="mb-8">
        <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>9. Termination</h2>
        <p className="text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">We reserve the right to suspend or terminate your access to our Service, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.</p>
      </section>

      <section className="mb-8">
        <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>10. Governing Law</h2>
        <p className="text-lg leading-relaxed text-foreground/80 dark:text-zinc-400">These Terms are governed by the laws of the United States. Any disputes will be resolved in courts located in the United States.</p>
      </section>

      <section>
        <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>11. Contact Information</h2>
        <p>For questions or concerns about these Terms, please contact us at:</p>
        <p className="mt-2 font-mono text-[#9CA3AF]">hq@stratumlabs.ai</p>
      </section>

      {/* Separator with glow effect */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative mt-16">
        <div
          className="w-full h-[2px] relative bg-gradient-to-r from-transparent via-border to-transparent"
          style={{
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%)'
          }}
        >
          {/* Glow effect */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-[100px] -bottom-[100px] w-[400px]"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 25%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.01) 75%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 1) 55%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 1) 55%, transparent)'
            }}
          />
        </div>
      </div>

            <section className={cn(
                'mt-24 pt-8',
                )}>
                <p className={cn(
                    'text-center text-sm',
                    'text-[#9CA3AF] dark:text-[#9CA3AF]/60',
                    'transition-colors duration-300'
                )}>
                    &copy; {new Date().getFullYear()} Stratum Labs Inc. All rights reserved.
                </p>

                <div className="flex justify-center mt-4">
                    <Link
                    href="/"
                    className={cn(
                        'text-sm flex items-center',
                        'text-[#9CA3AF] dark:text-[#9CA3AF]',
                        'hover:text-foreground dark:hover:text-white',
                        'transition-colors duration-300'
                    )}
                    >
                    <span className="mr-1">←</span> Back to Home
                    </Link>
                </div>
            </section>
        </div>
        </BlurFade>
      </div>
    </main>
  );
}
