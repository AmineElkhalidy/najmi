import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale, isLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathLocale = pathname.split("/")[1];

  if (isLocale(pathLocale)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", pathLocale);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  /* Unprefixed URLs (/ and /product/…) serve the default locale without redirecting. */
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", defaultLocale);

  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
