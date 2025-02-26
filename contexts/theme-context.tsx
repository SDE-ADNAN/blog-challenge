'use client'; // Ensures this module runs only on the client side in Next.js

import { ReactNode } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useTheme } from 'next-themes';

/**
 * ThemeProvider component that wraps the application with `next-themes` provider.
 * - `attribute="class"`: Ensures the theme is applied via class names.
 * - `defaultTheme="system"`: Uses the system theme by default.
 * - `enableSystem`: Allows automatic switching based on system settings.
 * - `disableTransitionOnChange`: Prevents flickering when changing themes.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <NextThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemeProvider>
    );
}

/**
 * Custom hook `useNextTheme` to provide a consistent API for theme management.
 * - `theme`: Returns the current theme ('light' or 'dark').
 * - `toggleTheme`: Toggles between 'light' and 'dark' themes.
 */
export function useNextTheme() {
    const { theme, setTheme } = useTheme();

    return {
        theme: theme as 'light' | 'dark', // Ensures strict typing for theme values
        toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light') // Toggles theme between light and dark
    };
}