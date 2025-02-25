// app/layout.client.tsx
'use client';

import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <header className="fixed top-4 right-4 z-50">
                <div className={cn("flex items-center gap-2 p-2 rounded-full", theme === 'light' ? 'bg-white' : 'bg-black')}>
                    {isClient && (
                        <>
                            {theme === 'light' ? (
                                <Moon onClick={toggleTheme} className="h-4 w-4 text-gray-900 cursor-pointer" />
                            ) : (
                                <Sun onClick={toggleTheme} className="h-4 w-4 text-white cursor-pointer" />
                            )}
                        </>
                    )}
                </div>
            </header>
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <Toaster />
                {children}
            </main>
        </>
    );
}