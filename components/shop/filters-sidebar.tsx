"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { Locale } from "@/lib/i18n";
import { storePath } from "@/lib/locale-paths";
import type {
  FaceShape,
  FrameShape,
  Gender,
  ProductCategory,
} from "@/lib/products";
import { formatPrice } from "@/lib/products";
import type { ShopDictionary } from "@/lib/shop-i18n";
import { cn } from "@/lib/utils";

type FiltersSidebarProps = {
  locale: Locale;
  dict: ShopDictionary;
  priceRange: [number, number];
  className?: string;
};

const FRAME_SHAPES: Array<{ value: FrameShape; label: string }> = [
  { value: "round", label: "Round" },
  { value: "square", label: "Square" },
  { value: "aviator", label: "Aviator" },
  { value: "rectangle", label: "Rectangle" },
  { value: "cat-eye", label: "Cat-eye" },
  { value: "oval", label: "Oval" },
];

const FACE_SHAPES: Array<{ value: FaceShape; label: string }> = [
  { value: "oval", label: "Oval" },
  { value: "round", label: "Round" },
  { value: "heart", label: "Heart" },
  { value: "square", label: "Square" },
  { value: "oblong", label: "Oblong" },
];

const GENDERS: Array<{ value: Gender; label: string }> = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "kids", label: "Kids" },
  { value: "unisex", label: "Unisex" },
];

const CATEGORIES: Array<{ value: ProductCategory; key: keyof ShopDictionary["nav"] }> = [
  { value: "men", key: "men" },
  { value: "women", key: "women" },
  { value: "kids", key: "kids" },
  { value: "sunglasses", key: "sunglasses" },
  { value: "accessories", key: "accessories" },
];

const parseList = (value: string | null): string[] =>
  value ? value.split(",").filter(Boolean) : [];

function PriceFilter({
  bounds,
  initial,
  onCommit,
}: {
  bounds: [number, number];
  initial: [number, number];
  onCommit: (value: [number, number]) => void;
}) {
  const [value, setValue] = useState<[number, number]>(initial);

  return (
    <div className="px-1 pt-2">
      <Slider
        value={value}
        onValueChange={(next) => setValue(next as [number, number])}
        onValueCommit={(next) => {
          const tuple = next as [number, number];
          setValue(tuple);
          onCommit(tuple);
        }}
        min={bounds[0]}
        max={bounds[1]}
        step={50}
        minStepsBetweenThumbs={1}
        className="my-3"
      />
      <div className="mt-3 flex items-center justify-between text-sm font-medium text-navy">
        <span>{formatPrice(value[0])}</span>
        <span>{formatPrice(value[1])}</span>
      </div>
    </div>
  );
}

export function FiltersSidebar({
  locale,
  dict,
  priceRange,
  className,
}: FiltersSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const shapes = parseList(searchParams.get("shape"));
  const faces = parseList(searchParams.get("face"));
  const genders = parseList(searchParams.get("gender"));
  const category = searchParams.get("category") ?? "";

  const minRaw = searchParams.get("min");
  const maxRaw = searchParams.get("max");
  const priceMin = minRaw ? Number(minRaw) : priceRange[0];
  const priceMax = maxRaw ? Number(maxRaw) : priceRange[1];

  const buildUrl = useMemo(() => {
    return (next: {
      shapes?: string[];
      faces?: string[];
      genders?: string[];
      category?: string;
      price?: [number, number];
    }) => {
      const params = new URLSearchParams(searchParams.toString());
      const setOrDelete = (key: string, value: string | undefined) => {
        if (!value) params.delete(key);
        else params.set(key, value);
      };

      if (next.shapes !== undefined)
        setOrDelete("shape", next.shapes.join(",") || undefined);
      if (next.faces !== undefined)
        setOrDelete("face", next.faces.join(",") || undefined);
      if (next.genders !== undefined)
        setOrDelete("gender", next.genders.join(",") || undefined);
      if (next.category !== undefined) {
        setOrDelete("category", next.category || undefined);
      }
      if (next.price !== undefined) {
        const [min, max] = next.price;
        if (min === priceRange[0]) params.delete("min");
        else params.set("min", String(min));
        if (max === priceRange[1]) params.delete("max");
        else params.set("max", String(max));
      }

      const qs = params.toString();
      return storePath(locale, qs);
    };
  }, [locale, priceRange, searchParams]);

  const updateUrl = (next: Parameters<typeof buildUrl>[0]) => {
    startTransition(() => {
      router.push(buildUrl(next), { scroll: false });
    });
  };

  const toggle = (
    list: string[],
    value: string,
    key: "shapes" | "faces" | "genders",
  ) => {
    const next = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
    updateUrl({ [key]: next });
  };

  const clearAll = () => {
    startTransition(() => {
      router.push(storePath(locale), { scroll: false });
    });
  };

  const activeCount =
    shapes.length +
    faces.length +
    genders.length +
    (category ? 1 : 0) +
    (priceMin !== priceRange[0] || priceMax !== priceRange[1] ? 1 : 0);

  return (
    <aside
      aria-label={dict.shop.filtersTitle}
      className={cn(
        "rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_8px_32px_-12px_rgba(15,31,51,0.08)]",
        isPending && "opacity-80",
        className,
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-semibold text-navy">
          {dict.shop.filtersTitle}
          {activeCount > 0 ? (
            <span className="ml-2 inline-flex items-center justify-center rounded-full bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold-dark">
              {activeCount}
            </span>
          ) : null}
        </h2>
        {activeCount > 0 ? (
          <Button
            type="button"
            variant="link"
            size="sm"
            className="px-0 text-gold-dark"
            onClick={clearAll}
          >
            {dict.shop.clearFilters}
          </Button>
        ) : null}
      </div>

      <Accordion
        type="multiple"
        defaultValue={["category", "shape", "face", "gender", "price"]}
        className="w-full"
      >
        <AccordionItem value="category">
          <AccordionTrigger>{dict.shop.filterCategory}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => {
                const id = `category-${cat.value}`;
                const checked = category === cat.value;
                return (
                  <li key={cat.value} className="flex items-center gap-2.5">
                    <Checkbox
                      id={id}
                      checked={checked}
                      onCheckedChange={(value) =>
                        updateUrl({ category: value ? cat.value : "" })
                      }
                    />
                    <Label htmlFor={id} className="cursor-pointer">
                      {dict.nav[cat.key]}
                    </Label>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shape">
          <AccordionTrigger>{dict.shop.filterFrameShape}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2.5">
              {FRAME_SHAPES.map((shape) => {
                const id = `shape-${shape.value}`;
                const checked = shapes.includes(shape.value);
                return (
                  <li key={shape.value} className="flex items-center gap-2.5">
                    <Checkbox
                      id={id}
                      checked={checked}
                      onCheckedChange={() =>
                        toggle(shapes, shape.value, "shapes")
                      }
                    />
                    <Label htmlFor={id} className="cursor-pointer">
                      {shape.label}
                    </Label>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="face">
          <AccordionTrigger>{dict.shop.filterFaceShape}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2.5">
              {FACE_SHAPES.map((face) => {
                const id = `face-${face.value}`;
                const checked = faces.includes(face.value);
                return (
                  <li key={face.value} className="flex items-center gap-2.5">
                    <Checkbox
                      id={id}
                      checked={checked}
                      onCheckedChange={() =>
                        toggle(faces, face.value, "faces")
                      }
                    />
                    <Label htmlFor={id} className="cursor-pointer">
                      {face.label}
                    </Label>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gender">
          <AccordionTrigger>{dict.shop.filterGender}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2.5">
              {GENDERS.map((gender) => {
                const id = `gender-${gender.value}`;
                const checked = genders.includes(gender.value);
                return (
                  <li key={gender.value} className="flex items-center gap-2.5">
                    <Checkbox
                      id={id}
                      checked={checked}
                      onCheckedChange={() =>
                        toggle(genders, gender.value, "genders")
                      }
                    />
                    <Label htmlFor={id} className="cursor-pointer">
                      {gender.label}
                    </Label>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>{dict.shop.filterPrice}</AccordionTrigger>
          <AccordionContent>
            <PriceFilter
              key={`${priceMin}-${priceMax}`}
              bounds={priceRange}
              initial={[priceMin, priceMax]}
              onCommit={(next) => updateUrl({ price: next })}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
