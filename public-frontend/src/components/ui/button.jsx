import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary-500 text-white hover:bg-primary-600",
    outline: "border border-primary-500 text-primary-500 hover:bg-primary-50",
    ghost: "hover:bg-gray-100 text-gray-700",
    link: "text-primary-500 underline-offset-4 hover:underline",
  }
  
  const sizes = {
    default: "h-10 px-6 py-2",
    sm: "h-8 px-4 text-sm",
    lg: "h-12 px-8 text-lg",
    icon: "h-10 w-10",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
