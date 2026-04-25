import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#d4af37] text-[#0f1f33] hover:bg-[#e1be52]",
        outline:
          "border border-white/45 bg-transparent text-white hover:border-[#d4af37] hover:text-[#f1d37c]",
        ghost: "text-white/85 hover:text-[#d4af37]",
      },
      size: {
        default: "px-5 py-3",
        sm: "px-4 py-2",
        lg: "px-6 py-3.5",
        icon: "size-9 rounded-md p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? "span" : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
