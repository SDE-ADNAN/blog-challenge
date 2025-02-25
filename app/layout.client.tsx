'use client';

import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <header className="fixed top-4 right-4 z-50">
                <div className="flex items-center gap-2">
                    {theme === 'light' ? (
                        <Moon onClick={toggleTheme} className="h-4 w-4 text-gray-900 cursor-pointer" />
                    ) : (
                        <Sun onClick={toggleTheme} className="h-4 w-4 text-white cursor-pointer" />
                    )}
                    <Switch
                        checked={theme === 'dark'}
                        onCheckedChange={toggleTheme}
                        aria-label="Toggle theme"
                    />
                </div>
            </header>
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <Toaster />
                {children}
            </main>
        </>
    );
}