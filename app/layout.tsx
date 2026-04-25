import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { defaultLocale, isLocale } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Najmi Optic Laattaouia",
  description: "Najmi Optic Laattaouia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localeHeader = (await headers()).get("x-locale");
  const locale =
    localeHeader && isLocale(localeHeader) ? localeHeader : defaultLocale;
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
