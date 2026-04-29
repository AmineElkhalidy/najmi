import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gold text-navy hover:bg-gold-soft",
        navy: "bg-navy text-white hover:bg-navy-soft",
        outline:
          "border border-white/45 bg-transparent text-white hover:border-gold hover:text-gold-soft",
        outlineLight:
          "border border-slate-300 bg-white text-navy hover:border-gold hover:text-gold-dark",
        ghost: "text-white/85 hover:text-gold",
        ghostLight: "text-navy/80 hover:bg-navy/5 hover:text-navy",
        link: "text-navy underline-offset-4 hover:text-gold-dark hover:underline",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        default: "px-5 py-3",
        sm: "px-4 py-2 text-xs",
        lg: "px-7 py-4 text-base",
        icon: "h-10 w-10 rounded-full p-0",
        iconSm: "h-9 w-9 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
