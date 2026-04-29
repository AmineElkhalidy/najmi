import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

import { ProductActions } from "@/components/shop/product-actions";
import { ProductCard } from "@/components/shop/product-card";
import { ProductGallery } from "@/components/shop/product-gallery";
import { Badge } from "@/components/ui/badge";
import { isLocale } from "@/lib/i18n";
import { formatPrice, getProductBySlugOrId, getRelatedProducts, products } from "@/lib/products";
import { shopDictionary } from "@/lib/shop-i18n";

export function generateStaticParams() {
  return products.flatMap((product) =>
    [product.id, product.slug].map((id) => ({ id })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[locale]/product/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const product = getProductBySlugOrId(id);
  if (!product) return { title: "Product · Najmi Optic" };
  return {
    title: `${product.name} · ${product.brand} · Najmi Optic`,
    description: product.description,
    openGraph: {
      title: `${product.name} · Najmi Optic`,
      description: product.description,
      images: [{ url: product.images.front }],
    },
  };
}

export default async function ProductPage(
  props: PageProps<"/[locale]/product/[id]">,
) {
  const { locale, id } = await props.params;
  if (!isLocale(locale)) notFound();

  const product = getProductBySlugOrId(id);
  if (!product) notFound();

  const dict = shopDictionary[locale];
  const related = getRelatedProducts(product);

  const trustItems = [
    { icon: Truck, label: dict.product.shipping },
    { icon: RefreshCw, label: dict.footer.returnPolicy },
    { icon: ShieldCheck, label: dict.footer.customerCare },
    { icon: Lock, label: dict.footer.secureCheckout },
  ];

  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:pt-12">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-slate-500"
        >
          <Link
            href={`/${locale}`}
            className="transition hover:text-gold-dark"
          >
            {dict.shop.breadcrumbHome}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <Link
            href={`/${locale}/shop`}
            className="transition hover:text-gold-dark"
          >
            {dict.shop.breadcrumbShop}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="font-semibold text-navy">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <ProductGallery product={product} />

          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {product.badges?.map((badge) => (
                  <Badge
                    key={badge}
                    variant={badge === "limited" ? "navy" : "gold"}
                  >
                    {badge === "new" && "New"}
                    {badge === "bestseller" && "Bestseller"}
                    {badge === "limited" && "Limited Edition"}
                  </Badge>
                ))}
                <Badge variant="outline">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: product.colorHex }}
                    aria-hidden
                  />
                  {product.color}
                </Badge>
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-gold-dark">
                {product.brand}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <span className="font-semibold text-navy">
                    {product.rating.toFixed(1)}
                  </span>
                  <span>({product.reviewCount} reviews)</span>
                </span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {product.inStock ? dict.product.inStock : dict.product.outOfStock}
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-navy">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice ? (
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                ) : null}
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                {product.description}
              </p>
            </header>

            <ProductActions product={product} dict={dict} />

            <ul className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-white p-4 sm:grid-cols-4">
              {trustItems.map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col items-start gap-1.5 text-xs text-slate-600"
                >
                  <item.icon className="h-4 w-4 text-gold-dark" />
                  <span className="font-medium text-navy">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <section className="rounded-3xl border border-slate-100 bg-white p-6">
            <h2 className="text-base font-semibold text-navy">
              {dict.product.highlights}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-100 bg-white p-6">
            <h2 className="text-base font-semibold text-navy">
              {dict.product.materials}
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <dt>{dict.product.materials}</dt>
                <dd className="font-medium text-navy">{product.material}</dd>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <dt>Color</dt>
                <dd className="font-medium text-navy">{product.color}</dd>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <dt>Frame shape</dt>
                <dd className="font-medium capitalize text-navy">
                  {product.frameShape.replace("-", " ")}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-3xl border border-slate-100 bg-white p-6">
            <h2 className="text-base font-semibold text-navy">
              {dict.product.faceShapeFit}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.faceShapes.map((shape) => (
                <Badge key={shape} variant="outline" className="capitalize">
                  {shape}
                </Badge>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Not sure which frame fits your face? Visit our boutique in
              Laattaouia for a complimentary consultation with our certified
              opticians.
            </p>
          </section>
        </div>

        {related.length > 0 ? (
          <section className="mt-20" aria-labelledby="related-products">
            <div className="mb-6 flex items-end justify-between gap-3">
              <h2
                id="related-products"
                className="text-2xl font-semibold tracking-tight text-navy"
              >
                {dict.product.relatedTitle}
              </h2>
              <Link
                href={`/${locale}/shop`}
                className="text-sm font-medium text-gold-dark underline-offset-4 hover:underline"
              >
                {dict.cart.continueShopping}
              </Link>
            </div>
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
