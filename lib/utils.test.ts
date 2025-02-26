import { cn, formatString, getRandomBlogImage } from "@/lib/utils";

describe("cn function", () => {
  it("merges class names correctly", () => {
    expect(cn("text-red-500", "bg-blue-500")).toBe("text-red-500 bg-blue-500");
  });

  it("removes duplicate class names", () => {
    expect(cn("text-red-500", "text-red-500")).toBe("text-red-500");
  });

  it("handles conflicting Tailwind classes by keeping the last one", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles empty inputs gracefully", () => {
    expect(cn()).toBe("");
  });
});

describe("formatString function", () => {
  it("capitalizes first letter and truncates correctly", () => {
    expect(formatString("hello world", 5)).toBe("Hello");
  });

  it("returns an empty string for invalid inputs", () => {
    expect(formatString("", 5)).toBe("");
    expect(formatString(null as any, 5)).toBe("");
    expect(formatString(undefined as any, 5)).toBe("");
  });

  it("returns the full string if it's shorter than maxLength", () => {
    expect(formatString("hi", 10)).toBe("Hi");
  });

  it("handles zero maxLength properly", () => {
    expect(formatString("hello", 0)).toBe("");
  });
});

describe("getRandomBlogImage function", () => {
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

  it("randomly selects an image from the list", () => {
    const images = new Set(Array.from({ length: 20 }, getRandomBlogImage));
    expect(images.size).toBeGreaterThan(1); // Ensures randomness
  });
});
