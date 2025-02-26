import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { ThemeProvider, useNextTheme } from '@/contexts/theme-context';

// Mock the next-themes module
jest.mock('next-themes', () => ({
    ThemeProvider: ({ children }: { children: ReactNode }) => children,
    useTheme: () => {
        // Return a controlled version for testing
        const [theme, setTheme] = React.useState<string>('light');
        return {
            theme,
            setTheme: (newTheme: string) => setTheme(newTheme),
            resolvedTheme: theme,
        };
    },
}));

describe('ThemeProvider and useNextTheme', () => {
    it('should render children within the ThemeProvider', () => {
        render(
            <ThemeProvider>
                <div data-testid="test-child">Test Content</div>
            </ThemeProvider>
        );
        expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });

    it('should provide the correct theme and toggleTheme functionality', () => {
        function TestComponent() {
            const { theme, toggleTheme } = useNextTheme();
            return (
                <div>
                    <span data-testid="theme">{theme}</span>
                    <button data-testid="toggle-button" onClick={toggleTheme}>
                        Toggle Theme
                    </button>
                </div>
            );
        }

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const themeSpan = screen.getByTestId('theme');
        const toggleButton = screen.getByTestId('toggle-button');

        // Initial theme should be light (from our mock)
        expect(themeSpan.textContent).toBe('light');

        // Toggle to dark
        fireEvent.click(toggleButton);
        expect(themeSpan.textContent).toBe('dark');

        // Toggle back to light
        fireEvent.click(toggleButton);
        expect(themeSpan.textContent).toBe('light');
    });

    it('should respect system theme', () => {
        // For this test, we need to temporarily modify our mock
        const originalModule = jest.requireMock('next-themes');
        const mockUseTheme = jest.fn().mockReturnValue({
            theme: 'system',
            setTheme: jest.fn(),
            resolvedTheme: 'light', // Simulating that system theme is light
        });

        jest.spyOn(originalModule, 'useTheme').mockImplementation(mockUseTheme);

        function TestComponent() {
            const { theme } = useNextTheme();
            return (
                <span data-testid="theme">{theme}</span>
            );
        }

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const themeSpan = screen.getByTestId('theme');
        expect(themeSpan.textContent).toBe('system');

        // Restore original mock
        jest.restoreAllMocks();
    });
});