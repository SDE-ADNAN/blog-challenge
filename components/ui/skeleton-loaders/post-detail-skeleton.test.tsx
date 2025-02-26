import { render, screen } from '@testing-library/react';

import PostDetailSkeleton from '@/components/ui/skeleton-loaders/post-detail-skeleton';

describe('PostDetailSkeleton', () => {
    // Test to verify if the skeleton structure is rendered correctly
    it('renders the skeleton structure correctly', () => {
        // Render the PostDetailSkeleton component
        render(<PostDetailSkeleton />);

        // Check if the main skeleton container is present
        const mainCard = screen.getByTestId('post-detail-skeleton');
        expect(mainCard).toBeInTheDocument();

        // Fetch all elements with the test ID 'skeleton'
        const skeletons = screen.getAllByTestId('skeleton');

        // Verify that the exact number of skeleton elements matches the expected count
        expect(skeletons.length).toBe(27); // Update this based on actual rendered count
    });

    // Test to verify the correct number of comment skeletons are rendered
    it('renders correct number of comment skeletons', () => {
        // Render the PostDetailSkeleton component
        render(<PostDetailSkeleton />);

        // Fetch all comment skeleton elements
        const commentCards = screen.getAllByTestId('comment-skeleton');

        // Verify the expected number of comment skeletons
        expect(commentCards).toHaveLength(5);
    });

    // Test to ensure comment sections have proper spacing and structure
    it('renders comment sections with proper spacing', () => {
        // Render the PostDetailSkeleton component
        render(<PostDetailSkeleton />);

        // Check if the comments section exists
        const commentSection = screen.getByTestId('comments-section');
        expect(commentSection).toBeInTheDocument();

        // Ensure that the comments section has the expected spacing classes
        expect(commentSection).toHaveClass('mt-8', 'space-y-6');

        // Check if each comment skeleton has the proper styling
        screen.getAllByTestId('comment-skeleton').forEach(card => {
            expect(card).toHaveClass('rounded-xl', 'shadow-md');
        });
    });
});