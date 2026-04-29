import { notFound } from "next/navigation";

import { CartSheet } from "@/components/shop/cart-sheet";
import { Footer } from "@/components/shop/footer";
import { Navbar } from "@/components/shop/navbar";
import { isLocale, locales } from "@/lib/i18n";
import { shopDictionary } from "@/lib/shop-i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function StoreLayout(
  props: LayoutProps<"/[locale]">,
) {
  const { locale } = await props.params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dict = shopDictionary[locale];

  return (
    <div className="flex min-h-screen flex-col bg-cream text-navy">
      <Navbar locale={locale} dict={dict} />
      <main className="flex-1">{props.children}</main>
      <Footer locale={locale} dict={dict} />
      <CartSheet locale={locale} dict={dict} />
    </div>
  );
}
