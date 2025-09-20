
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { PostHogProvider } from "@/components/posthog-provider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Grit - The AI Note Editor",
  description: "Grit is the AI note editor that helps you write and accomplish tasks faster and more efficiently.",
  authors: [{ name: "Stratum Labs", url: "https://stratumlabs.ai" }],
  keywords: ["Grit", "AI", "Note", "Editor", "AI Note taking", "AI Notes","AI Meeting Notes", "AI Writing Assistant", "AI Writing", "Text Generation", "Productivity", "Note-taking", "Note-taking app", "Write with AI"],
  applicationName: "Grit",
  generator: "Next.js",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Grit - The AI Note Editor",
    description: "Take notes, Create Docs, and Build your Knowledge Base in one simple, powerful workspace. With AI everywhere work happens, that knows your knowledge base.",
    url: siteUrl,
    siteName: "Grit",
    images: [
      {
        url: `${siteUrl}/images/ask-grit.png`,
        width: 1200,
        height: 630,
        alt: "Grit - The AI Note Editor",
      },
    ],
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Grit - The AI Note Editor",
    description: "Take notes, Create Docs, and Build your Knowledge Base in one simple, powerful workspace. With AI everywhere work happens, that knows your knowledge base.",
    images: [`${siteUrl}/images/ask-grit.png`],
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
      <body className="font-[family-name:var(--font-family-base)] antialiased">
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
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
