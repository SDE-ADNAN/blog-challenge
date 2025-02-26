import { cn } from "@/lib/utils"

/**
 * Skeleton Component
 * 
 * A simple skeleton loader component that provides a placeholder UI while content is loading.
 * It applies a pulsing animation along with default rounded corners and a background color.
 *
 * @param {string} className - Additional class names for styling customization.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Other HTML attributes passed to the div.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)} // Default styles with optional custom class
      {...props} // Spread any additional props (e.g., data-testid, inline styles)
    />
  )
}

export { Skeleton }