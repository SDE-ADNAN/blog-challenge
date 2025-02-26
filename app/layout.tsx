import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Link from "next/link";

import Layout from "@/app/layout.client";

import { ThemeProvider } from "@/contexts/theme-context";

import "./globals.css";

import { DotPatternWithGlowEffect } from "@/components/magicui/dot-pattern-with-glow-effect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Sphere",
  description: "Next.js Blog Application",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SpeedInsights />
      <head>
        {/* This script prevents flash during theme loading */}
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
        <div className="fixed top-0 left-0 z-10 p-3 border-b-gray-700 border-b-[0.1px] w-full backdrop-blur-[7px]">
          <Link href={'/'}><h1 className="text-4xl font-bold">Blog Sphere</h1></Link>
        </div>
        <DotPatternWithGlowEffect className="fixed w-full h-full top-0 left-0 -z-50!" />
        <ThemeProvider>
          <Layout>
            <div className="space-y-8 pt-[4rem]">
              {children}
            </div>
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
