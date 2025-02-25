import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a string by capitalizing the first letter and truncating to specified length
 * @param {string} str - Input string to format
 * @param {number} maxLength - Maximum number of characters to display
 * @returns {string} Formatted string
 */
export function formatString(str: string, maxLength: number): string {
  // Handle invalid inputs
  if (!str || typeof str !== "string") return "";

  // Take substring up to maxLength
  str = str.substring(0, maxLength);

  // Capitalize first letter if string is long enough
  if (str.length > 0) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }

  return str;
}

export function getRandomBlogImage() {
  const images = [
    "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*uvEfXPVBntVKAyCG.jpg",
    "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*vt6qfWOkoSe8yRBV.jpg",
    // "https://source.unsplash.com/random/800x600/?nature",
    // "https://source.unsplash.com/random/800x600/?travel",
    // "https://source.unsplash.com/random/800x600/?food",
    // "https://source.unsplash.com/random/800x600/?lifestyle",
    // "https://source.unsplash.com/random/800x600/?business",
    // "https://source.unsplash.com/random/800x600/?education",
    // "https://source.unsplash.com/random/800x600/?news",
  ];

  return images[Math.floor(Math.random() * images.length)];
}
