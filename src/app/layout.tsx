
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
  manifest: "/manifest.json",
  openGraph: {
    title: "Grit",
    description: "The AI Note Editor.",
    url: siteUrl,
    siteName: "Grit",
    images: [
      {
        url: "/images/grit-icon-macOS-Dark-1x.png",
        width: 800,
        height: 600,
        alt: "Grit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grit",
    description: "The AI Note Editor.",
    images: ["/images/grit-icon-macOS-Dark-1x.png"],
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
      <body
        className="font-[family-name:var(--font-family-base)]"
      >
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            // forcedTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
