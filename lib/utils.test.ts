import { cn, formatString, getRandomBlogImage } from "@/lib/utils";

// Tests for the `cn` function, which merges class names and resolves conflicts.
describe("cn function", () => {
  // Ensures that multiple class names are correctly merged into a single string.
  it("merges class names correctly", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
  });

  // Ensures duplicate class names are removed to avoid redundancy.
  it("removes duplicate class names", () => {
    expect(cn("text-red-500", "text-red-500")).toBe("text-red-500");
  });

  // Ensures that conflicting Tailwind classes (same property) keep the last occurrence.
  it("handles conflicting Tailwind classes by keeping the last one", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  // Ensures the function handles cases where no input is provided.
  it("handles empty inputs gracefully", () => {
    expect(cn()).toBe("");
  });
});

// Tests for the `formatString` function, which capitalizes the first letter and truncates text.
describe("formatString function", () => {
  // Ensures that the function capitalizes the first letter and truncates the string properly.
  it("capitalizes first letter and truncates correctly", () => {
    expect(formatString("hello world", 5)).toBe("Hello");
  });

  // Ensures the function returns the full string if it is shorter than the max length.
  it("returns the full string if it's shorter than maxLength", () => {
    expect(formatString("hi", 10)).toBe("Hi");
  });

  // Ensures that when maxLength is zero, it returns an empty string.
  it("handles zero maxLength properly", () => {
    expect(formatString("hello", 0)).toBe("");
  });
});

// Tests for the `getRandomBlogImage` function, which returns a random image URL from a predefined list.
describe("getRandomBlogImage function", () => {
  // Ensures the function returns a valid image URL from the predefined list.
  it("returns a valid image URL from the predefined list", () => {
    const image = getRandomBlogImage();
    const validImages = [
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

    expect(validImages).toContain(image);
  });

  // Ensures that the function selects different images randomly over multiple calls.
  it("randomly selects an image from the list", () => {
    const images = new Set(Array.from({ length: 20 }, getRandomBlogImage));
    expect(images.size).toBeGreaterThan(1); // Ensures randomness by checking unique values
  });
});
