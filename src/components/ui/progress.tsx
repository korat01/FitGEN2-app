import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-3 w-full overflow-hidden rounded-full",
      "bg-[rgba(0,194,255,0.1)] border border-[rgba(0,194,255,0.2)]",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 transition-all duration-500 rounded-full"
      style={{ 
        transform: `translateX(-${100 - (value || 0)}%)`,
        background: 'linear-gradient(90deg, #2ECC71 0%, #00C2FF 50%, #6B2AFF 100%)',
        boxShadow: '0 0 15px rgba(0, 194, 255, 0.6)'
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
