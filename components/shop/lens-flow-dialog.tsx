"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  FileUp,
  Info,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  type LensTypeId,
  type LensUpgradeId,
  calculateLensTotal,
  lensTypes,
  lensUpgrades,
} from "@/lib/lenses";
import { formatPrice } from "@/lib/products";
import type { ShopDictionary } from "@/lib/shop-i18n";
import { cn } from "@/lib/utils";

export type LensSelection = {
  typeId: LensTypeId;
  upgradeIds: LensUpgradeId[];
  prescriptionFileName: string | null;
};

type LensFlowDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialSelection: LensSelection;
  onConfirm: (selection: LensSelection) => void;
  dict: ShopDictionary;
  framePrice: number;
};

const ACCEPT = ".pdf,.jpg,.jpeg,.png";

function LensFlowForm({
  initialSelection,
  onConfirm,
  dict,
  framePrice,
}: {
  initialSelection: LensSelection;
  onConfirm: (selection: LensSelection) => void;
  dict: ShopDictionary;
  framePrice: number;
}) {
  const [typeId, setTypeId] = useState<LensTypeId>(initialSelection.typeId);
  const [upgradeIds, setUpgradeIds] = useState<LensUpgradeId[]>(
    initialSelection.upgradeIds,
  );
  const [fileName, setFileName] = useState<string | null>(
    initialSelection.prescriptionFileName,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputId = useId();

  const lens = useMemo(
    () => lensTypes.find((l) => l.id === typeId)!,
    [typeId],
  );
  const lensTotal = calculateLensTotal(typeId, upgradeIds);
  const grandTotal = framePrice + lensTotal;

  const requiresRx = lens.requiresPrescription;
  const canConfirm = !requiresRx || Boolean(fileName);

  const toggleUpgrade = (id: LensUpgradeId, checked: boolean) => {
    setUpgradeIds((prev) =>
      checked ? [...prev, id] : prev.filter((u) => u !== id),
    );
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm({
      typeId,
      upgradeIds,
      prescriptionFileName: requiresRx ? fileName : null,
    });
  };

  return (
    <>
      <div className="px-6 pb-4 pt-2 sm:px-8">
        <Accordion
          type="single"
          collapsible
          defaultValue="step-1"
          className="w-full"
        >
          <AccordionItem value="step-1">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                {dict.lensFlow.step1Title}
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-4 text-sm text-slate-500">
                {dict.lensFlow.step1Description}
              </p>
              <RadioGroup
                value={typeId}
                onValueChange={(value) => setTypeId(value as LensTypeId)}
                className="gap-2"
              >
                {lensTypes.map((lensType) => {
                  const id = `lens-type-${lensType.id}`;
                  const selected = typeId === lensType.id;
                  return (
                    <Label
                      key={lensType.id}
                      htmlFor={id}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition",
                        selected
                          ? "border-gold bg-gold/5"
                          : "border-slate-200 hover:border-gold/50",
                      )}
                    >
                      <RadioGroupItem
                        id={id}
                        value={lensType.id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-navy">
                            {lensType.name}
                          </p>
                          <span className="text-sm font-semibold text-gold-dark">
                            {lensType.priceModifier === 0
                              ? "Included"
                              : `+ ${formatPrice(lensType.priceModifier)}`}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          {lensType.description}
                        </p>
                        {lensType.recommendedFor ? (
                          <Badge variant="soft" className="mt-2">
                            {lensType.recommendedFor}
                          </Badge>
                        ) : null}
                      </div>
                    </Label>
                  );
                })}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step-2">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                {dict.lensFlow.step2Title}
                {requiresRx && fileName ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : null}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              {!requiresRx ? (
                <div className="flex items-start gap-2 rounded-xl bg-cream p-4 text-sm text-slate-600">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                  <p>
                    {dict.lensFlow.step2Description.replace(/\.+$/, "")}
                    {" "}— not required for non-prescription lenses.
                  </p>
                </div>
              ) : (
                <>
                  <p className="mb-4 text-sm text-slate-500">
                    {dict.lensFlow.step2Description}
                  </p>
                  <input
                    ref={fileInputRef}
                    id={fileInputId}
                    type="file"
                    accept={ACCEPT}
                    onChange={handleFile}
                    className="hidden"
                    aria-label={dict.lensFlow.step2Upload}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center transition",
                      fileName
                        ? "border-emerald-300 bg-emerald-50/50"
                        : "border-slate-200 hover:border-gold hover:bg-gold/5",
                    )}
                  >
                    {fileName ? (
                      <>
                        <FileUp className="h-6 w-6 text-emerald-500" />
                        <p className="text-sm font-semibold text-navy">
                          {fileName}
                        </p>
                        <p className="text-xs text-slate-500">
                          Click to replace
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="h-6 w-6 text-gold-dark" />
                        <p className="text-sm font-semibold text-navy">
                          {dict.lensFlow.step2Upload}
                        </p>
                        <p className="text-xs text-slate-500">
                          PDF, JPG, PNG · max 10 MB
                        </p>
                      </>
                    )}
                  </button>
                  {fileName ? (
                    <button
                      type="button"
                      onClick={() => setFileName(null)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                      Remove file
                    </button>
                  ) : null}
                  <p className="mt-3 text-xs text-slate-500">
                    {dict.lensFlow.step2HelpUploadLater}
                  </p>
                </>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="step-3">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                {dict.lensFlow.step3Title}
                {upgradeIds.length > 0 ? (
                  <Badge variant="soft">{upgradeIds.length}</Badge>
                ) : null}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-4 text-sm text-slate-500">
                {dict.lensFlow.step3Description}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {lensUpgrades.map((upgrade) => {
                  const id = `upgrade-${upgrade.id}`;
                  const checked = upgradeIds.includes(upgrade.id);
                  return (
                    <Label
                      key={upgrade.id}
                      htmlFor={id}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition",
                        checked
                          ? "border-gold bg-gold/5"
                          : "border-slate-200 hover:border-gold/50",
                      )}
                    >
                      <Checkbox
                        id={id}
                        checked={checked}
                        onCheckedChange={(value) =>
                          toggleUpgrade(upgrade.id, Boolean(value))
                        }
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-navy">
                            {upgrade.name}
                            {upgrade.recommended ? (
                              <Badge
                                variant="gold"
                                className="ml-2 align-middle"
                              >
                                Recommended
                              </Badge>
                            ) : null}
                          </p>
                          <span className="text-sm font-semibold text-gold-dark">
                            + {formatPrice(upgrade.price)}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          {upgrade.description}
                        </p>
                      </div>
                    </Label>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="sticky bottom-0 flex flex-col gap-3 border-t border-slate-100 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="text-sm">
          <p className="text-slate-500">{dict.product.totalPrice}</p>
          <p className="text-2xl font-semibold text-navy">
            {formatPrice(grandTotal)}
          </p>
          <p className="text-xs text-slate-500">
            {dict.product.framePrice} {formatPrice(framePrice)} +{" "}
            {dict.product.lensesPrice} {formatPrice(lensTotal)}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          {requiresRx && !fileName ? (
            <p
              className="self-center text-xs font-medium text-amber-600"
              role="alert"
            >
              {dict.lensFlow.requiredPrescription}
            </p>
          ) : null}
          <Button
            type="button"
            variant="navy"
            size="lg"
            disabled={!canConfirm}
            onClick={handleConfirm}
          >
            {dict.lensFlow.confirm}
          </Button>
        </div>
      </div>
    </>
  );
}

export function LensFlowDialog({
  open,
  onOpenChange,
  initialSelection,
  onConfirm,
  dict,
  framePrice,
}: LensFlowDialogProps) {
  const handleConfirm = (selection: LensSelection) => {
    onConfirm(selection);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto p-0 sm:p-0">
        <DialogHeader className="border-b border-slate-100 bg-cream p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-content-center rounded-full bg-gold/15 text-gold-dark">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <DialogTitle className="text-xl">
                {dict.lensFlow.title}
              </DialogTitle>
              <DialogDescription>{dict.lensFlow.subtitle}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {open ? (
          <LensFlowForm
            key={`${initialSelection.typeId}-${initialSelection.upgradeIds.join("|")}-${initialSelection.prescriptionFileName ?? ""}`}
            initialSelection={initialSelection}
            onConfirm={handleConfirm}
            dict={dict}
            framePrice={framePrice}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
