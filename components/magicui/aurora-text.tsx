"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React from "react";

interface AuroraTextProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function AuroraText({
  className,
  children,
  as: Component = "span",
  ...props
}: AuroraTextProps) {

  const { theme } = useTheme();

  const mixBlendMode = theme === "dark" ? "mix-blend-darken" : "mix-blend-lighten";

  return (
    <Component className={cn("relative inline-flex overflow-hidden", className)} {...props}>
      {children}
      <span className={cn("pointer-events-none absolute inset-0", mixBlendMode)}>
        <span className="aurora-bg bg-[hsl(var(--color-1))]"></span>
        <span className="aurora-bg right-0 top-0 bg-[hsl(var(--color-2))]"></span>
        <span className="aurora-bg bottom-0 left-0 bg-[hsl(var(--color-3))]"></span>
        <span className="aurora-bg -bottom-1/2 right-0 bg-[hsl(var(--color-4))]"></span>
      </span>
    </Component>
  );
}
