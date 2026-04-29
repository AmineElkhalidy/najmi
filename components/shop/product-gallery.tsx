"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.images.gallery.length
    ? product.images.gallery
    : [product.images.front, product.images.side];
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-4 lg:grid-cols-[80px_1fr]">
      <ul
        className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:gap-3 lg:overflow-visible"
        aria-label="Product thumbnails"
      >
        {images.map((src, index) => (
          <li key={src + index} className="shrink-0">
            <button
              type="button"
              aria-label={`View image ${index + 1}`}
              aria-current={active === index}
              onClick={() => setActive(index)}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-2xl border-2 bg-white transition",
                active === index
                  ? "border-gold ring-2 ring-gold/30"
                  : "border-transparent ring-1 ring-slate-100 hover:border-gold/40",
              )}
            >
              <Image
                src={src}
                alt={`${product.name} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="order-1 lg:order-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white ring-1 ring-slate-100 shadow-[0_24px_60px_-30px_rgba(15,31,51,0.18)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[active]}
                alt={`${product.name} — image ${active + 1}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
