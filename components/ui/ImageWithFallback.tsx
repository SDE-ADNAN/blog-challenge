import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
    src: string;
    fallbackSrc: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
    src,
    fallbackSrc,
    ...rest
}) => {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => setImgSrc(fallbackSrc)}
            alt={rest.alt || "image"} // Ensures `alt` is always passed
        />
    );
};

export default ImageWithFallback;