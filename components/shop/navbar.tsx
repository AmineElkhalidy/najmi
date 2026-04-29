"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  ChevronDown,
  Glasses,
  Languages,
  Menu,
  Search,
  Sparkles,
  Sun,
  User,
  X,
} from "lucide-react";

import { CartButton } from "@/components/shop/cart-button";
import { SearchBar } from "@/components/shop/search-bar";
import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ShopDictionary } from "@/lib/shop-i18n";

type NavbarProps = {
  locale: Locale;
  dict: ShopDictionary;
};

type MegaCategory = {
  key: string;
  label: string;
  href: string;
  highlight?: { label: string; href: string; image?: string };
  columns: Array<{
    title: string;
    items: Array<{ label: string; href: string }>;
  }>;
};

const localeOptions: Array<{ locale: Locale; label: string }> = [
  { locale: "fr", label: "FR" },
  { locale: "en", label: "EN" },
  { locale: "ar", label: "AR" },
];

function buildMegaMenu(locale: Locale, dict: ShopDictionary): MegaCategory[] {
  const base = (path: string) => `/${locale}/shop${path}`;
  return [
    {
      key: "men",
      label: dict.nav.men,
      href: base("?category=men"),
      highlight: {
        label: dict.megaMenu.bestsellers,
        href: base("?category=men&sort=rating"),
      },
      columns: [
        {
          title: dict.megaMenu.byShape,
          items: [
            { label: "Aviator", href: base("?category=men&shape=aviator") },
            { label: "Round", href: base("?category=men&shape=round") },
            { label: "Square", href: base("?category=men&shape=square") },
            { label: "Rectangle", href: base("?category=men&shape=rectangle") },
          ],
        },
        {
          title: dict.megaMenu.byMaterial,
          items: [
            { label: "Acetate", href: base("?category=men&material=acetate") },
            {
              label: "Stainless Steel",
              href: base("?category=men&material=steel"),
            },
            { label: "Titanium", href: base("?category=men&material=titanium") },
          ],
        },
        {
          title: dict.megaMenu.featured,
          items: [
            { label: dict.megaMenu.newArrivals, href: base("?category=men&filter=new") },
            { label: dict.megaMenu.bestsellers, href: base("?category=men&sort=rating") },
            { label: dict.megaMenu.shopAll, href: base("?category=men") },
          ],
        },
      ],
    },
    {
      key: "women",
      label: dict.nav.women,
      href: base("?category=women"),
      columns: [
        {
          title: dict.megaMenu.byShape,
          items: [
            { label: "Cat-eye", href: base("?category=women&shape=cat-eye") },
            { label: "Round", href: base("?category=women&shape=round") },
            { label: "Oval", href: base("?category=women&shape=oval") },
            { label: "Square", href: base("?category=women&shape=square") },
          ],
        },
        {
          title: dict.megaMenu.byMaterial,
          items: [
            { label: "Acetate", href: base("?category=women&material=acetate") },
            { label: "Titanium", href: base("?category=women&material=titanium") },
          ],
        },
        {
          title: dict.megaMenu.featured,
          items: [
            { label: dict.megaMenu.newArrivals, href: base("?category=women&filter=new") },
            { label: dict.megaMenu.bestsellers, href: base("?category=women&sort=rating") },
            { label: dict.megaMenu.shopAll, href: base("?category=women") },
          ],
        },
      ],
    },
    {
      key: "kids",
      label: dict.nav.kids,
      href: base("?category=kids"),
      columns: [
        {
          title: dict.megaMenu.byShape,
          items: [
            { label: "Round", href: base("?category=kids&shape=round") },
            { label: "Oval", href: base("?category=kids&shape=oval") },
            { label: "Square", href: base("?category=kids&shape=square") },
          ],
        },
        {
          title: dict.megaMenu.featured,
          items: [
            { label: dict.megaMenu.newArrivals, href: base("?category=kids&filter=new") },
            { label: dict.megaMenu.shopAll, href: base("?category=kids") },
          ],
        },
      ],
    },
    {
      key: "sunglasses",
      label: dict.nav.sunglasses,
      href: base("?category=sunglasses"),
      columns: [
        {
          title: dict.megaMenu.byShape,
          items: [
            { label: "Aviator", href: base("?category=sunglasses&shape=aviator") },
            { label: "Cat-eye", href: base("?category=sunglasses&shape=cat-eye") },
            { label: "Round", href: base("?category=sunglasses&shape=round") },
            { label: "Square", href: base("?category=sunglasses&shape=square") },
          ],
        },
        {
          title: dict.megaMenu.featured,
          items: [
            { label: dict.megaMenu.newArrivals, href: base("?category=sunglasses&filter=new") },
            { label: dict.megaMenu.bestsellers, href: base("?category=sunglasses&sort=rating") },
            { label: dict.megaMenu.shopAll, href: base("?category=sunglasses") },
          ],
        },
      ],
    },
    {
      key: "accessories",
      label: dict.nav.accessories,
      href: base("?category=accessories"),
      columns: [
        {
          title: dict.megaMenu.featured,
          items: [
            { label: dict.megaMenu.shopAll, href: base("?category=accessories") },
            { label: "Cases", href: base("?category=accessories") },
            { label: "Cleaning kits", href: base("?category=accessories") },
          ],
        },
      ],
    },
  ];
}

const HOVER_DELAY_MS = 120;

export function Navbar({ locale, dict }: NavbarProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRtl = locale === "ar";

  const megaMenu = buildMegaMenu(locale, dict);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), HOVER_DELAY_MS);
  };

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors",
        scrolled
          ? "border-slate-200 bg-white/95 backdrop-blur"
          : "border-transparent bg-white",
      )}
    >
      <div className="border-b border-slate-100 bg-navy text-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6">
          <p className="hidden sm:block">
            <span className="text-gold-soft">★★★★★</span>{" "}
            <span className="text-white/80">{dict.footer.tagline}</span>
          </p>
          <p className="text-white/85">
            {dict.footer.freeShipping} · {dict.footer.returnPolicy}
          </p>
          <div className="hidden items-center gap-1 md:flex">
            <Languages className="h-3.5 w-3.5 text-white/70" aria-hidden />
            {localeOptions.map((option) => (
              <Link
                key={option.locale}
                href={`/${option.locale}`}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold transition",
                  option.locale === locale
                    ? "bg-gold text-navy"
                    : "text-white/70 hover:text-white",
                )}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label={dict.nav.menu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy transition hover:bg-navy/5 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link
          href={`/${locale}`}
          className="flex items-center gap-2"
          aria-label="Najmi Optic"
        >
          <span className="grid h-9 w-9 place-content-center rounded-full bg-navy text-gold">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight text-navy">
              Najmi Optic
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-dark">
              Laattaouia
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
          onMouseLeave={scheduleClose}
        >
          {megaMenu.map((item) => {
            const isOpen = openKey === item.key;
            return (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => {
                  cancelClose();
                  setOpenKey(item.key);
                }}
              >
                <Link
                  href={item.href}
                  onFocus={() => setOpenKey(item.key)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition",
                    isOpen
                      ? "bg-cream text-navy"
                      : "text-navy/85 hover:bg-cream hover:text-navy",
                  )}
                  aria-expanded={isOpen}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        <div className={cn("ml-auto flex items-center gap-1", isRtl && "mr-auto ml-0")}>
          <SearchBar
            placeholder={dict.nav.searchPlaceholder}
            locale={locale}
            className="hidden xl:block xl:w-72"
          />
          <button
            type="button"
            aria-label={dict.nav.searchPlaceholder}
            onClick={() => setSearchOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy transition hover:bg-navy/5 xl:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href={`/${locale}#contact`}
            className={cn(
              buttonVariants({ variant: "navy", size: "sm" }),
              "hidden md:inline-flex",
            )}
          >
            <CalendarCheck className="h-4 w-4" />
            {dict.nav.appointment}
          </Link>
          <button
            type="button"
            aria-label={dict.nav.account}
            className="hidden h-10 w-10 items-center justify-center rounded-full text-navy transition hover:bg-navy/5 md:inline-flex"
          >
            <User className="h-5 w-5" />
          </button>
          <CartButton label={dict.nav.cart} />
        </div>
      </div>

      <AnimatePresence>
        {searchOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden border-t border-slate-100 bg-white xl:hidden"
          >
            <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6">
              <SearchBar
                placeholder={dict.nav.searchPlaceholder}
                locale={locale}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {openKey ? (
          <motion.div
            key="mega"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-full hidden border-t border-slate-100 bg-white shadow-[0_24px_55px_-25px_rgba(15,31,51,0.18)] lg:block"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            {megaMenu
              .filter((item) => item.key === openKey)
              .map((item) => (
                <div
                  key={item.key}
                  className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_2fr]"
                >
                  <div className="rounded-3xl bg-gradient-to-br from-cream via-white to-cream p-8">
                    <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                      {item.key === "sunglasses" ? (
                        <Sun className="h-3.5 w-3.5" />
                      ) : (
                        <Glasses className="h-3.5 w-3.5" />
                      )}
                      {item.label}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold text-navy">
                      {dict.megaMenu.featured}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {dict.shop.pageSubtitle}
                    </p>
                    <Link
                      href={item.href}
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "mt-6 self-start",
                      )}
                    >
                      {dict.megaMenu.seeCollection}
                    </Link>
                  </div>
                  <div className="grid gap-8 sm:grid-cols-3">
                    {item.columns.map((column) => (
                      <div key={column.title}>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                          {column.title}
                        </p>
                        <ul className="mt-4 space-y-2.5">
                          {column.items.map((entry) => (
                            <li key={entry.label}>
                              <Link
                                href={entry.href}
                                onClick={() => setOpenKey(null)}
                                className="text-sm text-navy/80 transition hover:text-gold-dark"
                              >
                                {entry.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: isRtl ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? "100%" : "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className={cn(
                "absolute top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl",
                isRtl ? "right-0" : "left-0",
              )}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <Link
                  href={`/${locale}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2"
                >
                  <span className="grid h-8 w-8 place-content-center rounded-full bg-navy text-gold">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-navy">
                    Najmi Optic
                  </span>
                </Link>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-navy transition hover:bg-navy/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-5">
                <ul className="space-y-1.5">
                  <li>
                    <Link
                      href={`/${locale}/shop`}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl bg-cream px-4 py-3 text-sm font-semibold text-navy"
                    >
                      {dict.nav.shop}
                    </Link>
                  </li>
                  {megaMenu.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm font-medium text-navy/85 hover:bg-cream"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
                    Language
                  </p>
                  <div className="flex gap-2">
                    {localeOptions.map((option) => (
                      <Link
                        key={option.locale}
                        href={`/${option.locale}`}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                          option.locale === locale
                            ? "bg-navy text-white"
                            : "bg-cream text-navy/80",
                        )}
                      >
                        {option.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
              <div className="border-t border-slate-100 p-5">
                <Link
                  href={`/${locale}#contact`}
                  onClick={() => setMobileOpen(false)}
                  className={cn(buttonVariants({ variant: "navy" }), "w-full")}
                >
                  <CalendarCheck className="h-4 w-4" />
                  {dict.nav.appointment}
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
