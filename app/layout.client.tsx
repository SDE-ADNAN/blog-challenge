'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from 'react';

import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
    // State to track if the component has mounted to avoid hydration issues
    const [mounted, setMounted] = useState(false);

    // Extract theme and theme setter from next-themes
    const { theme, setTheme } = useTheme();

    // Ensures that the component is mounted before rendering to avoid mismatches
    useEffect(() => {
        setMounted(true);
    }, []);

    // Dynamically set the theme class based on the current theme
    // If the component is not mounted yet, it prevents styling inconsistencies
    const themeClass = mounted
        ? (theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')
        : 'bg-transparent';

    return (
        <>
            {/* Header containing the theme toggle button, positioned at the top-right corner */}
            <header className="fixed top-[1rem] right-4 z-50">
                <div className={cn("flex items-center gap-2 p-2 rounded-full transition-colors", themeClass)}>
                    {mounted && (
                        <>
                            {/* Render sun icon if dark theme is active, clicking toggles to light mode */}
                            {theme === 'dark' ? (
                                <Sun
                                    onClick={() => setTheme('light')}
                                    className="h-4 w-4 cursor-pointer"
                                />
                            ) : (
                                /* Render moon icon if light theme is active, clicking toggles to dark mode */
                                <Moon
                                    onClick={() => setTheme('dark')}
                                    className="h-4 w-4 cursor-pointer"
                                />
                            )}
                        </>
                    )}
                </div>
            </header>

            {/* Main content container with a max width to keep layout centered */}
            <main className="container mx-auto p-4 max-w-4xl">
                {/* Notification system for user feedback */}
                <Toaster />
                {children}
            </main>
        </>
    );
}
