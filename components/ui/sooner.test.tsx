import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { Toaster as SonnerToaster } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

// Define the expected theme types
type Theme = 'light' | 'dark' | 'system' | undefined;

// Define the structure for toast option class names
interface ToastOptionClassNames {
    toast: string;
    description: string;
    actionButton: string;
    cancelButton: string;
}

// Define the structure for toast options
interface ToastOptions {
    classNames: ToastOptionClassNames;
}

// Mock the `next-themes` module to control theme resolution
jest.mock('next-themes', () => ({
    useTheme: jest.fn(),
}));

// Define a type for the mocked Sonner props
interface MockSonnerProps {
    theme?: Theme;
    className?: string;
    toastOptions?: ToastOptions;
    position?: string;
    expand?: boolean | string;
    closeButton?: boolean | string;
    [key: string]: unknown;
}

// Mock the `sonner` module to avoid actual rendering
jest.mock('sonner', () => ({
    Toaster: jest.fn(({ theme, className, toastOptions, ...props }: MockSonnerProps) => {
        // Convert boolean props to strings for valid DOM attributes
        const domProps: Record<string, string> = {};
        Object.entries(props).forEach(([key, value]) => {
            if (typeof value === 'boolean') {
                domProps[key] = value.toString();
            } else if (value !== undefined && value !== null) {
                domProps[key] = String(value);
            }
        });

        return (
            <div
                data-testid="mock-sonner"
                data-theme={theme}
                data-classname={className}
                data-toast-options={toastOptions ? JSON.stringify(toastOptions) : undefined}
                {...domProps}
            >
                Sonner Toaster Mock
            </div>
        );
    }),
}));

describe('Toaster Component', () => {
    beforeEach(() => {
        // Reset all mocks before each test to ensure isolated test cases
        jest.clearAllMocks();
    });

    it('should render the Sonner component with undefined theme initially', () => {
        // Mock `useTheme` to return a default theme
        (useTheme as jest.Mock).mockReturnValue({
            resolvedTheme: 'light' as Theme,
        });

        // Mock `useState` to return `false` initially to simulate unmounted state
        const originalUseState = React.useState;
        const mockUseState = jest.fn()
            .mockImplementationOnce(() => [false, jest.fn() as React.Dispatch<React.SetStateAction<boolean>>]);

        React.useState = mockUseState;

        render(<Toaster />);

        // Verify that the component initially renders with an undefined theme
        expect(screen.getByTestId('mock-sonner')).toBeInTheDocument();
        expect(screen.getByTestId('mock-sonner').getAttribute('data-theme')).toBeNull();

        // Restore the original `useState`
        React.useState = originalUseState;
    });

    it('should update theme after mounting', async () => {
        // Mock `useTheme` to return the dark theme
        (useTheme as jest.Mock).mockReturnValue({
            resolvedTheme: 'dark' as Theme,
        });

        render(<Toaster />);

        // Wait for the component to mount and apply the resolved theme
        await waitFor(() => {
            expect(screen.getByTestId('mock-sonner').getAttribute('data-theme')).toBe('dark');
        });
    });

    it('should pass custom props to Sonner component', async () => {
        // Mock `useTheme` to return a light theme
        (useTheme as jest.Mock).mockReturnValue({
            resolvedTheme: 'light' as Theme,
        });

        // Define custom props for the toaster
        const customProps: Partial<React.ComponentProps<typeof SonnerToaster>> = {
            position: 'top-right',
            expand: true,
            closeButton: true,
        };

        render(<Toaster {...customProps} />);

        await waitFor(() => {
            const sonnerElement = screen.getByTestId('mock-sonner');
            expect(sonnerElement.getAttribute('data-theme')).toBe('light');
            expect(sonnerElement.getAttribute('position')).toBe('top-right');
            expect(sonnerElement.getAttribute('expand')).toBe('true');
            expect(sonnerElement.getAttribute('closeButton')).toBe('true');
        });
    });

    it('should apply correct CSS classes', async () => {
        // Mock `useTheme` to return the system theme
        (useTheme as jest.Mock).mockReturnValue({
            resolvedTheme: 'system' as Theme,
        });

        render(<Toaster />);

        await waitFor(() => {
            const sonnerElement = screen.getByTestId('mock-sonner');
            expect(sonnerElement.getAttribute('data-classname')).toBe('toaster group');

            // Verify toast options class names
            const toastOptionsAttr = sonnerElement.getAttribute('data-toast-options');
            expect(toastOptionsAttr).not.toBeNull();

            if (toastOptionsAttr) {
                const toastOptions = JSON.parse(toastOptionsAttr) as ToastOptions;
                expect(toastOptions.classNames.toast).toContain('group toast group-[.toaster]:bg-background');
                expect(toastOptions.classNames.description).toContain('group-[.toast]:text-muted-foreground');
                expect(toastOptions.classNames.actionButton).toContain('group-[.toast]:bg-primary');
                expect(toastOptions.classNames.cancelButton).toContain('group-[.toast]:bg-muted');
            }
        });
    });

    it('should handle undefined resolvedTheme', async () => {
        // Mock `useTheme` to return an undefined theme
        (useTheme as jest.Mock).mockReturnValue({
            resolvedTheme: undefined,
        });

        render(<Toaster />);

        await waitFor(() => {
            const sonnerElement = screen.getByTestId('mock-sonner');
            expect(sonnerElement.getAttribute('data-theme')).toBeNull();
        });
    });

    it('should handle resolvedTheme changes dynamically', async () => {
        // Start with light theme
        const mockUseTheme = useTheme as jest.Mock;
        mockUseTheme.mockReturnValue({
            resolvedTheme: 'light' as Theme,
        });

        const { rerender } = render(<Toaster />);

        await waitFor(() => {
            expect(screen.getByTestId('mock-sonner').getAttribute('data-theme')).toBe('light');
        });

        // Change theme to dark and rerender the component
        mockUseTheme.mockReturnValue({
            resolvedTheme: 'dark' as Theme,
        });

        rerender(<Toaster />);

        await waitFor(() => {
            expect(screen.getByTestId('mock-sonner').getAttribute('data-theme')).toBe('dark');
        });
    });
});