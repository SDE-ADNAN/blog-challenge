"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { useEffect, useState } from "react"

type ToasterProps = React.ComponentProps<typeof Sonner>

/**
 * Toaster Component
 * 
 * A wrapper around the `sonner` Toaster component with support for Next.js themes.
 * It ensures that the correct theme is applied based on the user's preference.
 * 
 * @param {ToasterProps} props - Additional props passed to the Sonner Toaster component.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme() // Get the resolved theme from `next-themes`
  const [mounted, setMounted] = useState(false) // Track whether the component has mounted

  useEffect(() => {
    setMounted(true) // Set mounted to true after the first render to ensure theme consistency
  }, [])

  const theme = mounted ? resolvedTheme : undefined // Apply theme only after mounting

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]} // Apply the dynamically resolved theme
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg backdrop-blur-[4px]", // Style the toast container
          description: "group-[.toast]:text-muted-foreground", // Style the toast description
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground", // Style the action button
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground", // Style the cancel button
        },
      }}
      {...props} // Spread additional props to the Sonner Toaster
    />
  )
}

export { Toaster }