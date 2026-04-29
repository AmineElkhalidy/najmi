"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Check,
  Pencil,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import {
  LensFlowDialog,
  type LensSelection,
} from "@/components/shop/lens-flow-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  type LensTypeId,
  calculateLensTotal,
  getLensType,
  getLensUpgrade,
} from "@/lib/lenses";
import { formatPrice, type Product } from "@/lib/products";
import type { ShopDictionary } from "@/lib/shop-i18n";
import { useCartStore } from "@/lib/store/cart";

type ProductActionsProps = {
  product: Product;
  dict: ShopDictionary;
};

const DEFAULT_SELECTION: LensSelection = {
  typeId: "non-prescription",
  upgradeIds: [],
  prescriptionFileName: null,
};

export function ProductActions({ product, dict }: ProductActionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selection, setSelection] = useState<LensSelection>(DEFAULT_SELECTION);
  const [confirmed, setConfirmed] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const lensType = getLensType(selection.typeId as LensTypeId);
  const lensTotal = useMemo(
    () => calculateLensTotal(selection.typeId, selection.upgradeIds),
    [selection.typeId, selection.upgradeIds],
  );
  const grandTotal = product.price + lensTotal;

  const upgradesDetailed = selection.upgradeIds
    .map((id) => getLensUpgrade(id))
    .filter((u): u is NonNullable<ReturnType<typeof getLensUpgrade>> =>
      Boolean(u),
    );

  const handleConfirm = (next: LensSelection) => {
    setSelection(next);
    setConfirmed(true);
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      imageUrl: product.images.front,
      framePrice: product.price,
      unitPrice: grandTotal,
      lens: {
        typeId: selection.typeId,
        typeName: lensType?.name ?? dict.cart.framesOnly,
        upgrades: upgradesDetailed.map((upgrade) => ({
          id: upgrade.id,
          name: upgrade.name,
          price: upgrade.price,
        })),
        prescriptionFileName: selection.prescriptionFileName,
        totalPrice: lensTotal,
      },
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_32px_-12px_rgba(15,31,51,0.08)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold-dark">
              {dict.product.selectLenses}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-navy">
              {confirmed && lensType ? lensType.name : "Standard lens"}
            </h3>
            {confirmed && upgradesDetailed.length > 0 ? (
              <p className="mt-1 text-xs text-slate-500">
                +{" "}
                {upgradesDetailed.map((upgrade) => upgrade.name).join(" · ")}
              </p>
            ) : null}
            {confirmed && selection.prescriptionFileName ? (
              <p className="mt-1 text-xs text-slate-500">
                Rx: {selection.prescriptionFileName}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            size="sm"
            variant={confirmed ? "outlineLight" : "default"}
            onClick={() => setDialogOpen(true)}
          >
            {confirmed ? (
              <>
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                {dict.product.selectLenses}
              </>
            )}
          </Button>
        </div>

        <Separator className="my-4" />

        <dl className="grid gap-2 text-sm">
          <div className="flex items-center justify-between text-slate-600">
            <dt>{dict.product.framePrice}</dt>
            <dd className="font-medium text-navy">
              {formatPrice(product.price)}
            </dd>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <dt>{dict.product.lensesPrice}</dt>
            <dd className="font-medium text-navy">
              {lensTotal === 0 ? "Included" : formatPrice(lensTotal)}
            </dd>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3">
            <dt className="text-base font-semibold text-navy">
              {dict.product.totalPrice}
            </dt>
            <motion.dd
              key={grandTotal}
              initial={{ scale: 0.95, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="text-2xl font-semibold text-navy"
            >
              {formatPrice(grandTotal)}
            </motion.dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          variant="navy"
          size="lg"
          className="flex-1 relative"
          onClick={handleAddToCart}
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4" />
              Added to cart
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              {dict.product.addToCart} · {formatPrice(grandTotal)}
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outlineLight"
          size="lg"
          className="sm:w-48"
          aria-describedby="virtual-try-on-help"
        >
          <Camera className="h-4 w-4" />
          {dict.product.virtualTryOn}
        </Button>
      </div>
      <p id="virtual-try-on-help" className="sr-only">
        {dict.product.virtualTryOnSoon}
      </p>

      {!confirmed ? (
        <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-4">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
          <p className="text-xs leading-relaxed text-slate-600">
            <span className="font-semibold text-navy">Pro tip:</span> Click{" "}
            <span className="font-semibold">{dict.product.selectLenses}</span>{" "}
            to upload your prescription, choose progressive lenses, and add
            anti-blue light coatings before checkout.
          </p>
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <div className="text-xs leading-relaxed text-slate-600">
            <p className="font-semibold text-navy">
              Lens selection confirmed
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge variant="success">{lensType?.name}</Badge>
              {upgradesDetailed.map((upgrade) => (
                <Badge key={upgrade.id} variant="success">
                  {upgrade.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      <LensFlowDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialSelection={selection}
        onConfirm={handleConfirm}
        dict={dict}
        framePrice={product.price}
      />
    </div>
  );
}
