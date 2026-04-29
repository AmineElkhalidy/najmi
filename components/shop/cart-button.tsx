"use client";

import { ShoppingBag } from "lucide-react";

import {
  selectCartItemCount,
  useCartStore,
} from "@/lib/store/cart";
import { cn } from "@/lib/utils";

type CartButtonProps = {
  label: string;
  className?: string;
};

export function CartButton({ label, className }: CartButtonProps) {
  const open = useCartStore((state) => state.open);
  const hydrated = useCartStore((state) => state.hydrated);
  const count = useCartStore(selectCartItemCount);

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`${label}${hydrated && count > 0 ? ` (${count})` : ""}`}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full text-navy transition hover:bg-navy/5",
        className,
      )}
    >
      <ShoppingBag className="h-5 w-5" />
      {hydrated && count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-gold px-1.5 py-0.5 text-[10px] font-bold leading-none text-navy">
          {count}
        </span>
      ) : null}
      <span className="sr-only">{label}</span>
    </button>
  );
}
