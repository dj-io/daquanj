
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { PostHogProvider } from "@/components/posthog-provider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Grit: The best way to research with AI",
  description: "Write, learn, research anything faster.",
  authors: [{ name: "Stratum Labs", url: "https://stratumlabs.ai" }],
  keywords: ["Grit", "AI", "Research", "Write", "Learn", "Keep Thinking", "Anthropic", "OpenAI", "Google", "xAI", "Gemini", "Prompt to Conclusion", "Write with AI", "Learn with AI", "Research with AI", "AI Workspace", "AI Co-worker", "AI Research", "AI Writing", "AI Learning", "NotebookLM"],
  applicationName: "Grit",
  generator: "Next.js",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Grit: The best way to research with AI",
    description: "Write, learn, research anything faster.",
    url: siteUrl,
    siteName: "Grit",
    images: [
      {
        url: `${siteUrl}/images/wlr-anything.png`,
        width: 1200,
        height: 630,
        alt: "Grit: The best way to research with AI",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Grit: The best way to research with AI",
    description: "Write, learn, research anything faster.",
    images: [`${siteUrl}/images/wlr-anything.png`],
    creator: "@gritxai",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-[family-name:var(--font-family-base)] antialiased bg-background">
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col bg-background">
              <Header />
              <main className="flex-1 flex items-center justify-center overflow-hidden md:overflow-auto">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
