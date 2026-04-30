"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Locale } from "@/lib/i18n";
import { localePath, storePath } from "@/lib/locale-paths";
import { formatPrice } from "@/lib/products";
import {
  selectCartSubtotal,
  useCartStore,
} from "@/lib/store/cart";
import type { ShopDictionary } from "@/lib/shop-i18n";

type CartSheetProps = {
  locale: Locale;
  dict: ShopDictionary;
};

export function CartSheet({ locale, dict }: CartSheetProps) {
  const isOpen = useCartStore((state) => state.isOpen);
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore(selectCartSubtotal);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const close = useCartStore((state) => state.close);
  const open = useCartStore((state) => state.open);

  const isRtl = locale === "ar";
  const side = isRtl ? "left" : "right";

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(value) => (value ? open() : close())}
    >
      <SheetContent
        side={side}
        className="w-full sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gold-dark" />
            {dict.cart.title}
            {items.length > 0 ? (
              <span className="text-sm font-normal text-slate-500">
                ({items.length})
              </span>
            ) : null}
          </SheetTitle>
          {items.length > 0 ? (
            <SheetDescription>
              {dict.cart.shippingNote}
            </SheetDescription>
          ) : null}
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="grid h-16 w-16 place-content-center rounded-full bg-cream text-gold-dark">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <p className="text-base font-semibold text-navy">
              {dict.cart.empty}
            </p>
            <p className="text-sm text-slate-500">{dict.cart.emptyHint}</p>
            <Link
              href={storePath(locale)}
              onClick={close}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark underline-offset-4 hover:underline"
            >
              {dict.cart.continueShopping}
            </Link>
          </div>
        ) : (
          <>
            <ul
              className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5"
              aria-label={dict.cart.title}
            >
              {items.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-3 rounded-2xl border border-slate-100 p-3"
                >
                  <Link
                    href={localePath(locale, `/product/${line.slug}`)}
                    onClick={close}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream"
                  >
                    <Image
                      src={line.imageUrl}
                      alt={line.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-gold-dark">
                          {line.brand}
                        </p>
                        <Link
                          href={localePath(locale, `/product/${line.slug}`)}
                          onClick={close}
                          className="text-sm font-semibold text-navy hover:text-gold-dark"
                        >
                          {line.name}
                        </Link>
                      </div>
                      <button
                        type="button"
                        aria-label={dict.cart.remove}
                        onClick={() => removeItem(line.id)}
                        className="text-slate-400 transition hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <Badge variant="soft" className="self-start">
                      {line.lens.typeName}
                    </Badge>
                    {line.lens.upgrades.length > 0 ? (
                      <p className="text-xs text-slate-500">
                        +{" "}
                        {line.lens.upgrades.map((upgrade) => upgrade.name).join(", ")}
                      </p>
                    ) : null}
                    {line.lens.prescriptionFileName ? (
                      <p className="text-xs text-slate-500">
                        Rx: {line.lens.prescriptionFileName}
                      </p>
                    ) : null}

                    <div className="mt-1 flex items-center justify-between">
                      <div
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white"
                        aria-label={dict.cart.quantity}
                      >
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(line.id, line.quantity - 1)
                          }
                          className="grid h-7 w-7 place-content-center rounded-full text-navy/70 transition hover:bg-cream"
                          disabled={line.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-navy">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(line.id, line.quantity + 1)
                          }
                          className="grid h-7 w-7 place-content-center rounded-full text-navy/70 transition hover:bg-cream"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-navy">
                        {formatPrice(line.unitPrice * line.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <SheetFooter>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">{dict.cart.subtotal}</span>
                <span className="text-base font-semibold text-navy">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Separator />
              <Button variant="navy" size="lg" className="w-full">
                {dict.cart.checkout}
              </Button>
              <Link
                href={storePath(locale)}
                onClick={close}
                className="text-center text-xs font-medium text-slate-500 underline-offset-4 hover:underline"
              >
                {dict.cart.continueShopping}
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
