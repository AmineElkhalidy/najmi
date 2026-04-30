"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import type { Locale } from "@/lib/i18n";
import { storePath } from "@/lib/locale-paths";
import type { ShopDictionary } from "@/lib/shop-i18n";
import { cn } from "@/lib/utils";

type SortSelectProps = {
  locale: Locale;
  dict: ShopDictionary;
  className?: string;
};

export function SortSelect({ locale, dict, className }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const value = searchParams.get("sort") ?? "newest";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (next === "newest") params.delete("sort");
    else params.set("sort", next);
    const qs = params.toString();
    startTransition(() => {
      router.push(storePath(locale, qs || null), {
        scroll: false,
      });
    });
  };

  return (
    <label className={cn("inline-flex items-center gap-2 text-sm", className)}>
      <span className="text-slate-500">{dict.shop.sortBy}:</span>
      <select
        value={value}
        onChange={handleChange}
        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-navy shadow-sm transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
      >
        <option value="newest">{dict.shop.sortNewest}</option>
        <option value="price-asc">{dict.shop.sortPriceAsc}</option>
        <option value="price-desc">{dict.shop.sortPriceDesc}</option>
        <option value="rating">{dict.shop.sortRating}</option>
      </select>
    </label>
  );
}
