import { render, screen, fireEvent } from '@testing-library/react';
import ImageWithFallback from './image-with-fallback';
import { FALLBACK_IMAGE_URL } from '@/constants';

// // Mock next/image
// jest.mock('next/image', () => ({
//     __esModule: true,
//     default: (props: any) => {
//         // eslint-disable-next-line @next/next/no-img-element
//         return <img {...props} />;
//     },
// }));

describe('ImageWithFallback', () => {
    const mockProps = {
        src: 'https://framerusercontent.com/images/VLACpj5hz60AdBr5UA7QxWsC0IA.png',
        fallbackSrc: FALLBACK_IMAGE_URL,
        alt: 'Test image',
        width: 100,
        height: 100,
    };

    it('renders with initial src', () => {
        render(<ImageWithFallback {...mockProps} />);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', "http://localhost/_next/image?url=https%3A%2F%2Fframerusercontent.com%2Fimages%2FVLACpj5hz60AdBr5UA7QxWsC0IA.png&w=256&q=75");
        expect(image).toHaveAttribute('alt', 'Test image');
    });

    it('switches to fallback image on error', () => {
        render(<ImageWithFallback {...mockProps} />);
        const image = screen.getByRole('img');
        fireEvent.error(image);
        expect(image).toHaveAttribute('src', "http://localhost/_next/image?url=https%3A%2F%2Flh5.googleusercontent.com%2Fproxy%2F6GqkEKacZBl4xmcSgeJZ_EzDbh4LBdv7J5u1A1HdbAXbU8jrYJHTvk6zyHmHxdA53BphWLT3HLFg0_N3gAwkEbMVF1iIEUZzd3Bs_eM3ACXDwMokenhEQHTLTUL3a7BB_f5JH3oKywsYXbu37KrJ&w=256&q=75");
    });
});