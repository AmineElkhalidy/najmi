import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FiltersSidebar } from "@/components/shop/filters-sidebar";
import { ProductCard } from "@/components/shop/product-card";
import { SortSelect } from "@/components/shop/sort-select";
import { isLocale } from "@/lib/i18n";
import { localePath } from "@/lib/locale-paths";
import {
  PRICE_BOUNDS,
  filterProducts,
  parseProductQuery,
} from "@/lib/product-filter";
import { shopDictionary } from "@/lib/shop-i18n";

export const metadata: Metadata = {
  title: "Najmi Optic · Premium Eyewear",
  description:
    "Discover premium frames, sunglasses, and accessories curated by Najmi Optic in Laattaouia.",
};

export default async function StoreHomePage(
  props: PageProps<"/[locale]">,
) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const searchParams = await props.searchParams;
  const dict = shopDictionary[locale];
  const query = parseProductQuery(searchParams);
  const productsList = filterProducts(query);

  const hasQueryFilters = Boolean(
    searchParams.category ||
      searchParams.shape ||
      searchParams.face ||
      searchParams.gender ||
      searchParams.min ||
      searchParams.max ||
      searchParams.sort ||
      searchParams.q,
  );

  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:pt-12">
        {hasQueryFilters ? (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-slate-500"
          >
            <Link
              href={localePath(locale, "/")}
              className="transition hover:text-gold-dark"
            >
              {dict.shop.breadcrumbHome}
            </Link>
            <span aria-hidden>/</span>
            <span className="font-semibold text-navy">
              {dict.shop.breadcrumbShop}
            </span>
          </nav>
        ) : (
          <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">
            Najmi Optic
          </p>
        )}

        <header className={`flex flex-col gap-3 ${hasQueryFilters ? "mt-6" : "mt-3"}`}>
          <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            {dict.shop.pageTitle}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {dict.shop.pageSubtitle}
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
          <FiltersSidebar
            locale={locale}
            dict={dict}
            priceRange={PRICE_BOUNDS}
            className="sticky top-32 self-start"
          />

          <section aria-label={dict.shop.pageTitle}>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-navy">
                  {productsList.length}
                </span>{" "}
                {dict.shop.showingResults}
                {query.q ? (
                  <>
                    {" "}
                    ·{" "}
                    <span className="text-slate-500">
                      &ldquo;{query.q}&rdquo;
                    </span>
                  </>
                ) : null}
              </p>
              <SortSelect locale={locale} dict={dict} />
            </div>

            {productsList.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-slate-100 bg-white p-12 text-center">
                <p className="text-sm text-slate-600">{dict.shop.noResults}</p>
              </div>
            ) : (
              <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {productsList.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    priority={index < 3}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
