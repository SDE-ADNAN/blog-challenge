import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from '@/components/ui/button';

// Mock Radix UI Slot
jest.mock('@radix-ui/react-slot', () => ({
    Slot: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function MockSlot(props, ref) {
        // The ref is typed as React.Ref<HTMLDivElement> to match the expected type
        // The props are typed as React.HTMLAttributes<HTMLDivElement> to allow standard HTML attributes
        return <div ref={ref} {...props} data-testid="slot" />;
    }),
}));


describe('Button', () => {
    it('renders button with default variant and size', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toHaveClass('bg-primary');
        expect(button).toHaveClass('h-9 px-4 py-2'); // Check for default size classes
    });

    // Additional Test Cases

    it('triggers click event', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders with an icon', () => {
        render(<Button><span className="icon" />Button with Icon</Button>);
        const button = screen.getByRole('button', { name: /button with icon/i });
        expect(button.querySelector('.icon')).toBeInTheDocument();
    });

    it('applies custom styles', () => {
        render(<Button style={{ backgroundColor: 'red' }}>Styled Button</Button>);
        const button = screen.getByRole('button', { name: /styled button/i });
        expect(button).toHaveStyle('background-color: red');
    });

    it('is accessible with aria-label', () => {
        render(<Button aria-label="Accessible Button">Button</Button>);
        const button = screen.getByRole('button', { name: /accessible button/i });
        expect(button).toHaveAttribute('aria-label', 'Accessible Button');
    });
});
