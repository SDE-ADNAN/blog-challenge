"use client";

import { ClassValue } from "clsx";

import { DotPattern } from "@/components/magicui/dot-pattern";

import { cn } from "@/lib/utils";

// Defined props interface for DotPatternWithGlowEffect
interface DotPatternProps {
    className?: ClassValue; // Optional className prop for custom styles
};

export function DotPatternWithGlowEffect({ className }: DotPatternProps) {
    return (
        <div
            className="fixed flex h-full w-full flex-col items-center justify-center overflow-hidden -z-50"
        >
            {/* Renders the DotPattern component with a glow effect */}
            <DotPattern
                glow={true} // Enables glow effect on the pattern
                className={cn(
                    "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
                    className // Merges additional custom class names
                )}
            />
        </div>
    );
}
