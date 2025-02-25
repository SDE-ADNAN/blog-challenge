'use client';

import { Toaster } from "@/components/ui/sonner";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Use a default background that matches your color scheme
    // This is just for the toggle button background
    const themeClass = mounted
        ? (theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')
        : 'bg-transparent';

    return (
        <>
            <header className="fixed top-[1rem] right-4 z-50">
                <div className={cn("flex items-center gap-2 p-2 rounded-full transition-colors", themeClass)}>
                    {mounted && (
                        <>
                            {theme === 'dark' ? (
                                <Sun
                                    onClick={() => setTheme('light')}
                                    className="h-4 w-4 cursor-pointer"
                                />
                            ) : (
                                <Moon
                                    onClick={() => setTheme('dark')}
                                    className="h-4 w-4 cursor-pointer"
                                />
                            )}
                        </>
                    )}
                </div>
            </header>
            <main className="container mx-auto p-4 max-w-4xl">
                <Toaster />
                {children}
            </main>
        </>
    );
}
