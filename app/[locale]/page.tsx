import { notFound } from "next/navigation";

import { LandingPage } from "@/components/landing-page";
import { isLocale } from "@/lib/i18n";

export default async function LocaleHomePage(
  props: PageProps<"/[locale]">,
) {
  const { locale } = await props.params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <LandingPage locale={locale} />;
}
