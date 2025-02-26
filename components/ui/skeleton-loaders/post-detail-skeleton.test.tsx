import { render, screen } from '@testing-library/react';
import PostDetailSkeleton from './post-detail-skeleton';

describe('PostDetailSkeleton', () => {
    it('renders the skeleton structure correctly', () => {
        render(<PostDetailSkeleton />);

        // Check main card container
        const mainCard = screen.getByTestId('post-detail-skeleton');
        expect(mainCard).toBeInTheDocument();

        // Check all skeleton elements are present
        const skeletons = screen.getAllByTestId('skeleton');

        // Verify the exact number of skeletons
        expect(skeletons.length).toBe(27); // Update this based on actual rendered count
    });

    it('renders correct number of comment skeletons', () => {
        render(<PostDetailSkeleton />);
        const commentCards = screen.getAllByTestId('comment-skeleton');
        expect(commentCards).toHaveLength(5);
    });

    it('renders comment sections with proper spacing', () => {
        render(<PostDetailSkeleton />);
        const commentSection = screen.getByTestId('comments-section');

        expect(commentSection).toBeInTheDocument();
        expect(commentSection).toHaveClass('mt-8', 'space-y-6');

        screen.getAllByTestId('comment-skeleton').forEach(card => {
            expect(card).toHaveClass('rounded-xl', 'shadow-md');
        });
    });
});