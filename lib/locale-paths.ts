import { defaultLocale, type Locale } from "@/lib/i18n";

/** `?a=b` suffix, or empty string. */
export function toSearchSuffix(
  search?: URLSearchParams | string | null,
): string {
  if (!search) return "";
  if (typeof search === "string") {
    const s = search.replace(/^\?/, "").trim();
    return s ? `?${s}` : "";
  }
  const s = search.toString().trim();
  return s ? `?${s}` : "";
}

/**
 * Locale-aware path. Default locale (fr) stays unprefixed so `/` and `/product/slug`
 * work with proxy rewrite; `/en/...` and `/ar/...` keep the prefix.
 */
export function localePath(
  locale: Locale,
  pathname: string = "/",
  search?: URLSearchParams | string | null,
): string {
  const q = toSearchSuffix(search);
  const path =
    !pathname || pathname === "/"
      ? "/"
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;

  if (locale === defaultLocale) {
    return `${path}${q}`;
  }

  const inner = path === "/" ? "" : path;
  return `/${locale}${inner}${q}`;
}

/** Store index (PLP) URL for a locale + optional filters/sort query. */
export function storePath(
  locale: Locale,
  search?: URLSearchParams | string | null,
): string {
  return localePath(locale, "/", search);
}
