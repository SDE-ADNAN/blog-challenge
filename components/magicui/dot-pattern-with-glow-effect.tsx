"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "./dot-pattern";
import { ClassValue } from "clsx";

interface DotPatternProps {
    className?: ClassValue;
};
export function DotPatternWithGlowEffect({ className }: DotPatternProps) {
    return (
        <div className="fixed flex h-full w-full flex-col items-center justify-center overflow-hidden">
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
