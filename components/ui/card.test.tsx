import * as React from 'react';
import { render, screen } from '@testing-library/react';

import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';

// Test suite for all Card components
describe('Card Components', () => {
    describe('Card', () => {
        // Test if the Card component renders with default styles
        it('renders with default styles', () => {
            render(<Card>Card Content</Card>);
            const card = screen.getByText('Card Content');
            expect(card).toHaveClass('rounded-xl', 'border', 'bg-card', 'text-card-foreground', 'shadow');
        });

        // Test if custom className merges correctly with default styles
        it('merges custom className with default styles', () => {
            render(<Card className="custom-class">Card Content</Card>);
            const card = screen.getByText('Card Content');
            expect(card).toHaveClass('custom-class');
            expect(card).toHaveClass('rounded-xl');
        });

        // Test if the ref is correctly forwarded to the Card component
        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLDivElement>();
            render(<Card ref={ref}>Card Content</Card>);
            expect(ref.current).toBeInstanceOf(HTMLDivElement);
        });
    });

    describe('CardHeader', () => {
        // Test if the CardHeader renders with default styles
        it('renders with default styles', () => {
            render(<CardHeader>Header Content</CardHeader>);
            const header = screen.getByText('Header Content');
            expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
        });

        // Test if custom className merges correctly
        it('merges custom className', () => {
            render(<CardHeader className="custom-header">Header Content</CardHeader>);
            const header = screen.getByText('Header Content');
            expect(header).toHaveClass('custom-header');
            expect(header).toHaveClass('p-6');
        });
    });

    describe('CardTitle', () => {
        // Test if the CardTitle renders with default styles
        it('renders with default styles', () => {
            render(<CardTitle>Card Title</CardTitle>);
            const title = screen.getByText('Card Title');
            expect(title).toHaveClass('font-semibold', 'leading-none', 'tracking-tight');
        });

        // Test if custom className merges correctly
        it('merges custom className', () => {
            render(<CardTitle className="custom-title">Card Title</CardTitle>);
            const title = screen.getByText('Card Title');
            expect(title).toHaveClass('custom-title');
            expect(title).toHaveClass('font-semibold');
        });
    });

    describe('CardDescription', () => {
        // Test if the CardDescription renders with default styles
        it('renders with default styles', () => {
            render(<CardDescription>Description</CardDescription>);
            const description = screen.getByText('Description');
            expect(description).toHaveClass('text-sm', 'text-muted-foreground');
        });

        // Test if custom className merges correctly
        it('merges custom className', () => {
            render(<CardDescription className="custom-desc">Description</CardDescription>);
            const description = screen.getByText('Description');
            expect(description).toHaveClass('custom-desc');
            expect(description).toHaveClass('text-sm');
        });
    });

    describe('CardContent', () => {
        // Test if the CardContent renders with default styles
        it('renders with default styles', () => {
            render(<CardContent>Content</CardContent>);
            const content = screen.getByText('Content');
            expect(content).toHaveClass('p-6', 'pt-0');
        });

        // Test if custom className merges correctly
        it('merges custom className', () => {
            render(<CardContent className="custom-content">Content</CardContent>);
            const content = screen.getByText('Content');
            expect(content).toHaveClass('custom-content');
            expect(content).toHaveClass('p-6');
        });
    });

    describe('CardFooter', () => {
        // Test if the CardFooter renders with default styles
        it('renders with default styles', () => {
            render(<CardFooter>Footer Content</CardFooter>);
            const footer = screen.getByText('Footer Content');
            expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
        });

        // Test if custom className merges correctly
        it('merges custom className', () => {
            render(<CardFooter className="custom-footer">Footer Content</CardFooter>);
            const footer = screen.getByText('Footer Content');
            expect(footer).toHaveClass('custom-footer');
            expect(footer).toHaveClass('flex');
        });
    });

    // Test rendering a complete Card component with all subcomponents
    it('renders a complete card with all components', () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Title</CardTitle>
                    <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>Content</CardContent>
                <CardFooter>Footer</CardFooter>
            </Card>
        );

        // Verify that all parts of the Card are rendered
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Content')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();
    });
});