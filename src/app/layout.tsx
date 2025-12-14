
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { PostHogProvider } from "@/components/posthog-provider";
import { Crimson_Text } from "next/font/google";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(0.9472 0.0093 106.58)" },
    { media: "(prefers-color-scheme: dark)",  color: "oklch(0.1595 0.0021 286.16)" },
  ],
  title: "a'Quan Johnson",
  description: "Life Long Learner",
  authors: [{ name: "Stratum Labs", url: "https://stratumlabs.ai" }],
  keywords: ["DaquanJ", "Life Long Learner", "AI", "Research", "Write", "Learn", "Keep Thinking", "Anthropic", "OpenAI", "Google", "xAI", "Gemini", "Prompt to Conclusion", "Write with AI", "Learn with AI", "Research with AI", "AI Workspace", "AI Co-worker", "AI Research", "AI Writing", "AI Learning", "NotebookLM"],
  applicationName: "DaquanJ",
  generator: "Next.js",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "DaquanJ",
    description: "Life Long Learner",
    url: siteUrl,
    siteName: "DaquanJ",
    images: [
      {
        url: `${siteUrl}/images/gleam_crypto_punk.jpg`,
        width: 1200,
        height: 630,
        alt: "DaquanJ",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "DaquanJ",
    description: "Life Long Learner",
    images: [`${siteUrl}/images/gleam_crypto_punk.jpg`],
    creator: "@djxlabs",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-crimson',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={crimsonText.variable}>
      <body className="font-[family-name:var(--font-family-base)] antialiased bg-background">
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <div className=" flex flex-col bg-background">
              <Header />
              <main className="flex-1 flex items-center justify-center overflow-hidden md:overflow-auto bg-background">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
