import { render, screen, fireEvent } from '@testing-library/react';

import { FALLBACK_IMAGE_URL } from '@/constants';

import ImageWithFallback from '@/components/ui/image-with-fallback';

describe('ImageWithFallback', () => {
    const mockProps = {
        src: 'https://framerusercontent.com/images/VLACpj5hz60AdBr5UA7QxWsC0IA.png',
        fallbackSrc: FALLBACK_IMAGE_URL,
        alt: 'Test image',
        width: 100,
        height: 100,
    };

    it('renders with initial src', () => {
        // Render the ImageWithFallback component with initial props
        render(<ImageWithFallback {...mockProps} />);

        // Get the image element by role
        const image = screen.getByRole('img');

        // Check if the image is rendered with the provided source and alt text
        expect(image).toHaveAttribute('src', "http://localhost/_next/image?url=https%3A%2F%2Fframerusercontent.com%2Fimages%2FVLACpj5hz60AdBr5UA7QxWsC0IA.png&w=256&q=75");
        expect(image).toHaveAttribute('alt', 'Test image');
    });

    it('switches to fallback image on error', () => {
        // Render the ImageWithFallback component
        render(<ImageWithFallback {...mockProps} />);

        // Get the image element
        const image = screen.getByRole('img');

        // Simulate an image load error
        fireEvent.error(image);

        // Check if the image switches to the fallback source
        expect(image).toHaveAttribute('src', "http://localhost/_next/image?url=https%3A%2F%2Flh5.googleusercontent.com%2Fproxy%2F6GqkEKacZBl4xmcSgeJZ_EzDbh4LBdv7J5u1A1HdbAXbU8jrYJHTvk6zyHmHxdA53BphWLT3HLFg0_N3gAwkEbMVF1iIEUZzd3Bs_eM3ACXDwMokenhEQHTLTUL3a7BB_f5JH3oKywsYXbu37KrJ&w=256&q=75");
    });
});