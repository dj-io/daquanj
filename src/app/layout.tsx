
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grit - The AI Note Editor",
  description: "Grit is designed to make you extraordinarily productive, Grit is the best way to write and take notes with AI",
  authors: [{ name: "Stratum Labs", url: "https://stratumlabs.ai" }],
  keywords: ["Grit", "AI", "Note", "Editor", "AI Note taking", "AI Notes", "AI Writing Assistant", "AI Writing", "Text Generation", "Productivity", "Note-taking", "Note-taking app"],
  applicationName: "Grit",
  generator: "Next.js", // what does generator do?
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Grit",
    description: "The AI Note Editor.",
    url: "https://gritai.app",
    siteName: "Grit",
    images: [
      {
        url: "/images/str-logo.jpg",
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
    images: ["/images/str-logo.jpg"],
  },
  alternates: {
    canonical: "https://gritai.app",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
