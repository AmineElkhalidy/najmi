import Link from "next/link";
import {
  Lock,
  MapPin,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { NewsletterForm } from "@/components/shop/newsletter-form";
import type { Locale } from "@/lib/i18n";
import { localePath, storePath } from "@/lib/locale-paths";
import type { ShopDictionary } from "@/lib/shop-i18n";
import { WHATSAPP_URL } from "@/lib/site-urls";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

type FooterProps = {
  locale: Locale;
  dict: ShopDictionary;
};

const INSTAGRAM_URL = "https://www.instagram.com/najmi_optic/";
const FACEBOOK_URL = "https://web.facebook.com/profile.php?id=61586937009405";

export function Footer({ locale, dict }: FooterProps) {
  const trustItems = [
    { icon: Lock, label: dict.footer.secureCheckout },
    { icon: Truck, label: dict.footer.freeShipping },
    { icon: RefreshCw, label: dict.footer.returnPolicy },
    { icon: ShieldCheck, label: dict.footer.customerCare },
  ];

  const shopLinks = [
    { label: dict.nav.men, href: localePath(locale, "/", "category=men") },
    {
      label: dict.nav.women,
      href: localePath(locale, "/", "category=women"),
    },
    { label: dict.nav.kids, href: localePath(locale, "/", "category=kids") },
    {
      label: dict.nav.sunglasses,
      href: localePath(locale, "/", "category=sunglasses"),
    },
    {
      label: dict.nav.accessories,
      href: localePath(locale, "/", "category=accessories"),
    },
  ];

  const helpLinks = [
    { label: dict.nav.appointment, href: WHATSAPP_URL },
    { label: dict.product.shipping, href: storePath(locale) },
    { label: dict.footer.returnPolicy, href: storePath(locale) },
    { label: dict.footer.customerCare, href: WHATSAPP_URL },
  ];

  return (
    <footer className="bg-navy-deep text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-content-center rounded-full bg-white/5 text-gold">
                <item.icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-medium text-white/90">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link
            href={localePath(locale, "/")}
            className="inline-flex items-center gap-2"
            aria-label="Najmi Optic"
          >
            <span className="grid h-9 w-9 place-content-center rounded-full bg-gold text-navy">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base font-semibold tracking-tight">
                Najmi Optic
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold-soft">
                Laattaouia · Morocco
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
            {dict.footer.tagline}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            {dict.footer.newsletter}
          </p>
          <NewsletterForm
            placeholder={dict.footer.newsletterPlaceholder}
            ctaLabel={dict.footer.newsletterCta}
          />
        </div>

        <nav aria-label={dict.footer.shopHeading}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            {dict.footer.shopHeading}
          </p>
          <ul className="mt-5 space-y-2.5">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/80 transition hover:text-gold-soft"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={dict.footer.helpHeading}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            {dict.footer.helpHeading}
          </p>
          <ul className="mt-5 space-y-2.5">
            {helpLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-white/80 transition hover:text-gold-soft"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
            {dict.footer.visitHeading}
          </p>
          <address className="mt-5 flex items-start gap-3 not-italic">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
            <span className="text-sm leading-relaxed text-white/85">
              {dict.footer.address}
            </span>
          </address>
          <a
            href={WHATSAPP_URL}
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/85 transition hover:text-gold-soft"
          >
            <PhoneCall className="h-4 w-4" />
            +212 659 399 604
          </a>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-content-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold-soft"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid h-9 w-9 place-content-center rounded-full border border-white/15 transition hover:border-gold hover:text-gold-soft"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/60 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} Najmi Optic. {dict.footer.rights}
          </p>
          <p className="text-white/45">
            Designed in Morocco · Built with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
