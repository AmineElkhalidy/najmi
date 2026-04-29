import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium tracking-wide",
  {
    variants: {
      variant: {
        gold: "bg-gold/15 text-gold-dark ring-1 ring-inset ring-gold/30",
        navy: "bg-navy text-white",
        outline: "border border-slate-200 bg-white text-navy",
        soft: "bg-slate-100 text-slate-700",
        success: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
      },
    },
    defaultVariants: {
      variant: "gold",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
