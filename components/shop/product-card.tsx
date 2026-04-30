"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/locale-paths";
import { formatPrice, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  locale: Locale;
  priority?: boolean;
};

const badgeLabel: Record<NonNullable<Product["badges"]>[number], string> = {
  new: "New",
  bestseller: "Bestseller",
  limited: "Limited",
};

export function ProductCard({ product, locale, priority }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative flex flex-col"
    >
      <Link
        href={localePath(locale, `/product/${product.slug}`)}
        aria-label={product.name}
        className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 transition-all duration-500 hover:ring-gold/40"
      >
        <Image
          src={product.images.front}
          alt={`${product.name} front view`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          priority={priority}
          className="absolute inset-0 object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <Image
          src={product.images.side}
          alt={`${product.name} side view`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {product.badges && product.badges.length > 0 ? (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.badges.map((badge) => (
              <Badge
                key={badge}
                variant={badge === "limited" ? "navy" : "gold"}
                className="shadow-sm"
              >
                {badgeLabel[badge]}
              </Badge>
            ))}
          </div>
        ) : null}

        {product.compareAtPrice ? (
          <Badge
            variant="navy"
            className="absolute right-3 top-3 bg-emerald-600 text-white"
          >
            -
            {Math.round(
              ((product.compareAtPrice - product.price) /
                product.compareAtPrice) *
                100,
            )}
            %
          </Badge>
        ) : null}
      </Link>

      <div className="mt-4 flex flex-col gap-1.5 px-1">
        <p className="text-[11px] uppercase tracking-[0.18em] text-gold-dark">
          {product.brand}
        </p>
        <Link
          href={localePath(locale, `/product/${product.slug}`)}
          className="text-base font-semibold text-navy transition hover:text-gold-dark"
        >
          {product.name}
        </Link>
        <p className="text-xs text-slate-500">{product.color}</p>

        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="font-semibold text-navy">
              {product.rating.toFixed(1)}
            </span>
            <span>({product.reviewCount})</span>
          </div>
          <div className="flex items-baseline gap-2">
            {product.compareAtPrice ? (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            ) : null}
            <span className={cn("text-base font-semibold text-navy")}>
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
