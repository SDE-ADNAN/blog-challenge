import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Link from "next/link";

import Layout from "@/app/layout.client";
import { ThemeProvider } from "@/contexts/theme-context";

import "./globals.css";

import { DotPatternWithGlowEffect } from "@/components/magicui/dot-pattern-with-glow-effect";

// Load and define fonts with CSS variable names
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Sphere", // Metadata for the page title
  description: "Next.js Blog Application", // Description for SEO
};

const inter = Inter({ subsets: ["latin"], preload: true });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevents page flash when switching themes */}
        <script dangerouslySetInnerHTML={{
          __html: `
          (function() {
            try {
              const storedTheme = localStorage.getItem('theme');
              if (storedTheme === 'dark' || 
                  (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {
              console.error('Theme initialization failed:', e);
            }
          })();
        `}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        {/* Header with blog title and navigation link */}
        <div className="fixed top-0 left-0 z-10 p-3 border-b-gray-700 border-b-[0.1px] w-full backdrop-blur-[7px]">
          <Link href={'/'}><h1 className="text-4xl font-bold">Blog Sphere</h1></Link>
        </div>

        {/* Background pattern effect */}
        <DotPatternWithGlowEffect className="fixed w-full h-full top-0 left-0 -z-50!" />

        {/* Theme provider to manage light/dark themes */}
        <ThemeProvider>
          {/* Main layout wrapper */}
          <Layout>
            <div className="space-y-8 pt-[4rem]">
              {children} {/* Render page content dynamically */}
            </div>
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
