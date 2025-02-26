import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

// Define the props for the ImageWithFallback component
// - Inherit all ImageProps except "src" (since we manage it dynamically)
// - Require "src" and "fallbackSrc" as props
interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
    src: string;         // Primary image source
    fallbackSrc: string; // Fallback image source in case of an error
}

// ImageWithFallback component to handle image loading errors gracefully
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
    src,
    fallbackSrc,
    ...rest
}) => {
    // State to manage the current image source (initially set to `src`)
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}               // Spread the remaining props for flexibility
            src={imgSrc}            // Dynamically controlled source
            onError={() => setImgSrc(fallbackSrc)} // Switch to fallback image on error
            alt={rest.alt || "image"} // Ensures `alt` is always passed for accessibility
        />
    );
};

export default ImageWithFallback;