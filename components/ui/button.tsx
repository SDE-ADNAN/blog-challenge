import * as React from "react"
import { Slot } from "@radix-ui/react-slot" // Allows passing an alternative component while preserving props
import { cva, type VariantProps } from "class-variance-authority" // Utility for managing class variants

import { cn } from "@/lib/utils" // Utility function for conditionally combining class names

// Define button styles with variants for different appearances and sizes
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90", // Standard button style
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90", // Danger button style
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground", // Outlined button
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80", // Secondary style button
        ghost: "hover:bg-accent hover:text-accent-foreground", // Minimal button with only hover effect
        link: "text-primary underline-offset-4 hover:underline", // Styled like a link
      },
      size: {
        default: "h-9 px-4 py-2", // Standard button size
        sm: "h-8 rounded-md px-3 text-xs", // Small button
        lg: "h-10 rounded-md px-8", // Large button
        icon: "h-9 w-9", // Square button for icons
      },
    },
    defaultVariants: {
      variant: "default", // Default button style
      size: "default", // Default button size
    },
  }
)

// Define the props interface, extending standard button attributes
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean // If true, uses a custom component (via Slot) instead of a button
}

// Button component using forwardRef to allow ref forwarding
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button" // Uses Slot if `asChild` is true, else defaults to `button`
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Dynamically apply styles based on props
        ref={ref}
        {...props} // Spread remaining props onto the component
      />
    )
  }
)

Button.displayName = "Button" // Set display name for better debugging

export { Button, buttonVariants } // Export the Button component and its variants