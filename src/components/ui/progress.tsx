import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

type ProgressVariant = "default" | "subtle" | "glow"
type ProgressSize = "sm" | "md" | "lg"

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: ProgressVariant
  size?: ProgressSize
}

const sizeClasses: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5",
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant = "default", size = "md", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={value}
    className={cn(
      "vitalforce-progress",
      sizeClasses[size],
      variant === "subtle" && "vitalforce-progress-subtle",
      variant === "glow" && "vitalforce-progress-glow",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "vitalforce-progress-bar",
        variant === "glow" && "vitalforce-progress-bar-glow"
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
