import { notFound } from "next/navigation";

import { LandingPage } from "@/components/landing-page";
import { isLocale, locales } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <LandingPage locale={locale} />;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
