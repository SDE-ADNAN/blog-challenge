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
  // images from https://www.dark.design/
  const images = [
    "https://framerusercontent.com/images/VLACpj5hz60AdBr5UA7QxWsC0IA.png",
    "https://framerusercontent.com/images/RxE4MGO4hoqQD1U1IWCh31XtIVk.png",
    "https://framerusercontent.com/images/eBewXVthrkfU83ygkD85hGPo.png",
    "https://framerusercontent.com/images/1DXxsXSYZ8pBfQRv00qfB6FFtxM.png",
    "https://framerusercontent.com/images/PNRHKB6luGJ5LNZ2hlbACTfFxs.png",
    "https://framerusercontent.com/images/8bPOmwDyD5TxP9rNRqfhQnl9M8.png",
    "https://framerusercontent.com/images/WVjxLPjZ9s7p49x9yJlwr8tFXhc.png",
    "https://framerusercontent.com/images/4XoJizAl99exDgPknjwqiCqbgg.png",
    "https://framerusercontent.com/images/zPbdAHavHtiMZEw4Cv0B7LD5w.png",
  ];

  return images[Math.floor(Math.random() * images.length)];
}
