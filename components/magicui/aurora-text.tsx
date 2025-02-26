"use client";

import React from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

// Define the props interface for the component
interface AuroraTextProps extends React.HTMLAttributes<HTMLElement> {
  className?: string; // Optional custom class names
  children: React.ReactNode; // Content inside the component
  as?: React.ElementType; // HTML element type, defaults to 'span'
}

export function AuroraText({
  className,
  children,
  as: Component = "span", // Default element type is 'span'
  ...props
}: AuroraTextProps) {

  // Get the current theme using next-themes
  const { theme } = useTheme();

  // Determine mix-blend mode based on theme
  const mixBlendMode = theme === "dark" ? "mix-blend-darken" : "mix-blend-lighten";

  return (
    // Render the specified element type (default is 'span') with additional classes
    <Component className={cn("relative inline-flex overflow-hidden", className)} {...props}>
      {children}
      {/* Overlay container for aurora background effects */}
      <span className={cn("pointer-events-none absolute inset-0", mixBlendMode)}>
        {/* Aurora background effect elements with different colors */}
        <span className="aurora-bg bg-[hsl(var(--color-1))]"></span>
        <span className="aurora-bg right-0 top-0 bg-[hsl(var(--color-2))]"></span>
        <span className="aurora-bg bottom-0 left-0 bg-[hsl(var(--color-3))]"></span>
        <span className="aurora-bg -bottom-1/2 right-0 bg-[hsl(var(--color-4))]"></span>
      </span>
    </Component>
  );
}
