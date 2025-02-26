import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names, removes duplicates, and ensures Tailwind class merging.
 * @param {...ClassValue} inputs - Class names to be merged
 * @returns {string} A single merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a string by capitalizing the first letter and truncating to specified length.
 * @param {string} str - Input string to format
 * @param {number} maxLength - Maximum number of characters to display
 * @returns {string} Formatted string
 */
export function formatString(str: string, maxLength: number): string {
  // Trim input string
  const trimmedStr = str.trim();

  // Handle invalid inputs
  if (!trimmedStr || typeof trimmedStr !== "string") return "";
  // Take substring up to maxLength
  str = trimmedStr.trim().substring(0, maxLength);

  // Capitalize first letter if string is long enough
  if (trimmedStr.length > 0) {
    str = trimmedStr.charAt(0).toUpperCase() + trimmedStr.slice(1);
  }
  return str;
}

/**
 * Retrieves a random blog image URL from a predefined list.
 * @returns {string} A randomly selected image URL
 */
export function getRandomBlogImage() {
  // Predefined list of image URLs from https://www.dark.design/
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

  // Select a random image from the array
  return images[Math.floor(Math.random() * images.length)];
}
