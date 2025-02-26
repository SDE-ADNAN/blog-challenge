"use client";

import { ClassValue } from "clsx";

import { DotPattern } from "@/components/magicui/dot-pattern";

import { cn } from "@/lib/utils";

interface DotPatternProps {
    className?: ClassValue;
};
export function DotPatternWithGlowEffect({ className }: DotPatternProps) {
    return (
        <div className="fixed flex h-full w-full flex-col items-center justify-center overflow-hidden -z-50">
            <DotPattern
                glow={true}
                className={cn(
                    "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
                    className
                )}
            />
        </div>
    );
}
