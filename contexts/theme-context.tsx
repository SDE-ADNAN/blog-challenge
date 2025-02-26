'use client';

import { ReactNode } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useTheme } from 'next-themes';

// Create this wrapper to maintain your API compatibility
export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemeProvider>
    );
}

// Create a hook that matches your current API to minimize component changes
export function useNextTheme() {
    const { theme, setTheme } = useTheme();

    return {
        theme: theme as 'light' | 'dark',
        toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light')
    };
}