
import { BlurFade } from '@/components/magicui/blur-fade'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Privacy Policy - Stratum Labs Inc',
    description: 'Privacy Policy for Stratum Labs Inc explaining how we collect, use, and protect your data through our product Grit.',
    openGraph: {
      title: 'Privacy Policy - Stratum Labs Inc',
      description: 'Learn how Stratum Labs Inc collects and protects your data.',
      url: 'https://gritai.app/privacy',
      siteName: 'Grit',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Privacy Policy - Stratum Labs Inc',
      description: 'Learn how Stratum Labs Inc collects and protects your data.',
    },
    alternates: {
      canonical: 'https://gritai.app/privacy',
    },
    robots: {
      index: true,
      follow: true,
    },
  }

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen w-full">
      <div className="relative z-10 flex flex-col items-start max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <BlurFade delay={0.1}>
          <h1 className={cn(
            'text-4xl font-bold mb-4',
            'bg-clip-text text-transparent',
            'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
            'dark:from-white dark:via-white/100 dark:to-white/100',
            'transition-colors duration-300'
          )}>
            Privacy Policy
          </h1>
          <p className={cn(
            'text-base mb-12',
            'text-[#9CA3AF] dark:text-[#9CA3AF]/80',
            'transition-colors duration-300'
          )}>
            Effective Date: May 16, 2025
          </p>
        </BlurFade>


        <BlurFade delay={0.2}>
          <div className={cn(
            'w-full space-y-16',
            'text-foreground/90 dark:text-zinc-300',
          )}>
            <p className={cn(
              'text-lg leading-relaxed',
              'text-foreground/80 dark:text-zinc-400',
            )}>
              <strong>Stratum Labs Inc</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a U.S.-based company and the legal entity responsible for operating <strong>Grit</strong>, an AI-powered note-taking application. This Privacy Policy explains how we collect, use, and safeguard your information. By using our services, you agree to the collection and processing of your information in accordance with this policy.
            </p>

            <section>
              <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>
                1. Introduction
              </h2>
              <p className={cn(
                'text-lg leading-relaxed',
                'text-foreground/80 dark:text-zinc-400',
              )}>
                Stratum Labs Inc is committed to protecting your privacy and ensuring the security of your data. This Privacy Policy explains the types of information we collect, the purposes for which we collect and process that information, and your rights regarding your personal data.
              </p>
            </section>

            <section>
              <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>
                2. Information We Collect
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className={cn(
                    'text-xl font-semibold mb-4',
                    'text-foreground dark:text-white',
                  )}>
                    2.1. From Our Marketing Website
                  </h3>
                  <ul className={cn(
                    'space-y-2 ml-6',
                    'text-foreground/80 dark:text-zinc-400',
                  )}>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Data Collected:</strong> Email addresses and any information you voluntarily provide.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Purpose:</strong> To send marketing communications and provide updates about our services.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className={cn(
                    'text-xl font-semibold mb-4',
                    'text-foreground dark:text-white',
                  )}>
                    2.2. From Our Application (When Signing Up)
                  </h3>
                  <ul className={cn(
                    'space-y-2 ml-6',
                    'text-foreground/80 dark:text-zinc-400',
                  )}>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Data Collected:</strong></span>
                    </li>
                    <li className="flex items-start ml-4">
                      <span className="mr-2">•</span>
                      <span>Personal data such as name, email address, and payment information.</span>
                    </li>
                    <li className="flex items-start ml-4">
                      <span className="mr-2">•</span>
                      <span className="mb-4">Additional data entered or generated within the Grit platform.</span>
                    </li>
                  </ul>
                  <span><strong>Purpose:</strong> To create and manage user accounts, process payments, and deliver our SaaS services.</span>
                </div>

                <div>
                  <h3 className={cn(
                    'text-xl font-semibold mb-4',
                    'text-foreground dark:text-white',
                  )}>
                    2.3. Analytics and Usage Data
                  </h3>
                  <ul className={cn(
                    'space-y-2 ml-6',
                    'text-foreground/80 dark:text-zinc-400',
                    'mb-4'
                  )}>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Data Collected:</strong></span>
                    </li>
                    <li className="flex items-start ml-4">
                      <span className="mr-2">•</span>
                      <span>Technical data including IP address, browser type, and device information.</span>
                    </li>
                    <li className="flex items-start ml-4">
                      <span className="mr-2">•</span>
                      <span>Usage data such as page views, feature interactions, and session duration.</span>
                    </li>
                    <li className="flex items-start ml-4">
                      <span className="mr-2">•</span>
                      <span>Non-personal information entered into form fields.</span>
                    </li>
                  </ul>
                  <div className="ml-6 space-y-2">
                    <span><strong>Method:</strong> Data is collected using PostHog, a product analytics platform.</span>
                    <br />
                    <span><strong>Purpose:</strong> To analyze user interactions, improve user experience, and identify potential issues.</span>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>
                3. How We Use Your Information
              </h2>
              <ul className={cn(
                'space-y-2',
                'text-foreground/80 dark:text-zinc-400',
              )}>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Service Provision & Improvement:</strong></span>
                </li>
                <li className="flex items-start ml-4">
                  <span className="mr-2">•</span>
                  <span>Deliver, maintain, and enhance the Grit platform.</span>
                </li>
                <li className="flex items-start ml-4">
                  <span className="mr-2">•</span>
                  <span>Analyze user behavior to improve our services.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Waitlist Management:</strong> Store and manage email addresses for product updates and launch notifications.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Security & Compliance:</strong> Ensure data integrity and protect against unauthorized access.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>
                4. Data Sharing and Disclosure
              </h2>
              <p className={cn(
                'text-lg leading-relaxed',
                'text-foreground/80 dark:text-zinc-400',
              )}>
                Stratum Labs Inc does not share or sell your personal information with third parties. Data is only processed internally or with trusted service providers strictly for the purposes outlined above. All third-party processors (e.g., for payment processing or analytics) are contractually bound to protect your data and use it solely to support our services.
              </p>
            </section>

            <section>
              <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>
                5. Data Retention
              </h2>
              <ul className={cn(
                'space-y-2',
                'text-foreground/80 dark:text-zinc-400',
              )}>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Retention Policy:</strong> Data retention is based on the tier of service chosen by our customer. At the lowest tier, data is retained for a minimum of 30 days. Customers may opt to retain data for longer periods as needed.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Purpose:</strong> To fulfill the service requirements, comply with legal obligations, and improve our offerings.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Deletion:</strong> For Stratum Labs Inc account holders, you may request deletion of your data at any time. End-users of our customers should request data deletion directly through their company. If contacted directly, we will do our best to comply.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>
                6. Data Deletion & User Rights
              </h2>
              <ul className={cn(
                'space-y-2',
                'text-foreground/80 dark:text-zinc-400',
              )}>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Email Data:</strong> You can request deletion of your email address from our waitlist at any time by contacting us.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Analytics Data:</strong> Anonymous usage data collected through PostHog is automatically deleted after 30 days.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Data Access:</strong> You can request information about what data we hold about you by contacting us at the email provided below.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Third-Party Data:</strong> We use Supabase for data storage and PostHog for analytics. Both services comply with standard data protection practices.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>
                7. Security Measures
              </h2>
              <ul className={cn(
                'space-y-2',
                'text-foreground/80 dark:text-zinc-400',
              )}>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Encryption:</strong> Your email addresses are securely stored using Supabase, which provides enterprise-grade security and encryption.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Access Controls:</strong> We enforce strict access controls to ensure that only authorized personnel have access to sensitive information.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Regular Assessments:</strong> We continuously monitor and update our security measures to protect your data from unauthorized access or breaches.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>
                8. Compliance & Jurisdiction
              </h2>
              <ul className={cn(
                'space-y-2',
                'text-foreground/80 dark:text-zinc-400',
              )}>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>U.S. Operations Only:</strong> Stratum Labs Inc operates solely within the United States. We do not currently offer our services in the European Union and are not GDPR or AI Act compliant.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span><strong>Legal Compliance:</strong> We adhere to applicable U.S. data protection laws and regularly review our practices to ensure continued compliance.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>
                9. Changes to This Privacy Policy
              </h2>
              <p className={cn(
                'text-lg leading-relaxed',
                'text-foreground/80 dark:text-zinc-400',
              )}>
               The Service and our business may change from time to time. As a result we may change this privacy policy at any time. When we do we will post an updated version on this page, unless another type of notice is required by the applicable law. By continuing to use our Service or providing us with Personal Data after we have posted an updated privacy policy, or notified you by other means if applicable, you acknowledge to have read the revised privacy policy and practices described in it.
              </p>
            </section>

            <section>
              <h2 className={cn(
                'text-2xl font-bold mb-6',
                'bg-clip-text text-transparent',
                'bg-gradient-to-b from-foreground via-foreground/80 to-foreground/60',
                'dark:from-white dark:via-white/100 dark:to-white/100',
              )}>
                10. Contact Information
              </h2>
              <p className={cn(
                'text-lg leading-relaxed',
                'text-foreground/80 dark:text-zinc-400',
                'mb-4'
              )}>
                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:
              </p>
              <p className="mt-2 font-mono text-[#9CA3AF]">hq@Stratumlabs.ai</p>
            </section>

            {/* Separator with glow effect */}
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative">
                <div
                className="w-full h-[2px] relative bg-gradient-to-r from-transparent via-border to-transparent"
                style={{
                    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%)'
                }}
                >
                {/* Glow effect */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 -top-[100px] -bottom-[100px] w-[600px]"
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
  )
}
