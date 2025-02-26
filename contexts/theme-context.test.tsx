import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { ThemeProvider, useNextTheme } from '@/contexts/theme-context';

// Mock the next-themes module to control theme behavior in tests
jest.mock('next-themes', () => ({
    ThemeProvider: ({ children }: { children: ReactNode }) => children, // Mock ThemeProvider to directly render children
    useTheme: () => {
        // Simulate a controlled state for theme handling
        const [theme, setTheme] = React.useState<string>('light');
        return {
            theme,
            setTheme: (newTheme: string) => setTheme(newTheme), // Allow manual theme switching in test
            resolvedTheme: theme, // Simulate resolved theme state
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
        // Verify that the child element is rendered inside ThemeProvider
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

        // Initial theme should be 'light' based on mock
        expect(themeSpan.textContent).toBe('light');

        // Simulate toggle to 'dark'
        fireEvent.click(toggleButton);
        expect(themeSpan.textContent).toBe('dark');

        // Simulate toggle back to 'light'
        fireEvent.click(toggleButton);
        expect(themeSpan.textContent).toBe('light');
    });

    it('should respect system theme', () => {
        // Temporarily override the mocked useTheme to return system theme
        const originalModule = jest.requireMock('next-themes');
        const mockUseTheme = jest.fn().mockReturnValue({
            theme: 'system', // Simulated system theme mode
            setTheme: jest.fn(),
            resolvedTheme: 'light', // Assuming system resolves to light mode
        });

        jest.spyOn(originalModule, 'useTheme').mockImplementation(mockUseTheme);

        function TestComponent() {
            const { theme } = useNextTheme();
            return <span data-testid="theme">{theme}</span>;
        }

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const themeSpan = screen.getByTestId('theme');
        // Verify that the theme is 'system'
        expect(themeSpan.textContent).toBe('system');

        // Restore original mock behavior after test
        jest.restoreAllMocks();
    });
});