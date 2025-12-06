import * as React from "react"
import { cn } from "@/lib/utils"

const variantClasses = {
  default:
    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive:
    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
  outline: "text-foreground",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantClasses;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClass = variantClasses[variant] || variantClasses.default;
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClass,
        className
      )}
      {...props}
    />
  );
}

// Keep badgeVariants export for any other files that might be using it, though it's now internal.
// This is for compatibility during the refactor. It can be removed later.
const badgeVariants = (props: { variant?: keyof typeof variantClasses }) => {
  return cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    variantClasses[props.variant || 'default']
  );
}


export { Badge, badgeVariants }
